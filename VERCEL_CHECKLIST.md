# Vercel Pre-Deployment Checklist

## ✅ Configuration Files
- [x] `vercel.json` - Updated with proper routing rules for Vite/TanStack
- [x] `.vercelignore` - Created to optimize build
- [x] `vite.config.ts` - Uses `@lovable.dev/vite-tanstack-config` (correct)
- [x] `package.json` - Build script available: `npm run build`

## ✅ Project Type: TanStack Start + Vite

This project uses:
- **Build Tool**: Vite
- **Framework**: TanStack Router (React Router v7)
- **Output Format**: SPA (Single Page Application)
- **Deployment**: Vercel (using `dist/client`)

## ✅ Environment Setup

### Required Environment Variables for Vercel
Set these in Vercel project settings (Settings → Environment Variables):

```
VITE_SUPABASE_URL=https://pbrcqljfqswojlhvpizx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzAzMDYsImV4cCI6MjA5MzY0NjMwNn0.gicasCNrSuf8CLOGibgXcv2VpHkLQbi09BdMzlQURGk
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODA3MDMwNiwiZXhwIjoyMDkzNjQ2MzA2fQ.ZzwHtXFVReakLAb7eKdAxqkHzzuv0yjSSJyxdrfWhlo
```

**Why these are needed:**
- `VITE_SUPABASE_URL`: Points to your Supabase database
- `VITE_SUPABASE_ANON_KEY`: Anonymous key for public access
- `VITE_SUPABASE_SERVICE_ROLE_KEY`: Service role for backend operations

**Important**: All must start with `VITE_` to be available in the browser.

## ✅ Routing Configuration

### Vercel Routing Fix

The key fix in `vercel.json`:

```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/"
  }
]
```

This rewrites all requests to `/` which serves `dist/client/index.html`, allowing TanStack Router to handle all routing client-side.

### Routes Handled by TanStack Router

1. **Client-side routes** (all handled inside React):
   - `/` - Home page
   - `/dashboard` - Dashboard
   - `/leads` - Leads page
   - `/leads-new` - New lead form
   - `/projects-crm` - Projects
   - `/quotation` - Quotation page
   - `/payments` - Payments page
   - `/employees` - Employees page
   - `/configurator` - Configurator
   - `/contact` - Contact page
   - `/products` - Products page
   - `/login` - Login page
   - `/nonexistent` - 404 component (handled by app)

2. **Static assets** (served directly):
   - `/assets/*` - Images, fonts, etc.

## ✅ Build Process

### Build Output Structure

```
dist/
├── client/           ← Deployed to Vercel
│   ├── index.html    ← Entry point
│   └── assets/       ← JS, CSS, images
└── server/           ← Not used (for Workers)
```

### Local Build Testing

Before deploying, test locally:

```bash
# Clean install dependencies
npm install

# Build the project
npm run build

# Test production build
npm run preview
```

### Build Size Expectations
- **Typical bundle size**: 500KB-1.5MB (gzipped: 150KB-500KB)
- **Build time**: 30-60 seconds
- **Output directory size**: ~2-5MB

## ✅ Project Structure

