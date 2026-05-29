<?php

declare(strict_types=1);

require_once __DIR__ . DIRECTORY_SEPARATOR . 'bootstrap.php';

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "Run from CLI only.\n");
    exit(1);
}

try {
    ['email' => $email, 'password' => $password] = adminSeedCredentials();

    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    if ($hash === false) {
        fwrite(STDERR, "Could not hash password (password_hash failed).\n");
        exit(1);
    }

    $pdo = pdoConnection();

    $sql = <<<'SQL'
INSERT INTO admins (email, password_hash) VALUES (:email, :hash)
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)
SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email, 'hash' => $hash]);

    echo "Upserted admin: {$email}\n";
} catch (Throwable $e) {
    fwrite(STDERR, 'Seed failed: ' . $e->getMessage() . PHP_EOL);
    fwrite(STDERR, 'Ensure MySQL is running, database exists, and `database/schema.sql` has been applied.' . PHP_EOL);
    fwrite(STDERR, 'Admin email/password come from ADMIN_EMAIL / ADMIN_PASSWORD in `.env` (see `.env.example`).' . PHP_EOL);
    exit(1);
}
