# Green Valley Public School — Project Guide

## What This Is

School website for **Green Valley Public School, Pai, Kaithal, Haryana**. Includes Vally (AI chatbot powered by Groq) and a guided website tour with audio.

## Architecture

```
school-website/                    ← pnpm monorepo root
├── artifacts/green-valley/        ← React frontend (Vite + TailwindCSS v3)
├── artifacts/api-server/          ← Express server (Replit only — not used on Vercel)
├── api/                           ← Vercel Serverless Functions
│   ├── chat.ts                    ← POST /api/chat  (Groq AI — Vally chatbot)
│   └── healthz.ts                 ← GET  /api/healthz
└── vercel.json                    ← Vercel deployment config
```

### On Vercel (production)
- Frontend static files served from Vercel Edge
- `api/chat.ts` and `api/healthz.ts` are Serverless Functions on the same domain
- No database, no separate backend server needed

## Tech Stack

- **Frontend:** React 19, Vite 7, TailwindCSS v3, Radix UI, React Router DOM v7
- **AI Chatbot:** Groq API (`llama-3.3-70b-versatile`) — free tier available
- **TTS:** Cartesia (optional — if not configured, voice is silently disabled)
- **Package Manager:** pnpm 10.11.0 (do not use npm or yarn)

## Local Development

```bash
pnpm install
pnpm --filter @workspace/green-valley run dev   # frontend on :5173
pnpm --filter @workspace/api-server run dev      # backend on :3000 (optional)
```

## Vercel Deployment

### First-time setup
1. Push code to GitHub
2. Import repo at vercel.com — config is auto-read from `vercel.json`
3. Add Environment Variable in Vercel dashboard:
   - `GROQ_API_KEY` — required, get free at console.groq.com

### Deploy on every push
Push to `main` → Vercel auto-deploys.

## Common Issues

| Problem | Fix |
|---------|-----|
| Chatbot not responding | Check `GROQ_API_KEY` is set in Vercel Environment Variables |
| Page refresh gives 404 | Fixed by rewrite rule in `vercel.json` — make sure it's deployed |
| Build fails | Vercel must use pnpm (detected from `pnpm-lock.yaml` + `packageManager` in `package.json`) |
