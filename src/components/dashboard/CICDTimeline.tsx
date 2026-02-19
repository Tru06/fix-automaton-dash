import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, RotateCcw } from "lucide-react";
import type { CICDRun } from "@/lib/mock-data";

const CICDTimeline = ({ runs }: { runs: CICDRun[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-lg border border-glow bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <RotateCcw className="h-5 w-5 text-primary" />
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
          CI/CD Timeline
        </h2>
      </div>

      <div className="space-y-3">
        {runs.map((run, i) => (
          <motion.div
            key={run.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`flex items-center gap-4 rounded-md border p-3 ${
              run.status === "passed"
                ? "border-success/30 bg-success/5"
                : "border-destructive/30 bg-destructive/5"
            }`}
          >
            {run.status === "passed" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
            ) : (
              <XCircle className="h-5 w-5 shrink-0 text-destructive" />
            )}

            <div className="flex-1">
              <p className="font-mono text-sm font-medium text-foreground">
                Iteration #{run.iteration}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {run.duration}
                </span>
                <span>{new Date(run.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>

            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                run.status === "passed"
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
              }`}
            >
              {run.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CICDTimeline;
