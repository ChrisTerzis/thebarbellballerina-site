import type { Env } from './types';
import { handleAdminEarlyAccess } from './routes/admin';
import { handleLogin, handleLogout, handleMe } from './routes/auth';
import { handleEarlyAccess } from './routes/early-access';
import { corsPreflightResponse, withCors } from './lib/cors';
import { jsonResponse } from './lib/response';

function getPath(request: Request): string {
  return new URL(request.url).pathname;
}

async function handleApi(request: Request, env: Env): Promise<Response> {
  const preflight = corsPreflightResponse(request, env);
  if (preflight) {
    return preflight;
  }

  if (!env.SESSION_SECRET) {
    return jsonResponse({ message: 'Server misconfigured: SESSION_SECRET is required.' }, 500);
  }

  const path = getPath(request);
  const method = request.method;

  try {
    if (path === '/api/auth/login' && method === 'POST') {
      return handleLogin(request, env);
    }

    if (path === '/api/auth/logout' && method === 'POST') {
      return handleLogout(request, env);
    }

    if (path === '/api/auth/me' && method === 'GET') {
      return handleMe(request, env);
    }

    if (path === '/api/early-access' && method === 'POST') {
      return handleEarlyAccess(request, env);
    }

    if (path === '/api/admin/early-access' && method === 'GET') {
      return handleAdminEarlyAccess(request, env);
    }

    return jsonResponse({ message: 'Not found' }, 404);
  } catch (error) {
    console.error(error);
    return jsonResponse({ message: 'Server error.' }, 500);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const path = getPath(request);

    if (path.startsWith('/api/')) {
      const apiResponse = await handleApi(request, env);
      return withCors(request, apiResponse, env);
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return withCors(request, jsonResponse({ message: 'Not found' }, 404), env);
  },
};
