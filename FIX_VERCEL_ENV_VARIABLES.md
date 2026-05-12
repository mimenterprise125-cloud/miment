# Fix Vercel Environment Variables - Step by Step

## ⚠️ The Error You're Seeing

```
Environment Variable "VITE_SUPABASE_URL" references Secret "VITE_SUPABASE_URL", which does not exist.
```

**Reason**: The environment variables haven't been added to your Vercel project yet.

---

## ✅ Solution: Add Environment Variables to Vercel

### Method 1: Add via Vercel Dashboard (Easiest)

#### Step 1: Open Your Vercel Project
1. Go to https://vercel.com/dashboard
2. Click on your project: `miment`

#### Step 2: Go to Settings
1. Click the **"Settings"** tab at the top
2. In the left sidebar, click **"Environment Variables"**

#### Step 3: Add First Variable - VITE_SUPABASE_URL

1. Click **"Add New"** button
2. **Name**: `VITE_SUPABASE_URL`
3. **Value**: `https://pbrcqljfqswojlhvpizx.supabase.co`
4. **Environments**: Select all (Production, Preview, Development)
5. Click **"Save"**

#### Step 4: Add Second Variable - VITE_SUPABASE_ANON_KEY

1. Click **"Add New"** again
2. **Name**: `VITE_SUPABASE_ANON_KEY`
3. **Value**: 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzAzMDYsImV4cCI6MjA5MzY0NjMwNn0.gicasCNrSuf8CLOGibgXcv2VpHkLQbi09BdMzlQURGk
```
4. **Environments**: Select all
5. Click **"Save"**

#### Step 5: Add Third Variable - VITE_SUPABASE_SERVICE_ROLE_KEY

1. Click **"Add New"** again
2. **Name**: `VITE_SUPABASE_SERVICE_ROLE_KEY`
3. **Value**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicmNxbGpmcXN3b2psaHZwaXp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODA3MDMwNiwiZXhwIjoyMDkzNjQ2MzA2fQ.ZzwHtXFVReakLAb7eKdAxqkHzzuv0yjSSJyxdrfWhlo
```
4. **Environments**: Select all
5. Click **"Save"**

#### Step 6: Redeploy

1. Go to the **"Deployments"** tab
2. Click on the failed deployment (or click the three dots menu)
3. Select **"Redeploy"**
4. Wait for the new deployment to complete

---

## 📸 Visual Guide

### Finding Environment Variables Settings

```
Your Project
    ↓
Settings Tab
    ↓
Left Sidebar → Environment Variables
    ↓
Click "Add New"
    ↓
Fill in name and value
    ↓
Select all environments
    ↓
Click Save
```

---

## 🔍 Verify Variables Were Added

After adding all 3 variables:

1. Go to **Settings** → **Environment Variables**
2. You should see all 3 variables listed:
   - ✅ VITE_SUPABASE_URL
   - ✅ VITE_SUPABASE_ANON_KEY
   - ✅ VITE_SUPABASE_SERVICE_ROLE_KEY

---

## 🚀 Redeploy After Adding Variables

**IMPORTANT**: You MUST redeploy after adding variables!

### Option A: Redeploy from Dashboard
1. Go to **Deployments** tab
2. Click the failed deployment
3. Click the **"..."** (three dots) menu
4. Select **"Redeploy"**

### Option B: Trigger with Git Push
```bash
git add .
git commit -m "Trigger redeploy"
git push origin main
```

---

## ❓ Common Issues

### Issue: "Environments: Production, Preview, Development"
**Solution**: Make sure you select **all three** environments for each variable

### Issue: Variable shows but still getting error
**Solution**: 
1. Check spelling of variable names (case-sensitive)
2. Make sure to redeploy AFTER adding variables
3. Wait 5 minutes for variables to take effect

### Issue: Can't find Environment Variables section
**Solution**:
1. Make sure you're in the right project
2. Click "Settings" tab at the top of the page
3. Look in the left sidebar

---

## ✅ After Redeploy - What to Check

1. **Deployment Status**: Should show "✓ Ready" (not building/failed)
2. **Browser Console**: No errors about missing env variables
3. **Supabase Connection**: Should work (try login)
4. **Routes**: Should work without 404 errors

---

## 🎯 Full Checklist

- [ ] Added `VITE_SUPABASE_URL`
- [ ] Added `VITE_SUPABASE_ANON_KEY`
- [ ] Added `VITE_SUPABASE_SERVICE_ROLE_KEY`
- [ ] Selected all 3 environments for each
- [ ] Clicked Save for each variable
- [ ] Redeployed the project
- [ ] Waited for deployment to complete
- [ ] Tested routes on the deployed site
- [ ] Confirmed no errors in browser console

---

## 📝 Environment Variables Summary

| Variable Name | Value | Where to Get |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://pbrcqljfqswojlhvpizx.supabase.co` | In your `.env` file |
| `VITE_SUPABASE_ANON_KEY` | (long JWT key) | In your `.env` file |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | (long JWT key) | In your `.env` file |

**Note**: All three values are already in your project's `.env` file - just copy them to Vercel settings.

---

## 🆘 Still Having Issues?

1. **Check variable names**: Make sure they start with `VITE_`
2. **Check environment selection**: All 3 environments should be selected
3. **Redeploy**: Always redeploy after adding variables
4. **Wait**: Sometimes takes a few minutes to take effect
5. **Clear cache**: Hard refresh browser (Ctrl+Shift+R)

If still stuck, check Vercel deployment logs for the specific error message.

---

**Once variables are added and you redeploy, the error will disappear!** ✅
