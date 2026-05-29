import bcrypt from 'bcryptjs';
import type { AdminRow, Env } from '../types';

let schemaReady: Promise<void> | null = null;

async function runSchema(db: D1Database): Promise<void> {
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS early_access_signups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        first_name TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `),
  ]);
}

export async function ensureSchema(db: D1Database): Promise<void> {
  if (!schemaReady) {
    schemaReady = runSchema(db);
  }
  await schemaReady;
}

export async function ensureDefaultAdmin(env: Env): Promise<void> {
  await ensureSchema(env.DB);

  const count = await env.DB.prepare('SELECT COUNT(*) AS count FROM admins').first<{ count: number }>();
  if ((count?.count ?? 0) > 0) {
    return;
  }

  const email = (env.ADMIN_EMAIL || 'barbell@ballerina.com').trim().toLowerCase();
  const password = env.ADMIN_PASSWORD || 'Admin123';
  const passwordHash = bcrypt.hashSync(password, 12);

  await env.DB.prepare('INSERT INTO admins (email, password_hash) VALUES (?, ?)')
    .bind(email, passwordHash)
    .run();
}

export async function findAdminByEmail(env: Env, email: string): Promise<AdminRow | null> {
  await ensureDefaultAdmin(env);
  return env.DB.prepare('SELECT id, email, password_hash FROM admins WHERE email = ? LIMIT 1')
    .bind(email)
    .first<AdminRow>();
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export async function upsertEarlyAccessSignup(
  env: Env,
  email: string,
  firstName: string,
): Promise<{ isNewSignup: boolean }> {
  await ensureDefaultAdmin(env);

  const existing = await env.DB.prepare('SELECT id FROM early_access_signups WHERE email = ? LIMIT 1')
    .bind(email)
    .first<{ id: number }>();

  await env.DB.prepare(`
    INSERT INTO early_access_signups (email, first_name)
    VALUES (?, ?)
    ON CONFLICT(email) DO UPDATE SET first_name = excluded.first_name
  `)
    .bind(email, firstName)
    .run();

  return { isNewSignup: !existing };
}

export async function listEarlyAccessSignups(env: Env) {
  await ensureDefaultAdmin(env);
  const result = await env.DB.prepare(
    'SELECT id, email, first_name, created_at FROM early_access_signups ORDER BY created_at DESC, id DESC',
  ).all<{ id: number; email: string; first_name: string; created_at: string }>();

  return result.results ?? [];
}
