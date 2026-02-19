# Backend API Requirements

## Overview
The AI Fix Agent Dashboard currently uses mock data. To analyze real repositories, you need to implement a backend API.

## Required API Endpoints

### 1. POST `/api/analyze`
Analyze a GitHub repository and return bug fix results.

**Request Body:**
```json
{
  "repo": "https://github.com/username/repo-name",
  "team": "BUG_RIPPER",
  "leader": "Harsh Valiyan"
}
```

**Response:**
```json
{
  "repo": "https://github.com/username/repo-name",
  "teamName": "BUG_RIPPER",
  "leaderName": "Harsh Valiyan",
  "branch": "BUG_RIPPER_Harsh_Valiyan_AI_Fix",
  "bugsDetected": 14,
  "fixesApplied": 14,
  "cicdResult": "passed",
  "executionTime": "2m 34s",
  "score": {
    "base": 85,
    "speedBonus": 12,
    "efficiencyPenalty": -4,
    "final": 93
  },
  "fixes": [
    {
      "id": 1,
      "file": "src/utils/parser.ts",
      "bugType": "SYNTAX",
      "line": 42,
      "commitMessage": "fix: missing closing bracket",
      "status": "fixed"
    }
  ],
  "cicdRuns": [
    {
      "id": 1,
      "iteration": 1,
      "status": "passed",
      "timestamp": "2024-02-19T10:15:00Z",
      "duration": "1m 12s",
      "testsRun": 47,
      "testsPassed": 47,
      "checks": [
        "✓ ESLint validation passed",
        "✓ TypeScript compilation successful"
      ]
    }
  ]
}
```

### 2. GET `/api/status/:runId`
Get the current status of an analysis run.

**Response:**
```json
{
  "status": "running",
  "progress": 45,
  "message": "Scanning files for bugs..."
}
```

## Backend Implementation Steps

### 1. Repository Cloning
- Clone the GitHub repository
- Handle authentication if needed
- Create a new branch with naming convention: `{team}_{leader}_AI_Fix`

### 2. Bug Detection
Use these tools to detect bugs:
- **ESLint** - Linting errors
- **TypeScript Compiler** - Type errors
- **Prettier** - Formatting issues
- **Custom analyzers** - Logic errors, unused imports

### 3. Automated Fixing
- Apply fixes using:
  - ESLint `--fix`
  - TypeScript quick fixes
  - Custom fix scripts
- Create structured commits for each fix

### 4. CI/CD Integration
- Run tests after each fix iteration
- Track test results
- Retry if tests fail
- Report final status

### 5. Scoring Algorithm
```
Base Score = (fixesApplied / bugsDetected) * 100
Speed Bonus = max(0, 20 - executionMinutes)
Efficiency Penalty = (iterations - 1) * -2
Final Score = Base + Speed Bonus + Efficiency Penalty
```

## Technology Recommendations

### Backend Framework
- **Node.js + Express** - Fast and simple
- **Python + FastAPI** - Great for AI/ML integration
- **Go** - High performance

### Tools & Libraries
- **simple-git** (Node.js) - Git operations
- **ESLint API** - Linting
- **TypeScript Compiler API** - Type checking
- **Octokit** - GitHub API integration
- **Bull/BullMQ** - Job queue for long-running tasks

## Example Backend Structure

```
backend/
├── src/
│   ├── api/
│   │   ├── analyze.ts       # Analysis endpoint
│   │   └── status.ts        # Status endpoint
│   ├── agents/
│   │   ├── repository.ts    # Clone & prepare
│   │   ├── detection.ts     # Bug detection
│   │   ├── fix.ts          # Apply fixes
│   │   ├── commit.ts       # Create commits
│   │   ├── cicd.ts         # Run tests
│   │   └── verification.ts # Verify results
│   ├── analyzers/
│   │   ├── eslint.ts       # ESLint analyzer
│   │   ├── typescript.ts   # TS analyzer
│   │   └── custom.ts       # Custom rules
│   └── utils/
│       ├── git.ts          # Git operations
│       └── scoring.ts      # Score calculation
├── package.json
└── tsconfig.json
```

## Environment Variables

```env
GITHUB_TOKEN=your_github_token
TEMP_DIR=/tmp/repo-analysis
MAX_CONCURRENT_JOBS=5
TIMEOUT_MINUTES=10
```

## Security Considerations

1. **Sandbox execution** - Run analysis in isolated containers
2. **Rate limiting** - Prevent abuse
3. **Authentication** - Require API keys
4. **Input validation** - Validate repository URLs
5. **Timeout limits** - Prevent infinite loops

## Current Status

⚠️ **The dashboard currently uses mock data for demonstration purposes.**

To enable real repository analysis:
1. Implement the backend API following this specification
2. Set `VITE_API_URL` in `.env` to your backend URL
3. Set `VITE_USE_MOCK_DATA=false` in `.env`
4. The dashboard will automatically use the real API

## Testing

Test the API with:
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "repo": "https://github.com/username/test-repo",
    "team": "BUG_RIPPER",
    "leader": "Harsh Valiyan"
  }'
```
