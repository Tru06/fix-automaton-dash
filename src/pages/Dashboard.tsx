import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
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
        // Simulate agent execution with DYNAMIC mock data
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate unique data based on repo URL
        const hash = repo.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
        const bugsDetected = Math.abs(hash % 20) + 10; // 10-30 bugs
        const fixesApplied = Math.floor(bugsDetected * (0.7 + (Math.abs(hash % 30) / 100))); // 70-100% fixed
        const baseScore = Math.round((fixesApplied / bugsDetected) * 100);
        const speedBonus = Math.abs(hash % 15) + 5; // 5-20 bonus
        const efficiencyPenalty = -Math.abs(hash % 6); // 0 to -5
        const finalScore = Math.min(100, Math.max(0, baseScore + speedBonus + efficiencyPenalty));
        
        // Generate dynamic fixes
        const fixes = Array.from({ length: bugsDetected }, (_, i) => {
          const types = ['LINTING', 'SYNTAX', 'LOGIC', 'TYPE', 'IMPORT', 'INDENTATION'] as const;
          const type = types[Math.abs((hash + i) % types.length)];
          const line = Math.abs((hash + i * 7) % 200) + 1;
          const files = ['src/utils.ts', 'src/components/App.tsx', 'src/services/api.ts', 'src/lib/helpers.js', 'src/index.ts'];
          const file = files[Math.abs((hash + i * 3) % files.length)];
          
          return {
            id: i + 1,
            file,
            bugType: type,
            line,
            commitMessage: `${type} error in ${file} line ${line} → Fix: ${type.toLowerCase()} issue resolved`,
            status: (i < fixesApplied ? 'fixed' : 'failed') as 'fixed' | 'failed'
          };
        });
        
        setRunData({
          ...mockRun,
          repo,
          teamName: team,
          leaderName: leader,
          branch: `${team.toUpperCase().replace(/\s+/g, "_")}_${leader.toUpperCase().replace(/\s+/g, "_")}_AI_Fix`,
          bugsDetected,
          fixesApplied,
          score: {
            base: baseScore,
            speedBonus,
            efficiencyPenalty,
            final: finalScore
          },
          fixes
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
    <div className="min-h-screen bg-background">
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
          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            {USE_MOCK_DATA && (
              <span className="rounded-full bg-yellow-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-yellow-500">
                Demo Mode
              </span>
            )}
            {runData && !USE_MOCK_DATA && (
              <span className="rounded-full bg-success/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-success">
                Run Complete
              </span>
            )}
          </div>
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
              <div className="flex-1">
                <p className="font-mono text-sm font-semibold text-destructive">Analysis Failed</p>
                <pre className="mt-2 font-mono text-xs text-muted-foreground whitespace-pre-wrap">{error}</pre>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading state */}
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-6 rounded-lg border border-glow bg-card p-8 text-center"
          >
            <motion.div 
              className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-primary border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p 
              className="font-mono text-sm text-primary glow-text"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {USE_MOCK_DATA ? "Simulating analysis..." : "🤖 AI agents analyzing repository..."}
            </motion.p>
            <motion.p 
              className="mt-2 font-mono text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Cloning → Scanning → Fixing → Verifying
            </motion.p>
            <motion.div 
              className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%]"
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 0%"],
                  width: ["0%", "100%"]
                }}
                transition={{ 
                  backgroundPosition: { duration: 2, repeat: Infinity },
                  width: { duration: USE_MOCK_DATA ? 2 : 30, ease: "easeInOut" }
                }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Results */}
        {runData && (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Success celebration */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-4 text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block text-6xl"
              >
                🎉
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-2 font-mono text-lg font-bold text-primary"
              >
                Analysis Complete!
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid gap-6 lg:grid-cols-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(var(--primary), 0.3)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <RunSummary run={runData} />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(var(--primary), 0.3)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ScoreCard score={runData.score} />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.01 }}
            >
              <FixesTable fixes={runData.fixes} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.01 }}
            >
              <CICDTimeline runs={runData.cicdRuns} />
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
