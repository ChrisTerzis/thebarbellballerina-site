<?php

declare(strict_types=1);

/**
 * Early access → Klaviyo: list subscribe + custom metric for welcome Flow.
 *
 * 1. Upserts profile (email + first_name) via profile-import.
 * 2. Subscribes the profile to KLAVIYO_EARLY_ACCESS_LIST_ID with email marketing consent.
 * 3. Optionally records metric "Early Access Signup" for a welcome Flow (new signups only).
 *
 * Build the welcome in Klaviyo: Flows → trigger → "When someone performs a custom activity"
 * → metric name **Early Access Signup** → send email.
 * Avoid a second welcome on "Subscribed to list" or you may get duplicate emails.
 *
 * Private API key must include scopes for the subscription job and **events:write**.
 *
 * Skips silently when KLAVIYO_PRIVATE_API_KEY or KLAVIYO_EARLY_ACCESS_LIST_ID is unset.
 * Logs HTTP failures; never throws — signup UX must not depend on Klaviyo.
 *
 * @see https://developers.klaviyo.com/en/docs/collect_email_and_sms_consent_via_api
 * @see https://developers.klaviyo.com/en/reference/create_event
 */

/** Metric name shown in Klaviyo (Flows → metric trigger). Must match Flow config. */
const KLAVIYO_EARLY_ACCESS_METRIC_NAME = 'Early Access Signup';

/**
 * @return array{api_key: string, list_id: string, revision: string}|null
 */
function klaviyo_early_access_config(): ?array
{
    $apiKey = getenv('KLAVIYO_PRIVATE_API_KEY');
    $listId = getenv('KLAVIYO_EARLY_ACCESS_LIST_ID');
    if (! is_string($apiKey) || trim($apiKey) === '' || ! is_string($listId) || trim($listId) === '') {
        return null;
    }

    $revisionRaw = getenv('KLAVIYO_API_REVISION');
    $revision = is_string($revisionRaw) && preg_match('/^\d{4}-\d{2}-\d{2}$/', trim($revisionRaw))
        ? trim($revisionRaw)
        : '2025-04-15';

    return [
        'api_key' => trim($apiKey),
        'list_id' => trim($listId),
        'revision' => $revision,
    ];
}

/**
 * POST JSON to Klaviyo. Returns HTTP status code (0 if transport failed).
 *
 * @return array{code: int, body: string}
 */
function klaviyo_post_json(
    string $url,
    string $apiKey,
    string $revision,
    string $jsonBody,
    string $contentType = 'application/json',
): array {
    $headers = [
        'Authorization: Klaviyo-API-Key ' . $apiKey,
        'Content-Type: ' . $contentType,
        'Accept: application/json',
        'revision: ' . $revision,
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        if ($ch === false) {
            error_log('Klaviyo: curl_init failed');
            return ['code' => 0, 'body' => ''];
        }
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => $jsonBody,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
        ]);
        $resp = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        return ['code' => $code, 'body' => is_string($resp) ? $resp : ''];
    }

    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $jsonBody,
            'timeout' => 15,
        ],
    ]);
    $resp = @file_get_contents($url, false, $ctx);
    $code = 0;
    if (isset($http_response_header[0]) && preg_match('/\b(\d{3})\b/', $http_response_header[0], $m)) {
        $code = (int) $m[1];
    }

    return ['code' => $code, 'body' => $resp === false ? '' : (string) $resp];
}

function klaviyo_upsert_profile(string $apiKey, string $revision, string $email, string $firstName): bool
{
    $payload = [
        'data' => [
            'type' => 'profile',
            'attributes' => [
                'email' => $email,
                'first_name' => $firstName,
            ],
        ],
    ];

    try {
        $body = json_encode($payload, JSON_THROW_ON_ERROR);
    } catch (Throwable $e) {
        error_log('Klaviyo profile-import: JSON encode failed: ' . $e->getMessage());
        return false;
    }

    $result = klaviyo_post_json(
        'https://a.klaviyo.com/api/profile-import/',
        $apiKey,
        $revision,
        $body,
        'application/vnd.api+json',
    );

    if ($result['code'] < 200 || $result['code'] >= 300) {
        error_log(
            'Klaviyo profile-import HTTP ' . $result['code'] . ' body=' . substr($result['body'], 0, 500),
        );
        return false;
    }

    return true;
}

function klaviyo_track_early_access_signup_event(string $apiKey, string $revision, string $email, string $firstName): void
{
    $payload = [
        'data' => [
            'type' => 'event',
            'attributes' => [
                'properties' => [
                    'source' => 'early_access_waitlist',
                ],
                'metric' => [
                    'data' => [
                        'type' => 'metric',
                        'attributes' => [
                            'name' => KLAVIYO_EARLY_ACCESS_METRIC_NAME,
                        ],
                    ],
                ],
                'profile' => [
                    'data' => [
                        'type' => 'profile',
                        'attributes' => [
                            'email' => $email,
                            'first_name' => $firstName,
                        ],
                    ],
                ],
            ],
        ],
    ];

    try {
        $body = json_encode($payload, JSON_THROW_ON_ERROR);
    } catch (Throwable $e) {
        error_log('Klaviyo event: JSON encode failed: ' . $e->getMessage());
        return;
    }

    $result = klaviyo_post_json(
        'https://a.klaviyo.com/api/events/',
        $apiKey,
        $revision,
        $body,
        'application/vnd.api+json',
    );
    // Create Event typically returns 202 Accepted
    if ($result['code'] < 200 || $result['code'] >= 300) {
        error_log(
            'Klaviyo Create Event HTTP ' . $result['code'] . ' body=' . substr($result['body'], 0, 500),
        );
    }
}

function klaviyo_subscribe_early_access_profile(string $email, string $firstName, bool $trackSignupEvent = true): void
{
    $cfg = klaviyo_early_access_config();
    if ($cfg === null) {
        return;
    }

    klaviyo_upsert_profile($cfg['api_key'], $cfg['revision'], $email, $firstName);

    $payload = [
        'data' => [
            'type' => 'profile-subscription-bulk-create-job',
            'attributes' => [
                'custom_source' => 'early_access_waitlist',
                'profiles' => [
                    'data' => [
                        [
                            'type' => 'profile',
                            'attributes' => [
                                'email' => $email,
                                'subscriptions' => [
                                    'email' => [
                                        'marketing' => [
                                            'consent' => 'SUBSCRIBED',
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            'relationships' => [
                'list' => [
                    'data' => [
                        'type' => 'list',
                        'id' => $cfg['list_id'],
                    ],
                ],
            ],
        ],
    ];

    try {
        $body = json_encode($payload, JSON_THROW_ON_ERROR);
    } catch (Throwable $e) {
        error_log('Klaviyo: JSON encode failed: ' . $e->getMessage());
        return;
    }

    $result = klaviyo_post_json(
        'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
        $cfg['api_key'],
        $cfg['revision'],
        $body,
        'application/vnd.api+json',
    );

    if ($result['code'] < 200 || $result['code'] >= 300) {
        error_log(
            'Klaviyo profile-subscription-bulk-create-jobs HTTP ' . $result['code'] . ' body=' . substr($result['body'], 0, 500),
        );
        return;
    }

    if ($trackSignupEvent) {
        klaviyo_track_early_access_signup_event($cfg['api_key'], $cfg['revision'], $email, $firstName);
    }
}
