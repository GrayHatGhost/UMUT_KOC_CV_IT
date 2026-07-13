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
    stiffness: 115,
    damping: 30,
    mass: 0.2,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
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
          z-index: 150;
          height: 2px;
          border-radius: 0 999px 999px 0;
          background: linear-gradient(
            90deg,
            var(--progress-start),
            var(--progress-end)
          );
          box-shadow: none;
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
