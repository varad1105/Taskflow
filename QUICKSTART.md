# Quick Start Guide - TaskFlow Pro

Get TaskFlow Pro running on your local machine in 5 minutes.

## Prerequisites

- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- MongoDB Atlas account - [Sign up free](https://www.mongodb.com/cloud/atlas)

## Step 1: Clone and Install

```bash
# Navigate to project directory
cd TaskPilot

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Network Access - Add IP: `0.0.0.0/0`
6. Get connection string from "Connect" → "Connect your application"

## Step 3: Configure Environment Variables

### Backend
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
NODE_ENV=development
```

### Frontend
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

## Step 4: Start the Application

### Option 1: Start Both (Recommended)
From project root:
```bash
npm run dev
```

### Option 2: Start Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Create Task"
3. Fill in the form:
   - Title: "My first task"
   - Description: "This is a test task"
   - Priority: Medium
   - Status: Pending
   - Category: Work
   - Due Date: Select a future date
4. Click "Create Task"
5. View your task on the Dashboard or All Tasks page

## Available Scripts

### Root
```bash
npm run install:all      # Install all dependencies
npm run dev              # Start both backend and frontend
npm run dev:backend      # Start backend only
npm run dev:frontend     # Start frontend only
npm run build:frontend   # Build frontend for production
```

### Backend
```bash
npm start                # Start production server
npm run dev              # Start development server with nodemon
```

### Frontend
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

## Project Structure

```
TaskPilot/
├── backend/             # Express.js API
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middleware
│   └── utils/          # Utility functions
├── frontend/           # React.js UI
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom hooks
│   │   ├── services/   # API services
│   │   ├── context/    # React context
│   │   └── utils/      # Utility functions
│   └── public/         # Static assets
└── README.md           # Project documentation
```

## Common Issues

### MongoDB Connection Error
- Verify your connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure username and password are correct

### Port Already in Use
- Change PORT in backend/.env
- Kill process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill
  ```

### Frontend Not Connecting to Backend
- Verify backend is running
- Check VITE_API_URL in frontend/.env
- Check browser console for CORS errors

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Explore the codebase and customize as needed

## Support

For issues or questions:
1. Check the README.md documentation
2. Review console logs for errors
3. Verify all environment variables the set correctly
