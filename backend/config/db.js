const mongoose = require('mongoose');
let mongoMemoryServer = null;

async function startInMemoryMongo() {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  mongoMemoryServer = await MongoMemoryServer.create();
  const uri = mongoMemoryServer.getUri();
  return uri;
}

const connectDB = async () => {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI not set — will try in-memory MongoDB for development.');
  }

  const tryConnect = async (targetUri) => {
    const conn = await mongoose.connect(targetUri);
    console.log(`MongoDB Connected: ${conn.connection.host || conn.connection.name}`);
    return { uri: targetUri, inMemory: !!mongoMemoryServer };
  };

  try {
    if (!uri) {
      uri = await startInMemoryMongo();
      console.log('Started in-memory MongoDB for development.');
    }

    return await tryConnect(uri);
  } catch (error) {
    if (uri && process.env.MONGODB_URI) {
      console.warn(`Primary MongoDB connection failed (${error.message}). Retrying with in-memory MongoDB for development.`);
      try {
        const memoryUri = await startInMemoryMongo();
        console.log('Started in-memory MongoDB for development after fallback.');
        return await tryConnect(memoryUri);
      } catch (fallbackError) {
        console.error(`MongoDB connection error: ${fallbackError.message}`);
        throw fallbackError;
      }
    }

    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

const closeDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
      mongoMemoryServer = null;
      console.log('Stopped in-memory MongoDB');
    }
  } catch (err) {
    console.warn('Error during DB close:', err.message || err);
  }
};

module.exports = {
  connectDB,
  closeDB,
};
