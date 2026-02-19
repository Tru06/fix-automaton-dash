import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, Zap, Shield, GitBranch, ArrowRight, Bug, Wrench, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Bug, title: "Auto Detection", desc: "Scans repos for linting, syntax, logic, type, import & indentation errors" },
  { icon: Wrench, title: "Autonomous Fixes", desc: "AI agents apply fixes directly with structured commits" },
  { icon: Shield, title: "CI/CD Verification", desc: "Automated pipeline runs verify every fix is production-safe" },
  { icon: GitBranch, title: "Branch Creation", desc: "Compliant branch naming with full traceability" },
];

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background bg-grid overflow-hidden">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-glow bg-card px-4 py-1.5">
            <Bot className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">Autonomous AI Fix Agent</span>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
            Detect. Fix. Verify.
            <br />
            <span className="text-gradient">Automatically.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            An AI-powered platform that scans GitHub repositories, detects bugs,
            applies fixes, and verifies them through CI/CD — all autonomously.
          </p>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg gradient-primary px-6 py-3 font-mono text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            <Zap className="h-4 w-4" />
            Launch Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-lg border border-glow bg-card p-5 transition-all hover:glow-primary"
            >
              <f.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Agent pipeline preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-lg border border-glow bg-card p-6"
        >
          <h3 className="mb-4 text-center font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            Multi-Agent Architecture
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Repository", "Detection", "Fix", "Commit", "CI/CD", "Verification"].map((agent, i) => (
              <div key={agent} className="flex items-center gap-3">
                <div className="rounded-md border border-primary/20 bg-muted px-4 py-2">
                  <CheckCircle2 className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <span className="font-mono text-xs text-foreground">{agent}</span>
                </div>
                {i < 5 && <ArrowRight className="h-3 w-3 text-primary/40" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
