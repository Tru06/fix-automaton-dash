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
Use these tools to detect bugs with high accuracy:

#### Static Analysis Tools
- **ESLint** - Linting errors, code quality issues
  - Use recommended configs + strict rules
  - Custom rules for common mistakes
  - Plugin ecosystem (React, TypeScript, etc.)
  
- **TypeScript Compiler** - Type errors, type safety
  - Strict mode enabled
  - No implicit any
  - Strict null checks
  
- **Prettier** - Formatting issues, code style
  - Consistent formatting
  - Indentation detection
  
- **SonarQube/SonarLint** - Code smells, security vulnerabilities
  - Complexity analysis
  - Duplicate code detection
  - Security hotspots

#### Advanced Detection
- **Semgrep** - Pattern-based code analysis
  - Custom security rules
  - Logic error patterns
  - Anti-patterns detection
  
- **CodeQL** - Deep semantic analysis
  - Data flow analysis
  - Control flow analysis
  - Security vulnerability detection
  
- **JSHint/JSLint** - Additional JavaScript linting
  - Legacy code support
  - Browser compatibility checks

#### Language-Specific Analyzers
- **Python**: pylint, flake8, mypy, bandit
- **Java**: SpotBugs, PMD, Checkstyle
- **Go**: golangci-lint, staticcheck
- **Rust**: clippy, rustfmt
- **C/C++**: clang-tidy, cppcheck

#### Runtime Analysis
- **Unit Test Execution** - Detect failing tests
- **Integration Tests** - API/component issues
- **Coverage Analysis** - Untested code paths
- **Performance Profiling** - Performance bottlenecks

#### AI-Powered Detection
- **GPT-4/Claude** - Logic errors, code review
  - Context-aware analysis
  - Suggest improvements
  - Explain complex bugs
  
- **GitHub Copilot** - Code suggestions
- **Amazon CodeGuru** - ML-based recommendations

#### Bug Categories to Detect

1. **SYNTAX Errors**
   - Missing brackets, parentheses
   - Unclosed strings
   - Invalid tokens
   - Malformed expressions

2. **TYPE Errors**
   - Type mismatches
   - Missing type annotations
   - Incorrect generic usage
   - Null/undefined issues

3. **LOGIC Errors**
   - Incorrect conditionals
   - Off-by-one errors
   - Infinite loops
   - Dead code
   - Unreachable code

4. **IMPORT Errors**
   - Unused imports
   - Missing dependencies
   - Circular dependencies
   - Wrong import paths

5. **LINTING Issues**
   - Code style violations
   - Naming conventions
   - Complexity warnings
   - Best practice violations

6. **INDENTATION Issues**
   - Inconsistent spacing
   - Mixed tabs/spaces
   - Wrong nesting levels

7. **SECURITY Vulnerabilities**
   - SQL injection risks
   - XSS vulnerabilities
   - Hardcoded secrets
   - Insecure dependencies

8. **PERFORMANCE Issues**
   - Inefficient algorithms
   - Memory leaks
   - Unnecessary re-renders
   - Large bundle sizes

9. **ACCESSIBILITY Issues**
   - Missing ARIA labels
   - Poor contrast ratios
   - Keyboard navigation issues

10. **TESTING Issues**
    - Missing test coverage
    - Flaky tests
    - Slow tests

#### Detection Accuracy Improvements

**Multi-Tool Consensus**
```typescript
// Use multiple tools and combine results
const eslintIssues = await runESLint(files);
const tsIssues = await runTypeScript(files);
const semgrepIssues = await runSemgrep(files);
const aiIssues = await runAIAnalysis(files);

// Merge and deduplicate
const allIssues = deduplicateIssues([
  ...eslintIssues,
  ...tsIssues,
  ...semgrepIssues,
  ...aiIssues
]);

// Prioritize by severity and confidence
const prioritized = prioritizeIssues(allIssues);
```

**Confidence Scoring**
```typescript
interface BugDetection {
  file: string;
  line: number;
  type: BugType;
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  confidence: number; // 0-100
  detectedBy: string[]; // Tools that found it
  autoFixable: boolean;
}
```

