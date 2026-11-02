# Ganvora 3D — React + Express + MongoDB

## Setup
1. Install MongoDB locally (or create a free MongoDB Atlas cluster).
2. `cp .env.example .env` and fill `MONGODB_USER`, `MONGODB_PASSWORD`, `MONGODB_HOST` (or a single `MONGODB_URI`).
3. `npm install`
4. `npm run dev` — starts the API (port 5000) and Vite (port 5173, proxies `/api`).

On first start the API auto-seeds the 4 original Field Notes (identical to the old Supabase seed).
`npm run seed` re-runs the seed safely (existing slugs are skipped).

## Production
`npm start` builds the frontend and serves it plus `/api/*` from one Node process.

## API
- `GET  /api/field-notes` – all notes, newest first
- `GET  /api/field-notes/:slug` – one note (404 if missing)
- `POST /api/contact` – contact form (validation, honeypot, 5 req / 10 min / IP)

## Collections (same fields as the old Supabase tables)
`field_notes`, `contact_submissions` — `_id` is a UUID string returned to the UI as `id`.

## Copying live data from the old Supabase project (optional)
`SUPABASE_URL=... SUPABASE_SERVICE_KEY=... npm run migrate:supabase`

## Deploy on Vercel (step by step)
1. Push the project to a GitHub repo (`.env` and `node_modules` are git-ignored — never commit your password).
2. Vercel -> Add New -> Project -> import the repo. Framework preset: Vite (detected from `vercel.json`). Leave build settings as they are.
3. Before deploying: Settings -> Environment Variables -> add
   `MONGODB_URI` = `mongodb+srv://USERNAME:PASSWORD@cluster0.8u29opi.mongodb.net/ganvora?retryWrites=true&w=majority`
   for Production, Preview and Development.
4. Atlas -> Network Access -> add `0.0.0.0/0` (Vercel has no fixed IPs).
5. Deploy. Then open `https://YOUR-SITE.vercel.app/api/health` -> must show `{"ok":true,"db":"connected","notes":4}`.
6. Open `/field-notes` (4 notes) and submit the contact form; check Atlas -> Browse Collections -> `ganvora.contact_submissions`.
If you add or change an environment variable later, redeploy (Deployments -> ... -> Redeploy).

Before pushing, run `npm run verify` (typecheck + lint + build).

## Troubleshooting
Open `/api/health` (locally `http://localhost:5000/api/health`). It returns the exact MongoDB error.
`npm run check-db` tests the Atlas connection and tells you what is wrong (bad password, network, host, missing .env).
