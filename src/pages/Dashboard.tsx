import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import InputPanel from "@/components/dashboard/InputPanel";
import RunSummary from "@/components/dashboard/RunSummary";
import FixesTable from "@/components/dashboard/FixesTable";
import CICDTimeline from "@/components/dashboard/CICDTimeline";
import ScoreCard from "@/components/dashboard/ScoreCard";
import AgentPipeline from "@/components/dashboard/AgentPipeline";
import { mockRun, type AgentRun } from "@/lib/mock-data";

const Dashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [runData, setRunData] = useState<AgentRun | null>(null);

  const handleRun = useCallback((repo: string, team: string, leader: string) => {
    setIsRunning(true);
    setRunData(null);

    // Simulate agent execution
    setTimeout(() => {
      setRunData({
        ...mockRun,
        repo,
        teamName: team,
        leaderName: leader,
        branch: `${team}_${leader}_AI_Fix`,
      });
      setIsRunning(false);
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
            <h1 className="font-mono text-sm font-semibold text-foreground">
              AI Fix Agent Dashboard
            </h1>
          </div>
          {runData && (
            <span className="ml-auto rounded-full bg-success/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-success">
              Run Complete
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Input + Pipeline */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <InputPanel onRun={handleRun} isRunning={isRunning} />
          <AgentPipeline />
        </div>

        {/* Loading state */}
        {isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-lg border border-glow bg-card p-8 text-center"
          >
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="font-mono text-sm text-primary glow-text">Agents analyzing repository...</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Cloning → Scanning → Fixing → Verifying</p>
          </motion.div>
        )}

        {/* Results */}
        {runData && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <RunSummary run={runData} />
              <ScoreCard score={runData.score} />
            </div>
            <FixesTable fixes={runData.fixes} />
            <CICDTimeline runs={runData.cicdRuns} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
