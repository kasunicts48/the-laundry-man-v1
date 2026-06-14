<?php
declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

// =============================================================================
// Response helpers
// =============================================================================
function sendJsonResponse(int $statusCode, bool $success, string $message, array $meta = []): never
{
    http_response_code($statusCode);
    $payload = [
        'success' => $success,
        'message' => $message,
    ];

    if ($meta !== []) {
        $payload['meta'] = $meta;
    }

    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function sendCorsHeaders(): void
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Content-Type: application/json; charset=UTF-8');
}

function logSecureError(string $context, Throwable $exception): void
{
    error_log(sprintf(
        '[send-email] %s | %s in %s:%d',
        $context,
        $exception->getMessage(),
        $exception->getFile(),
        $exception->getLine()
    ));
}

// =============================================================================
// Environment loader (zero Composer dependency)
// =============================================================================
function loadEnv(string $path): void
{
    if (!is_file($path)) {
        throw new RuntimeException('.env file not found.');
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES);
    if ($lines === false) {
        throw new RuntimeException('Unable to read .env file.');
    }

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        if (str_starts_with($line, 'export ')) {
            $line = trim(substr($line, 7));
        }

        $separatorPos = strpos($line, '=');
        if ($separatorPos === false) {
            continue;
        }

        $key = trim(substr($line, 0, $separatorPos));
        $value = trim(substr($line, $separatorPos + 1));

        if ($key === '') {
            continue;
        }

        if (
            (str_starts_with($value, '"') && str_ends_with($value, '"'))
            || (str_starts_with($value, "'") && str_ends_with($value, "'"))
        ) {
            $value = substr($value, 1, -1);
        }

        $_ENV[$key] = $value;
        putenv($key . '=' . $value);
    }
}

// =============================================================================
// Configuration (single source of truth — loaded once from .env)
// =============================================================================
function envValue(string $key, string $default = ''): string
{
    if (array_key_exists($key, $_ENV) && trim((string) $_ENV[$key]) !== '') {
        return trim((string) $_ENV[$key]);
    }

    $fromGetenv = getenv($key);
    if ($fromGetenv !== false && trim((string) $fromGetenv) !== '') {
        return trim((string) $fromGetenv);
    }

    return $default;
}

function isDevelopmentEnvironment(array $config): bool
{
    return ($config['system']['app_env'] ?? 'production') === 'development';
}

