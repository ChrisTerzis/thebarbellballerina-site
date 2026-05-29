import type { Env } from '../types.ts';
import { listEarlyAccessSignups } from '../lib/db.ts';
import { jsonResponse } from '../lib/response.ts';
import { requireSession } from './auth.ts';

export async function handleAdminEarlyAccess(request: Request, env: Env): Promise<Response> {
  const session = await requireSession(request, env);
  if (!session) {
    return jsonResponse({ message: 'Unauthorized.' }, 401);
  }

  try {
    const signups = await listEarlyAccessSignups(env);
    return jsonResponse({ signups });
  } catch (error) {
    console.error(error);
    return jsonResponse({ message: 'Server error.' }, 500);
  }
}
