import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Play, Loader2 } from "lucide-react";

interface InputPanelProps {
  onRun: (repo: string, team: string, leader: string) => void;
  isRunning: boolean;
}

const InputPanel = ({ onRun, isRunning }: InputPanelProps) => {
  const [repo, setRepo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repo) {
      // Generate default team and leader from repo name
      const repoName = repo.split('/').pop()?.replace('.git', '') || 'REPO';
      onRun(repo, 'AI_AGENT', repoName.toUpperCase());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-glow bg-card p-6 glow-primary"
      whileHover={{ 
        boxShadow: "0 0 30px rgba(var(--primary), 0.2)",
        borderColor: "rgba(var(--primary), 0.5)"
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <GitBranch className="h-5 w-5 text-primary" />
        </motion.div>
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
          Agent Control Panel
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block font-mono text-xs text-muted-foreground">
            GitHub Repository URL
          </label>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="w-full rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Enter any public GitHub repository to analyze
          </p>
        </div>

        <button
          type="submit"
          disabled={isRunning || !repo}
          className="flex w-full items-center justify-center gap-2 rounded-md gradient-primary px-4 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing Repository...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Analyze Repository
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default InputPanel;
