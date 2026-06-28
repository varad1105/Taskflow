# Deployment Guide - TaskFlow Pro

This guide will help you deploy TaskFlow Pro to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Render account (for backend)
- Vercel account (for frontend)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user with username and password
5. Network Access - Whitelist IP: `0.0.0.0/0` (for development)
6. Get your connection string from "Connect" → "Connect your application"
7. Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`

## Step 2: Backend Deployment (Render)

### 2.1 Prepare Backend

1. Push your code to GitHub
2. Ensure `backend/.env` is NOT committed (it's in .gitignore)
3. Create `backend/.env.example` for reference

### 2.2 Deploy to Render

1. Go to [Render](https://render.com)
2. Sign up/login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: taskflow-backend
   - **Region**: Choose nearest region
   - **Branch**: main
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Add Environment Variables:
   - `PORT`: 5000
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
7. Click "Deploy Web Service"
8. Wait for deployment (2-5 minutes)
9. Copy your backend URL (e.g., `https://taskflow-backend.onrender.com`)

## Step 3: Frontend Deployment (Vercel)

### 3.1 Prepare Frontend

1. Update `frontend/.env` with your deployed backend URL:
   ```
   VITE_API_URL=https://taskflow-backend.onrender.com
   ```
2. Commit and push changes to GitHub

### 3.2 Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up/login
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Environment Variables**:
     - `VITE_API_URL`: Your backend URL
6. Click "Deploy"
7. Wait for deployment (1-2 minutes)
8. Copy your frontend URL

## Step 4: Verify Deployment

1. Visit your frontend URL
2. Try creating a task
3. Verify it appears in the database
4. Test all CRUD operations

## Environment Variables Summary

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### Backend Issues

**Problem**: Database connection failed
- **Solution**: Check MongoDB Atlas whitelist settings and connection string

**Problem**: Server not starting
- **Solution**: Check Render logs for errors, verify all dependencies are installed

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Verify CORS is enabled on backend, check API URL in .env

**Problem**: Build fails
- **Solution**: Check Vercel build logs, ensure all dependencies are in package.json

## Production Best Practices

1. **Security**: Never commit .env files
2. **Monitoring**: Use Render and Vercel dashboards for monitoring
3. **Backups**: Enable MongoDB Atlas automated backups
4. **Updates**: Regularly update dependencies
5. **Testing**: Test thoroughly before deploying to production

## Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records as instructed

### Render Custom Domain
1. Go to Render service settings
2. Add custom domain
3. Update DNS records as instructed

## Scaling

### Backend Scaling
- Upgrade to paid Render plan for more resources
- Add load balancers if needed
- Consider Redis for caching

### Frontend Scaling
- Vercel automatically scales
- Enable CDN for static assets
- Optimize bundle size

## Cost Estimate

- **MongoDB Atlas**: Free tier (512MB storage)
- **Render**: Free tier (limited resources) or $7/month for basic
- **Vercel**: Free tier (generous limits)

Total: **Free** or **~$7/month** for better performance
