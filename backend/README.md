# AI Fix Agent Backend

Backend API server for the AI Fix Agent Dashboard with OpenAI GPT-4 integration.

## Features

- ✅ API Key Authentication
- ✅ GitHub Repository Cloning
- ✅ AI-Powered Code Analysis (GPT-4)
- ✅ Bug Detection & Classification
- ✅ Automated Fix Suggestions
- ✅ CI/CD Simulation
- ✅ Score Calculation

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file:

```env
PORT=3000
NODE_ENV=development

# API Keys
VALID_API_KEYS=bugripper_2024_secure_key_harsh_valiyan

# OpenAI API Key (REQUIRED)
OPENAI_API_KEY=sk-your-openai-api-key-here

# GitHub Token (optional, for private repos)
GITHUB_TOKEN=ghp_your_github_token_here

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Temporary Directory
TEMP_DIR=./temp
```

### 3. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste into `.env` file

**Cost**: ~$0.01-0.10 per repository analysis

### 4. Start Server

```bash
npm run dev
```

Server will start on http://localhost:3000

## API Endpoints

### 1. Verify API Key
```bash
GET /api/verify
Headers:
  X-API-Key: your_api_key
```

### 2. Analyze Repository
```bash
POST /api/analyze
Headers:
  X-API-Key: bugripper_2024_secure_key_harsh_valiyan
  Content-Type: application/json
Body:
{
  "repo": "https://github.com/user/repo",
  "team": "BUG_RIPPER",
  "leader": "Harsh Valiyan"
}
```

### 3. Get Status
```bash
GET /api/status/:runId
Headers:
  X-API-Key: your_api_key
```

## Testing

### Test with curl:

```bash
# Verify API key
curl http://localhost:3000/api/verify \
  -H "X-API-Key: bugripper_2024_secure_key_harsh_valiyan"

# Analyze repository
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: bugripper_2024_secure_key_harsh_valiyan" \
  -d '{
    "repo": "https://github.com/facebook/react",
    "team": "BUG_RIPPER",
    "leader": "Harsh Valiyan"
  }'
```

## Architecture

```
backend/
├── src/
│   ├── server.js              # Express server
│   ├── routes/
│   │   └── api.js            # API routes
│   ├── middleware/
│   │   ├── auth.js           # API key validation
│   │   └── errorHandler.js   # Error handling
│   └── services/
│       ├── gitService.js     # Git operations
│       ├── aiService.js      # OpenAI integration
│       └── analysisService.js # Analysis logic
├── package.json
├── .env.example
└── README.md
```

## How It Works

1. **Clone Repository**: Downloads GitHub repo to temp directory
2. **Scan Files**: Finds all code files (.js, .ts, .py, etc.)
3. **AI Analysis**: Sends code to GPT-4 for bug detection
4. **Generate Fixes**: AI suggests fixes for each bug
5. **Simulate CI/CD**: Runs mock test pipelines
6. **Calculate Score**: Computes performance metrics
7. **Cleanup**: Removes temporary files

## Security

- API key authentication required
- CORS enabled for frontend
- Rate limiting (100 requests per 15 minutes)
- Temporary files auto-deleted
- Environment variables for secrets

## Troubleshooting

### "Invalid API key"
- Check `.env` has correct `OPENAI_API_KEY`
- Verify key starts with `sk-`
- Check OpenAI account has credits

### "Failed to clone repository"
- Check repository URL is correct
- For private repos, add `GITHUB_TOKEN`
- Ensure git is installed

### "AI analysis failed"
- Check OpenAI API key is valid
- Verify internet connection
- Check OpenAI service status

## Cost Estimation

- GPT-4 API: ~$0.03 per 1K tokens
- Average analysis: 2-5K tokens
- Cost per repo: $0.06-0.15
- 100 analyses: ~$6-15

## Next Steps

1. ✅ Backend created with AI integration
2. ⏳ Connect frontend to backend
3. ⏳ Test with real repositories
4. ⏳ Deploy to production
5. ⏳ Add more analysis tools (ESLint, TypeScript)
