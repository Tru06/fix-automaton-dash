import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, RotateCcw, ChevronDown, AlertCircle, FileCode, TestTube2, CheckCheck } from "lucide-react";
import { useState } from "react";
import type { CICDRun } from "@/lib/mock-data";

const CICDTimeline = ({ runs }: { runs: CICDRun[] }) => {
  const [expandedRun, setExpandedRun] = useState<number | null>(null);

  const toggleExpand = (runId: number) => {
    setExpandedRun(expandedRun === runId ? null : runId);
  };

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
            className={`rounded-md border ${
              run.status === "passed"
                ? "border-success/30 bg-success/5"
                : "border-destructive/30 bg-destructive/5"
            }`}
          >
            <div
              className={`flex items-center gap-4 p-3 cursor-pointer transition-colors ${
                run.status === "passed" ? "hover:bg-success/10" : "hover:bg-destructive/10"
              }`}
              onClick={() => toggleExpand(run.id)}
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
                  {run.testsRun && (
                    <span className="flex items-center gap-1">
                      <TestTube2 className="h-3 w-3" />
                      {run.testsPassed}/{run.testsRun} tests
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                    run.status === "passed"
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {run.status}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    expandedRun === run.id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            <AnimatePresence>
              {expandedRun === run.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`border-t p-4 space-y-3 ${
                    run.status === "passed" ? "border-success/20" : "border-destructive/20"
                  }`}>
                    {/* Passed Iteration Details */}
                    {run.status === "passed" && run.checks && (
                      <>
                        {/* Test Summary */}
                        {run.testsRun && (
                          <div className="flex items-start gap-2">
                            <TestTube2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                            <div>
                              <p className="font-mono text-xs font-semibold text-success">
                                Test Results
                              </p>
                              <p className="font-mono text-xs text-muted-foreground mt-1">
                                {run.testsPassed} of {run.testsRun} tests passed successfully
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Validation Checks */}
                        <div className="flex items-start gap-2">
                          <CheckCheck className="h-4 w-4 shrink-0 text-success mt-0.5" />
                          <div className="flex-1">
                            <p className="font-mono text-xs font-semibold text-success mb-2">
                              Validation Checks ({run.checks.length})
                            </p>
                            <ul className="space-y-1">
                              {run.checks.map((check, idx) => (
                                <li
                                  key={idx}
                                  className="font-mono text-xs text-muted-foreground bg-success/5 rounded px-2 py-1 border border-success/10"
                                >
                                  {check}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Failed Iteration Details */}
                    {run.status === "failed" && (
                      <>
                        {/* Failure Reason */}
                        {run.failureReason && (
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                            <div>
                              <p className="font-mono text-xs font-semibold text-destructive">
                                Failure Reason
                              </p>
                              <p className="font-mono text-xs text-muted-foreground mt-1">
                                {run.failureReason}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Failed Tests */}
                        {run.failedTests && run.failedTests.length > 0 && (
                          <div className="flex items-start gap-2">
                            <FileCode className="h-4 w-4 shrink-0 text-destructive mt-0.5" />
                            <div className="flex-1">
                              <p className="font-mono text-xs font-semibold text-destructive mb-2">
                                Failed Tests ({run.failedTests.length})
                              </p>
                              <ul className="space-y-1">
                                {run.failedTests.map((test, idx) => (
                                  <li
                                    key={idx}
                                    className="font-mono text-xs text-muted-foreground bg-destructive/5 rounded px-2 py-1 border border-destructive/10"
                                  >
                                    {test}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* Error Log */}
                        {run.errorLog && (
                          <div>
                            <p className="font-mono text-xs font-semibold text-destructive mb-2">
                              Error Log
                            </p>
                            <pre className="font-mono text-[10px] text-muted-foreground bg-destructive/5 rounded p-2 border border-destructive/10 overflow-x-auto whitespace-pre-wrap">
                              {run.errorLog}
                            </pre>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CICDTimeline;
