import { motion } from "framer-motion";
import { CheckCircle2, XCircle, FileCode } from "lucide-react";
import type { BugFix } from "@/lib/mock-data";

const bugTypeColor: Record<string, string> = {
  LINTING: "bg-warning/20 text-warning",
  SYNTAX: "bg-destructive/20 text-destructive",
  LOGIC: "bg-primary/20 text-primary",
  TYPE: "bg-accent/20 text-accent",
  IMPORT: "bg-secondary text-secondary-foreground",
  INDENTATION: "bg-muted text-muted-foreground",
};

const FixesTable = ({ fixes }: { fixes: BugFix[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-lg border border-glow bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <FileCode className="h-5 w-5 text-primary" />
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
          Fixes Log
        </h2>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
          {fixes.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-left font-mono text-xs font-medium text-muted-foreground">File</th>
              <th className="pb-2 text-left font-mono text-xs font-medium text-muted-foreground">Type</th>
              <th className="pb-2 text-left font-mono text-xs font-medium text-muted-foreground">Line</th>
              <th className="pb-2 text-left font-mono text-xs font-medium text-muted-foreground">Commit</th>
              <th className="pb-2 text-right font-mono text-xs font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {fixes.map((fix, i) => (
              <motion.tr
                key={fix.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.03 }}
                className="border-b border-border/50 last:border-0"
              >
                <td className="py-2.5 font-mono text-xs text-foreground">{fix.file}</td>
                <td className="py-2.5">
                  <span className={`inline-block rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${bugTypeColor[fix.bugType]}`}>
                    {fix.bugType}
                  </span>
                </td>
                <td className="py-2.5 font-mono text-xs text-muted-foreground">L{fix.line}</td>
                <td className="max-w-[200px] truncate py-2.5 font-mono text-xs text-muted-foreground">{fix.commitMessage}</td>
                <td className="py-2.5 text-right">
                  {fix.status === "fixed" ? (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-success" />
                  ) : (
                    <XCircle className="ml-auto h-4 w-4 text-destructive" />
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default FixesTable;
