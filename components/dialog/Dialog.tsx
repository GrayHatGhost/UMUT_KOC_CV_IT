"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { backdropVariants, modalVariants } from "@/components/motion/motion-config";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
  size?: "default" | "wide";
};

export default function Dialog({ isOpen, onClose, children, ariaLabel, size = "default" }: DialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      closeRef.current?.focus();
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const els = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = els[0];
    const last = els[els.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    panelRef.current.addEventListener("keydown", trap);
    return () => panelRef.current?.removeEventListener("keydown", trap);
  }, [isOpen]);

  const maxW = size === "wide" ? "1100px" : "720px";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15,13,11,0.55)",
              backdropFilter: "blur(12px) saturate(150%)",
            }}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: maxW,
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--bg)",
              borderRadius: "12px",
              border: "1px solid var(--rule)",
              boxShadow: "0 32px 80px rgba(15,13,11,0.22), 0 8px 24px rgba(15,13,11,0.12)",
              zIndex: 10,
            }}
          >
            {/* Kapat */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Kapat"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                zIndex: 20,
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                border: "1px solid var(--rule)",
                background: "var(--bg)",
                color: "var(--ink-2)",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong, #C8C4BC)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink-2)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--rule)"; }}
            >
              <X size={15} />
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
