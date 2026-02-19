import { motion } from "framer-motion";
import { GitBranch, Bug, Wrench, Timer, CheckCircle2, XCircle } from "lucide-react";
import type { AgentRun } from "@/lib/mock-data";

const RunSummary = ({ run }: { run: AgentRun }) => {
  const stats = [
    { label: "Bugs Detected", value: run.bugsDetected, icon: Bug },
    { label: "Fixes Applied", value: run.fixesApplied, icon: Wrench },
    { label: "Execution Time", value: run.executionTime, icon: Timer },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-lg border border-glow bg-card p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
          Run Summary
        </h2>
        <div className="flex items-center gap-1.5">
          {run.cicdResult === "passed" ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <XCircle className="h-4 w-4 text-destructive" />
          )}
          <span className={`font-mono text-xs font-semibold uppercase ${run.cicdResult === "passed" ? "text-success" : "text-destructive"}`}>
            CI/CD {run.cicdResult}
          </span>
        </div>
      </div>

      <div className="mb-4 rounded-md bg-muted p-3">
        <div className="mb-1 flex items-center gap-1.5">
          <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground">Repository</span>
        </div>
        <p className="font-mono text-sm text-primary break-all">{run.repo}</p>
      </div>

      <div className="mb-4 rounded-md bg-muted p-3">
        <p className="font-mono text-xs text-muted-foreground">Branch</p>
        <p className="font-mono text-sm text-primary">{run.branch}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md bg-muted p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <stat.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="font-mono text-lg font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-md bg-muted p-3">
        <p className="font-mono text-xs text-muted-foreground">Team</p>
        <p className="text-sm font-semibold text-foreground">{run.teamName} / {run.leaderName}</p>
      </div>
    </motion.div>
  );
};

export default RunSummary;
