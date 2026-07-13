"use client";

import { motion } from "framer-motion";
import { storyChapters } from "@/src/content/story";

const ease = [0.22, 1, 0.36, 1] as const;

export default function StoryScene() {
  return (
    <section
      aria-label="Hikâyem"
      className="section-shell story-shell"
      style={{ background: "transparent" }}
    >
      <div
        className="site-wrap"
        style={{ paddingTop: "clamp(6rem, 14vw, 12rem)" }}
      >
        {/* Bölüm başlığı */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease }}
        className="section-intro"
        >
          <p className="t-label" style={{ marginBottom: "1.5rem" }}>Hikâyem</p>
          <div className="clip">
            <motion.h2
              className="t-section"
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.08 }}
              style={{ maxWidth: "16ch" }}
            >
              Yolum doğrusal ilerlemedi.
            </motion.h2>
          </div>
        </motion.div>
      </div>

      {/* Perdeler — geometrik kutu yok, saf tipografi */}
      <div style={{ paddingBottom: "clamp(5rem, 12vw, 10rem)" }}>
        {storyChapters.map((ch, i) => (
          <article
            key={ch.number}
            style={{ borderTop: "1px solid var(--rule)" }}
          >
            <div className="site-wrap">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: 0.04 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.8fr",
                  gap: "clamp(3rem, 8vw, 10rem)",
                  paddingTop: "clamp(3.5rem, 7vw, 6rem)",
                  paddingBottom: "clamp(3.5rem, 7vw, 6rem)",
                  alignItems: "start",
                  rotate: i % 2 === 0 ? "-0.9deg" : "1deg",
                }}
                className="max-md:block! story-card"
              >
                {/* Sol: dönem ve başlık */}
                <div className="max-md:mb-8!">
                  <span className="story-index t-label" style={{ marginBottom: "1.1rem" }}>
                    {ch.number}
                  </span>
                  <p className="t-label" style={{ marginBottom: "1rem", color: "var(--amber)" }}>
                    {ch.period}
                  </p>
                  <div className="clip">
                    <motion.h3
                      initial={{ y: "100%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.85, ease, delay: 0.1 }}
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        color: "var(--ink)",
                      }}
                    >
                      {ch.title}
                    </motion.h3>
                  </div>
                </div>

                {/* Sağ: paragraflar */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  {ch.paragraphs.map((para, j) => (
                    <motion.p
                      key={j}
                      className="t-body"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.65, ease, delay: 0.1 + j * 0.06 }}
                      style={{ maxWidth: "60ch" }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
