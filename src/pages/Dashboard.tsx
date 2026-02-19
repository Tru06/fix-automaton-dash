import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import InputPanel from "@/components/dashboard/InputPanel";
import RunSummary from "@/components/dashboard/RunSummary";
import FixesTable from "@/components/dashboard/FixesTable";
import CICDTimeline from "@/components/dashboard/CICDTimeline";
import ScoreCard from "@/components/dashboard/ScoreCard";
import AgentPipeline from "@/components/dashboard/AgentPipeline";
import { mockRun, type AgentRun } from "@/lib/mock-data";
import { analyzeRepository } from "@/lib/api";

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false";

const Dashboard = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [runData, setRunData] = useState<AgentRun | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = useCallback(async (repo: string, team: string, leader: string) => {
    setIsRunning(true);
    setRunData(null);
    setError(null);

    try {
      if (USE_MOCK_DATA) {
        // Simulate agent execution with mock data
        await new Promise(resolve => setTimeout(resolve, 3000));
        setRunData({
          ...mockRun,
          repo,
          teamName: team,
          leaderName: leader,
          branch: `${team}_${leader.replace(/\s+/g, "_")}_AI_Fix`,
        });
      } else {
        // Call real API
        const result = await analyzeRepository(repo, team, leader);
        setRunData(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze repository");
      console.error("Analysis error:", err);
    } finally {
      setIsRunning(false);
    }
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
          {USE_MOCK_DATA && (
            <span className="ml-auto rounded-full bg-yellow-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-yellow-500">
              Demo Mode
            </span>
          )}
          {runData && !USE_MOCK_DATA && (
            <span className="ml-auto rounded-full bg-success/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-success">
              Run Complete
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Demo Mode Warning */}
        {USE_MOCK_DATA && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-yellow-500 mt-0.5" />
              <div>
                <p className="font-mono text-sm font-semibold text-yellow-500">Demo Mode Active</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  Currently showing mock data. To analyze real repositories, implement the backend API 
                  as described in <code className="text-primary">BACKEND_REQUIREMENTS.md</code>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Input + Pipeline */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <InputPanel onRun={handleRun} isRunning={isRunning} />
          <AgentPipeline />
        </div>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
              <div>
                <p className="font-mono text-sm font-semibold text-destructive">Analysis Failed</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading state */}
        {isRunning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-lg border border-glow bg-card p-8 text-center"
          >
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="font-mono text-sm text-primary glow-text">
              {USE_MOCK_DATA ? "Simulating analysis..." : "Agents analyzing repository..."}
            </p>
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