```
/
├── src/
│   ├── routes/          # TanStack Router pages
│   │   ├── __root.tsx   # Root layout with header, outlet
│   │   ├── index.tsx    # Home page
│   │   ├── dashboard.tsx
│   │   ├── leads.tsx
│   │   ├── leads-new.tsx
│   │   ├── projects-crm.tsx
│   │   ├── quotation.tsx
│   │   ├── payments.tsx
│   │   ├── employees.tsx
│   │   ├── configurator.tsx
│   │   ├── contact.tsx
│   │   ├── products.tsx
│   │   └── login.tsx
│   ├── components/      # React components
│   │   ├── site/        # Layout components
│   │   └── ui/          # UI components
│   ├── lib/             # Utilities and context
│   │   ├── auth-context.tsx
│   │   ├── refresh-context.tsx
│   │   └── supabase.ts
│   ├── assets/          # Images and static files
│   ├── router.tsx       # Error boundary and error component
│   └── styles.css       # Global Tailwind styles
├── dist/                # Build output (gitignored)
├── vercel.json          # ✅ Vercel configuration
├── .vercelignore        # ✅ Build optimization
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## ✅ Common Issues & Solutions

### Issue: "404 Not Found" on client-side routes

**Problem**: Routes like `/dashboard` return Vercel 404 instead of loading app

**Cause**: Routes not being rewritten to `/index.html`

**Solution**: ✅ Fixed in `vercel.json` with:
```json
"rewrites": [{ "source": "/(.*)", "destination": "/" }]
```

**Test**: 
- Deploy and visit `/dashboard` directly
- Should load the dashboard page (not 404)
- Check browser console for any errors

### Issue: Static assets returning 404

**Problem**: Images or CSS not loading

**Cause**: Incorrect asset paths or incomplete build

**Solution**: 
- Ensure `src/assets/` files are in correct directory
- Check that `npm run build` completes successfully
- Verify `dist/client/assets/` contains files
- Check browser DevTools Network tab for paths

### Issue: Environment variables showing as undefined

**Problem**: `process.env.VITE_SUPABASE_URL` is undefined

**Cause**: Variables not set in Vercel or wrong naming

**Solution**: 
- Set variables in Vercel: Settings → Environment Variables
- Ensure they start with `VITE_` prefix (important!)
- Redeploy after adding variables
- Clear browser cache

### Issue: Supabase connection failing

**Problem**: Can't login or fetch data

**Cause**: Wrong credentials or network issue

**Solution**:
- Verify Supabase URL and keys are correct
- Check Supabase project is active
- Check browser console for specific errors
- Test Supabase connection locally first

## ✅ Deployment Instructions

### Step 1: Commit Changes
```bash
cd path/to/project
git add .
git commit -m "Configure Vercel deployment with TanStack routing"
git push origin main
```

### Step 2: Create Vercel Account & Import Project
1. Go to https://vercel.com
2. Sign up or log in with GitHub
3. Click "Add New..." → "Project"
4. Select "Import Git Repository"
5. Search for `mimenterprise125-cloud/miment`
6. Click "Import"

### Step 3: Configure Build Settings

In the "Configure Project" dialog:

- **Project Name**: miment (or your choice)
- **Framework Preset**: Other (or leave as is)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/client`
- **Install Command**: (leave default)
- **Node.js Version**: 20.x

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

1. **VITE_SUPABASE_URL**
   - Value: `https://pbrcqljfqswojlhvpizx.supabase.co`

2. **VITE_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzAzMDYsImV4cCI6MjA5MzY0NjMwNn0.gicasCNrSuf8CLOGibgXcv2VpHkLQbi09BdMzlQURGk`

3. **VITE_SUPABASE_SERVICE_ROLE_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODA3MDMwNiwiZXhwIjoyMDkzNjQ2MzA2fQ.ZzwHtXFVReakLAb7eKdAxqkHzzuv0yjSSJyxdrfWhlo`

### Step 5: Deploy

Click "Deploy" and wait for completion (typically 2-3 minutes)

## ✅ Post-Deployment Verification

After deployment, verify:

- [ ] Home page loads: `https://your-domain.com`
- [ ] Dashboard accessible: `https://your-domain.com/dashboard`
- [ ] Can navigate to other pages
- [ ] No 404 errors in browser console
- [ ] No "Not Found" errors from Vercel
- [ ] Static assets (images) load properly
- [ ] Supabase connection works (try logging in)
- [ ] Forms can be submitted

### Quick Test Route List

Test these in production:

1. `https://your-domain.com/` - Home
2. `https://your-domain.com/dashboard` - Dashboard (requires login)
3. `https://your-domain.com/leads` - Leads (requires login)
4. `https://your-domain.com/quotation` - Quotation
5. `https://your-domain.com/products` - Products
6. `https://your-domain.com/login` - Login
7. `https://your-domain.com/nonexistent` - Should show app 404, not Vercel 404

## ✅ Monitoring & Logs

### Check Vercel Deployment Status
1. Visit https://vercel.com/dashboard
2. Select your project
3. Go to "Deployments" tab
4. Click on latest deployment
5. Check "Build Logs" for errors

### Enable Monitoring
1. Go to your project settings
2. Enable "Vercel Analytics"
3. Monitor real user metrics and performance

## Next Steps

1. ✅ Push changes to GitHub
2. ✅ Deploy to Vercel
3. ✅ Test all routes
4. ✅ Monitor performance
5. [ ] Set up custom domain (optional)
6. [ ] Enable Analytics
7. [ ] Configure automatic deployments
8. [ ] Set up error tracking (Sentry, LogRocket, etc.)

## Support & References

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Rewrite Rules](https://vercel.com/docs/deployments/configuration#rewrites)
- [TanStack Start](https://tanstack.com/start/latest)
- [Vite Guide](https://vitejs.dev/)
- [Supabase Docs](https://supabase.com/docs)
