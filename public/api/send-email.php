<?php
declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

// =============================================================================
// Response helpers
// =============================================================================
function sendJsonResponse(int $statusCode, bool $success, string $message): never
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE);
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
function loadApplicationConfig(): array
{
    loadEnv(__DIR__ . '/.env');

    $env = static fn (string $key, string $default = ''): string => trim($_ENV[$key] ?? $default);

    $developmentMode = filter_var($env('DEVELOPMENT_MODE', 'false'), FILTER_VALIDATE_BOOLEAN);
    $recipientEmail = $env('NOTIFICATION_RECEIVER_EMAIL');

    if ($recipientEmail === '' || !filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('NOTIFICATION_RECEIVER_EMAIL is missing or invalid.');
    }

    $mailtrapHost = $env('MAILTRAP_HOST', 'sandbox.smtp.mailtrap.io');
    $mailtrapPort = (int) $env('MAILTRAP_PORT', '2525');
    $mailtrapUsername = $env('MAILTRAP_USERNAME');
    $mailtrapPassword = $env('MAILTRAP_PASSWORD');

    if ($developmentMode && ($mailtrapUsername === '' || $mailtrapPassword === '')) {
        throw new RuntimeException(
            'MAILTRAP_USERNAME and MAILTRAP_PASSWORD are required when DEVELOPMENT_MODE=true.'
        );
    }

    if ($developmentMode && ($mailtrapHost === '' || $mailtrapPort <= 0)) {
        throw new RuntimeException(
            'MAILTRAP_HOST and MAILTRAP_PORT are required when DEVELOPMENT_MODE=true.'
        );
    }

    if ($developmentMode) {
        // Mailtrap sandbox accepts any address; use a neutral From (not the live domain).
        $fromEmail = $env('MAILTRAP_FROM_EMAIL', 'mailtrap@example.com');
        if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('MAILTRAP_FROM_EMAIL is missing or invalid.');
        }

        return [
            'system' => [
                'development_mode' => true,
            ],
            'mail' => [
                'recipient'      => $env('MAILTRAP_TO_EMAIL', $recipientEmail),
                'from_email'     => $fromEmail,
                'from_name'      => $env('MAIL_FROM_NAME', 'The Laundry Man Website (Dev)'),
                'from_domain'    => extractEmailDomain($fromEmail),
                'subject_prefix' => 'New Collection Booking',
            ],
            'mailtrap' => [
                'host'     => $mailtrapHost,
                'port'     => $mailtrapPort,
                'username' => $mailtrapUsername,
                'password' => $mailtrapPassword,
            ],
            'templates' => [
                'appointment' => __DIR__ . '/templates/appointment-template.html',
            ],
        ];
    }

    $fromEmail = $env('MAIL_FROM_EMAIL', $recipientEmail);
    if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('MAIL_FROM_EMAIL is missing or invalid.');
    }

    $fromDomain = extractEmailDomain($fromEmail);
    $recipientDomain = extractEmailDomain($recipientEmail);
    if (strcasecmp($fromDomain, $recipientDomain) !== 0) {
        throw new RuntimeException(
            'MAIL_FROM_EMAIL must use the same domain as NOTIFICATION_RECEIVER_EMAIL on shared hosting.'
        );
    }

    return [
        'system' => [
            'development_mode' => $developmentMode,
        ],
        'mail' => [
            'recipient'      => $recipientEmail,
            'from_email'     => $fromEmail,
            'from_name'      => $env('MAIL_FROM_NAME', 'The Laundry Man Website'),
            'from_domain'    => $fromDomain,
            'subject_prefix' => 'New Collection Booking',
        ],
        'mailtrap' => [
            'host'     => $mailtrapHost,
            'port'     => $mailtrapPort,
            'username' => $mailtrapUsername,
            'password' => $mailtrapPassword,
        ],
        'templates' => [
            'appointment' => __DIR__ . '/templates/appointment-template.html',
        ],
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

    if ($address === '') {
        $errors[] = 'address';
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
        'notes'
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

function parseJsonRequestBody(): array
{
    $rawInput = file_get_contents('php://input');

    if ($rawInput === false || trim($rawInput) === '') {
        throw new ValidationException('Request body is empty.');
    }

    $data = json_decode($rawInput, true);

    if (!is_array($data)) {
        throw new ValidationException('Invalid JSON payload.');
    }

    return $data;
}

/**
 * Accepts nested BookingPayload from the React form or legacy flat JSON keys.
 */
function normalizeBookingPayload(array $data): array
{
    if (isset($data['customer']) && is_array($data['customer'])) {
        return [
            'name'             => (string) ($data['customer']['fullName'] ?? ''),
            'email'            => (string) ($data['customer']['email'] ?? ''),
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
    'estimated_volume',
    'delivery_instructions',
    'special_notes',
];

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
        'customer_name'         => $booking['name'],
        'customer_email'        => $booking['email'],
        'phone_number'          => $booking['phone'],
        'service_location'      => implode(', ', $locationParts),
        'selected_service'      => $booking['service'],
        'appointment_date'      => $booking['date'],
        'collection_time'       => $booking['collectionTime'],
        'estimated_volume'      => $booking['volume'],
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
        'Customer: ' . $booking['name'],
        'Email: ' . $booking['email'],
        'Phone: ' . $booking['phone'],
        'Location: ' . implode(', ', $locationParts),
        'Service: ' . $booking['service'],
        'Collection date: ' . $booking['date'],
        'Collection time: ' . $booking['collectionTime'],
    ];

    if ($booking['volume'] !== '') {
        $lines[] = 'Estimated load: ' . $booking['volume'];
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
 * From uses the authorized domain mailbox; Reply-To carries the customer address.
 *
 * @return array{headers: string[], body: string, subject: string, envelope_from: string}
 */
function buildMimeMessage(array $config, array $booking, string $subject, string $htmlBody): array
{
    $mail = $config['mail'];
    $boundary = '=_TLM_' . bin2hex(random_bytes(16));
    $plainBody = buildPlainTextBookingSummary($booking, $subject);
    $messageId = sprintf(
        '%s.%s@%s',
        bin2hex(random_bytes(8)),
        (string) time(),
        $mail['from_domain']
    );

    $headers = [
        'MIME-Version: 1.0',
        'Date: ' . gmdate('D, d M Y H:i:s') . ' +0000',
        'Message-ID: <' . $messageId . '>',
        'From: ' . formatEmailHeaderAddress($mail['from_email'], $mail['from_name']),
        'Reply-To: ' . formatEmailHeaderAddress($booking['email'], $booking['name']),
        'To: ' . $mail['recipient'],
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: The Laundry Man Booking Form',
    ];

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
    ];
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

function sendViaMailtrapSmtp(array $config, array $booking, string $subject, string $htmlBody): void
{
    $mail = $config['mail'];
    $smtp = $config['mailtrap'];
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
        smtpCommand($socket, 'MAIL FROM:<' . $mail['from_email'] . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $mail['recipient'] . '>', [250]);
        smtpCommand($socket, 'DATA', [354]);

        $mime = buildMimeMessage($config, $booking, $subject, $htmlBody);
        $message = 'From: ' . formatEmailHeaderAddress($mail['from_email'], $mail['from_name']) . "\r\n";
        $message .= 'To: ' . $mail['recipient'] . "\r\n";
        $message .= 'Subject: ' . $mime['subject'] . "\r\n";
        $message .= implode("\r\n", array_filter(
            $mime['headers'],
            static fn (string $header): bool => !preg_match('/^(From|To):/i', $header)
        )) . "\r\n\r\n";
        $message .= preg_replace('/^\./m', '..', $mime['body']);

        fwrite($socket, $message . "\r\n.\r\n");
        smtpExpect($socket, [250]);
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function sendViaNativeMail(array $config, array $booking, string $subject, string $htmlBody): void
{
    $mime = buildMimeMessage($config, $booking, $subject, $htmlBody);
    $envelopeParam = '-f' . $mime['envelope_from'];

    $sent = mail(
        $config['mail']['recipient'],
        $mime['subject'],
        $mime['body'],
        implode("\r\n", $mime['headers']),
        $envelopeParam
    );

    if (!$sent) {
        throw new RuntimeException('Native mail() returned false.');
    }
}

function dispatchBookingEmail(array $config, array $booking, string $htmlBody): void
{
    $subject = $config['mail']['subject_prefix'] . ' — ' . $booking['name'];

    if ($config['system']['development_mode']) {
        sendViaMailtrapSmtp($config, $booking, $subject, $htmlBody);
        return;
    }

    sendViaNativeMail($config, $booking, $subject, $htmlBody);
}

// =============================================================================
// Request handling
// =============================================================================
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
    $booking = validateBookingPayload(normalizeBookingPayload(parseJsonRequestBody()));
    $htmlBody = renderEmailTemplate(
        $config['templates']['appointment'],
        mapBookingToTemplateData($booking),
        OPTIONAL_TEMPLATE_FIELDS
    );

    dispatchBookingEmail($config, $booking, $htmlBody);

    sendJsonResponse(200, true, 'Booking request sent successfully.');
} catch (ValidationException $exception) {
    sendJsonResponse(400, false, $exception->getMessage());
} catch (Throwable $exception) {
    logSecureError('Failed to send booking email', $exception);
    sendJsonResponse(500, false, 'Unable to send email at this time. Please try again or call us directly.');
}
