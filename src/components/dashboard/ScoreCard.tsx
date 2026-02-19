import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface ScoreCardProps {
  score: {
    base: number;
    speedBonus: number;
    efficiencyPenalty: number;
    final: number;
  };
}

const ScoreCard = ({ score }: ScoreCardProps) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score.final / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="rounded-lg border border-glow bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
          Agent Score
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Circular progress */}
        <div className="relative">
          <svg width="110" height="110" className="-rotate-90">
            <circle
              cx="55" cy="55" r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <motion.circle
              cx="55" cy="55" r="45"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-2xl font-bold text-foreground">{score.final}</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <span className="font-mono text-xs text-muted-foreground">Base Score</span>
            <span className="font-mono text-sm font-semibold text-foreground">{score.base}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-xs text-muted-foreground">Speed Bonus</span>
            <span className="font-mono text-sm font-semibold text-success">+{score.speedBonus}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-xs text-muted-foreground">Efficiency Penalty</span>
            <span className="font-mono text-sm font-semibold text-destructive">{score.efficiencyPenalty}</span>
          </div>
          <div className="mt-2 border-t border-border pt-2 flex justify-between">
            <span className="font-mono text-xs font-bold text-primary">Final Score</span>
            <span className="font-mono text-lg font-bold text-gradient">{score.final}/100</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreCard;