**False Positive Reduction**
- Cross-validate with multiple tools
- Use AST analysis for context
- Check if code is in comments/strings
- Verify with test execution
- Learn from user feedback

**Context-Aware Analysis**
```typescript
// Analyze file context
const context = {
  framework: detectFramework(repo), // React, Vue, Angular
  language: detectLanguage(file),   // TS, JS, Python
  testFile: isTestFile(file),
  configFile: isConfigFile(file),
  dependencies: parseDependencies(repo)
};

// Apply context-specific rules
const rules = getContextualRules(context);
```

### 3. Automated Fixing
Apply fixes with high accuracy and safety:

#### Fix Strategies

**1. Auto-fixable Issues (High Confidence)**
- ESLint `--fix` for linting issues
- Prettier for formatting
- TypeScript quick fixes
- Import organization
- Simple syntax corrections

**2. AI-Assisted Fixes (Medium Confidence)**
```typescript
// Use AI for complex logic fixes
const fix = await generateFix({
  code: buggyCode,
  error: errorMessage,
  context: fileContext,
  model: "gpt-4" // or Claude, Gemini
});

// Validate fix before applying
if (await validateFix(fix)) {
  applyFix(fix);
}
```

**3. Template-Based Fixes (High Confidence)**
```typescript
// Common patterns
const fixTemplates = {
  missingReturn: (funcName) => `return ${funcName}();`,
  unusedVar: (varName) => `// ${varName} removed`,
  missingImport: (module) => `import ${module} from '${module}';`
};
```

**4. Safe Refactoring**
- Extract method
- Rename variable
- Remove dead code
- Simplify conditionals

#### Fix Validation

**Pre-Apply Checks**
```typescript
async function validateFix(fix: Fix): Promise<boolean> {
  // 1. Syntax validation
  if (!isValidSyntax(fix.newCode)) return false;
  
  // 2. Type checking
  if (!passesTypeCheck(fix.newCode)) return false;
  
  // 3. Linting
  if (!passesLinting(fix.newCode)) return false;
  
  // 4. Test execution
  if (!passesTests(fix.newCode)) return false;
  
  // 5. No new bugs introduced
  const newBugs = await detectBugs(fix.newCode);
  if (newBugs.length > 0) return false;
  
  return true;
}
```

**Rollback Strategy**
```typescript
// Keep history of all changes
const fixHistory: Fix[] = [];

// Rollback if CI/CD fails
async function rollbackIfNeeded(cicdResult: CICDResult) {
  if (cicdResult.status === "failed") {
    const lastGoodState = findLastPassingState(fixHistory);
    await rollbackTo(lastGoodState);
  }
}
```

#### Fix Prioritization

**Order of Fixes**
1. Critical security vulnerabilities
2. Syntax errors (blocking)
3. Type errors (blocking)
4. Import errors
5. Logic errors
6. Linting issues
7. Formatting issues

**Dependency-Aware Fixing**
```typescript
// Build dependency graph
const graph = buildDependencyGraph(bugs);

// Fix in topological order
const orderedFixes = topologicalSort(graph);

for (const fix of orderedFixes) {
  await applyAndValidate(fix);
}
```

#### Incremental Fixing

**Iterative Approach**
```typescript
let iteration = 1;
const maxIterations = 5;

while (iteration <= maxIterations) {
  // Detect bugs
  const bugs = await detectAllBugs(repo);
  
  if (bugs.length === 0) break;
  
  // Fix batch of bugs
  const fixes = await generateFixes(bugs);
  await applyFixes(fixes);
  
  // Run CI/CD
  const cicdResult = await runCICD(repo);
  
  if (cicdResult.status === "passed") break;
  
  // Analyze failures and retry
  await analyzeFailures(cicdResult);
  iteration++;
}
```

**Smart Batching**
- Group related fixes together
- Fix one file at a time
- Avoid conflicting changes
- Commit after each successful batch

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
