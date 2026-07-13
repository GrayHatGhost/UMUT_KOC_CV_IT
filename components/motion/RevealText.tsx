"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/components/motion/motion-config";

type RevealTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
};

export default function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealTextProps) {
  return (
    <div className={`clip-text ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        <Tag>{children}</Tag>
      </motion.div>
    </div>
  );
}

// Stagger container bileşeni
export function RevealGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

// Stagger item
export function RevealItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
