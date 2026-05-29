<?php

declare(strict_types=1);

if (! isset($_SESSION['admin_id'], $_SESSION['admin_email'])) {
    jsonResponse(['message' => 'Unauthorized.'], 401);
    exit;
}

try {
    $stmt = pdo()->prepare(
        'SELECT id, email, first_name, created_at FROM early_access_signups ORDER BY created_at DESC, id DESC'
    );
    $stmt->execute();
    $signups = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse(['signups' => $signups]);
} catch (Throwable $e) {
    error_log((string) $e);
    jsonResponse(['message' => 'Server error.'], 500);
}
