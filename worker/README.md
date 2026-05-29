# Cloudflare Worker API

## Why login returned 405

If the static site is on **Hostinger/Apache** and the Worker is deployed separately, `POST https://thebarbellballerina.com/api/...` hits the **static host**, not the Worker → **405 Method Not Allowed**.

The frontend must call the Worker URL directly (cross-origin), with CORS enabled on the Worker.

## Split hosting (current setup)

**Static site:** thebarbellballerina.com (upload `dist/` to Hostinger)  
**API:** Cloudflare Worker (`wrangler.api.toml`)

### 1. Deploy the API Worker

```bash
cd worker
npm install
npx wrangler deploy -c wrangler.api.toml
```

Set production secrets (once):

```bash
npx wrangler secret put SESSION_SECRET -c wrangler.api.toml
npx wrangler secret put ADMIN_PASSWORD -c wrangler.api.toml
npx wrangler secret put KLAVIYO_PRIVATE_API_KEY -c wrangler.api.toml
npx wrangler secret put KLAVIYO_EARLY_ACCESS_LIST_ID -c wrangler.api.toml
npm run db:migrate:remote
npm run db:seed:remote
```

Note the deploy URL (e.g. `https://tbb-api.<your-subdomain>.workers.dev`).

### 2. Build the frontend with the Worker URL

Edit `.env.production`:

```
VITE_API_BASE_URL=https://tbb-api.YOUR-SUBDOMAIN.workers.dev
```

Then from project root:

```bash
npm run deploy:hosting
```

Upload the new `dist/` folder to Hostinger (replace existing files).

### 3. Local development

```bash
# worker/.dev.vars — SESSION_SAME_SITE=Lax
npm run dev:worker
```

Vite proxies `/api` to the Worker; leave `VITE_API_BASE_URL` unset in `.env`.

## Unified Cloudflare deploy (optional)

If the **custom domain** points entirely to Cloudflare Worker (not Hostinger):

```bash
npm run deploy
```

Uses `wrangler.toml` (Worker + `dist/` assets, same origin). No `VITE_API_BASE_URL` needed.

## PHP API

The PHP API in `../api/` is unchanged.
