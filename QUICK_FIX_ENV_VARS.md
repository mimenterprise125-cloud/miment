# 🎯 IMMEDIATE ACTION - Fix Vercel Error

## The Error You're Seeing ⚠️

```
Environment Variable "VITE_SUPABASE_URL" references Secret "VITE_SUPABASE_URL", 
which does not exist.
```

---

## ✅ Quick Fix (2 Minutes)

### Step 1: Go to Vercel Dashboard
👉 https://vercel.com/dashboard

### Step 2: Open Your Project
Click on: **miment**

### Step 3: Click Settings Tab
At the top, click: **Settings**

### Step 4: Click Environment Variables
In left sidebar, click: **Environment Variables**

### Step 5: Add 3 Variables

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://pbrcqljfqswojlhvpizx.supabase.co`
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click: **Save**

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzAzMDYsImV4cCI6MjA5MzY0NjMwNn0.gicasCNrSuf8CLOGibgXcv2VpHkLQbi09BdMzlQURGk`
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click: **Save**

**Variable 3:**
- Name: `VITE_SUPABASE_SERVICE_ROLE_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODA3MDMwNiwiZXhwIjoyMDkzNjQ0MzA2fQ.ZzwHtXFVReakLAb7eKdAxqkHzzuv0yjSSJyxdrfWhlo`
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click: **Save**

### Step 6: Redeploy

1. Go to **Deployments** tab
2. Click the failed deployment
3. Click **"..."** menu
4. Select **"Redeploy"**
5. Wait for build to finish ✅

---

## ✨ Done!

The error will be gone after redeploy. Your app will then work without any issues!

---

## 📚 Need More Help?

See: `FIX_VERCEL_ENV_VARIABLES.md` for detailed step-by-step guide with pictures
