import type { Env } from '../types.ts';
import { findAdminByEmail, verifyPassword } from '../lib/db.ts';
import { jsonResponse, readJsonBody } from '../lib/response.ts';
import { clearSessionHeaders, createSessionToken, readSession, sessionHeaders } from '../lib/session.ts';

export async function handleLogin(request: Request, env: Env): Promise<Response> {
  const body = await readJsonBody<{ email?: string; password?: string }>(request);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return jsonResponse({ message: 'Email and password are required.' }, 400);
  }

  try {
    const admin = await findAdminByEmail(env, email);
    if (!admin || !verifyPassword(password, admin.password_hash)) {
      return jsonResponse({ message: 'Invalid email or password.' }, 401);
    }

    const token = await createSessionToken(
      { adminId: admin.id, adminEmail: admin.email },
      env,
    );

    return jsonResponse(
      { admin: { id: admin.id, email: admin.email } },
      200,
      sessionHeaders(token, env),
    );
  } catch (error) {
    console.error(error);
    return jsonResponse({ message: 'Server error.' }, 500);
  }
}

export async function handleLogout(_request: Request, env: Env): Promise<Response> {
  return jsonResponse({ ok: true }, 200, clearSessionHeaders(env));
}

export async function handleMe(request: Request, env: Env): Promise<Response> {
  const session = await readSession(request, env);
  if (!session) {
    return jsonResponse({ message: 'Unauthorized.' }, 401);
  }

  return jsonResponse({
    admin: {
      id: session.adminId,
      email: session.adminEmail,
    },
  });
}

export async function requireSession(request: Request, env: Env) {
  const session = await readSession(request, env);
  if (!session) {
    return null;
  }
  return session;
}
