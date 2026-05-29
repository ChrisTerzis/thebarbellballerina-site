const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

export function jsonResponse(data: unknown, status = 200, extraHeaders?: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

export async function readJsonBody<T extends Record<string, unknown>>(request: Request): Promise<T> {
  try {
    const parsed = (await request.json()) as T;
    return parsed ?? ({} as T);
  } catch {
    return {} as T;
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
