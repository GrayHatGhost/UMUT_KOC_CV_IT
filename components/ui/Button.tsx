"use client";

import { motion } from "framer-motion";
import { motionTokens } from "@/components/motion/motion-config";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  href?: string;
  className?: string;
  id?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
};

export default function Button({
  children,
  variant = "secondary",
  onClick,
  href,
  className = "",
  id,
  ariaLabel,
  type = "button",
  disabled = false,
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-medium transition-all duration-300 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-3 disabled:opacity-40 disabled:pointer-events-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "px-6 py-3 rounded-[18px] border border-white/90 bg-white text-black hover:bg-transparent hover:text-white text-sm",
    secondary:
      "px-6 py-3 rounded-[18px] border border-white/20 bg-transparent text-white hover:border-white/50 hover:bg-white/5 text-sm",
    ghost:
      "px-0 py-2 text-white/60 hover:text-white text-sm underline-offset-4 hover:underline",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        id={id}
        href={href}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.button
      id={id}
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
    >
      {children}
    </motion.button>
  );
}
