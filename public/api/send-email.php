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

    return [
        'system' => [
            'development_mode' => $developmentMode,
        ],
        'mail' => [
            'recipient'      => $recipientEmail,
            'from_email'     => 'noreply@thelaundryman.co.uk',
            'from_name'      => 'The Laundry Man Website',
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

function formatEmailHeaderAddress(string $email, string $displayName): string
{
    $safeName = str_replace(['"', "\r", "\n"], '', $displayName);

    return sprintf('%s <%s>', $safeName, $email);
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
function buildHtmlEmailHeaders(array $config, array $booking): array
{
    return [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . formatEmailHeaderAddress($config['mail']['from_email'], $config['mail']['from_name']),
        'Reply-To: ' . formatEmailHeaderAddress($booking['email'], $booking['name']),
        'X-Mailer: PHP/' . phpversion(),
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

function sendViaMailtrapSmtp(array $config, array $booking, string $subject, string $htmlBody): void
{
    $mail = $config['mail'];
    $smtp = $config['mailtrap'];

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
        smtpCommand($socket, 'EHLO localhost', [250]);
        smtpCommand($socket, 'STARTTLS', [220]);

        if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('SMTP STARTTLS negotiation failed.');
        }

        smtpCommand($socket, 'EHLO localhost', [250]);
        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($smtp['username']), [334]);
        smtpCommand($socket, base64_encode($smtp['password']), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $mail['from_email'] . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $mail['recipient'] . '>', [250]);
        smtpCommand($socket, 'DATA', [354]);

        $headers = buildHtmlEmailHeaders($config, $booking);
        $message = 'To: ' . $mail['recipient'] . "\r\n";
        $message .= 'Subject: ' . $subject . "\r\n";
        $message .= implode("\r\n", $headers) . "\r\n";
        $message .= "\r\n";
        $message .= preg_replace('/^\./m', '..', $htmlBody);

        fwrite($socket, $message . "\r\n.\r\n");
        smtpExpect($socket, [250]);
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function sendViaNativeMail(array $config, array $booking, string $subject, string $htmlBody): void
{
    $sent = mail(
        $config['mail']['recipient'],
        $subject,
        $htmlBody,
        implode("\r\n", buildHtmlEmailHeaders($config, $booking))
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
    $booking = validateBookingPayload(parseJsonRequestBody());
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
