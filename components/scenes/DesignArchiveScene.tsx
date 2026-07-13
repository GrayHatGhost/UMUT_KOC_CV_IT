"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { designWorks, type DesignWork } from "@/src/content/design-works";
import Dialog from "@/components/dialog/Dialog";
import { X } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function DesignArchiveScene() {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <>
      <section
        aria-label="Tasarım arşivi"
        className="section-shell design-shell"
        style={{ background: "transparent" }}
      >
        <div
          className="site-wrap"
          style={{ paddingTop: "clamp(6rem, 14vw, 12rem)", paddingBottom: "clamp(6rem, 14vw, 12rem)" }}
        >
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease }}
            style={{ marginBottom: "clamp(3rem, 8vw, 7rem)" }}
            className="section-intro"
          >
            <p className="t-label" style={{ marginBottom: "1.5rem" }}>Tasarım Arşivi</p>
            <div className="clip">
              <motion.h2
                className="t-section"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.08 }}
                style={{ maxWidth: "16ch" }}
              >
                Görsel çalışmalar.
              </motion.h2>
            </div>
            <p className="t-body" style={{ marginTop: "1.5rem", maxWidth: "44ch", color: "var(--ink-3)" }}>
              Sosyal medya, duyuru ve kurumsal iletişim için hazırladığım seçili görsel çalışmalar.
            </p>
          </motion.div>

          {/* Asimetrik önizleme grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.25fr 0.92fr 1.08fr",
              gridTemplateRows: "auto auto",
              gap: "1.25rem",
            }}
            className="max-md:grid-cols-1!"
          >
            {designWorks.slice(0, 3).map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, ease, delay: 0.08 * i }}
                style={{ gridRow: i === 0 ? "span 2" : "span 1" }}
                className="group design-card"
              >
                <div
                  style={{
                    aspectRatio: i === 0 ? "3/4" : "4/3",
                    background: "var(--bg-alt)",
                    overflow: "hidden",
                    borderRadius: "18px",
                    marginBottom: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setCatalogOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${work.title} — katalogda göster`}
                  onKeyDown={(e) => e.key === "Enter" && setCatalogOpen(true)}
                >
                  {work.image ? (
                    <img
                      src={work.image}
                      alt={work.title}
                      loading="lazy"
                      className="img-grayscale"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span className="t-label" style={{ color: "var(--ink-3)" }}>{work.number}</span>
                    </div>
                  )}
                </div>
                <p className="t-label" style={{ color: "var(--amber)", marginBottom: "0.25rem" }}>
                  {work.category}
                </p>
                <p style={{ fontSize: "var(--f-small)", color: "var(--ink-2)" }}>{work.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Arşiv aç butonu */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            <button
              onClick={() => setCatalogOpen(true)}
              className="hover-line hover-amber t-label"
              style={{ color: "var(--ink)", gap: "0.8em" }}
            >
              Tasarım arşivini aç
              <span style={{ fontSize: "1rem" }}>→</span>
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {catalogOpen && (
          <DesignCatalog onClose={() => setCatalogOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function DesignCatalog({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState<DesignWork>(designWorks[0]);
  const [lightbox, setLightbox] = useState(false);

  return (
    <Dialog isOpen onClose={onClose} ariaLabel="Tasarım Kataloğu" size="wide">
      <div style={{ minHeight: "75vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "2rem clamp(1.5rem, 4vw, 3rem)", borderBottom: "1px solid var(--rule)" }}>
          <p className="t-label" style={{ marginBottom: "0.25rem" }}>Tasarım Kataloğu</p>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>Görsel çalışmalar</h2>
        </div>

        {/* Katalog içeriği */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr 260px",
            flex: 1,
            minHeight: 0,
          }}
          className="max-lg:grid-cols-1!"
        >
          {/* Sol: küçük önizlemeler */}
          <div
            style={{ borderRight: "1px solid var(--rule)", padding: "1.5rem 1rem", overflowY: "auto" }}
            className="max-lg:hidden!"
          >
            {designWorks.map((w) => (
              <button
                key={w.id}
                onClick={() => setActive(w)}
                style={{
                  width: "100%",
                  marginBottom: "0.75rem",
                  borderRadius: "6px",
                  overflow: "hidden",
                  outline: active.id === w.id ? "2px solid var(--amber)" : "2px solid transparent",
                  transition: "outline-color 0.25s",
                }}
              >
                <div style={{ aspectRatio: "4/3", background: "var(--bg-alt)" }}>
                  {w.image && (
                    <img
                      src={w.image}
                      alt={w.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.4)" }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Orta: büyük görsel */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--bg-alt)" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                aspectRatio: "4/5",
                borderRadius: "8px",
                overflow: "hidden",
                background: "var(--bg)",
                cursor: "zoom-in",
              }}
              onClick={() => setLightbox(true)}
              role="button"
              tabIndex={0}
              aria-label="Görseli büyüt"
              onKeyDown={(e) => e.key === "Enter" && setLightbox(true)}
            >
              {active.image && (
                <img
                  src={active.image}
                  alt={active.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
          </div>

          {/* Sağ: detaylar */}
          <div style={{ borderLeft: "1px solid var(--rule)", padding: "2rem", overflowY: "auto" }} className="max-lg:border-l-0!">
            <p className="t-label" style={{ color: "var(--amber)", marginBottom: "0.5rem" }}>{active.category}</p>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
              {active.title}
            </h3>
            {[
              { label: "AMAÇ", val: active.purpose },
              { label: "PLATFORM", val: active.platform },
              { label: "ARAÇLAR", val: active.tools.join(", ") },
            ].map(({ label, val }) => (
              <div key={label} style={{ marginBottom: "1.25rem" }}>
                <p className="t-label" style={{ marginBottom: "0.3rem" }}>{label}</p>
                <p className="t-small" style={{ color: "var(--ink-2)" }}>{val}</p>
              </div>
            ))}

            {/* Önceki / Sonraki */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
              {designWorks.map((w, i) => {
                const idx = designWorks.findIndex((d) => d.id === active.id);
                if (i === idx - 1)
                  return (
                    <button key="prev" onClick={() => setActive(w)} className="btn-ghost" style={{ flex: 1, padding: "0.6em 0.8em", fontSize: "0.75rem" }}>
                      ← Önceki
                    </button>
                  );
                if (i === idx + 1)
                  return (
                    <button key="next" onClick={() => setActive(w)} className="btn-ghost" style={{ flex: 1, padding: "0.6em 0.8em", fontSize: "0.75rem" }}>
                      Sonraki →
                    </button>
                  );
                return null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 300,
              background: "rgba(15,13,11,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}
            onClick={() => setLightbox(false)}
          >
            <button
              style={{ position: "absolute", top: "1.5rem", right: "1.5rem", color: "var(--bg)", opacity: 0.7 }}
              onClick={() => setLightbox(false)}
              aria-label="Kapat"
            >
              <X size={24} />
            </button>
            {active.image && (
              <motion.img
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                src={active.image}
                alt={active.title}
                style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: "8px" }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