function loadApplicationConfig(): array
{
    loadEnv(__DIR__ . '/.env');

    $appEnv = strtolower(envValue('APP_ENV', 'production'));
    if (!in_array($appEnv, ['development', 'production'], true)) {
        throw new RuntimeException('APP_ENV must be "development" or "production".');
    }

    $laundryServiceEmail = envValue('LAUNDRY_SERVICE_EMAIL', envValue('NOTIFICATION_RECEIVER_EMAIL'));
    if ($laundryServiceEmail === '' || !filter_var($laundryServiceEmail, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException(
            'LAUNDRY_SERVICE_EMAIL (or NOTIFICATION_RECEIVER_EMAIL) is missing or invalid in public/api/.env.'
        );
    }

    $fromEmail = envValue('MAIL_FROM_EMAIL');
    if ($fromEmail === '' || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException(
            'MAIL_FROM_EMAIL is missing or invalid in public/api/.env.'
        );
    }

    $smtpHost = envValue('SMTP_HOST', 'send.one.com');
    $smtpPort = (int) envValue('SMTP_PORT', '587');
    $smtpUsername = envValue('SMTP_USERNAME', $fromEmail);
    $smtpPassword = envValue('SMTP_PASSWORD');

    if ($smtpHost === '' || $smtpPort <= 0) {
        throw new RuntimeException('SMTP_HOST and SMTP_PORT are required in public/api/.env.');
    }

    if ($smtpUsername === '' || $smtpPassword === '') {
        throw new RuntimeException('SMTP_USERNAME and SMTP_PASSWORD are required in public/api/.env.');
    }

    $brandedFromEmail = $fromEmail;
    $smtpFromEmail = $fromEmail;

    // Gmail SMTP requires the authenticated mailbox as the envelope/from sender.
    if (str_contains(strtolower($smtpHost), 'gmail.com') && strcasecmp($smtpFromEmail, $smtpUsername) !== 0) {
        $smtpFromEmail = $smtpUsername;
    }

    $templates = [
        'appointment'             => __DIR__ . '/templates/appointment-template.html',
        'customer_confirmation'   => __DIR__ . '/templates/customer-confirmation-template.html',
        'contact'                 => __DIR__ . '/templates/contact-template.html',
    ];

    return [
        'system' => [
            'app_env' => $appEnv,
        ],
        'mail' => [
            'recipient'               => $laundryServiceEmail,
            'from_email'              => $smtpFromEmail,
            'branded_from_email'      => $brandedFromEmail,
            'from_name'               => envValue('MAIL_FROM_NAME', 'The Laundry Man Website'),
            'from_domain'             => extractEmailDomain($smtpFromEmail),
            'subject_prefix'          => 'New Collection Booking',
            'customer_subject_prefix' => envValue('CUSTOMER_SUBJECT_PREFIX', 'Your Booking Confirmation'),
            'contact_subject_prefix'  => envValue('CONTACT_SUBJECT_PREFIX', 'Website Contact Enquiry'),
        ],
        'smtp' => [
            'host'     => $smtpHost,
            'port'     => $smtpPort,
            'username' => $smtpUsername,
            'password' => $smtpPassword,
        ],
        'templates' => $templates,
    ];
}

// =============================================================================
// Validation & sanitization
// =============================================================================
final class ValidationException extends RuntimeException
{
}

/**
 * @return array{
 *   name: string,
 *   email: string,
 *   phone: string,
 *   date: string,
 *   service: string,
 *   collection_time: string,
 *   address: string,
 *   city: string,
 *   postcode: string,
 *   instructions: string,
 *   volume: string,
 *   notes: string
 * }
 */
function validateBookingPayload(array $data): array
{
    $errors = [];

    $name = sanitizePlainText((string) ($data['name'] ?? ''), 120);
    $email = trim((string) ($data['email'] ?? ''));
    $phone = sanitizePlainText((string) ($data['phone'] ?? ''), 40);
    $date = trim((string) ($data['date'] ?? ''));
    $service = sanitizePlainText((string) ($data['service'] ?? ''), 100);
    $collectionTime = sanitizePlainText((string) ($data['collection_time'] ?? ''), 50);
    $address = sanitizePlainText((string) ($data['address'] ?? ''), 200);
    $city = sanitizePlainText((string) ($data['city'] ?? ''), 100);
    $postcode = sanitizePlainText((string) ($data['postcode'] ?? ''), 20);
    $instructions = sanitizePlainText((string) ($data['instructions'] ?? ''), 1000);
    $volume = sanitizePlainText((string) ($data['volume'] ?? ''), 100);
    $notes = sanitizePlainText((string) ($data['notes'] ?? ''), 1000);
    $referenceNumber = sanitizePlainText((string) ($data['reference_number'] ?? ''), 20);

    if ($referenceNumber === '' || preg_match('/^BK-\d{14}$/', $referenceNumber) !== 1) {
        $referenceNumber = generateBookingReference();
    }

    if ($name === '') {
        $errors[] = 'name';
    }

    if ($email === '') {
        $errors[] = 'email';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'email (invalid format)';
    }

    if ($phone === '') {
        $errors[] = 'phone';
    } elseif (!preg_match('/^[+\d\s().-]{7,40}$/', $phone)) {
        $errors[] = 'phone (invalid format)';
    }

    if ($date === '') {
        $errors[] = 'date';
    } elseif (!isValidDate($date)) {
        $errors[] = 'date (invalid format)';
    }

    if ($service === '') {
        $errors[] = 'service';
    }

    if ($collectionTime === '') {
        $errors[] = 'collection_time';
    }

    if ($city === '') {
        $errors[] = 'city';
    }

    if ($postcode === '') {
        $errors[] = 'postcode';
    }

    if ($errors !== []) {
        throw new ValidationException('Invalid or missing fields: ' . implode(', ', $errors) . '.');
    }

    return compact(
        'name',
        'email',
        'phone',
        'date',
        'service',
        'collectionTime',
        'address',
        'city',
        'postcode',
        'instructions',
        'volume',
        'notes',
        'referenceNumber'
    );
}

function sanitizePlainText(string $value, int $maxLength): string
{
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? $value;

    if (strlen($value) > $maxLength) {
        $value = substr($value, 0, $maxLength);
    }

    return $value;
}

function isValidDate(string $date): bool
{
    $parsed = DateTimeImmutable::createFromFormat('Y-m-d', $date);

    return $parsed !== false && $parsed->format('Y-m-d') === $date;
}

/**
 * Parses booking POST data from JSON body and/or application/x-www-form-urlencoded fields.
 */
function parseBookingRequestPayload(): array
{
    $data = [];
    $rawInput = file_get_contents('php://input');

    if ($rawInput !== false && trim($rawInput) !== '') {
        $decoded = json_decode($rawInput, true);

        if (!is_array($decoded)) {
            throw new ValidationException('Invalid JSON payload.');
        }

        $data = $decoded;
    }

    if ($_POST !== []) {
        $data = array_merge($data, $_POST);
    }

    if ($data === []) {
        throw new ValidationException('Request body is empty.');
    }

    return $data;
}

function parseJsonRequestBody(): array
{
    return parseBookingRequestPayload();
}

/**
 * Reads the customer's email from POST fields or JSON payload (React nested or flat keys).
 * Does NOT fall back to the admin/notification address.
 */
function extractCustomerEmailFromPayload(?array $data = null): string
{
    $candidates = [
        trim((string) ($_POST['email'] ?? '')),
    ];

    if (is_array($data)) {
        $candidates[] = trim((string) ($data['email'] ?? ''));
        $candidates[] = trim((string) ($data['customer_email'] ?? ''));

        if (isset($data['customer']) && is_array($data['customer'])) {
            $candidates[] = trim((string) ($data['customer']['email'] ?? ''));
        }
    }

    foreach ($candidates as $email) {
        if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $email;
        }
    }

    return '';
}

