import { motion } from "framer-motion";
import { CheckCircle2, Cpu } from "lucide-react";
import { agents } from "@/lib/mock-data";

const AgentPipeline = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-lg border border-glow bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Cpu className="h-5 w-5 text-primary" />
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
          Multi-Agent Pipeline
        </h2>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="flex shrink-0 items-center gap-2"
          >
            <div className="rounded-md border border-success/30 bg-success/5 px-3 py-2 text-center">
              <CheckCircle2 className="mx-auto mb-1 h-4 w-4 text-success" />
              <p className="font-mono text-[10px] font-semibold text-foreground">{agent.name}</p>
              <p className="font-mono text-[9px] text-muted-foreground">{agent.description}</p>
            </div>
            {i < agents.length - 1 && (
              <div className="h-px w-4 bg-primary/40" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AgentPipeline;
