# TaskFlow Pro – Smart Task Management System

A modern, production-ready task management application built with the MERN stack. Create, manage, edit, delete, search, filter, and organize your daily tasks with a beautiful UI and seamless user experience.

## 🚀 Features

- **Full CRUD Operations** - Create, read, update, and delete tasks
- **Advanced Search** - Search tasks by title and description
- **Smart Filtering** - Filter by priority, status, category, and due date
- **Flexible Sorting** - Sort by newest, oldest, priority, due date, or alphabetically
- **Dashboard Statistics** - View task statistics and progress
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-friendly interface
- **Toast Notifications** - Real-time feedback for user actions
- **Form Validation** - Client and server-side validation
- **Loading States** - Smooth loading indicators
- **Task Categories** - Personal, Work, Study, Health, Other
- **Priority Levels** - Low, Medium, High
- **Status Tracking** - Pending, In Progress, Completed

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

### Deployment
- **Frontend** - Vercel
- **Backend** - Render
- **Database** - MongoDB Atlas

## 📁 Project Structure

```
TaskFlow-Pro/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── asyncHandler.js
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── EmptyState.jsx
│   │   │   ├── task/
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   ├── TaskForm.jsx
│   │   │   │   ├── DeleteConfirmation.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── FilterPanel.jsx
│   │   │   └── statistics/
│   │   │       └── StatisticsCards.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useTasks.js
│   │   │   ├── useTheme.js
│   │   │   └── useDebounce.js
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AllTasks.jsx
│   │   │   ├── CreateTask.jsx
│   │   │   ├── EditTask.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB Atlas connection string
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## 🌐 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Task Schema
```javascript
{
  title: String (required),
  description: String (required),
  priority: String (required) - Low, Medium, High,
  status: String (required) - Pending, In Progress, Completed,
  category: String (required) - Personal, Work, Study, Health, Other,
  dueDate: Date (required),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🚀 Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Create a new account on [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Set build command: `npm install`
6. Set start command: `node server.js`
7. Add environment variables in Render dashboard
8. Deploy!

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Create a new account on [Vercel](https://vercel.com)
3. Import your repository
4. Set root directory to `frontend`
5. Add environment variables
6. Deploy!

### MongoDB Atlas Setup

1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Get your connection string
6. Add it to your `.env` file

## 📸 Screenshots

*Add screenshots of your application here*

## 🎯 Future Improvements

- [ ] User authentication and authorization
- [ ] Task collaboration features
- [ ] File attachments for tasks
- [ ] Task comments and discussions
- [ ] Email notifications
- [ ] Calendar view
- [ ] Task templates
- [ ] Subtasks
- [ ] Task dependencies
- [ ] Time tracking
- [ ] Export tasks to PDF/CSV
- [ ] Mobile app (React Native)
- [ ] Real-time updates (Socket.io)
- [ ] Advanced analytics and reports

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ using MERN Stack

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
