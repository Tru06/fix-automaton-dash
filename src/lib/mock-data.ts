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

export const mockRun: AgentRun = {
  repo: "https://github.com/example/buggy-app",
  teamName: "RIFT_ORGANISERS",
  leaderName: "SAIYAM_KUMAR",
  branch: "RIFT_ORGANISERS_SAIYAM_KUMAR_AI_Fix",
  bugsDetected: 14,
  fixesApplied: 13,
  cicdResult: "passed",
  executionTime: "2m 34s",
  score: {
    base: 85,
    speedBonus: 12,
    efficiencyPenalty: -4,
    final: 93,
  },
  fixes: [
    { id: 1, file: "src/utils/parser.ts", bugType: "SYNTAX", line: 42, commitMessage: "fix: missing closing bracket in parser", status: "fixed" },
    { id: 2, file: "src/api/handler.ts", bugType: "TYPE", line: 15, commitMessage: "fix: incorrect return type annotation", status: "fixed" },
    { id: 3, file: "src/components/App.tsx", bugType: "IMPORT", line: 3, commitMessage: "fix: unused import removed", status: "fixed" },
    { id: 4, file: "src/services/auth.ts", bugType: "LOGIC", line: 87, commitMessage: "fix: incorrect conditional check in auth flow", status: "fixed" },
    { id: 5, file: "src/styles/main.css", bugType: "LINTING", line: 12, commitMessage: "fix: enforce consistent spacing", status: "fixed" },
    { id: 6, file: "src/helpers/format.ts", bugType: "INDENTATION", line: 28, commitMessage: "fix: normalize indentation to 2 spaces", status: "fixed" },
    { id: 7, file: "src/config/db.ts", bugType: "SYNTAX", line: 5, commitMessage: "fix: missing semicolon", status: "fixed" },
    { id: 8, file: "src/routes/index.ts", bugType: "TYPE", line: 22, commitMessage: "fix: type mismatch in route params", status: "fixed" },
    { id: 9, file: "src/middleware/cors.ts", bugType: "LOGIC", line: 11, commitMessage: "fix: allow correct origin headers", status: "failed" },
    { id: 10, file: "src/utils/logger.ts", bugType: "IMPORT", line: 1, commitMessage: "fix: wrong module path for logger", status: "fixed" },
    { id: 11, file: "src/models/user.ts", bugType: "LINTING", line: 34, commitMessage: "fix: trailing comma enforcement", status: "fixed" },
    { id: 12, file: "src/controllers/api.ts", bugType: "SYNTAX", line: 56, commitMessage: "fix: unexpected token in template literal", status: "fixed" },
    { id: 13, file: "src/tests/unit.test.ts", bugType: "INDENTATION", line: 8, commitMessage: "fix: align test block indentation", status: "fixed" },
    { id: 14, file: "src/index.ts", bugType: "TYPE", line: 2, commitMessage: "fix: add missing generic type parameter", status: "fixed" },
  ],
  cicdRuns: [
    { id: 1, iteration: 1, status: "failed", timestamp: "2026-02-19T10:15:00Z", duration: "1m 12s" },
    { id: 2, iteration: 2, status: "failed", timestamp: "2026-02-19T10:18:00Z", duration: "1m 05s" },
    { id: 3, iteration: 3, status: "passed", timestamp: "2026-02-19T10:21:00Z", duration: "0m 58s" },
  ],
};

export const agents = [
  { name: "Repository Agent", status: "complete" as const, description: "Clones & prepares repository" },
  { name: "Detection Agent", status: "complete" as const, description: "Scans for bugs & issues" },
  { name: "Fix Agent", status: "complete" as const, description: "Applies automated fixes" },
  { name: "Commit Agent", status: "complete" as const, description: "Creates structured commits" },
  { name: "CI/CD Agent", status: "complete" as const, description: "Runs verification pipelines" },
  { name: "Verification Agent", status: "complete" as const, description: "Validates final results" },
];
