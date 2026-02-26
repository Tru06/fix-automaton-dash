# 🤖 AI Fix Agent - Autonomous CI/CD Healing

An intelligent agent that autonomously detects, fixes, and verifies code issues in CI/CD pipelines.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)

## 🎯 Overview

AI Fix Agent is an autonomous DevOps tool that:
- Analyzes GitHub repositories for bugs and issues
- Automatically generates and applies fixes
- Verifies fixes through CI/CD pipeline
- Iterates until all tests pass
- Provides detailed analytics dashboard

## ✨ Features

- **Autonomous Detection** - Scans code for syntax, logic, type, and security issues
- **AI-Powered Fixes** - Uses GPT-4 to generate intelligent fixes
- **CI/CD Integration** - Monitors pipeline and iterates on failures
- **Real-time Dashboard** - Beautiful React UI with live updates
- **Branch Management** - Creates fix branches automatically
- **Score System** - Evaluates performance with bonuses and penalties

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- OpenAI API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Tru06/fix-automaton-dash.git
cd fix-automaton-dash

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Configuration

Create `.env` file in root:
```env
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your_api_key_here
VITE_USE_MOCK_DATA=false
```

Create `backend/.env` file:
```env
PORT=3000
VALID_API_KEYS=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
RETRY_LIMIT=5
```

### Running the Application

```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend
npm run dev
```

Access the dashboard at `http://localhost:8080`

## 📖 Usage

1. Open the dashboard
2. Enter a GitHub repository URL
3. Provide team and leader names
4. Click "Run Fix Agent"
5. Watch the AI analyze and fix issues
6. View detailed results and metrics

## 🏗️ Architecture

```
Frontend (React + Vite)
    ↓
Backend API (Express)
    ↓
Multi-Agent System
    ├── Repository Agent (Clone & Analyze)
    ├── Detection Agent (Find Issues)
    ├── Fix Agent (Generate Fixes)
    ├── Commit Agent (Apply Changes)
    ├── CI/CD Agent (Monitor Pipeline)
    └── Verification Agent (Validate Fixes)
    ↓
External Services
    ├── Git (Repository Management)
    └── OpenAI GPT-4 (AI Analysis)
```

## 🛠️ Tech Stack

**Frontend:**
- React 18.3
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- shadcn/ui

**Backend:**
- Node.js
- Express
- OpenAI API
- simple-git

## 📊 Supported Bug Types

- **SYNTAX** - Code syntax errors
- **LOGIC** - Logic bugs and incorrect implementations
- **TYPE** - Type errors and mismatches
- **IMPORT** - Missing or unused imports
- **LINTING** - Code style violations
- **SECURITY** - Security vulnerabilities
- **PERFORMANCE** - Performance issues
- **INDENTATION** - Formatting problems

## 🎨 Dashboard Features

- **Input Panel** - Repository URL and configuration
- **Agent Pipeline** - Visual workflow representation
- **Run Summary** - Key metrics and status
- **Score Breakdown** - Performance evaluation
- **Fixes Table** - Detailed fix information
- **CI/CD Timeline** - Pipeline execution history
- **Theme Toggle** - Light/Dark mode support

## 🔐 API Authentication

The API uses key-based authentication:

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your_api_key" \
  -d '{
    "repo": "https://github.com/user/repo",
    "team": "YOUR_TEAM",
    "leader": "YOUR_NAME"
  }'
```

## 📝 Branch Naming Convention

Fix branches follow this format:
```
TEAM_NAME_LEADER_NAME_AI_Fix
```

Example: `MYTEAM_JOHN_DOE_AI_Fix`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Powered by OpenAI GPT-4
- UI components from shadcn/ui
- Icons from Lucide React
- Built with React and Node.js

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ for autonomous CI/CD healing**
