<?php

declare(strict_types=1);

require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'lib' . DIRECTORY_SEPARATOR . 'klaviyo.php';

$body = readJsonBody();
$email = isset($body['email']) && is_string($body['email']) ? strtolower(trim($body['email'])) : '';
$firstName = isset($body['first_name']) && is_string($body['first_name']) ? trim($body['first_name']) : '';

if ($firstName === '' || strlen($firstName) > 120) {
    jsonResponse(['message' => 'Please enter your first name.'], 400);
    exit;
}

if ($email === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(['message' => 'Please enter a valid email address.'], 400);
    exit;
}

$isNewSignup = true;

// DB insert is best-effort — if MySQL is unavailable we still subscribe via Klaviyo
try {
    $stmt = pdo()->prepare(
        'INSERT INTO early_access_signups (email, first_name) VALUES (?, ?) ON DUPLICATE KEY UPDATE first_name = VALUES(first_name)'
    );
    $stmt->execute([$email, $firstName]);
    // MySQL: 1 = new row inserted, 2 = existing row updated, 0 = no change
    $isNewSignup = $stmt->rowCount() === 1;
} catch (Throwable $e) {
    error_log('DB early access (non-fatal): ' . $e->getMessage());
}

try {
    klaviyo_subscribe_early_access_profile($email, $firstName, $isNewSignup);
} catch (Throwable $k) {
    error_log('Klaviyo early access: ' . $k->getMessage());
}

jsonResponse(['ok' => true]);
