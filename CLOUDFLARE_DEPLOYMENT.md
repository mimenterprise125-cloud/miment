# Cloudflare Workers Deployment Guide

## Overview

Your MIM CRM app is configured for **Cloudflare Workers** deployment using **TanStack Start** with full-stack JavaScript.

### Architecture
- **Frontend**: React with TanStack Router (SSR-capable)
- **Backend**: Cloudflare Workers (dist/server/index.js)
- **Database**: Supabase
- **Hosting**: Cloudflare Workers + Pages

---

## Prerequisites

1. **Cloudflare Account** - https://dash.cloudflare.com
2. **Domain** - Must be on Cloudflare or pointed to Cloudflare nameservers
3. **Wrangler CLI** - Install: `npm install -g wrangler`
4. **Authentication** - Run: `wrangler login`

---

## Deployment Steps

### Step 1: Update wrangler.jsonc

Update your domain in `wrangler.jsonc`:

```jsonc
"env": {
  "production": {
    "name": "mim-crm-prod",
    "routes": [
      {
        "pattern": "yourdomain.com/*",
        "zone_name": "yourdomain.com"
      }
    ]
  }
}
```

### Step 2: Test Build Locally

```bash
npm install
npm run build
npm run preview
```

Visit `http://localhost:8787` to test the Workers deployment locally.

### Step 3: Deploy to Cloudflare

```bash
# Login to Cloudflare
wrangler login

# Deploy to production
wrangler deploy --env production

# Or deploy to staging
wrangler deploy --env staging
```

### Step 4: Verify Deployment

Visit your domain: `https://yourdomain.com`

Test routes:
- ✅ `https://yourdomain.com/`
- ✅ `https://yourdomain.com/dashboard`
- ✅ `https://yourdomain.com/leads`
- ✅ `https://yourdomain.com/quotation`
- ✅ Refresh each page - should work without 404

---

## Configuration Details

### wrangler.jsonc

```jsonc
{
  "name": "mim-crm",              // Worker name
  "main": "dist/server/index.js", // Server entry point
  "compatibility_date": "2025-09-24",
  "compatibility_flags": [
    "nodejs_compat",              // Node.js compatibility
    "nodejs_compat_v2"            // Enhanced Node.js support
  ],
  "build": {
    "command": "npm run build",   // Build command
    "cwd": "."                    // Build directory
  },
  "env": {
    "production": { ... },        // Production environment
    "staging": { ... }            // Staging environment
  }
}
```

### Build Output

After `npm run build`, you'll have:

```
dist/
├── client/              ← Frontend assets
│   ├── index.html
│   ├── assets/
│   │   ├── *.js
│   │   ├── *.css
│   │   └── *.jpg
│   └── .assetsignore
└── server/              ← Worker code
    ├── index.js         ← Main worker
    └── wrangler.json
```

The server runs on Cloudflare Workers and serves both:
- Static assets (from dist/client)
- Dynamic routes (via TanStack Start)

---

## Environment Variables

Set in Cloudflare Workers dashboard:

```
VITE_SUPABASE_URL=https://pbrcqljfqswojlhvpizx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
VITE_SUPABASE_SERVICE_ROLE_KEY=your-key-here
```

Or via CLI:

```bash
wrangler secret put VITE_SUPABASE_URL
wrangler secret put VITE_SUPABASE_ANON_KEY
wrangler secret put VITE_SUPABASE_SERVICE_ROLE_KEY
```

---

## Cloudflare Workers Benefits

✅ **Global Edge Deployment** - Your app runs on 200+ Cloudflare data centers
✅ **Instant Deployments** - Deploy in seconds, not minutes
✅ **Zero Cold Starts** - Fast response times worldwide
✅ **Full-Stack JavaScript** - Frontend + backend in one deployment
✅ **Built-in DDoS Protection** - Cloudflare's security included
✅ **Free Tier Available** - 100,000 requests/day free

---

## Local Testing with Wrangler

### Start Dev Server

```bash
wrangler dev
```

This starts:
- **http://localhost:8787** - Your app
- **Hot reload** on file changes
- **Full Worker environment** simulation

### Test Routes

```bash
curl http://localhost:8787/
curl http://localhost:8787/dashboard
curl http://localhost:8787/api/health
```

---

## Monitoring & Debugging

### View Logs

```bash
# Real-time logs
wrangler tail

# From dashboard
# Dashboard → Workers → Your Worker → Logs
```

### View Metrics

```
Dashboard → Workers Analytics →
- Requests
- CPU Time
- Errors
- Response Status Codes
```

---

## Troubleshooting

### 404 Errors on Routes

**Problem**: `/dashboard` returns 404

**Solution**: Ensure wrangler.jsonc routes match your domain:

```jsonc
"routes": [
  {
    "pattern": "yourdomain.com/*",
    "zone_name": "yourdomain.com"
  }
]
```

### Workers Not Starting

**Problem**: `npm run build` fails

**Solution**: Check Node.js version compatibility:

```bash
node --version  # Should be 18+
npm --version   # Should be 8+
```

### Environment Variables Not Working

**Problem**: VITE_* variables undefined

**Solution**: Set secrets, not variables:

```bash
# Correct - for VITE_ variables
wrangler secret put VITE_SUPABASE_URL

# Incorrect - won't work for VITE_
wrangler secret put --config wrangler.jsonc VITE_SUPABASE_URL
```

### Supabase Connection Failing

**Problem**: Database queries fail

**Solution**: Verify environment variables are set:

```bash
# Check secrets
wrangler secret list

# Or check in dashboard:
# Workers → Your Worker → Settings → Environment Variables
```

---

## File Structure

```
miment/
├── dist/
│   ├── client/           ← Frontend (static)
│   └── server/           ← Worker (dynamic)
├── src/
│   ├── routes/           ← Page routes
│   ├── components/       ← React components
│   ├── lib/              ← Utilities
│   └── styles.css
├── wrangler.jsonc        ← Cloudflare config
├── vite.config.ts        ← Build config
└── package.json
```

---

## Deployment Checklist

- [ ] Update domain in wrangler.jsonc
- [ ] Set environment variables in Cloudflare
- [ ] Test locally: `wrangler dev`
- [ ] Run: `wrangler login`
- [ ] Deploy: `wrangler deploy --env production`
- [ ] Verify: Visit domain and test routes
- [ ] Check: Dashboard → Workers → Logs

---

## Next Steps

1. **Update wrangler.jsonc** with your domain
2. **Set environment variables** in Cloudflare Workers
3. **Deploy** with `wrangler deploy --env production`
4. **Monitor** via Cloudflare Dashboard

---

## Support

- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/
- **TanStack Start**: https://tanstack.com/start/latest
- **Cloudflare Workers**: https://developers.cloudflare.com/workers/
- **Supabase**: https://supabase.com/docs

---

**Your app is now ready for Cloudflare Workers deployment!** 🚀
