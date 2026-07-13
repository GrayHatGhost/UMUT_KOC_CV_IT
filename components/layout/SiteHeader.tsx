"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";

const SECTIONS = ["giris","hikayem","gelisim","projeler","tasarim","iletisim"] as const;
const LABELS: Record<string, string> = {
  giris: "UMUT KOÇ",
  hikayem: "HİKÂYEM",
  gelisim: "GELİŞİM",
  projeler: "PROJELER",
  tasarim: "TASARIM",
  iletisim: "İLETİŞİM",
};
const NAV_ITEMS = [
  { id: "hikayem", label: "Hikâyem" },
  { id: "gelisim", label: "Yönüm" },
  { id: "projeler", label: "Projeler" },
  { id: "tasarim", label: "Tasarım" },
];

type Props = { activeSection: string; onOpenCV: () => void };

export default function SiteHeader({ activeSection, onOpenCV }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", menuOpen);
    return () => document.body.classList.remove("modal-open");
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      window.localStorage.setItem("theme", next);
      return next;
    });
  };

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 120,
          height: "76px",
          display: "flex",
          alignItems: "center",
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(22px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(17,15,12,0.05)" : "1px solid transparent",
          transition: "background 0.5s, backdrop-filter 0.5s, border-color 0.5s, transform 0.4s",
        }}
      >
        <div className="site-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="t-label hover-line header-pill"
            style={{ letterSpacing: "0.16em", paddingInline: "1rem" }}
            aria-label="Sayfanın başına git"
          >
            UMUT KOÇ
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3 header-pill" aria-label="Ana navigasyon">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="t-label hover-line hover-amber"
                style={{
                  color: activeSection === item.id ? "var(--ink)" : "var(--ink-3)",
                  transition: "color 0.3s, background 0.3s",
                  padding: "0.7rem 0.95rem",
                  borderRadius: "999px",
                  background: activeSection === item.id ? "rgba(17,15,12,0.05)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
              title={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
            >
              <span className="theme-toggle__icon" aria-hidden="true">
                {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
              </span>
              <span className="t-label" style={{ color: "inherit", letterSpacing: "0.12em" }}>
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
            <button
              onClick={onOpenCV}
              className="btn-dark"
              style={{ padding: "0.55em 1.25em" }}
            >
              CV
            </button>
            <a
              href="#iletisim"
              onClick={(e) => { e.preventDefault(); go("iletisim"); }}
              className="t-label hover-line"
              style={{ color: "var(--ink-3)", paddingInline: "0.5rem" }}
            >
              İletişim
            </a>
          </nav>

          {/* Mobil hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            className="md:hidden"
            style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "8px" }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "block", width: "22px", height: "1.5px", background: "var(--ink)" }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: "block", width: "22px", height: "1.5px", background: "var(--ink)" }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "block", width: "22px", height: "1.5px", background: "var(--ink)" }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 115,
              background: "color-mix(in srgb, var(--nav-bg) 86%, transparent)",
              backdropFilter: "blur(24px) saturate(170%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: "76px",
            }}
            role="dialog"
            aria-label="Navigasyon menüsü"
          >
            <div className="site-wrap mobile-menu-shell scene-panel" style={{ padding: "1rem clamp(1rem, 3vw, 1.5rem)" }}>
              {[...NAV_ITEMS, { id: "iletisim", label: "İletişim" }].map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className="t-large hover-line"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "1.5rem 0.5rem",
                      color: "var(--ink-3)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
              >
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="theme-toggle"
                  aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
                >
                  <span className="theme-toggle__icon" aria-hidden="true">
                    {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
                  </span>
                  <span className="t-label" style={{ color: "inherit", letterSpacing: "0.12em" }}>
                    {theme === "dark" ? "Light" : "Dark"}
                  </span>
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onOpenCV(); }}
                  className="btn-dark"
                >
                  CV&apos;yi görüntüle
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
