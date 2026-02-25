# 🚀 DEPLOYMENT GUIDE - RIFT 2026 Hackathon

## Quick Deploy to Vercel (5 minutes)

### Step 1: Prepare for Deployment

```bash
# Make sure everything is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository: `Tru06/fix-automaton-dash`
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_API_KEY=bugripper_2024_secure_key_harsh_valiyan
   VITE_USE_MOCK_DATA=true
   ```
6. Click "Deploy"
7. Wait 2-3 minutes
8. Get your live URL: `https://your-project.vercel.app`

### Step 3: Update README

Replace `http://localhost:8080` with your Vercel URL in README.md

## Alternative: Deploy to Netlify

### Option 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod
```

### Option 2: Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `dist` folder
3. Get your live URL

## Backend Deployment (Optional)

### Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repo
4. Select `backend` folder
5. Add environment variables from `backend/.env`
6. Deploy
7. Update frontend `VITE_API_URL` with Railway URL

## Video Recording Guide

### What to Show (2-3 minutes)

1. **Introduction (15s)**
   - "Hi, I'm [Name] from Team BUG_RIPPER"
   - "This is our AI Fix Agent for RIFT 2026"

2. **Architecture Diagram (30s)**
   - Show the multi-agent system
   - Explain workflow: Clone → Analyze → Fix → Verify

3. **Live Demo (90s)**
   - Open dashboard
   - Enter repository URL
   - Show real-time analysis
   - Display results

4. **Results Dashboard (30s)**
   - Score breakdown
   - Fixes table
   - CI/CD timeline

5. **Conclusion (15s)**
   - "Fully autonomous, no human intervention"
   - "Thank you!"

### Recording Tools

- **Screen Recording:** OBS Studio, Loom, or built-in screen recorder
- **Video Editing:** DaVinci Resolve (free) or iMovie
- **Upload:** LinkedIn with tag @RIFT2026

### LinkedIn Post Template

```
🤖 Excited to share our RIFT 2026 Hackathon submission!

Team: BUG_RIPPER
Project: AI Fix Agent - Autonomous CI/CD Healing Agent

Our agent autonomously:
✅ Detects code issues
✅ Generates fixes
✅ Verifies through CI/CD
✅ Iterates until all tests pass

Built with React, Node.js, and OpenAI GPT-4

🔗 Live Demo: [your-vercel-url]
💻 GitHub: https://github.com/Tru06/fix-automaton-dash

@RIFT2026 #RIFT2026 #Hackathon #AI #DevOps #Automation

[Attach 2-3 min video]
```

## Submission Checklist

Before submitting:

- [ ] Frontend deployed to Vercel/Netlify
- [ ] Live URL is publicly accessible
- [ ] README updated with live URL
- [ ] Video recorded (2-3 min)
- [ ] Video posted on LinkedIn with @RIFT2026 tag
- [ ] GitHub repository is public
- [ ] All code committed and pushed
- [ ] Environment variables configured
- [ ] Test the live deployment

## Troubleshooting

### Build Fails on Vercel

```bash
# Test build locally first
npm run build

# If it works locally, check Vercel logs
# Common issues:
# - Missing environment variables
# - Node version mismatch
# - TypeScript errors
```

### "Demo Mode" Badge Shows

This is normal! It shows when using mock data mode. To remove:
1. Set `VITE_USE_MOCK_DATA=false` in Vercel environment variables
2. Redeploy

### Video Too Large for LinkedIn

- Compress video using HandBrake
- Target: < 200MB, 720p resolution
- Or upload to YouTube and share link

## Final Steps

1. Deploy frontend ✅
2. Get live URL ✅
3. Update README ✅
4. Record video ✅
5. Post on LinkedIn ✅
6. Submit to RIFT 2026 ✅

**Good luck! 🏆**
