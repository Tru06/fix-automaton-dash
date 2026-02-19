# API Authentication Guide

## Overview
This document explains how to set up API key authentication between the frontend dashboard and backend API.

## Frontend Configuration

### 1. Environment Variables

Create a `.env` file in the project root:

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api

# API Key for authentication
VITE_API_KEY=bugripper_2024_secure_key_harsh_valiyan

# Use mock data (true) or real API (false)
VITE_USE_MOCK_DATA=false
```

### 2. API Key Format

The API key should be:
- **Unique** per team/user
- **Secure** (minimum 32 characters)
- **Rotatable** (can be regenerated)

**Example Format:**
```
{team_name}_{year}_{random_string}_{leader_name}
bugripper_2024_secure_key_harsh_valiyan
```

### 3. Frontend API Client

The frontend sends the API key in two headers:
- `X-API-Key`: Custom header with the API key
- `Authorization`: Bearer token format

```typescript
headers: {
  "Content-Type": "application/json",
  "X-API-Key": "your_api_key_here",
  "Authorization": "Bearer your_api_key_here"
}
```

## Backend Implementation

### 1. API Key Validation Middleware

```javascript
// middleware/auth.js
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || 
                 req.headers['authorization']?.replace('Bearer ', '');
  
  if (!apiKey) {
    return res.status(401).json({
      error: 'API key is required',
      message: 'Please provide an API key in X-API-Key header'
    });
  }
  
  // Validate against database or environment variable
  const validKeys = process.env.VALID_API_KEYS?.split(',') || [];
  
  if (!validKeys.includes(apiKey)) {
    return res.status(403).json({
      error: 'Invalid API key',
      message: 'The provided API key is not valid'
    });
  }
  
  // Attach user/team info to request
  req.apiKey = apiKey;
  req.team = getTeamFromApiKey(apiKey);
  
  next();
};

module.exports = { validateApiKey };
```

### 2. Apply Middleware to Routes

```javascript
// routes/api.js
const express = require('express');
const router = express.Router();
const { validateApiKey } = require('../middleware/auth');

// Verify endpoint (no auth required)
router.get('/verify', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  const isValid = validateKey(apiKey);
  res.json({ valid: isValid });
});

// Protected endpoints
router.post('/analyze', validateApiKey, async (req, res) => {
  const { repo, team, leader } = req.body;
  
  // Process analysis
  const result = await analyzeRepository(repo, team, leader);
  
  res.json(result);
});

router.get('/status/:runId', validateApiKey, async (req, res) => {
  const { runId } = req.params;
  
  const status = await getAnalysisStatus(runId);
  
  res.json(status);
});

module.exports = router;
```

### 3. Environment Variables (Backend)

```env
# .env (backend)
PORT=3000
NODE_ENV=production

# Comma-separated list of valid API keys
VALID_API_KEYS=bugripper_2024_secure_key_harsh_valiyan,team2_key,team3_key

# Or use a database
DATABASE_URL=postgresql://user:pass@localhost:5432/bugfixer

# GitHub token for repository access
GITHUB_TOKEN=ghp_your_github_token_here

# Rate limiting
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Database Schema (Optional)

For production, store API keys in a database:

```sql
CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  team_name VARCHAR(100) NOT NULL,
  leader_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  rate_limit INTEGER DEFAULT 100,
  last_used_at TIMESTAMP
);

CREATE INDEX idx_api_keys_key ON api_keys(key);
CREATE INDEX idx_api_keys_active ON api_keys(is_active);
```

### 5. API Key Generation

```javascript
// utils/generateApiKey.js
const crypto = require('crypto');

function generateApiKey(teamName, leaderName) {
  const year = new Date().getFullYear();
  const randomString = crypto.randomBytes(16).toString('hex');
  
  const key = `${teamName}_${year}_${randomString}_${leaderName}`
    .toLowerCase()
    .replace(/\s+/g, '_');
  
  return key;
}

// Example usage
const apiKey = generateApiKey('BUG_RIPPER', 'Harsh Valiyan');
console.log(apiKey);
// Output: bug_ripper_2024_a3f5c8d9e2b1f4a6_harsh_valiyan
```

## Security Best Practices

