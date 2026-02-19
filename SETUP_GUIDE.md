# Complete Setup Guide - AI Fix Agent

## Overview
This guide will help you set up both frontend and backend with AI integration.

## Prerequisites

- Node.js 18+ installed
- Git installed
- OpenAI API account (for GPT-4 access)
- GitHub account (optional, for private repos)

## Part 1: Backend Setup

### Step 1: Navigate to Backend

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Express (web server)
- OpenAI SDK (GPT-4 integration)
- simple-git (GitHub operations)
- CORS, dotenv, etc.

### Step 3: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. **Important**: Add payment method to OpenAI account

### Step 4: Configure Backend Environment

Create `backend/.env`:

```env
PORT=3000
NODE_ENV=development

# API Keys (must match frontend)
VALID_API_KEYS=bugripper_2024_secure_key_harsh_valiyan

# OpenAI API Key (REQUIRED)
OPENAI_API_KEY=sk-your-actual-openai-key-here

# GitHub Token (optional, for private repos)
GITHUB_TOKEN=ghp_your_github_token_here

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Temporary Directory
TEMP_DIR=./temp
```

### Step 5: Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:3000
📊 API endpoint: http://localhost:3000/api
🔑 API Key authentication enabled
```

### Step 6: Test Backend

Open new terminal:

```bash
# Test API key verification
curl http://localhost:3000/api/verify \
  -H "X-API-Key: bugripper_2024_secure_key_harsh_valiyan"

# Should return: {"valid":true,"message":"API key is valid"}
```

## Part 2: Frontend Setup

### Step 1: Navigate to Frontend (Root Directory)

```bash
cd ..  # Go back to root
```

### Step 2: Update Frontend Environment

Edit `.env` file:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api

# API Key (must match backend)
VITE_API_KEY=bugripper_2024_secure_key_harsh_valiyan

# IMPORTANT: Set to false to use real API
VITE_USE_MOCK_DATA=false
```

### Step 3: Restart Frontend

```bash
# Stop current dev server (Ctrl+C)
npm run dev
```

### Step 4: Test Full Integration

1. Open http://localhost:8080/
2. Click "Launch Dashboard"
3. Enter repository details:
   - Repository: `https://github.com/facebook/react`
   - Team: `BUG_RIPPER`
   - Leader: `Harsh Valiyan`
4. Click "Run Analysis"
5. Wait for AI analysis (30-60 seconds)
6. View results!

## Part 3: Verification

### Backend Health Check

```bash
curl http://localhost:3000/health
```

Should return:
```json
{
  "status": "ok",
  "message": "AI Fix Agent Backend is running"
}
```

### Frontend-Backend Connection

Check browser console (F12) for:
- ✅ No CORS errors
- ✅ API requests to localhost:3000
- ✅ Successful responses

### AI Analysis Test

Try analyzing a small repository:

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: bugripper_2024_secure_key_harsh_valiyan" \
  -d '{
    "repo": "https://github.com/vercel/next.js",
    "team": "BUG_RIPPER",
    "leader": "Harsh Valiyan"
  }'
```

## Troubleshooting

### Issue: "Invalid API key"

**Solution**:
1. Check `.env` files match in both frontend and backend
2. Restart both servers after changing `.env`
3. Verify no extra spaces in API key

### Issue: "OpenAI API error"

**Solution**:
1. Verify OpenAI API key is correct
2. Check OpenAI account has credits
3. Ensure key starts with `sk-`
4. Check https://platform.openai.com/account/usage

### Issue: "Failed to clone repository"

**Solution**:
1. Check repository URL is correct and public
2. For private repos, add GitHub token
3. Ensure git is installed: `git --version`

### Issue: "CORS error"

**Solution**:
1. Backend must be running on port 3000
2. Frontend must be on port 8080
3. Check backend CORS configuration in `server.js`

### Issue: "Connection refused"

**Solution**:
1. Ensure backend is running: `cd backend && npm run dev`
2. Check port 3000 is not in use
3. Verify `VITE_API_URL` in frontend `.env`

## Cost Management

### OpenAI API Costs

- GPT-4: ~$0.03 per 1K tokens
- Average analysis: 2-5K tokens per file
- Cost per repository: $0.10-0.50
- Set usage limits in OpenAI dashboard

### Optimization Tips

1. Limit files analyzed (currently 10 files max)
2. Skip large files (>10KB)
3. Use GPT-3.5-turbo for cheaper analysis
4. Cache results for same repositories

## Production Deployment

### Backend (Heroku/Railway/Render)

1. Set environment variables
2. Use production OpenAI key
3. Enable HTTPS
4. Add rate limiting
5. Set up monitoring

### Frontend (Vercel/Netlify)

1. Set `VITE_API_URL` to production backend URL
2. Set `VITE_USE_MOCK_DATA=false`
3. Enable HTTPS
4. Configure CORS on backend

## Architecture

```
┌─────────────────┐
│   Frontend      │
│  (React + Vite) │
│  Port: 8080     │
└────────┬────────┘
         │ HTTP + API Key
         │
┌────────▼────────┐
│   Backend       │
│  (Express.js)   │
│  Port: 3000     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼────┐
│ Git  │  │OpenAI │
│Clone │  │ GPT-4 │
└──────┘  └───────┘
```

## Next Steps

1. ✅ Backend created with AI
2. ✅ Frontend configured
3. ⏳ Test with real repositories
4. ⏳ Add more analysis tools
5. ⏳ Deploy to production

## Support

For issues:
1. Check backend logs
2. Check browser console
3. Verify API keys
4. Test with curl commands
5. Check OpenAI status

## Success Checklist

- [ ] Backend running on port 3000
- [ ] Frontend running on port 8080
- [ ] OpenAI API key configured
- [ ] `.env` files match
- [ ] `VITE_USE_MOCK_DATA=false`
- [ ] Test analysis works
- [ ] No CORS errors
- [ ] Results display correctly

🎉 **You're ready to analyze repositories with AI!**
