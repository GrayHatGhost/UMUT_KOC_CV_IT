"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { onOpenCV: () => void };

export default function HeroScene({ onOpenCV }: Props) {
  const scrollDown = () =>
    document.getElementById("hikayem")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      aria-label="Açılış"
      className="hero-shell"
      style={{
        minHeight: "100svh",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "76px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Çok hafif arkaplan: subtly animated gradient leke */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-12%",
          right: "-6%",
          width: "clamp(420px, 58vw, 860px)",
          height: "clamp(420px, 58vw, 860px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,135,46,0.13) 0%, rgba(196,135,46,0.04) 34%, transparent 68%)",
          filter: "blur(10px)",
          pointerEvents: "none",
        }}
      />

      {/* Ana içerik */}
      <div
        className="site-wrap"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "clamp(4.5rem, 10vw, 8rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Üst: küçük etiket */}
        <motion.p
          className="t-label hero-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}
        >
          KİŞİSEL PORTFOLYO · 2026
        </motion.p>

        {/* Devasa başlık — satır satır reveal */}
        <h1>
          {[
            { text: "Teknik merakımı", muted: false },
            { text: "profesyonel bir", muted: false },
            { text: "kariyere dönüştürüyorum.", muted: true },
          ].map(({ text, muted }, i) => (
            <span key={i} className="clip" style={{ display: "block" }}>
              <motion.span
                className="display-serif"
                style={{
                  display: "block",
                  fontSize: "clamp(2.8rem, 7.5vw, 8.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.92,
                  paddingBottom: "0.07em",
                  color: muted ? "var(--ink-3)" : "var(--ink)",
                  textWrap: "balance",
                }}
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.05, ease, delay: 0.55 + i * 0.11 }}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Alt alan: açıklama + butonlar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.1 }}
          style={{
            marginTop: "clamp(3rem, 7vw, 6rem)",
            display: "grid",
            gap: "1.5rem",
          }}
          className="hero-grid"
        >
          <motion.div
            className="scene-panel hero-summary"
            initial={{ opacity: 0, y: 28, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 0.9, ease, delay: 1.16 }}
          >
            <div style={{ maxWidth: "46ch" }}>
              <p className="t-body" style={{ lineHeight: 1.8 }}>
                Bilgisayar donanımı, teknik destek ve dijital operasyonlar alanında uygulamalı deneyime sahip bir IT Support adayıyım.
              </p>
              <p className="t-label" style={{ marginTop: "1rem", color: "var(--ink-3)" }}>
                İstanbul · IT Support · Teknik Operasyon · AI Destekli Üretim
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
              <button onClick={scrollDown} id="hero-discover-btn" className="btn-dark">
                Hikâyemi keşfet
                <ArrowDown size={14} />
              </button>
              <button onClick={onOpenCV} id="hero-cv-btn" className="btn-ghost">
                CV&apos;yi görüntüle
              </button>
            </div>
          </motion.div>

          <div className="hero-stat-grid">
            {[
              { label: "Odak", value: "IT Support" },
              { label: "Yaklaşım", value: "Düzenli, çözüm odaklı" },
              { label: "Hedef", value: "Kurumsal teknik ekip" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="hero-stat"
                initial={{ opacity: 0, y: 28, rotate: index === 1 ? -2 : 2 }}
                animate={{ opacity: 1, y: index * 18, rotate: index === 1 ? -2 : index === 2 ? 2.5 : 1 }}
                transition={{ duration: 0.9, ease, delay: 1.22 + index * 0.08 }}
                whileHover={{ y: index * 18 - 6, rotate: 0, transition: { duration: 0.25 } }}
              >
                <p className="t-label" style={{ color: "var(--amber)", marginBottom: "0.55rem" }}>
                  {item.label}
                </p>
                <p className="t-small" style={{ color: "var(--ink-2)" }}>
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Alt çubuk: imza + scroll animasyonu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="site-wrap"
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingBottom: "clamp(2rem, 4vw, 3rem)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <button
          onClick={scrollDown}
          aria-label="Aşağı kaydır"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "0.75rem",
            opacity: 0.5,
            transition: "opacity 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
        >
          {/* Animasyonlu scroll çizgisi */}
          <div style={{ position: "relative", width: "1px", height: "48px", background: "var(--rule)" }}>
            <motion.div
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "1px",
                background: "var(--amber)",
              }}
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }}
            />
          </div>
          <p className="t-label" style={{ writingMode: "horizontal-tb" }}>Aşağı kaydır</p>
        </button>

        <p
          className="hidden md:block t-small"
          style={{ textAlign: "right", maxWidth: "24ch", lineHeight: 1.9, color: "var(--ink-3)" }}
        >
          Meraktan deneyime,<br />
          deneyimden profesyonel bir IT kariyerine.
        </p>
      </motion.div>
    </section>
  );
}
