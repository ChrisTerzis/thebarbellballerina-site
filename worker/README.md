# Cloudflare Worker API + Frontend

The Worker serves `/api/*` and (in production) the built React app from `../dist` on the **same origin**.

## Local development

1. Install dependencies:

   ```bash
   npm install
   cd worker && npm install && cd ..
   ```

2. Ensure `worker/.dev.vars` exists (copy from `.dev.vars.example` and fill in secrets).

3. Apply D1 schema and seed admin (first time only):

   ```bash
   npm run worker:db:migrate
   npm run worker:db:seed
   ```

4. In root `.env`, set:

   ```
   VITE_API_PROXY=worker
   ```

5. Start frontend + Worker together:

   ```bash
   npm run dev:worker
   ```

   - Frontend: http://localhost:8080 (Vite)
   - API: proxied to Worker at http://127.0.0.1:8787

   The frontend already calls relative paths like `/api/early-access` — Vite forwards those to the Worker.

## Production deploy

Build the SPA, then deploy Worker + static assets:

```bash
npm run deploy
```

This runs `vite build` then `wrangler deploy`. The Worker config uses:

- `[assets]` → `dist/` (SPA with client-side routing)
- `run_worker_first = ["/api/*"]` → API hits the Worker; everything else serves static files

Set production secrets once:

```bash
cd worker
npx wrangler secret put SESSION_SECRET
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put KLAVIYO_PRIVATE_API_KEY
npx wrangler secret put KLAVIYO_EARLY_ACCESS_LIST_ID
npm run db:migrate:remote
npm run db:seed:remote
```

## PHP API

The PHP API in `../api/` is unchanged. To use it locally instead, set `VITE_API_PROXY=php` (or remove it) and run `npm run server`.
