<?php
declare(strict_types=1);

require_once __DIR__ . '/send-email.php';

/**
 * @return array{name: string, email: string, phone: string, subject: string, message: string}
 */
function validateContactPayload(array $data): array
{
    $errors = [];

    $name = sanitizePlainText((string) ($data['name'] ?? ''), 120);
    $email = trim((string) ($data['email'] ?? ''));
    $phone = sanitizePlainText((string) ($data['phone'] ?? ''), 40);
    $subject = sanitizePlainText((string) ($data['subject'] ?? ''), 150);
    $message = sanitizePlainText((string) ($data['message'] ?? ''), 5000);

    if ($name === '') {
        $errors[] = 'name';
    }

    if ($email === '') {
        $errors[] = 'email';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'email (invalid format)';
    }

    if ($phone !== '' && !preg_match('/^[+\d\s().-]{7,40}$/', $phone)) {
        $errors[] = 'phone (invalid format)';
    }

    if ($subject === '') {
        $errors[] = 'subject';
    }

    if ($message === '') {
        $errors[] = 'message';
    }

    if ($errors !== []) {
        throw new ValidationException('Invalid or missing fields: ' . implode(', ', $errors) . '.');
    }

    return compact('name', 'email', 'phone', 'subject', 'message');
}

function buildPlainTextContactSummary(array $contact, string $emailSubject): string
{
    $lines = [
        $emailSubject,
        str_repeat('-', min(strlen($emailSubject), 60)),
        '',
        'Name: ' . $contact['name'],
        'Email: ' . $contact['email'],
    ];

    if ($contact['phone'] !== '') {
        $lines[] = 'Phone: ' . $contact['phone'];
    }

    $lines[] = 'Subject: ' . $contact['subject'];
    $lines[] = '';
    $lines[] = 'Message:';
    $lines[] = $contact['message'];
    $lines[] = '';
    $lines[] = 'Reply to this email to respond to the customer directly.';

    return implode("\r\n", $lines);
}

function mapContactToTemplateData(array $contact): array
{
    return [
        'customer_name'  => $contact['name'],
        'customer_email' => $contact['email'],
        'phone_number'   => $contact['phone'],
        'subject_line'   => $contact['subject'],
        'message_body'   => $contact['message'],
    ];
}

function dispatchContactEmail(array $config, array $contact): array
{
    $adminEmail = $config['mail']['recipient'];
    $emailSubject = $config['mail']['contact_subject_prefix'] . ' — ' . $contact['subject'];

    $htmlBody = renderEmailTemplate(
        $config['templates']['contact'],
        mapContactToTemplateData($contact),
        ['phone_number']
    );

    $plainBody = buildPlainTextContactSummary($contact, $emailSubject);

    $mime = buildMimeMessage(
        $config,
        $adminEmail,
        $emailSubject,
        $htmlBody,
        $plainBody,
        ['email' => $contact['email'], 'name' => $contact['name']]
    );

    dispatchOutboundEmail($config, $mime);

    return ['admin_to' => $mime['recipient_email']];
}

if (isDirectScriptExecution('send-contact.php')) {
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
        $rawPayload = parseJsonRequestBody();
        $contact = validateContactPayload($rawPayload);
        $recipients = dispatchContactEmail($config, $contact);

        $meta = isDevelopmentEnvironment($config)
            ? ['recipients' => $recipients]
            : [];

        sendJsonResponse(200, true, 'Your message has been sent successfully.', $meta);
    } catch (ValidationException $exception) {
        sendJsonResponse(400, false, $exception->getMessage());
    } catch (Throwable $exception) {
        logSecureError('Failed to send contact email', $exception);
        $message = 'Unable to send your message at this time. Please try again or call us directly.';
        if (strtolower(envValue('APP_ENV', 'production')) === 'development') {
            $message = 'Dev mail error: ' . $exception->getMessage();
        }
        sendJsonResponse(500, false, $message);
    }
}
