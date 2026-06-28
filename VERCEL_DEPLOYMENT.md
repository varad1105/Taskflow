# Taskflow MERN Deployment on Vercel

This guide covers deploying your full Taskflow project (frontend + backend) on Vercel.

---

## 📋 Prerequisites

- Vercel account (https://vercel.com) - sign up with GitHub
- GitHub repository linked (already done: https://github.com/varad1105/Taskflow.git)
- MongoDB connection string (Atlas or local)
- Environment variables ready

---

## 🎯 Deployment Strategy

For a MERN project, you have two options:

**Option A: Recommended - Deploy Backend & Frontend Separately**
- Frontend → Vercel (Next.js or Static)
- Backend → Vercel (Serverless) or Railway/Render

**Option B: Monorepo Deployment**
- Both frontend and backend on Vercel in one project

We'll use **Option A (Recommended)** as it's more flexible.

---

## 📦 Step 1: Prepare Backend for Vercel

### 1.1 Create `vercel.json` in backend root

Create `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "PORT": "5000"
  }
}
```

### 1.2 Update `backend/package.json`

Ensure you have this `engines` field:

```json
{
  "engines": {
    "node": "18.x"
  }
}
```

### 1.3 Update `backend/server.js`

Your server should listen on the PORT environment variable:

```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 📱 Step 2: Prepare Frontend for Vercel

### 2.1 Update `frontend/.env.production`

Create `frontend/.env.production`:

```
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api
```

Replace `your-backend-url` with your actual Vercel backend domain.

### 2.2 Ensure `frontend/vercel.json` exists

Create `frontend/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### 2.3 Update `frontend/vite.config.js`

Ensure it's configured for production:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
```

---

## 🚀 Step 3: Deploy Backend to Vercel

### 3.1 Connect Backend Repository

```bash
cd backend
vercel login
vercel
```

or use the Vercel dashboard:

1. Go to https://vercel.com/new
2. Import your GitHub repository (Taskflow)
3. Select "Other" for framework
4. Set root directory to `backend`

### 3.2 Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
MONGODB_URI = your_mongodb_connection_string
NODE_ENV = production
```

### 3.3 Deploy

```bash
vercel --prod
```

**Note the deployed backend URL** (e.g., `https://taskflow-backend.vercel.app`)

---

## 📱 Step 4: Deploy Frontend to Vercel

### 4.1 Update Frontend `.env.production`

Now update with your actual backend URL:

```
VITE_API_BASE_URL=https://taskflow-backend.vercel.app/api
```

### 4.2 Connect Frontend Repository

```bash
cd frontend
vercel login
vercel
```

or use the Vercel dashboard:

1. Go to https://vercel.com/new
2. Import your GitHub repository (Taskflow)
3. Select "Other" or "Vite" for framework
4. Set root directory to `frontend`
5. Set build command to `npm run build`
6. Set output directory to `dist`

### 4.3 Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
VITE_API_BASE_URL = https://taskflow-backend.vercel.app/api
```

### 4.4 Deploy

```bash
vercel --prod
```

---

## ✅ Step 5: Verification

### 5.1 Test Backend

```bash
curl https://taskflow-backend.vercel.app/api/tasks
```

### 5.2 Test Frontend

1. Open: https://taskflow.vercel.app (or your custom domain)
2. Check browser console for errors
3. Test task creation/editing/deletion

### 5.3 Check Logs

**Backend logs:**
- Vercel Dashboard → Deployments → Select backend → Logs

**Frontend logs:**
- Vercel Dashboard → Deployments → Select frontend → Logs

---

## 🔧 Step 6: Update API Calls (if needed)

### Update `frontend/src/services/taskService.js`

Ensure it uses environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  return response.json();
};

// ... rest of your API calls
```

---

## 🌐 Step 7: Custom Domain (Optional)

### 7.1 For Backend

1. Go to backend project in Vercel
2. Settings → Domains
3. Add your domain
4. Update DNS records

### 7.2 For Frontend

1. Go to frontend project in Vercel
2. Settings → Domains
3. Add your domain
4. Update DNS records

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 errors from API | Check API_BASE_URL in .env.production |
| CORS errors | Add CORS headers in backend |
| Build fails | Check build logs in Vercel dashboard |
| MongoDB connection fails | Verify MONGODB_URI is correct |
| Frontend shows blank page | Check browser console, verify build |

---

## 📋 Checklist

- [ ] Backend vercel.json created
- [ ] Backend package.json has engines field
- [ ] Frontend .env.production created with correct API URL
- [ ] Frontend vercel.json created
- [ ] Backend deployed and URL noted
- [ ] Frontend .env.production updated with backend URL
- [ ] Frontend deployed
- [ ] API calls tested
- [ ] Frontend-backend integration verified
- [ ] Custom domains set up (optional)

---

## 💡 Alternative: All-in-One Backend Deployment

If you prefer a single deployment, you can:

1. Serve frontend as static files from backend
2. Deploy entire project as single Vercel project

This requires restructuring backend/server.js to serve frontend/dist files.

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- GitHub Actions integration: https://vercel.com/docs/git/vercel-for-github
- Environment variables: https://vercel.com/docs/projects/environment-variables
