<?php

declare(strict_types=1);

function loadEnv(string $path): void
{
    if (! is_readable($path)) {
        return;
    }

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }
        if (! str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if ($key === '') {
            continue;
        }
        if (getenv($key) === false) {
            putenv("$key=$value");
            $_ENV[$key] = $value;
        }
    }
}

$projectRoot = dirname(__DIR__);
loadEnv($projectRoot . DIRECTORY_SEPARATOR . '.env');

function jsonResponse(array $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

/**
 * @return array<string, mixed>
 */
function readJsonBody(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);

    return is_array($decoded) ? $decoded : [];
}

/**
 * Fresh MySQL connection (no caching). Prefer `pdo()` from HTTP handlers.
 */
function pdoConnection(): PDO
{
    $host = getenv('MYSQL_HOST') ?: '127.0.0.1';
    $port = getenv('MYSQL_PORT') ?: '3306';
    $db = getenv('MYSQL_DATABASE') ?: 'tbb_website';
    $user = getenv('MYSQL_USER') ?: 'root';
    $pass = getenv('MYSQL_PASSWORD') !== false ? getenv('MYSQL_PASSWORD') : '';

    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $host, $port, $db);

    return new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}

function pdo(): PDO
{
    static $pdoSingleton = null;

    if ($pdoSingleton instanceof PDO) {
        return $pdoSingleton;
    }

    $pdoSingleton = pdoConnection();
    seedDefaultAdminIfEmpty($pdoSingleton);

    return $pdoSingleton;
}

/**
 * Used by `api/seed.php` (CLI upsert) and first-run `seedDefaultAdminIfEmpty`.
 *
 * @return array{email: string, password: string}
 */
function adminSeedCredentials(): array
{
    $emailRaw = getenv('ADMIN_EMAIL');
    $email = is_string($emailRaw) && trim($emailRaw) !== ''
        ? strtolower(trim($emailRaw))
        : 'barbell@ballerina.com';

    $passRaw = getenv('ADMIN_PASSWORD');
    $password = is_string($passRaw) && $passRaw !== ''
        ? $passRaw
        : 'Admin123';

    return ['email' => $email, 'password' => $password];
}

function seedDefaultAdminIfEmpty(PDO $pdo): void
{
    static $done = false;
    if ($done) {
        return;
    }
    $done = true;

    try {
        $count = (int) $pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn();
        if ($count > 0) {
            return;
        }

        ['email' => $email, 'password' => $password] = adminSeedCredentials();
        $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
        $stmt = $pdo->prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)');
        $stmt->execute([$email, $hash]);
    } catch (Throwable $e) {
        error_log('seedDefaultAdminIfEmpty: ' . $e->getMessage());
    }
}

function initSession(): void
{
    $secureRaw = getenv('SESSION_COOKIE_SECURE');
    $secure = $secureRaw === '1' || $secureRaw === 'true';

    session_set_cookie_params([
        'lifetime' => 60 * 60 * 24 * 7,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    session_start();
}
