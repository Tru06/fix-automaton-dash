import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, Activity, HelpCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import InputPanel from "@/components/dashboard/InputPanel";
import RunSummary from "@/components/dashboard/RunSummary";
import FixesTable from "@/components/dashboard/FixesTable";
import CICDTimeline from "@/components/dashboard/CICDTimeline";
import ScoreCard from "@/components/dashboard/ScoreCard";
import AgentPipeline from "@/components/dashboard/AgentPipeline";
import { generateMockRun, type AgentRun } from "@/lib/mock-data";
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
        // Simulate agent execution time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate unique, realistic data based on repository URL
        const mockData = generateMockRun(repo, team, leader);
        setRunData(mockData);
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
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
            <h1 className="font-mono text-sm font-semibold text-foreground">
              AI Fix Agent
            </h1>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex items-center gap-1 ml-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs bg-primary/10 text-primary transition-colors"
            >
              <Activity className="h-3.5 w-3.5" />
              Dashboard
            </Link>
            <button 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => window.open('https://github.com/Tru06/fix-automaton-dash#readme', '_blank')}
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Help
            </button>
            <button 
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => alert('Settings coming soon!')}
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <ThemeToggle />
            {runData && (
              <span className="rounded-full bg-success/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-success">
                AI Powered
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
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
