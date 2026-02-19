import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Play, Loader2 } from "lucide-react";

interface InputPanelProps {
  onRun: (repo: string, team: string, leader: string) => void;
  isRunning: boolean;
}

const InputPanel = ({ onRun, isRunning }: InputPanelProps) => {
  const [repo, setRepo] = useState("");
  const [team, setTeam] = useState("");
  const [leader, setLeader] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repo && team && leader) onRun(repo, team, leader);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-glow bg-card p-6 glow-primary"
    >
      <div className="mb-4 flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-primary" />
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
            placeholder="https://github.com/user/repo"
            className="w-full rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block font-mono text-xs text-muted-foreground">
              Team Name
            </label>
            <input
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              placeholder="RIFT_ORGANISERS"
              className="w-full rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-xs text-muted-foreground">
              Team Leader
            </label>
            <input
              type="text"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              placeholder="SAIYAM_KUMAR"
              className="w-full rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isRunning || !repo || !team || !leader}
          className="flex w-full items-center justify-center gap-2 rounded-md gradient-primary px-4 py-2.5 font-mono text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Agent Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Run Fix Agent
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default InputPanel;