/**
 * Resolves the customer confirmation recipient from validated booking data and payload.
 *
 * @return array{email: string, usedFallback: bool, source: string}
 */
function resolveCustomerConfirmationEmail(array $rawPayload, array $booking): array
{
    $payloadEmail = extractCustomerEmailFromPayload($rawPayload);
    $bookingEmail = trim((string) ($booking['email'] ?? ''));

    $candidates = [
        'booking.email'          => $bookingEmail,
        'payload.customer.email' => $payloadEmail,
        'payload.email'          => trim((string) ($rawPayload['email'] ?? '')),
        'payload.customer_email' => trim((string) ($rawPayload['customer_email'] ?? '')),
        'post.email'             => trim((string) ($_POST['email'] ?? '')),
    ];

    foreach ($candidates as $source => $email) {
        if ($email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            error_log(sprintf('[send-email] Customer email resolved from %s: %s', $source, $email));

            return [
                'email'        => $email,
                'usedFallback' => false,
                'source'       => $source,
            ];
        }
    }

    error_log('[send-email] Customer email missing. Checked: ' . json_encode($candidates));

    $fallback = envValue('CUSTOMER_EMAIL_FALLBACK', envValue('LAUNDRY_SERVICE_EMAIL'));
    if ($fallback !== '' && filter_var($fallback, FILTER_VALIDATE_EMAIL)) {
        error_log('[send-email] Customer email missing/invalid; using CUSTOMER_EMAIL_FALLBACK/LAUNDRY_SERVICE_EMAIL.');

        return [
            'email'        => $fallback,
            'usedFallback' => true,
            'source'       => 'fallback',
        ];
    }

    throw new ValidationException(
        'Customer email is missing or invalid. Expected customer.email in the JSON payload or email in POST.'
    );
}

/**
 * Accepts nested BookingPayload from the React form or legacy flat JSON keys.
 */
