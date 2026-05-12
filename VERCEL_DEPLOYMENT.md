# Vercel Deployment Guide

This guide explains the Vercel configuration for the MIM CRM application, which uses TanStack Start/React Router.

## Configuration Overview

### `vercel.json` Setup

The `vercel.json` file contains the following key configurations:

#### 1. **Build Settings**
- **buildCommand**: `npm run build` - Builds the project using Vite
- **outputDirectory**: `dist/client` - Output folder for the client-side built application
- **framework**: `vite` - Specifies this is a Vite project

#### 2. **Environment Variables**

Environment variables are configured in `vercel.json` to be passed from Vercel settings:

```json
"env": {
  "VITE_SUPABASE_URL": "@VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY": "@VITE_SUPABASE_ANON_KEY",
  "VITE_SUPABASE_SERVICE_ROLE_KEY": "@VITE_SUPABASE_SERVICE_ROLE_KEY"
}
```

These need to be set in your Vercel project environment settings.

#### 3. **Routing Configuration - The Key Fix for 404 Errors**

```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/"
  }
]
```

**Why This Fixes 404 Errors:**

The rewrite rule catches all requests and rewrites them to `/`, which serves the static `index.html` file. This allows TanStack Router to handle all routing on the client-side.

When a user navigates to:
- `/dashboard` → Vercel serves `/index.html` → TanStack Router renders dashboard
- `/leads` → Vercel serves `/index.html` → TanStack Router renders leads page
- `/api/something` → Vercel serves `/index.html` → App handles 404 gracefully
- `/assets/image.jpg` → Vercel serves actual file from `dist/client/assets/`

#### 4. **Cache Headers**

```json
"headers": [
  {
    "source": "/assets/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  },
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=0, must-revalidate"
      }
    ]
  }
]
```

**Cache Strategy:**
- **Assets** (JS/CSS/Images): 1 year immutable cache for performance
- **All other files**: No cache (must-revalidate) to ensure users get latest version

## Build Output Structure

The build creates this structure:

```
dist/
├── client/              # ← Served by Vercel
│   ├── index.html       # Entry point
│   ├── assets/
│   │   ├── *.js         # JavaScript bundles
│   │   ├── *.css        # CSS files
│   │   └── *.jpg        # Images
│   └── ...
└── server/              # ← Not used by Vercel (for Workers)
    ├── index.js
    └── wrangler.json
```

## Environment Variables

Set these in Vercel project settings (Settings → Environment Variables):

```
VITE_SUPABASE_URL=https://pbrcqljfqswojlhvpizx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzAzMDYsImV4cCI6MjA5MzY0NjMwNn0.gicasCNrSuf8CLOGibgXcv2VpHkLQbi09BdMzlQURGk
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODA3MDMwNiwiZXhwIjoyMDkzNjQ2MzA2fQ.ZzwHtXFVReakLAb7eKdAxqkHzzuv0yjSSJyxdrfWhlo
```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update Vercel configuration for proper routing"
   git push
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/import
   - Import your GitHub repository
   - Select the project root (default is usually correct)

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist/client`
   - Install Command: (default)
   - Node.js Version: 20.x (default)

4. **Configure Environment Variables**
   - Add all three VITE_ variables listed above

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

## Troubleshooting

### Still Getting 404 Errors?

1. **Verify Local Build:**
   ```bash
   npm install
   npm run build
   npm run preview
   ```
   Test that all routes work locally in preview mode.

2. **Check Vercel Deployment:**
   - Visit https://vercel.com/dashboard
   - Select your project
   - Go to "Deployments" tab
   - Check the latest deployment logs

3. **Verify `dist/client` Exists:**
   After running `npm run build`, check:
   ```bash
   ls -la dist/client/
   ```
   Should show `index.html` and `assets/` folder.

4. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open in private/incognito window

### Environment Variables Not Working

1. Check that variables are set in Vercel settings
2. Variables must start with `VITE_` to be available in browser
3. Redeploy after adding/changing variables
4. Check browser DevTools Console for undefined variables

### Static Assets Returning 404

1. Ensure images/assets are in `src/assets/` directory
2. Rebuild and redeploy: `npm run build && git push`
3. Check DevTools Network tab for incorrect paths

## Performance Optimization

1. **Enable Vercel Analytics** - Monitor real user metrics
2. **Use Image Optimization** - Vercel automatically optimizes images
3. **Monitor Build Time** - Keep under 3 minutes
4. **Check Bundle Size** - Use Vercel Analytics dashboard

## Testing Routes After Deployment

Test these routes on your deployed site:

- [ ] `https://your-domain.com/` - Home page
- [ ] `https://your-domain.com/dashboard` - Dashboard
- [ ] `https://your-domain.com/leads` - Leads page
- [ ] `https://your-domain.com/quotation` - Quotation page
- [ ] `https://your-domain.com/products` - Products page
- [ ] `https://your-domain.com/login` - Login page
- [ ] `https://your-domain.com/nonexistent` - Should show 404 component, not Vercel 404

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel SPA Routing Guide](https://vercel.com/docs/deployments/configuration#rewrites)
- [TanStack Start Documentation](https://tanstack.com/start/latest)
- [Vite Documentation](https://vitejs.dev/)
