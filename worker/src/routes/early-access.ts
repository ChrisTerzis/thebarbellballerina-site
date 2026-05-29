import type { Env } from '../types.ts';
import { upsertEarlyAccessSignup } from '../lib/db.ts';
import { klaviyoSubscribeEarlyAccessProfile } from '../lib/klaviyo.ts';
import { isValidEmail, jsonResponse, readJsonBody } from '../lib/response.ts';

export async function handleEarlyAccess(request: Request, env: Env): Promise<Response> {
  const body = await readJsonBody<{ email?: string; first_name?: string }>(request);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const firstName = typeof body.first_name === 'string' ? body.first_name.trim() : '';

  if (!firstName || firstName.length > 120) {
    return jsonResponse({ message: 'Please enter your first name.' }, 400);
  }

  if (!email || !isValidEmail(email)) {
    return jsonResponse({ message: 'Please enter a valid email address.' }, 400);
  }

  try {
    const { isNewSignup } = await upsertEarlyAccessSignup(env, email, firstName);
    try {
      await klaviyoSubscribeEarlyAccessProfile(env, email, firstName, isNewSignup);
    } catch (error) {
      console.error('Klaviyo early access:', error);
    }
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ message: 'Something went wrong. Please try again.' }, 500);
  }
}