function normalizeBookingPayload(array $data): array
{
    if (isset($data['customer']) && is_array($data['customer'])) {
        return [
            'name'             => (string) ($data['customer']['fullName'] ?? ''),
            'email'            => extractCustomerEmailFromPayload($data),
            'phone'            => (string) ($data['customer']['phone'] ?? ''),
            'address'          => (string) ($data['location']['address'] ?? ''),
            'city'             => (string) ($data['location']['city'] ?? ''),
            'postcode'         => (string) ($data['location']['postcode'] ?? ''),
            'instructions'     => (string) ($data['location']['instructions'] ?? ''),
            'service'          => (string) ($data['service']['type'] ?? ''),
            'volume'           => (string) ($data['service']['volume'] ?? ''),
            'notes'            => (string) ($data['service']['notes'] ?? ''),
            'date'             => (string) ($data['schedule']['collectionDate'] ?? ''),
            'collection_time'  => (string) ($data['schedule']['collectionTime'] ?? ''),
            'reference_number' => (string) ($data['metadata']['referenceNumber'] ?? ''),
        ];
    }

    return $data;
}

function extractEmailDomain(string $email): string
{
    $atPos = strrpos($email, '@');

    return $atPos === false ? '' : strtolower(substr($email, $atPos + 1));
}

function encodeMailHeaderValue(string $value): string
{
    $value = str_replace(["\r", "\n"], '', $value);

    if ($value === '' || preg_match('/^[\x20-\x7E]*$/', $value) === 1) {
        return $value;
    }

    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function encodeMailSubject(string $subject): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $subject) === 1) {
        return $subject;
    }

    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function formatEmailHeaderAddress(string $email, string $displayName): string
{
    $safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    $safeName = encodeMailHeaderValue(str_replace(['"', "\r", "\n"], '', $displayName));

    if ($safeName === '') {
        return $safeEmail;
    }

    return sprintf('%s <%s>', $safeName, $safeEmail);
}

// =============================================================================
// Email template rendering
// =============================================================================
const OPTIONAL_TEMPLATE_FIELDS = [
    'quantity',
    'delivery_instructions',
    'special_notes',
];

const CUSTOMER_OPTIONAL_TEMPLATE_FIELDS = [
    'quantity',
];

function generateBookingReference(): string
{
    return 'BK-' . date('YmdHis');
}

function formatPickupDate(string $date): string
{
    $parsed = DateTimeImmutable::createFromFormat('Y-m-d', $date);

    if ($parsed === false) {
        return $date;
    }

    return $parsed->format('l, j F Y');
}

function buildServiceDetails(array $booking): string
{
    $details = [$booking['service']];

    if ($booking['volume'] !== '') {
        $details[] = $booking['volume'];
    }

    return implode(' · ', $details);
}

function resolveTotalAmount(array $booking): string
{
    return 'To be confirmed on collection';
}

function mapBookingToCustomerConfirmationData(array $booking, string $orderId): array
{
    $locationParts = array_filter([
        $booking['address'],
        $booking['city'],
        $booking['postcode'],
    ]);

    return [
        'customer_name'    => $booking['name'],
        'order_id'         => $orderId,
        'pickup_date'      => formatPickupDate($booking['date']),
        'collection_time'  => $booking['collectionTime'],
        'service_details'  => buildServiceDetails($booking),
        'service_location' => implode(', ', $locationParts),
        'total_amount'     => resolveTotalAmount($booking),
        'quantity' => $booking['volume'],
    ];
}

function removeEmptyOptionalBlocks(string $template, array $data, array $optionalKeys): string
{
    foreach ($optionalKeys as $key) {
        $value = trim((string) ($data[$key] ?? ''));

        if ($value !== '') {
            continue;
        }

        $pattern = sprintf(
            '/<!--\s*OPTIONAL:%s\s*-->.*?<!--\s*END OPTIONAL:%s\s*-->\s*/s',
            preg_quote($key, '/'),
            preg_quote($key, '/')
        );

        $template = preg_replace($pattern, '', $template) ?? $template;
    }

    return $template;
}

