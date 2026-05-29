<?php

declare(strict_types=1);

if (! isset($_SESSION['admin_id'], $_SESSION['admin_email'])) {
    jsonResponse(['message' => 'Unauthorized.'], 401);
    exit;
}

jsonResponse([
    'admin' => [
        'id' => (int) $_SESSION['admin_id'],
        'email' => (string) $_SESSION['admin_email'],
    ],
]);
