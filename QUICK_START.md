# Quick Start Guide

Follow these steps to get your MERN Social Media Application running:

## Step 1: Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```powershell
   cd backend
   ```

2. Make sure you have a `.env` file with:
   ```env
   MONGO_URI=mongodb://localhost:27017/social-media
   JWT_SECRET=mysecretkey123
   ```

3. Start the backend server:
   ```powershell
   node server.js
   ```

   You should see:
   - "MongoDB connected"
   - "Server running on port 5000"

## Step 2: Frontend Setup

1. Open a NEW terminal and navigate to the frontend folder:
   ```powershell
   cd frontend
   ```

2. Start the development server:
   ```powershell
   npm run dev
   ```

   The app will open at `http://localhost:5173`

## Step 3: Test the Application

1. **Register a new user:**
   - Click "Sign up" on the login page
   - Enter a username and password
   - You'll be automatically logged in and redirected to the home page

2. **Create a post:**
   - Type something in the "What's on your mind?" box
   - Click "Post"
   - Your post will appear in the feed

3. **Add a comment:**
   - Click "Show Comments" on any post
   - Type your comment and click "Comment"
   - The comment will appear instantly (thanks to Socket.io!)

4. **View your profile:**
   - Click "Profile" in the header
   - See all your posts

5. **Test real-time updates:**
   - Open the app in two different browser windows
   - Add a comment in one window
   - Watch it appear instantly in the other window!

## Common Issues

### MongoDB Connection Error
If you see "MongoDB connection error", make sure:
- MongoDB is installed and running
- Or update `MONGO_URI` in `.env` to use MongoDB Atlas

### Port Already in Use
If port 5000 or 5173 is busy:
- Backend: Change the port in `server.js`
- Frontend: Vite will automatically suggest another port

### CORS Errors
The backend is configured to accept requests from any origin. If you still get CORS errors, check that the backend is running.

## Next Steps

- Register multiple users to see posts from different people
- Try logging out and back in to see persistent authentication
- Test the real-time comment feature with multiple browser tabs

Enjoy your social media app! 🚀
