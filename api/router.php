<?php

declare(strict_types=1);

require_once __DIR__ . DIRECTORY_SEPARATOR . 'bootstrap.php';

$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
if (! is_string($uri)) {
    $uri = '/';
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

switch (true) {
    case $uri === '/api/auth/login' && $method === 'POST':
        initSession();
        require __DIR__ . DIRECTORY_SEPARATOR . 'handlers' . DIRECTORY_SEPARATOR . 'login.php';
        break;

    case $uri === '/api/auth/logout' && $method === 'POST':
        initSession();
        require __DIR__ . DIRECTORY_SEPARATOR . 'handlers' . DIRECTORY_SEPARATOR . 'logout.php';
        break;

    case $uri === '/api/auth/me' && $method === 'GET':
        initSession();
        require __DIR__ . DIRECTORY_SEPARATOR . 'handlers' . DIRECTORY_SEPARATOR . 'me.php';
        break;

    case $uri === '/api/early-access' && $method === 'POST':
        require __DIR__ . DIRECTORY_SEPARATOR . 'handlers' . DIRECTORY_SEPARATOR . 'early-access.php';
        break;

    case $uri === '/api/admin/early-access' && $method === 'GET':
        initSession();
        require __DIR__ . DIRECTORY_SEPARATOR . 'handlers' . DIRECTORY_SEPARATOR . 'admin-early-access.php';
        break;

    default:
        jsonResponse(['message' => 'Not found'], 404);
}
