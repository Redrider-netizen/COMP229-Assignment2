# Render Deployment Guide

## Overview
This full-stack application (MERN) is ready to be deployed to [Render.com](https://render.com).

## Prerequisites
- GitHub account with this repository pushed
- Render account (free tier available)
- MongoDB Atlas account (for database)

## Deployment Steps

### 1. Prepare Your Repository
Ensure all files are committed to GitHub:
```bash
git add .
git commit -m "Render deployment configuration"
git push origin main
```

### 2. Set Up Environment Variables

Create environment variables in Render for both services:

**Backend Service:**
- `MONGO_URI` - Your MongoDB connection string
- `NODE_ENV` - Set to `production`
- `PORT` - Set to `3000`

**Frontend Service:**
- `REACT_APP_API_URL` - Backend service URL (e.g., `https://portfolio-backend.onrender.com`)
- `NODE_ENV` - Set to `production`

### 3. Deploy Backend Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +"
3. Select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name:** `portfolio-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `./Backend` (optional, if you want)
   
   OR for root-level deployment:
   - **Start Command:** `npm run backend`

6. Add environment variables (MONGO_URI, NODE_ENV)
7. Click "Deploy"

### 4. Deploy Frontend Service

1. Click "New +" in dashboard
2. Select "Web Service"
3. Connect the same repository
4. Configure the service:
   - **Name:** `portfolio-frontend`
   - **Environment:** `Node`
   - **Build Command:** `npm run build` (or configure in package.json)
   - **Start Command:** `npm run frontend` or serve the built files
   - **Root Directory:** `./frontend`

5. Add environment variables (REACT_APP_API_URL)
6. Click "Deploy"

### 5. Alternative: Single Service Deployment (Simpler)

If you want to run both frontend and backend from one service:

1. Update the root `package.json` start script to serve both
2. Configure Backend to serve the frontend static files
3. This reduces costs but may have performance implications

### 6. Database Configuration

Update your `.env` file (locally) with:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
NODE_ENV=production
PORT=3000
```

Then set the same `MONGO_URI` in Render environment variables.

### 7. Connect Front and Backend

The frontend uses `process.env.REACT_APP_API_URL` to communicate with the backend.

Update your API calls in `frontend/src/services/api.js`:
```javascript
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
```

### 8. Verify Deployment

1. Visit your frontend URL from the Render dashboard
2. Check that API calls work correctly
3. Monitor logs for any errors
4. Test all CRUD operations

## Troubleshooting

### Port Issues
- Render automatically assigns ports; ensure your backend listens to `process.env.PORT`

### Database Connection
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for dev)

### CORS Issues
- Verify CORS is enabled in Backend/index.js
- Check frontend environment variables

### Build Failures
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json (not just package-lock.json)

## File Structure
```
.
├── Backend/
│   ├── index.js
│   ├── config/
│   ├── Controllers/
│   ├── Models/
│   ├── routes/
│   └── routers/
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
├── .env (local only)
├── .env.example
├── .gitignore
├── package.json
└── render.yaml
```

## Environment Variables Reference

| Variable | Backend | Frontend | Example |
|----------|---------|----------|---------|
| MONGO_URI | ✓ | ✗ | mongodb+srv://... |
| PORT | ✓ | ✗ | 3000 |
| NODE_ENV | ✓ | ✓ | production |
| REACT_APP_API_URL | ✗ | ✓ | https://backend.onrender.com |

## Costs
- Render free tier includes:
  - CPU: Shared
  - Memory: 512 MB
  - Monthly hours: 750 (enough for 1 web service)
- For multiple services, consider paid tier ($20+/month)

## Next Steps
- Set up CI/CD for automatic deployments on push
- Monitor application performance
- Set up error logging (e.g., Sentry)
- Configure custom domain (if applicable)
