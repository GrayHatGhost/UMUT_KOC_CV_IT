"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const smooth = useSpring(progress, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const fn = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setProgress(window.scrollY / total);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "3px",
        zIndex: 130,
        background: "linear-gradient(90deg, var(--progress-start), var(--progress-end))",
        boxShadow: "0 0 18px var(--progress-glow)",
        scaleX: smooth,
        transformOrigin: "left",
      }}
    />
  );
}
