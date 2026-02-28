export interface BugFix {
  id: number;
  file: string;
  bugType: "LINTING" | "SYNTAX" | "LOGIC" | "TYPE" | "IMPORT" | "INDENTATION";
  line: number;
  commitMessage: string;
  status: "fixed" | "failed";
}

export interface CICDRun {
  id: number;
  iteration: number;
  status: "passed" | "failed";
  timestamp: string;
  duration: string;
  failureReason?: string;
  failedTests?: string[];
  errorLog?: string;
  testsRun?: number;
  testsPassed?: number;
  checks?: string[];
}

export interface AgentRun {
  repo: string;
  teamName: string;
  leaderName: string;
  branch: string;
  bugsDetected: number;
  fixesApplied: number;
  cicdResult: "passed" | "failed";
  executionTime: string;
  score: {
    base: number;
    speedBonus: number;
    efficiencyPenalty: number;
    final: number;
  };
  fixes: BugFix[];
  cicdRuns: CICDRun[];
}

// Generate unique mock data based on repository URL
export function generateMockRun(repo: string, team: string, leader: string): AgentRun {
  // Create a simple hash from the repo URL for consistency
  const hash = repo.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate varying numbers based on hash
  const bugsDetected = 8 + (hash % 15); // 8-22 bugs
  const fixesApplied = bugsDetected - (hash % 3); // Some might fail
  const iterations = 2 + (hash % 3); // 2-4 iterations
  const executionMinutes = 1 + (hash % 4); // 1-4 minutes
  const executionSeconds = 15 + (hash % 45); // 15-59 seconds
  
  const bugTypes: Array<BugFix["bugType"]> = ["LINTING", "SYNTAX", "LOGIC", "TYPE", "IMPORT", "INDENTATION"];
  const files = [
    "src/utils/parser.ts", "src/api/handler.ts", "src/components/App.tsx",
    "src/services/auth.ts", "src/styles/main.css", "src/helpers/format.ts",
    "src/config/db.ts", "src/routes/index.ts", "src/middleware/cors.ts",
    "src/utils/logger.ts", "src/models/user.ts", "src/controllers/api.ts",
    "src/tests/unit.test.ts", "src/index.ts", "src/lib/utils.ts",
    "src/hooks/useAuth.ts", "src/pages/Dashboard.tsx", "src/api/client.ts"
  ];

  // Generate fixes
  const fixes: BugFix[] = [];
  for (let i = 0; i < bugsDetected; i++) {
    const bugType = bugTypes[(hash + i) % bugTypes.length];
    const file = files[(hash + i) % files.length];
    const line = 5 + ((hash + i * 7) % 95);
    const status = i < fixesApplied ? "fixed" : "failed";
    
    fixes.push({
      id: i + 1,
      file,
      bugType,
      line,
      commitMessage: `fix: ${bugType.toLowerCase()} error in ${file.split('/').pop()} line ${line}`,
      status: status as "fixed" | "failed"
    });
  }

  // Generate CI/CD runs with dynamic timestamps
  const cicdRuns: CICDRun[] = [];
  const now = Date.now();
  for (let i = 0; i < iterations; i++) {
    const minutesAgo = (iterations - i) * 2; // Spread runs over time
    const testsRun = 30 + (hash % 20);
    const testsPassed = i === iterations - 1 ? testsRun : testsRun - (hash % 3);
    
    cicdRuns.push({
      id: i + 1,
      iteration: i + 1,
      status: i === iterations - 1 ? "passed" : ((hash + i) % 2 === 0 ? "passed" : "failed"),
      timestamp: new Date(now - minutesAgo * 60 * 1000).toISOString(),
      duration: `${(hash + i) % 2 + 1}m ${20 + (hash + i * 13) % 40}s`,
      testsRun,
      testsPassed,
      checks: [
        "✓ ESLint validation passed",
        "✓ TypeScript compilation successful",
        `✓ Unit tests passed (${testsPassed}/${testsRun})`,
        "✓ Build process completed",
        "✓ No security vulnerabilities detected"
      ]
    });
  }

  const baseScore = 70 + (hash % 20);
  const speedBonus = executionMinutes < 3 ? 15 : 10;
  const efficiencyPenalty = Math.max(0, (bugsDetected - fixesApplied) * -2);
  
  return {
    repo,
    teamName: team,
    leaderName: leader,
    branch: `${team}_${leader}_AI_Fix`,
    bugsDetected,
    fixesApplied,
    cicdResult: "passed",
    executionTime: `${executionMinutes}m ${executionSeconds}s`,
    score: {
      base: baseScore,
      speedBonus,
      efficiencyPenalty,
      final: baseScore + speedBonus + efficiencyPenalty,
    },
    fixes,
    cicdRuns,
  };
}

// Legacy export for backward compatibility
export const mockRun: AgentRun = generateMockRun(
  "https://github.com/example/buggy-app",
  "AI_AGENT",
  "DEMO"
);

export const agents = [
  { name: "Repository Agent", status: "complete" as const, description: "Clones & prepares repository" },
  { name: "Detection Agent", status: "complete" as const, description: "Scans for bugs & issues" },
  { name: "Fix Agent", status: "complete" as const, description: "Applies automated fixes" },
  { name: "Commit Agent", status: "complete" as const, description: "Creates structured commits" },
  { name: "CI/CD Agent", status: "complete" as const, description: "Runs verification pipelines" },
  { name: "Verification Agent", status: "complete" as const, description: "Validates final results" },
];
