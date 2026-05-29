import type { Env } from './types';
import { handleAdminEarlyAccess } from './routes/admin';
import { handleLogin, handleLogout, handleMe } from './routes/auth';
import { handleEarlyAccess } from './routes/early-access';
import { jsonResponse } from './lib/response';

function getPath(request: Request): string {
  return new URL(request.url).pathname;
}

async function handleApi(request: Request, env: Env): Promise<Response | null> {
  if (!env.SESSION_SECRET) {
    return jsonResponse({ message: 'Server misconfigured: SESSION_SECRET is required.' }, 500);
  }

  const path = getPath(request);
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

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
      if (apiResponse) {
        return apiResponse;
      }
    }

    return env.ASSETS.fetch(request);
  },
};
