# 🚀 DEPLOY TO VERCEL NOW

## Option 1: Vercel Dashboard (Easiest - 5 minutes)

1. **Go to:** https://vercel.com/new
2. **Import Git Repository:** `Tru06/fix-automaton-dash`
3. **Configure Project:**
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables:**
   ```
   VITE_API_URL = http://localhost:3000/api
   VITE_API_KEY = bugripper_2024_secure_key_harsh_valiyan
   VITE_USE_MOCK_DATA = true
   ```
5. **Click "Deploy"**
6. **Wait 2-3 minutes**
7. **Copy your live URL:** `https://fix-automaton-dash.vercel.app`

## Option 2: Vercel CLI (Fast - 2 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: fix-automaton-dash
# - Directory: ./
# - Override settings? No

# Done! Copy the URL
```

## After Deployment

### 1. Test Your Live Site
- Open the Vercel URL
- Click "Launch Dashboard"
- Try entering a repository URL
- Verify it works

### 2. Update README
Replace `http://localhost:8080` with your Vercel URL

### 3. Get Your URLs
- **Live Demo:** https://your-project.vercel.app
- **Dashboard:** https://your-project.vercel.app/dashboard

## Troubleshooting

### Build Failed?
Check Vercel logs. Common fixes:
- Make sure `package.json` has correct build script
- Check for TypeScript errors: `npm run build` locally
- Verify Node version (18+)

### Site Loads But Doesn't Work?
- Check environment variables are set
- Make sure `VITE_USE_MOCK_DATA=true` for demo
- Clear browser cache

### "Demo Mode" Badge Shows?
This is normal! It means mock data mode is active (instant results).

## Next Steps

1. ✅ Deploy to Vercel
2. ⏭️ Record 2-3 min video
3. ⏭️ Post on LinkedIn with @RIFT2026
4. ⏭️ Submit to RIFT 2026

**Your live URL will be:** `https://fix-automaton-dash-[random].vercel.app`

Copy this URL for your submission!
