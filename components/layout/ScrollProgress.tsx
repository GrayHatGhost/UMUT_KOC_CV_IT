"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.22,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress"
      style={{
        scaleX: shouldReduceMotion
          ? scrollYProgress
          : smoothProgress,
      }}
    >
      <style jsx global>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          z-index: 140;
          height: 2px;
          background: linear-gradient(
            90deg,
            var(--progress-start),
            var(--progress-end)
          );
          transform-origin: left center;
          pointer-events: none;
        }

        @media (max-width: 767px) {
          .scroll-progress {
            height: 1px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-progress {
            transition: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
