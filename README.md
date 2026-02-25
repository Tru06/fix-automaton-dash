# 🤖 AI Fix Agent - Autonomous CI/CD Healing Agent

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](http://localhost:8080)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/Tru06/fix-automaton-dash)

## 🎯 Problem Statement

Build an autonomous agent that can detect, fix, and verify code issues in CI/CD pipelines without human intervention.

## 🌟 Solution Overview

AI Fix Agent is an autonomous DevOps agent with a React dashboard that:
- Takes GitHub repository URLs as input
- Clones and analyzes repository structure
- Discovers and runs test files automatically
- Identifies failures and generates targeted fixes
- Commits fixes with [AI-AGENT] prefix
- Monitors CI/CD pipeline and iterates until all tests pass
- Displays comprehensive results in a professional dashboard

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Dashboard                          │
│  (Input Panel → Agent Pipeline → Results Display)           │
└────────────────────┬────────────────────────────────────────┘
                     │ REST API
┌────────────────────▼────────────────────────────────────────┐
│                  Express Backend                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Multi-Agent System                                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │Repository│→ │Detection │→ │   Fix    │          │  │
│  │  │  Agent   │  │  Agent   │  │  Agent   │          │  │
│  │  └──────────┘  └──────────┘  └──────────┘          │  │
│  │       ↓              ↓              ↓                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐          │  │
│  │  │ Commit   │→ │  CI/CD   │→ │Verification│        │  │
│  │  │  Agent   │  │  Agent   │  │   Agent   │          │  │
│  │  └──────────┘  └──────────┘  └──────────┘          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌────▼────┐              ┌────▼────┐
   │   Git   │              │ OpenAI  │
   │  Clone  │              │  GPT-4  │
   └─────────┘              └─────────┘
```

## 🚀 Live Demo

**Dashboard:** [http://localhost:8080/dashboard](http://localhost:8080/dashboard)

**Video Demo:** [LinkedIn Post](https://linkedin.com) (Tag @RIFT2026)

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Quick Start

```bash
# Clone repository
git clone https://github.com/Tru06/fix-automaton-dash.git
cd fix-automaton-dash

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start backend
cd backend
npm run dev

# Start frontend (in new terminal)
npm run dev
```

## 🔧 Environment Setup

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=bugripper_2024_secure_key_harsh_valiyan
VITE_USE_MOCK_DATA=true
```

### Backend (backend/.env)
```env
PORT=3000
VALID_API_KEYS=bugripper_2024_secure_key_harsh_valiyan
OPENAI_API_KEY=your-openai-api-key
RETRY_LIMIT=5
```

## 📖 Usage Examples

### Basic Usage

1. Open dashboard: http://localhost:8080/dashboard
2. Enter repository URL: `https://github.com/facebook/react`
3. Enter team name: `YOUR_TEAM`
4. Enter leader name: `YOUR_NAME`
5. Click "Run Fix Agent"
6. View results in 2-5 seconds

### Expected Output

```
Branch Created: YOUR_TEAM_YOUR_NAME_AI_Fix
Bugs Detected: 18
Fixes Applied: 14
CI/CD Status: PASSED
Score: 87/100
```

## 🐛 Supported Bug Types

- **LINTING** - Code style and formatting issues
- **SYNTAX** - Syntax errors and typos
- **LOGIC** - Logic bugs and incorrect implementations
- **TYPE** - Type errors and mismatches
- **IMPORT** - Unused or missing imports
- **INDENTATION** - Indentation and formatting issues
- **SECURITY** - Security vulnerabilities
- **PERFORMANCE** - Performance bottlenecks

## 💻 Tech Stack

### Frontend
- React 18.3.1 (Functional components + hooks)
- TypeScript 5.8.3
- Vite 5.4.19
- Tailwind CSS 3.4.17
- shadcn/ui components
- Framer Motion (animations)
- Recharts (visualizations)

### Backend
- Node.js + Express
- OpenAI GPT-4 API
- simple-git (Git operations)
- Custom multi-agent system
- RESTful API architecture

### DevOps
- Git for version control
- Vercel/Netlify for deployment
- Environment-based configuration

## 🎨 Dashboard Features

### 1. Input Panel
- GitHub repository URL input
- Team name and leader name fields
- "Run Fix Agent" button with loading state

### 2. Multi-Agent Pipeline
- Visual representation of 6 agents
- Real-time progress indicators
- Agent status updates

### 3. Run Summary Card
- Repository URL
- Team and leader names
- Branch name (TEAM_NAME_LEADER_NAME_AI_Fix)
- Bugs detected and fixes applied
- CI/CD status badge (PASSED/FAILED)
- Execution time

### 4. Score Breakdown Panel
- Base score (100 points)
- Speed bonus (+10 if < 5 minutes)
- Efficiency penalty (-2 per commit over 20)
- Final total score
- Visual progress bar

### 5. Fixes Applied Table
- File path
- Bug type
- Line number
- Commit message format: "BUG_TYPE error in file line X → Fix: description"
- Status (✓ Fixed or ✗ Failed)
- Color coding (green for success, red for failure)

### 6. CI/CD Status Timeline
- Timeline visualization
- Pass/fail badge per iteration
- Iteration count (e.g., "3/5")
- Timestamp for each run
- Expandable details with test results

## 🔐 API Authentication

The system uses API key authentication:

```bash
# Test API
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: bugripper_2024_secure_key_harsh_valiyan" \
  -d '{
    "repo": "https://github.com/facebook/react",
    "team": "YOUR_TEAM",
    "leader": "YOUR_NAME"
  }'
```

## 📊 Performance Metrics

- **Analysis Speed:** 2-5 seconds (mock mode) / 30-90 seconds (real API)
- **Accuracy:** Pattern-based detection + AI validation
- **Scalability:** Handles repositories up to 1000 files
- **Reliability:** 100% uptime with mock data mode

## 🚧 Known Limitations

- Large repositories (>10GB) may timeout
- Windows path length limitations on some repos
- OpenAI API rate limits apply
- Mock data mode for demo purposes

## 🛠️ Development

### Run Tests
```bash
npm run test
```

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

## 📝 Branch Naming Convention

All fix branches follow this format:
```
TEAM_NAME_LEADER_NAME_AI_Fix
```

Example: `YOUR_TEAM_YOUR_NAME_AI_Fix`

## 🤝 Contributors

Open source project - contributions welcome!

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Powered by OpenAI GPT-4
- UI components from shadcn/ui
- Icons from Lucide React

---

**Made with ❤️ for autonomous CI/CD healing**
