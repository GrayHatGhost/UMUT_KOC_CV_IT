"use client";

import { motion } from "framer-motion";
import {
  experienceItems,
  experienceNarrative,
  developmentItems,
  roadmapItems,
  roadmapClosing,
  type StatusType,
} from "@/src/content/growth";

const ease = [0.22, 1, 0.36, 1] as const;

const BADGE: Record<StatusType, string> = {
  "Çalışıyorum": "badge badge-active",
  "Geliştiriyorum": "badge badge-progress",
  "Araştırıyorum": "badge badge-research",
  "Devam ediyor": "badge badge-ongoing",
};

function SectionHead({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease }}
      style={{ marginBottom: "clamp(4rem, 9vw, 8rem)" }}
    >
      <p className="t-label" style={{ marginBottom: "1.5rem" }}>{label}</p>
      <div className="clip">
        <motion.h2
          className="t-section"
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.08 }}
          style={{ maxWidth: "18ch" }}
        >
          {title}
        </motion.h2>
      </div>
      <p className="t-body" style={{ marginTop: "1.5rem", maxWidth: "44ch", color: "var(--ink-3)" }}>
        {subtitle}
      </p>
    </motion.div>
  );
}

export default function GrowthScene() {
  return (
    <section
      aria-label="Bugün ve gelişim yönüm"
      className="section-shell growth-shell"
      style={{ background: "transparent" }}
    >
      <div
        className="site-wrap"
        style={{ paddingTop: "clamp(6rem, 14vw, 12rem)", paddingBottom: "clamp(6rem, 14vw, 12rem)" }}
      >
        <SectionHead
          label="Bugün ve Gelişim Yönüm"
          title="Geçmişten geleceğe."
          subtitle="Geçmişte uyguladıklarım, bugün geliştirdiklerim ve ulaşmak istediğim nokta."
        />

        {/* Üç kolon — kutu yok, sadece içerik */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
          }}
          className="max-lg:grid-cols-1!"
        >
          {/* Kolon 1: Uygulamalı Deneyim */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0 }}
            className="growth-card"
          >
            <p className="t-label" style={{ color: "var(--amber)", marginBottom: "1.5rem" }}>
              Uygulamalı Deneyim
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {experienceItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "0.85rem 0",
                    borderBottom: "1px solid var(--rule)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  {/* Küçük nokta */}
                  <span style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "var(--amber)",
                    flexShrink: 0,
                    marginTop: "0.55rem",
                  }} />
                  <span className="t-small" style={{ color: "var(--ink-2)", lineHeight: 1.65 }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="t-small" style={{ marginTop: "1.5rem", lineHeight: 1.8, color: "var(--ink-3)" }}>
              {experienceNarrative}
            </p>
          </motion.div>

          {/* Kolon 2: Şu an geliştirdiğim */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="growth-card"
          >
            <p className="t-label" style={{ color: "var(--sage)", marginBottom: "1.5rem" }}>
              Şu An Geliştiriyorum
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {developmentItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--rule)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <span className="t-small" style={{ color: "var(--ink-2)" }}>{item.label}</span>
                  <span className={BADGE[item.status]}>{item.status}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kolon 3: Yol haritası */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="growth-card"
          >
            <p className="t-label" style={{ color: "var(--slate)", marginBottom: "1.5rem" }}>
              Yol Haritam
            </p>
            <ol style={{ display: "flex", flexDirection: "column", gap: "0", listStyle: "none" }}>
              {roadmapItems.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--rule)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <span style={{
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--slate)",
                    flexShrink: 0,
                    paddingTop: "0.2rem",
                    opacity: 0.6,
                  }}>
                    {item.number}
                  </span>
                  <span className="t-small" style={{ color: "var(--ink-2)", lineHeight: 1.65 }}>{item.text}</span>
                </li>
              ))}
            </ol>
            <p
              className="t-small"
              style={{ marginTop: "2rem", fontStyle: "italic", color: "var(--ink-3)", lineHeight: 1.8 }}
            >
              &ldquo;{roadmapClosing}&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
