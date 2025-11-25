# Deployment Guide for Task Manager Application

This guide will help you deploy your Task Manager application online using Render (backend) and Vercel (frontend).

## Prerequisites

- GitHub account (you already have the repo pushed)
- Render account (free): https://render.com
- Vercel account (free): https://vercel.com

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository: `riyasharma2002/Task-manager`
3. Render will automatically detect the `render.yaml` file
4. Click **"Apply"** to create both the database and web service

### Step 3: Wait for Deployment
- Render will automatically:
  - Create a PostgreSQL database
  - Install dependencies
  - Start your backend server
- This takes about 5-10 minutes
- You'll get a URL like: `https://taskmanager-backend-xxxx.onrender.com`

### Step 4: Test Backend
Once deployed, test the health endpoint:
```
https://your-backend-url.onrender.com/health
```

You should see: `{"status":"OK","message":"Server is running"}`

**Save this backend URL - you'll need it for the frontend!**

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your repository: `riyasharma2002/Task-manager`
3. Vercel will detect it's a Next.js project

### Step 3: Configure Project
1. **Root Directory**: Set to `frontend`
2. **Framework Preset**: Next.js (auto-detected)
3. **Build Command**: `npm run build` (auto-filled)
4. **Output Directory**: `.next` (auto-filled)

### Step 4: Add Environment Variable
Click **"Environment Variables"** and add:
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: Your Render backend URL (from Part 1)
  - Example: `https://taskmanager-backend-xxxx.onrender.com`
- Click **"Add"**

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://task-manager-xxxx.vercel.app`

---

## Part 3: Verify Deployment

### Test the Application
1. Open your Vercel URL
2. Try these actions:
   - ✅ Create a new task
   - ✅ Mark a task as completed
   - ✅ Edit a task
   - ✅ Delete a task

All operations should work and persist!

---

## Your Deployment URLs

Once deployed, you'll have:
- **Frontend**: `https://task-manager-xxxx.vercel.app`
- **Backend API**: `https://taskmanager-backend-xxxx.onrender.com`

---

## Troubleshooting

### Backend Issues
- Check Render logs: Dashboard → Your Service → Logs
- Verify database is connected
- Ensure all environment variables are set

### Frontend Issues
- Check Vercel deployment logs
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for errors

### CORS Issues
If you see CORS errors, the backend already has CORS enabled, but verify:
- Backend is running
- Frontend is using correct backend URL

---

## Automatic Deployments

Both platforms support automatic deployments:
- **Push to GitHub** → Automatically redeploys
- **Render**: Redeploys backend on push
- **Vercel**: Redeploys frontend on push

---

## Notes

> [!IMPORTANT]
> **Free Tier Limitations**
> - Render free tier: Backend may sleep after 15 minutes of inactivity (first request takes ~30 seconds to wake up)
> - Vercel free tier: Unlimited bandwidth for personal projects
> - PostgreSQL: 90 days free, then $7/month (or use free alternatives like Supabase)

> [!TIP]
> **Keep Backend Awake**
> To prevent Render from sleeping, you can use a free service like UptimeRobot to ping your health endpoint every 5 minutes.