function renderEmailTemplate(string $templatePath, array $data, array $optionalKeys = []): string
{
    if (!is_file($templatePath)) {
        throw new RuntimeException('Email template not found.');
    }

    $template = file_get_contents($templatePath);
    if ($template === false) {
        throw new RuntimeException('Unable to read email template.');
    }

    $template = removeEmptyOptionalBlocks($template, $data, $optionalKeys);

    $placeholders = [];
    $values = [];

    foreach ($data as $key => $value) {
        $placeholders[] = '{{' . $key . '}}';
        $values[] = htmlspecialchars((string) $value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    return str_replace($placeholders, $values, $template);
}

function mapBookingToTemplateData(array $booking): array
{
    $locationParts = array_filter([
        $booking['address'],
        $booking['city'],
        $booking['postcode'],
    ]);

    return [
        'reference_number'      => $booking['referenceNumber'],
        'customer_name'         => $booking['name'],
        'customer_email'        => $booking['email'],
        'phone_number'          => $booking['phone'],
        'service_location'      => implode(', ', $locationParts),
        'selected_service'      => $booking['service'],
        'appointment_date'      => $booking['date'],
        'collection_time'       => $booking['collectionTime'],
        'quantity'      => $booking['volume'],
        'delivery_instructions' => $booking['instructions'],
        'special_notes'         => $booking['notes'],
    ];
}

// =============================================================================
// Mail transport
// =============================================================================
function buildPlainTextBookingSummary(array $booking, string $subject): string
{
    $locationParts = array_filter([
        $booking['address'],
        $booking['city'],
        $booking['postcode'],
    ]);

    $lines = [
        $subject,
        str_repeat('-', min(strlen($subject), 60)),
        '',
        'Reference Number: ' . $booking['referenceNumber'],
        '',
        'Customer: ' . $booking['name'],
        'Email: ' . $booking['email'],
        'Phone: ' . $booking['phone'],
        'Location: ' . implode(', ', $locationParts),
        'Service: ' . $booking['service'],
        'Collection date: ' . $booking['date'],
        'Collection time: ' . $booking['collectionTime'],
    ];

    if ($booking['volume'] !== '') {
        $lines[] = 'Quantity: ' . $booking['volume'];
    }

    if ($booking['instructions'] !== '') {
        $lines[] = 'Delivery instructions: ' . $booking['instructions'];
    }

    if ($booking['notes'] !== '') {
        $lines[] = 'Special requests: ' . $booking['notes'];
    }

    $lines[] = '';
    $lines[] = 'Reply to this email to contact the customer directly.';

    return implode("\r\n", $lines);
}

/**
 * Builds RFC-compliant multipart/alternative MIME (plain text + HTML).
 *
 * @return array{headers: string[], body: string, subject: string, envelope_from: string}
 */
function buildMimeMessage(
    array $config,
    string $recipientEmail,
    string $subject,
    string $htmlBody,
    string $plainBody,
    ?array $replyTo = null,
    ?string $recipientDisplayName = null
): array {
    $mail = $config['mail'];
    $boundary = '=_TLM_' . bin2hex(random_bytes(16));
    $messageId = sprintf(
        '%s.%s@%s',
        bin2hex(random_bytes(8)),
        (string) time(),
        $mail['from_domain']
    );

    $toHeader = $recipientDisplayName !== null && $recipientDisplayName !== ''
        ? formatEmailHeaderAddress($recipientEmail, $recipientDisplayName)
        : $recipientEmail;

    $headers = [
        'MIME-Version: 1.0',
        'Date: ' . gmdate('D, d M Y H:i:s') . ' +0000',
        'Message-ID: <' . $messageId . '>',
        'From: ' . formatEmailHeaderAddress($mail['from_email'], $mail['from_name']),
        'To: ' . $toHeader,
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: The Laundry Man Booking Form',
    ];

    if ($replyTo !== null && ($replyTo['email'] ?? '') !== '') {
        $headers[] = 'Reply-To: ' . formatEmailHeaderAddress(
            (string) $replyTo['email'],
            (string) ($replyTo['name'] ?? '')
        );
    }

    $body = '--' . $boundary . "\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $plainBody . "\r\n\r\n";
    $body .= '--' . $boundary . "\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $htmlBody . "\r\n\r\n";
    $body .= '--' . $boundary . '--';

    return [
        'headers'         => $headers,
        'body'            => $body,
        'subject'         => encodeMailSubject($subject),
        'envelope_from'   => $mail['from_email'],
        'recipient_email' => $recipientEmail,
        'to_header'       => $toHeader,
    ];
}

function buildPlainTextCustomerConfirmation(array $booking, string $orderId, string $subject): string
{
    $locationParts = array_filter([
        $booking['address'],
        $booking['city'],
        $booking['postcode'],
    ]);

    $lines = [
        $subject,
        str_repeat('-', min(strlen($subject), 60)),
        '',
        'Hi ' . $booking['name'] . ',',
        '',
        'Thank you for booking with The Laundry Man. Your collection request is confirmed.',
        '',
        'Reference Number: ' . $orderId,
        'Pickup date: ' . formatPickupDate($booking['date']),
        'Pickup time: ' . $booking['collectionTime'],
        'Service: ' . buildServiceDetails($booking),
        'Location: ' . implode(', ', $locationParts),
        'Total amount: ' . resolveTotalAmount($booking),
    ];

    if ($booking['volume'] !== '') {
        $lines[] = 'Quantity: ' . $booking['volume'];
    }

    $lines[] = '';
    $lines[] = 'Our team will contact you before your collection window.';
    $lines[] = 'Questions? Reply to this email or contact info@thelaundryman.co.uk';

    return implode("\r\n", $lines);
}

function smtpRead($socket): string
{
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    return $response;
}

function smtpExpect($socket, array $validCodes): void
{
    $response = smtpRead($socket);
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $validCodes, true)) {
        throw new RuntimeException('SMTP error: ' . trim($response));
    }
}

