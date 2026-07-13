"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { profile } from "@/src/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

// LinkedIn SVG inline — marka rengiyle
function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactScene() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section
      aria-label="İletişim"
      className="section-shell section-shell-dark contact-shell"
      style={{
        background: "var(--ink)",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Ana içerik */}
      <div
        className="site-wrap"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "clamp(6rem, 14vw, 12rem)",
          paddingBottom: "clamp(4rem, 8vw, 6rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="contact-panel"
        >
          <p className="t-label" style={{ color: "rgba(244,241,235,0.35)", marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
            Bir Sonraki Adım
          </p>

          {/* Devasa kapanış başlığı */}
          <h2 aria-label="Bir sonraki adımımı IT Support alanında atıyorum.">
            {[
              { text: "Bir sonraki adımımı", dim: false },
              { text: "IT Support alanında", dim: false },
              { text: "atıyorum.", dim: true },
            ].map(({ text, dim }, i) => (
              <span key={i} className="clip" style={{ display: "block" }}>
                <motion.span
                  className="display-serif"
                  style={{
                    display: "block",
                    fontSize: "clamp(2.5rem, 7vw, 8rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.93,
                    paddingBottom: "0.07em",
                    color: dim ? "rgba(244,241,235,0.25)" : "var(--bg)",
                  }}
                  initial={{ y: "105%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease, delay: 0.1 + i * 0.1 }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Açıklama metni */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            style={{ marginTop: "clamp(3rem, 7vw, 5rem)" }}
          >
            <p
              className="t-body"
              style={{ color: "rgba(244,241,235,0.55)", maxWidth: "44ch", lineHeight: 1.75, marginBottom: "0.75rem" }}
            >
              Uygulamalı teknik geçmişimi, iş hayatında kazandığım disiplini ve öğrenme isteğimi kurumsal bir IT ortamına taşımayı hedefliyorum.
            </p>
            <p className="t-small" style={{ color: "rgba(244,241,235,0.3)" }}>
              Esenyurt · İstanbul
            </p>
          </motion.div>

          {/* CTA butonlar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.7 }}
            style={{
              marginTop: "clamp(3rem, 6vw, 5rem)",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* E-posta kopyala */}
            <button
              onClick={copyEmail}
              className="btn-ghost-light"
              aria-label="E-posta adresini kopyala"
              style={{ gap: "0.75rem", minWidth: "200px" }}
            >
              {copied ? <Check size={16} /> : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
              <span>{copied ? "Kopyalandı!" : profile.email}</span>
            </button>

            {/* LinkedIn — marka rengi */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profilimi aç"
              className="lux-linkedin"
            >
              <LinkedInIcon size={16} />
              LinkedIn
            </a>

            {/* E-posta gönder */}
            <a
              href={`mailto:${profile.email}`}
              className="btn-ghost-light"
              aria-label="E-posta gönder"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              E-posta gönder
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(244,241,235,0.08)" }}>
        <div
          className="site-wrap"
          style={{
            display: "flex",
            flexDirection: "column" as const,
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              padding: "1.75rem 0",
              display: "flex",
              flexWrap: "wrap" as const,
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <p className="t-label" style={{ color: "rgba(244,241,235,0.25)" }}>
              KENDİMİ GELİŞTİRMEYE DEVAM EDİYORUM.
            </p>
            <p className="t-label" style={{ color: "rgba(244,241,235,0.2)" }}>
              &copy; 2026 UMUT KOÇ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
