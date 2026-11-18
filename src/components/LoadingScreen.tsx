import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setProgress(100);
      const t = window.setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 220);
      return () => window.clearTimeout(t);
    }

    const start = performance.now();
    const duration = 1050;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        onComplete();
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050B09] px-6"
          role="status"
          aria-label="Loading Algae Green Panel"
        >
          <div className="relative flex flex-col items-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg
                viewBox="0 0 120 120"
                className="h-28 w-28 -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#09251B"
                  strokeWidth="2.5"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#39FF88"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 - (326.7 * progress) / 100}
                />
              </svg>

              <div className="absolute inset-3 flex items-center justify-center rounded-full border border-[#39FF88]/20 bg-[#09251B]/70">
                <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
                  <path
                    d="M24 6C15.5 14 11 22 11 29.5C11 36.4 16.8 42 24 42C31.2 42 37 36.4 37 29.5C37 22 32.5 14 24 6Z"
                    fill="#00C878"
                    fillOpacity="0.24"
                    stroke="#39FF88"
                    strokeWidth="2"
                  />
                  <path
                    d="M24 14V38M24 23L30 18M24 29L18 24"
                    stroke="#F4FFF8"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-display text-2xl font-semibold tracking-tight text-[#F4FFF8]">
                Algae Green Panel
              </p>
              <p className="mt-1 text-xs tracking-wide text-[#A0B3A8]">
                Environmental Biotechnology · Initializing Interactive Lab
              </p>
              <p className="mt-3 font-mono text-xs tabular-nums text-[#39FF88]">
                {progress}%
              </p>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="mt-8 rounded-lg border border-[#1B3A2C] px-4 py-2 text-xs font-medium text-[#A0B3A8] transition-colors hover:border-[#39FF88]/50 hover:text-[#F4FFF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF88]"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