function smtpCommand($socket, string $command, array $validCodes): void
{
    fwrite($socket, $command . "\r\n");
    smtpExpect($socket, $validCodes);
}

function smtpEnableTls($socket): void
{
    $methods = STREAM_CRYPTO_METHOD_TLS_CLIENT;

    if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
        $methods |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
    }

    if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
        $methods |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
    }

    if (!stream_socket_enable_crypto($socket, true, $methods)) {
        throw new RuntimeException('SMTP STARTTLS negotiation failed.');
    }
}

function smtpIsRateLimitError(Throwable $exception): bool
{
    $message = $exception->getMessage();

    return str_contains($message, '550') && str_contains($message, 'Too many emails');
}

/**
 * Resets the SMTP session between messages (equivalent to PHPMailer clearAddresses/clearAttachments).
 */
function smtpResetTransaction($socket): void
{
    smtpCommand($socket, 'RSET', [250]);
}

function smtpWriteMessage($socket, array $mail, array $mime): void
{
    smtpCommand($socket, 'MAIL FROM:<' . $mail['from_email'] . '>', [250]);
    smtpCommand($socket, 'RCPT TO:<' . $mime['recipient_email'] . '>', [250]);
    smtpCommand($socket, 'DATA', [354]);

    $toHeader = $mime['to_header'] ?? $mime['recipient_email'];

    $message = 'From: ' . formatEmailHeaderAddress($mail['from_email'], $mail['from_name']) . "\r\n";
    $message .= 'To: ' . $toHeader . "\r\n";
    $message .= 'Subject: ' . $mime['subject'] . "\r\n";
    $message .= implode("\r\n", array_filter(
        $mime['headers'],
        static fn (string $header): bool => !preg_match('/^(From|To):/i', $header)
    )) . "\r\n\r\n";
    $message .= preg_replace('/^\./m', '..', $mime['body']);

    fwrite($socket, $message . "\r\n.\r\n");
    smtpExpect($socket, [250]);
}

function sendViaSmtp(array $config, array $mime): void
{
    sendSequentialSmtpMessages($config, [$mime]);
}

/**
 * Sends multiple MIME messages on one SMTP connection, resetting transaction state
 * between each send (RSET — same effect as $mail->clearAddresses() between sends).
 */
