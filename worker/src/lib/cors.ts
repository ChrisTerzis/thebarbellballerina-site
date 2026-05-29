import type { Env } from '../types';

function allowedOrigins(env: Env): string[] {
  const raw = env.CORS_ALLOWED_ORIGINS ?? '';
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function corsPreflightResponse(request: Request, env: Env): Response | null {
  if (request.method !== 'OPTIONS') {
    return null;
  }

  const origin = request.headers.get('Origin');
  const allowed = allowedOrigins(env);
  if (!origin || !allowed.includes(origin)) {
    return new Response(null, { status: 204 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    },
  });
}

export function withCors(request: Request, response: Response, env: Env): Response {
  const origin = request.headers.get('Origin');
  const allowed = allowedOrigins(env);
  if (!origin || !allowed.includes(origin)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Credentials', 'true');
  headers.set('Vary', 'Origin');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
