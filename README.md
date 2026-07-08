# AI Trip Planner Pro

A premium, AI-powered trip planning web app built with React, Supabase, and OpenAI.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a Supabase project at https://supabase.com, then run `supabase/schema.sql`
   in the Supabase SQL Editor to create all tables, RLS policies, and sample data.

3. Copy `.env.example` to `.env` and fill in your keys:
   ```
   cp .env.example .env
   ```
   - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — from Supabase project settings → API
   - `VITE_OPENAI_API_KEY` — from https://platform.openai.com/api-keys
   - `VITE_WEATHER_API_KEY` — from https://openweathermap.org/api (optional)
   - `VITE_UNSPLASH_ACCESS_KEY` — from https://unsplash.com/developers (optional)

4. Run the dev server:
   ```
   npm run dev
   ```

## Deployment

### Vercel
```
npm install -g vercel
vercel
```
Add the same environment variables in the Vercel dashboard (Project → Settings → Environment Variables).

### Netlify
```
npm run build
```
Then drag the `dist/` folder into Netlify, or connect your Git repo and set:
- Build command: `npm run build`
- Publish directory: `dist`
Add the environment variables in Site settings → Environment variables.

## Notes

- Auth, CRUD, and the AI planner are fully wired to Supabase and OpenAI.
- Some landing-page-only sections (About, Pricing, Blog, FAQ) are structural
  stubs to extend — the core product flow (signup → login → create/AI-generate
  trip → dashboard → edit/delete) is complete and functional.
- Row Level Security ensures each user can only see and modify their own trips.