function sendSequentialSmtpMessages(array $config, array $mimeMessages): void
{
    if ($mimeMessages === []) {
        return;
    }

    $mail = $config['mail'];
    $smtp = $config['smtp'];
    $ehloHost = 'localhost';

    $socket = @stream_socket_client(
        sprintf('tcp://%s:%d', $smtp['host'], $smtp['port']),
        $errno,
        $errstr,
        30
    );

    if ($socket === false) {
        throw new RuntimeException("SMTP connection failed: {$errstr} ({$errno})");
    }

    stream_set_timeout($socket, 30);

    try {
        smtpExpect($socket, [220]);
        smtpCommand($socket, 'EHLO ' . $ehloHost, [250]);
        smtpCommand($socket, 'STARTTLS', [220]);
        smtpEnableTls($socket);
        smtpCommand($socket, 'EHLO ' . $ehloHost, [250]);
        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($smtp['username']), [334]);
        smtpCommand($socket, base64_encode($smtp['password']), [235]);

        $messageCount = count($mimeMessages);

        foreach ($mimeMessages as $index => $mime) {
            $attempt = 0;
            $maxAttempts = 3;

            while (true) {
                try {
                    smtpWriteMessage($socket, $mail, $mime);
                    break;
                } catch (RuntimeException $exception) {
                    if (!smtpIsRateLimitError($exception) || $attempt >= $maxAttempts - 1) {
                        throw $exception;
                    }

                    $attempt++;
                    sleep(2 * $attempt);
                    smtpResetTransaction($socket);
                }
            }

            if ($index < $messageCount - 1) {
                smtpResetTransaction($socket);
                usleep(500000);
            }
        }

        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function sendViaSmtpBatch(array $config, array $mimeMessages): void
{
    sendSequentialSmtpMessages($config, $mimeMessages);
}

function dispatchOutboundEmail(array $config, array $mime): void
{
    sendViaSmtp($config, $mime);
}

function buildAdminNotificationMime(array $config, array $booking, string $htmlBody): array
{
    $adminEmail = $config['mail']['recipient'];
    $subject = $config['mail']['subject_prefix'] . ' — ' . $booking['name'];
    $plainBody = buildPlainTextBookingSummary($booking, $subject);

    return buildMimeMessage(
        $config,
        $adminEmail,
        $subject,
        $htmlBody,
        $plainBody,
        ['email' => $booking['email'], 'name' => $booking['name']]
    );
}

function buildCustomerConfirmationMime(
    array $config,
    array $booking,
    string $htmlBody,
    string $orderId,
    string $customerEmail
): array {
    $customerEmail = trim($customerEmail);
    if ($customerEmail === '' || !filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('Customer email is required for booking confirmation.');
    }

    $subject = $config['mail']['customer_subject_prefix'] . ' — ' . $orderId;
    $plainBody = buildPlainTextCustomerConfirmation($booking, $orderId, $subject);
    $replyToEmail = $config['mail']['branded_from_email'] ?? $config['mail']['from_email'];

    return buildMimeMessage(
        $config,
        $customerEmail,
        $subject,
        $htmlBody,
        $plainBody,
        ['email' => $replyToEmail, 'name' => $config['mail']['from_name']],
        $booking['name']
    );
}

function dispatchAdminNotificationEmail(array $config, array $booking, string $htmlBody): void
{
    dispatchOutboundEmail($config, buildAdminNotificationMime($config, $booking, $htmlBody));
}

function dispatchCustomerConfirmationEmail(
    array $config,
    array $booking,
    string $htmlBody,
    string $orderId,
    string $customerEmail
): void {
    dispatchOutboundEmail(
        $config,
        buildCustomerConfirmationMime($config, $booking, $htmlBody, $orderId, $customerEmail)
    );
}

/**
 * Sends booking emails sequentially on one SMTP session with RSET between each message.
 *
 * @return array{
 *   admin_to: string,
 *   customer_to: string,
 *   customer_email_source: string,
 *   customer_email_fallback: bool,
 *   emails_sent: list<string>
 * }
 */
function dispatchBookingEmails(
    array $config,
    array $booking,
    string $adminHtmlBody,
    string $customerHtmlBody,
    string $orderId,
    string $customerEmail,
    string $customerEmailSource = 'booking.email',
    bool $customerEmailFallback = false
): array {
    $adminMime = buildAdminNotificationMime($config, $booking, $adminHtmlBody);
    $customerMime = buildCustomerConfirmationMime($config, $booking, $customerHtmlBody, $orderId, $customerEmail);

    error_log(sprintf(
        '[send-email] Sending admin notification to %s, then customer confirmation to %s (source: %s%s)',
        $adminMime['recipient_email'],
        $customerMime['recipient_email'],
        $customerEmailSource,
        $customerEmailFallback ? ', fallback' : ''
    ));

    try {
        sendSequentialSmtpMessages($config, [$adminMime, $customerMime]);
        error_log('[send-email] Both emails sent (admin + customer).');
    } catch (Throwable $exception) {
        error_log('[send-email] Dual send failed after admin may have been delivered: ' . $exception->getMessage());
        throw new RuntimeException(
            'Admin notification may have been sent, but customer confirmation failed: ' . $exception->getMessage(),
            0,
            $exception
        );
    }

    return [
        'admin_to'                => $adminMime['recipient_email'],
        'customer_to'             => $customerMime['recipient_email'],
        'customer_email_source'   => $customerEmailSource,
        'customer_email_fallback' => $customerEmailFallback,
        'emails_sent'             => ['admin', 'customer'],
    ];
}

// =============================================================================
// Request handling
// =============================================================================
function isDirectScriptExecution(string $scriptName): bool
{
    return PHP_SAPI !== 'cli'
        && isset($_SERVER['SCRIPT_FILENAME'])
        && basename($_SERVER['SCRIPT_FILENAME']) === $scriptName;
}

if (isDirectScriptExecution('send-email.php')) {
    sendCorsHeaders();

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        sendJsonResponse(405, false, 'Method not allowed.');
    }

    try {
        $config = loadApplicationConfig();
        $rawPayload = parseBookingRequestPayload();

        $booking = validateBookingPayload(normalizeBookingPayload($rawPayload));
        $orderId = $booking['referenceNumber'];

        $customerEmailResolution = resolveCustomerConfirmationEmail($rawPayload, $booking);
        $customerEmail = $customerEmailResolution['email'];

        $adminHtmlBody = renderEmailTemplate(
            $config['templates']['appointment'],
            mapBookingToTemplateData($booking),
            OPTIONAL_TEMPLATE_FIELDS
        );

        $customerHtmlBody = renderEmailTemplate(
            $config['templates']['customer_confirmation'],
            mapBookingToCustomerConfirmationData($booking, $orderId),
            CUSTOMER_OPTIONAL_TEMPLATE_FIELDS
        );

        $recipients = dispatchBookingEmails(
            $config,
            $booking,
            $adminHtmlBody,
            $customerHtmlBody,
            $orderId,
            $customerEmail,
            $customerEmailResolution['source'],
            $customerEmailResolution['usedFallback']
        );

        $meta = [
            'referenceNumber'       => $orderId,
            'adminEmail'            => $recipients['admin_to'],
            'customerEmail'         => $recipients['customer_to'],
            'customerEmailSource'   => $recipients['customer_email_source'],
            'customerEmailFallback' => $recipients['customer_email_fallback'],
            'emailsSent'            => $recipients['emails_sent'],
        ];
        if (isDevelopmentEnvironment($config)) {
            $meta['recipients'] = $recipients;
        }

        sendJsonResponse(200, true, 'Booking request sent successfully.', $meta);
    } catch (ValidationException $exception) {
        sendJsonResponse(400, false, $exception->getMessage());
    } catch (Throwable $exception) {
        logSecureError('Failed to send booking email', $exception);
        $message = 'Unable to send email at this time. Please try again or call us directly.';
        if (strtolower(envValue('APP_ENV', 'production')) === 'development') {
            $message = 'Dev mail error: ' . $exception->getMessage();
        }
        sendJsonResponse(500, false, $message);
    }
}