### 1. HTTPS Only
```javascript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

### 2. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each API key to 100 requests per windowMs
  keyGenerator: (req) => req.apiKey || req.ip,
  message: 'Too many requests from this API key'
});

app.use('/api/', apiLimiter);
```

### 3. API Key Rotation
```javascript
// Rotate API key
async function rotateApiKey(oldKey) {
  const team = await getTeamByApiKey(oldKey);
  const newKey = generateApiKey(team.name, team.leader);
  
  await db.query(
    'UPDATE api_keys SET key = $1, is_active = false WHERE key = $2',
    [newKey, oldKey]
  );
  
  return newKey;
}
```

### 4. Logging & Monitoring
```javascript
// Log API key usage
function logApiKeyUsage(apiKey, endpoint, success) {
  db.query(
    'INSERT INTO api_key_logs (api_key, endpoint, success, timestamp) VALUES ($1, $2, $3, NOW())',
    [apiKey, endpoint, success]
  );
}

// Monitor for suspicious activity
function detectAnomalies(apiKey) {
  // Check for unusual patterns
  // - Too many failed requests
  // - Requests from multiple IPs
  // - Unusual time patterns
}
```

## Testing

### 1. Test API Key Validation

```bash
# Valid API key
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: bugripper_2024_secure_key_harsh_valiyan" \
  -d '{
    "repo": "https://github.com/user/repo",
    "team": "BUG_RIPPER",
    "leader": "Harsh Valiyan"
  }'

# Invalid API key (should return 403)
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: invalid_key" \
  -d '{
    "repo": "https://github.com/user/repo",
    "team": "BUG_RIPPER",
    "leader": "Harsh Valiyan"
  }'

# Missing API key (should return 401)
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "https://github.com/user/repo",
    "team": "BUG_RIPPER",
    "leader": "Harsh Valiyan"
  }'
```

### 2. Frontend Testing

```typescript
// Test API key verification
import { verifyApiKey } from '@/lib/api';

async function testApiKey() {
  const isValid = await verifyApiKey();
  console.log('API Key Valid:', isValid);
}
```

## Error Handling

### Frontend Error Messages

```typescript
try {
  const result = await analyzeRepository(repo, team, leader);
} catch (error) {
  if (error.message.includes('Invalid API key')) {
    // Show API key configuration instructions
    showError('Please configure a valid API key in .env file');
  } else if (error.message.includes('Access forbidden')) {
    // API key doesn't have permissions
    showError('Your API key does not have required permissions');
  } else {
    // Generic error
    showError('Failed to connect to backend API');
  }
}
```

## Production Deployment

### 1. Environment Variables

**Frontend (Vercel/Netlify):**
```
VITE_API_URL=https://api.yourdomain.com/api
VITE_API_KEY=production_api_key_here
VITE_USE_MOCK_DATA=false
```

**Backend (Heroku/AWS/DigitalOcean):**
```
PORT=3000
NODE_ENV=production
VALID_API_KEYS=key1,key2,key3
DATABASE_URL=postgresql://...
GITHUB_TOKEN=ghp_...
```

### 2. CORS Configuration

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'X-API-Key', 'Authorization']
}));
```

## Current Configuration

### Frontend
- **API URL**: `http://localhost:3000/api`
- **API Key**: `bugripper_2024_secure_key_harsh_valiyan`
- **Mode**: Mock data (VITE_USE_MOCK_DATA=true)

### To Enable Real API
1. Set `VITE_USE_MOCK_DATA=false` in `.env`
2. Ensure backend is running on `http://localhost:3000`
3. Verify API key matches backend configuration
4. Restart frontend dev server

## Troubleshooting

### Issue: "Invalid API key"
- Check `.env` file has correct `VITE_API_KEY`
- Verify backend has same key in `VALID_API_KEYS`
- Restart dev server after changing `.env`

### Issue: "CORS error"
- Backend must allow frontend origin
- Check CORS configuration
- Ensure headers are properly set

### Issue: "Connection refused"
- Backend server not running
- Check `VITE_API_URL` is correct
- Verify port is not blocked by firewall

## Next Steps

1. ✅ Frontend configured with API key
2. ⏳ Implement backend API with authentication
3. ⏳ Set up database for API key management
4. ⏳ Add rate limiting and monitoring
5. ⏳ Deploy to production with HTTPS
