<?php

declare(strict_types=1);

$body = readJsonBody();
$email = isset($body['email']) && is_string($body['email']) ? strtolower(trim($body['email'])) : '';
$password = isset($body['password']) && is_string($body['password']) ? $body['password'] : '';

if ($email === '' || $password === '') {
    jsonResponse(['message' => 'Email and password are required.'], 400);
    exit;
}

try {
    $stmt = pdo()->prepare('SELECT id, email, password_hash FROM admins WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $admin = $stmt->fetch();

    if (! $admin || ! password_verify($password, $admin['password_hash'])) {
        jsonResponse(['message' => 'Invalid email or password.'], 401);
        exit;
    }

    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $admin['id'];
    $_SESSION['admin_email'] = (string) $admin['email'];

    jsonResponse([
        'admin' => [
            'id' => (int) $admin['id'],
            'email' => (string) $admin['email'],
        ],
    ]);
    exit;
} catch (Throwable $e) {
    error_log((string) $e);
    jsonResponse(['message' => 'Server error.'], 500);
    exit;
}
