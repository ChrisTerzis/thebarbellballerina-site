import type { Env } from '../types';
import { listEarlyAccessSignups } from '../lib/db';
import { jsonResponse } from '../lib/response';
import { requireSession } from './auth';

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
