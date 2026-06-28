const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, closeDB } = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB (async) and start server after DB ready
let server;
const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('Continuing without persistent MongoDB - some features may be limited.');
  }

  server = app.listen(PORT, HOST, () => {
    console.log(`Server running in ${NODE_ENV} mode on ${HOST}:${PORT}`);
  });

  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges.`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use. Stop the process using this port or set a different PORT in backend/.env.`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(require('./middlewares/errorHandler'));

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down server...`);
  try {
    if (server) {
      server.close(() => console.log('HTTP server closed'));
    }
    await closeDB();
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  shutdown('uncaughtException');
});

// Start everything
startServer();
