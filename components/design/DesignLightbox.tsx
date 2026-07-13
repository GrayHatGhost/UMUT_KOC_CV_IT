"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type DesignWork } from "@/src/content/design-works";
import { useEffect } from "react";

type DesignLightboxProps = {
  work: DesignWork | null;
  onClose: () => void;
};

export default function DesignLightbox({ work, onClose }: DesignLightboxProps) {
  // Esc tuşu ile kapatma (Ana modal açıkken, lighbox da açık olabileceğinden burada da yakalıyoruz ama stopPropagation veya kendi focus trap'i olabilir. Şimdilik sade tutuyoruz.)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && work) {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey, { capture: true });
    return () => window.removeEventListener("keydown", handleKey, { capture: true });
  }, [work, onClose]);

  return (
    <AnimatePresence>
      {work && (
        <div
          role="dialog"
          aria-label={`${work.title} görseli`}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Kapat Butonu */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30 transition-all"
            aria-label="Görseli kapat"
          >
            <X size={18} />
          </button>

          {/* Görsel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-full max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={work.image}
              alt={work.title}
              className="max-w-full max-h-[85vh] object-contain"
            />
            
            {/* Alt Bilgi */}
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <h4 className="text-white text-sm font-medium tracking-wide mb-1">{work.title}</h4>
              <p className="text-white/40 text-xs tracking-wider">{work.category}</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
