# Cloudflare Worker API

TypeScript API that mirrors the PHP backend in `../api/`. Both expose the same routes:

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| GET | `/api/auth/me` | Current admin session |
| POST | `/api/early-access` | Waitlist signup (+ Klaviyo) |
| GET | `/api/admin/early-access` | List signups (auth required) |

Storage uses **Cloudflare D1** (SQLite). Sessions use signed `tbb_session` cookies.

The PHP API is unchanged and still works for local/shared hosting.

## Local development

1. Install worker dependencies:

   ```bash
   cd worker
   npm install
   cp .dev.vars.example .dev.vars
   ```

2. Edit `worker/.dev.vars` with your secrets (match values from root `.env` where applicable).

3. Apply the D1 schema and seed admin:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. Start the worker:

   ```bash
   npm run dev
   ```

   Worker listens on **http://127.0.0.1:8787**.

5. From the project root, point Vite at the worker:

   ```bash
   # In root .env
   VITE_API_PROXY=worker
   ```

   Then run `npm run dev` (frontend) alongside `npm run worker:dev`.

   To use the PHP API instead, omit `VITE_API_PROXY` or set `VITE_API_PROXY=php` and run `npm run server`.

## Deploy to Cloudflare

1. Create a D1 database and update `database_id` in `wrangler.toml`:

   ```bash
   npx wrangler d1 create tbb-website
   ```

2. Apply schema and seed on production D1:

   ```bash
   npm run db:migrate:remote
   npm run db:seed:remote
   ```

3. Set secrets:

   ```bash
   npx wrangler secret put SESSION_SECRET
   npx wrangler secret put ADMIN_PASSWORD
   npx wrangler secret put KLAVIYO_PRIVATE_API_KEY
   npx wrangler secret put KLAVIYO_EARLY_ACCESS_LIST_ID
   ```

4. Deploy:

   ```bash
   npm run deploy
   ```

5. Route `/api/*` to this worker (Workers dashboard → Triggers, or Cloudflare Pages Functions / `_routes.json`).

   Set `SESSION_COOKIE_SECURE=true` in `wrangler.toml` `[vars]` when serving over HTTPS.

## Root scripts

From the project root:

- `npm run worker:dev` — local Worker API
- `npm run worker:deploy` — deploy Worker
- `npm run worker:db:migrate` — local D1 schema
- `npm run worker:db:seed` — upsert admin in local D1
