import type { Env, SessionPayload } from '../types';

const SESSION_COOKIE = 'tbb_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  const binary = atob(padded + '='.repeat(padLen));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function hmacSign(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return base64UrlEncode(new Uint8Array(signature));
}

async function hmacVerify(message: string, signature: string, secret: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );
  return crypto.subtle.verify('HMAC', key, base64UrlDecode(signature), new TextEncoder().encode(message));
}

function cookieSecure(env: Env): boolean {
  return env.SESSION_COOKIE_SECURE === '1' || env.SESSION_COOKIE_SECURE === 'true';
}

function sessionCookieHeader(token: string, env: Env): string {
  const parts = [
    `${SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];
  if (cookieSecure(env)) {
    parts.push('Secure');
  }
  return parts.join('; ');
}

function clearSessionCookieHeader(env: Env): string {
  const parts = [`${SESSION_COOKIE}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];
  if (cookieSecure(env)) {
    parts.push('Secure');
  }
  return parts.join('; ');
}

export async function createSessionToken(payload: Omit<SessionPayload, 'exp'>, env: Env): Promise<string> {
  const body: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = base64UrlEncode(new TextEncoder().encode(JSON.stringify(body)));
  const signature = await hmacSign(encoded, env.SESSION_SECRET);
  return `${encoded}.${signature}`;
}

export async function readSession(request: Request, env: Env): Promise<SessionPayload | null> {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  const token = match?.[1];
  if (!token) {
    return null;
  }

  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) {
    return null;
  }

  const valid = await hmacVerify(encoded, signature, env.SESSION_SECRET);
  if (!valid) {
    return null;
  }

  try {
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(encoded))) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function sessionHeaders(token: string, env: Env): HeadersInit {
  return { 'Set-Cookie': sessionCookieHeader(token, env) };
}

export function clearSessionHeaders(env: Env): HeadersInit {
  return { 'Set-Cookie': clearSessionCookieHeader(env) };
}
