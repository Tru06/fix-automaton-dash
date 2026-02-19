# 🤖 AI Fix Agent Dashboard

An autonomous AI-powered platform that detects, fixes, and verifies code issues in GitHub repositories through an intelligent multi-agent system with real-time CI/CD integration.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)

## 🌟 Features

### 🔍 Automated Bug Detection
- **Multi-Type Scanning**: Detects linting, syntax, logic, type, import, and indentation errors
- **Comprehensive Analysis**: Scans entire repositories with detailed file-level reporting
- **Real-time Monitoring**: Live updates on detected issues and their severity

### 🛠️ Autonomous Fixing
- **AI-Powered Repairs**: Intelligent agents apply context-aware fixes automatically
- **Structured Commits**: Each fix is committed with descriptive messages following best practices
- **Branch Management**: Creates compliant branches with full traceability

### ✅ CI/CD Verification
- **Automated Testing**: Runs complete test suites after each fix iteration
- **Pipeline Integration**: Validates fixes through multiple CI/CD stages
- **Detailed Reports**: Expandable iteration details showing test results and validation checks

### 📊 Interactive Dashboard
- **Run Summary**: Overview of repository, bugs detected, fixes applied, and execution time
- **Agent Pipeline**: Visual representation of the multi-agent workflow
- **Fixes Table**: Detailed breakdown of each bug fix with file locations and commit messages
- **CI/CD Timeline**: Expandable iteration history with test results and validation checks
- **Score Card**: Performance metrics with base score, speed bonus, and efficiency penalties

## 🏗️ Architecture

### Multi-Agent System
The platform uses a coordinated multi-agent architecture:

1. **Repository Agent** - Clones and prepares the repository
2. **Detection Agent** - Scans for bugs and issues
3. **Fix Agent** - Applies automated fixes
4. **Commit Agent** - Creates structured commits
5. **CI/CD Agent** - Runs verification pipelines
6. **Verification Agent** - Validates final results

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tru06/fix-automaton-dash.git
cd fix-automaton-dash
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool and dev server

### UI Components
- **shadcn/ui** - Component library
- **Radix UI** - Accessible component primitives
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **Framer Motion 12.34.2** - Animation library
- **Lucide React** - Icon library

### State & Data
- **React Router DOM 6.30.1** - Routing
- **TanStack Query 5.83.0** - Data fetching
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation

### Visualization
- **Recharts 2.15.4** - Charts and graphs

### Development Tools
- **ESLint 9.32.0** - Code linting
- **Vitest 3.2.4** - Unit testing
- **Testing Library** - Component testing

## 📁 Project Structure

```
fix-automaton-dash/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── AgentPipeline.tsx      # Multi-agent workflow visualization
│   │   │   ├── CICDTimeline.tsx       # CI/CD iteration timeline
│   │   │   ├── FixesTable.tsx         # Bug fixes table
│   │   │   ├── InputPanel.tsx         # Repository input form
│   │   │   ├── RunSummary.tsx         # Execution summary
│   │   │   └── ScoreCard.tsx          # Performance scoring
│   │   ├── ui/                        # shadcn/ui components
│   │   └── NavLink.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx              # Main dashboard page
│   │   ├── Index.tsx                  # Landing page
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── mock-data.ts               # Mock data and types
│   │   └── utils.ts                   # Utility functions
│   ├── hooks/                         # Custom React hooks
│   ├── test/                          # Test files
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## 🎨 Key Components

### Dashboard
The main interface showing:
- Input panel for repository details
- Agent pipeline status
- Run summary with metrics
- Fixes table with all detected and fixed issues
- CI/CD timeline with expandable iteration details
- Score card with performance breakdown

### CI/CD Timeline
Interactive timeline showing:
- Multiple iteration runs
- Test results (passed/failed)
- Expandable details with validation checks
- Real-time timestamps
- Duration and test counts

### Fixes Table
Comprehensive table displaying:
- File paths and line numbers
- Bug types (SYNTAX, TYPE, LOGIC, LINTING, etc.)
- Commit messages
- Fix status with visual indicators

## 🎯 Use Cases

- **Code Quality Automation** - Automatically fix common code issues
- **CI/CD Integration** - Verify fixes through automated pipelines
- **Team Productivity** - Reduce manual code review time
- **Learning Tool** - Understand common coding mistakes and fixes
- **Repository Maintenance** - Keep codebases clean and consistent

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your app will be live!

Or use the Vercel Dashboard:
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel will auto-detect Vite and deploy

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

Or use the Netlify Dashboard:
- Go to [netlify.com](https://netlify.com)
- Drag and drop your `dist` folder after running `npm run build`

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"deploy": "npm run build && gh-pages -d dist"
```

3. Deploy:
```bash
npm run deploy
```

## 🔗 Links

- **Repository**: [https://github.com/Tru06/fix-automaton-dash](https://github.com/Tru06/fix-automaton-dash)
- **Live Demo**: Coming soon!

## 👥 Team

- **Team**: RIFT_ORGANISERS
- **Leader**: SAIYAM_KUMAR

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by the RIFT_ORGANISERS team
