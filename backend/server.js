
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

dotenv.config();
const app = express();
const server = http.createServer(app);

// Configure CORS for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
};

const io = socketIo(server, { 
  cors: corsOptions
});

app.use(cors(corsOptions));
app.use(express.json());

// Ensure MONGO_URI is provided
if (!process.env.MONGO_URI) {
  console.error('FATAL: MONGO_URI is not set. Set the MongoDB connection string in environment variables.');
  console.error('On Render: go to your service -> Environment -> Add `MONGO_URI`');
  process.exit(1);
}

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'SocialVerse 2060 API is running' });
});

io.on('connection', socket => {
  console.log("New client connected");
  socket.on("newComment", data => {
    io.emit("commentAdded", data);
  });
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
