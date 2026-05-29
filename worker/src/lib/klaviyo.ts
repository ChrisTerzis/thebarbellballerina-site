const KLAVIYO_EARLY_ACCESS_METRIC_NAME = 'Early Access Signup';

interface KlaviyoConfig {
  apiKey: string;
  listId: string;
  revision: string;
}

function klaviyoConfig(env: {
  KLAVIYO_PRIVATE_API_KEY?: string;
  KLAVIYO_EARLY_ACCESS_LIST_ID?: string;
  KLAVIYO_API_REVISION?: string;
}): KlaviyoConfig | null {
  const apiKey = env.KLAVIYO_PRIVATE_API_KEY?.trim();
  const listId = env.KLAVIYO_EARLY_ACCESS_LIST_ID?.trim();
  if (!apiKey || !listId) {
    return null;
  }

  const revisionRaw = env.KLAVIYO_API_REVISION?.trim();
  const revision =
    revisionRaw && /^\d{4}-\d{2}-\d{2}$/.test(revisionRaw) ? revisionRaw : '2025-04-15';

  return { apiKey, listId, revision };
}

async function klaviyoPostJson(
  url: string,
  apiKey: string,
  revision: string,
  jsonBody: string,
  contentType = 'application/vnd.api+json',
): Promise<number> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      'Content-Type': contentType,
      Accept: 'application/json',
      revision,
    },
    body: jsonBody,
  });
  return response.status;
}

async function klaviyoUpsertProfile(
  apiKey: string,
  revision: string,
  email: string,
  firstName: string,
): Promise<void> {
  const payload = {
    data: {
      type: 'profile',
      attributes: {
        email,
        first_name: firstName,
      },
    },
  };

  const status = await klaviyoPostJson(
    'https://a.klaviyo.com/api/profile-import/',
    apiKey,
    revision,
    JSON.stringify(payload),
  );

  if (status < 200 || status >= 300) {
    console.error(`Klaviyo profile-import HTTP ${status}`);
  }
}

async function klaviyoTrackEarlyAccessSignupEvent(
  apiKey: string,
  revision: string,
  email: string,
  firstName: string,
): Promise<void> {
  const payload = {
    data: {
      type: 'event',
      attributes: {
        properties: {
          source: 'early_access_waitlist',
        },
        metric: {
          data: {
            type: 'metric',
            attributes: {
              name: KLAVIYO_EARLY_ACCESS_METRIC_NAME,
            },
          },
        },
        profile: {
          data: {
            type: 'profile',
            attributes: {
              email,
              first_name: firstName,
            },
          },
        },
      },
    },
  };

  const status = await klaviyoPostJson(
    'https://a.klaviyo.com/api/events/',
    apiKey,
    revision,
    JSON.stringify(payload),
  );

  if (status < 200 || status >= 300) {
    console.error(`Klaviyo Create Event HTTP ${status}`);
  }
}

export async function klaviyoSubscribeEarlyAccessProfile(
  env: {
    KLAVIYO_PRIVATE_API_KEY?: string;
    KLAVIYO_EARLY_ACCESS_LIST_ID?: string;
    KLAVIYO_API_REVISION?: string;
  },
  email: string,
  firstName: string,
  trackSignupEvent = true,
): Promise<void> {
  const cfg = klaviyoConfig(env);
  if (!cfg) {
    return;
  }

  await klaviyoUpsertProfile(cfg.apiKey, cfg.revision, email, firstName);

  const payload = {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        custom_source: 'early_access_waitlist',
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email,
                subscriptions: {
                  email: {
                    marketing: {
                      consent: 'SUBSCRIBED',
                    },
                  },
                },
              },
            },
          ],
        },
      },
      relationships: {
        list: {
          data: {
            type: 'list',
            id: cfg.listId,
          },
        },
      },
    },
  };

  const status = await klaviyoPostJson(
    'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
    cfg.apiKey,
    cfg.revision,
    JSON.stringify(payload),
  );

  if (status < 200 || status >= 300) {
    console.error(`Klaviyo profile-subscription-bulk-create-jobs HTTP ${status}`);
    return;
  }

  if (trackSignupEvent) {
    await klaviyoTrackEarlyAccessSignupEvent(cfg.apiKey, cfg.revision, email, firstName);
  }
}
