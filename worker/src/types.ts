export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
  SESSION_COOKIE_SECURE?: string;
  KLAVIYO_PRIVATE_API_KEY?: string;
  KLAVIYO_EARLY_ACCESS_LIST_ID?: string;
  KLAVIYO_API_REVISION?: string;
}

export interface SessionPayload {
  adminId: number;
  adminEmail: string;
  exp: number;
}

export interface AdminRow {
  id: number;
  email: string;
  password_hash: string;
}

export interface SignupRow {
  id: number;
  email: string;
  first_name: string;
  created_at: string;
}
