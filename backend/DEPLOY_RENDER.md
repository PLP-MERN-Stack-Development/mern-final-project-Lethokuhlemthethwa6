# 🚀 Deploy Backend to Render

## Quick Deploy Steps

### 1. Prepare Your Repository
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
```

Push to GitHub:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Create MongoDB Atlas Database (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/socialmedia?retryWrites=true&w=majority
   ```

### 3. Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `socialverse-api` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 4. Add Environment Variables

In Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate a random secret (e.g., `openssl rand -base64 32`) |
| `PORT` | `10000` (Render's default, auto-set) |
| `FRONTEND_URL` | Your Vercel frontend URL (add after deploying frontend) |

### 5. Deploy

Click **"Create Web Service"** and wait for deployment (2-3 minutes).

Your API will be available at: `https://your-service-name.onrender.com`

### 6. Test Your API

Visit: `https://your-service-name.onrender.com/`

You should see:
```json
{
  "message": "SocialVerse 2060 API is running"
}
```

Test API endpoints:
- GET `https://your-service-name.onrender.com/api/posts`
- POST `https://your-service-name.onrender.com/api/users/register`

### 7. Update Frontend

After backend is deployed, update your frontend's API URL to:
```
https://your-service-name.onrender.com
```

## Environment Variables Reference

**Required**:
- `MONGO_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens

**Optional**:
- `PORT` - Port number (Render sets this automatically)
- `FRONTEND_URL` - Your frontend URL for CORS

## Important Notes

⚠️ **Free Tier Limitations**:
- Service spins down after 15 minutes of inactivity
- First request after spindown takes 30-60 seconds (cold start)
- Upgrade to paid plan ($7/month) for always-on service

✅ **Features Enabled**:
- ✅ Environment variable support
- ✅ CORS configured
- ✅ Health check endpoint
- ✅ Dynamic port binding
- ✅ Production-ready error handling

## Troubleshooting

**Build Fails**:
- Check Node version in `package.json` (`"engines": {"node": ">=14.x"}`)
- Verify all dependencies are in `package.json`

**Cannot Connect to MongoDB**:
- Check MongoDB Atlas IP whitelist (use `0.0.0.0/0` for all IPs)
- Verify connection string has correct username/password
- Ensure database name is included in connection string

**CORS Errors**:
- Add your frontend URL to `FRONTEND_URL` environment variable
- Check that CORS is properly configured in `server.js`

**Socket.io Not Working**:
- Render free tier supports WebSockets
- Ensure Socket.io client connects to the Render URL
- Check browser console for connection errors

## Next Steps

1. ✅ Backend deployed to Render
2. 📝 Copy your Render API URL
3. 🚀 Update frontend to use production API URL
4. 🌐 Deploy frontend to Vercel

Your backend is now production-ready! 🎉
