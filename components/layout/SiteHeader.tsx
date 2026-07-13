"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

import { navItems } from "@/src/content/navigation";

type SiteHeaderProps = {
  activeSection: string;
  onOpenCV: () => void;
};

export default function SiteHeader({
  activeSection,
  onOpenCV,
}: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setIsScrolled(window.scrollY > 20);
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const goTo = (href: string) => {
    setIsMenuOpen(false);

    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, 40);
  };

  const openCV = () => {
    setIsMenuOpen(false);
    window.setTimeout(onOpenCV, 40);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-wrap site-header__inner">
          <button
            type="button"
            className="site-header__brand"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: shouldReduceMotion ? "auto" : "smooth",
              })
            }
            aria-label="Sayfanın başına git"
          >
            <span className="site-header__brand-mark">UK</span>
            <span>Umut Koç</span>
          </button>

          <nav className="site-header__nav" aria-label="Ana navigasyon">
            {navItems.map((item) => {
              const isCV = "isCV" in item && item.isCV;
              const sectionId = item.href.replace("#", "");
              const isActive = !isCV && activeSection === sectionId;

              if (isCV) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="site-header__cv"
                    onClick={openCV}
                  >
                    CV
                    <FileText size={14} aria-hidden="true" />
                  </button>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`site-header__link ${isActive ? "is-active" : ""}`}
                  onClick={() => goTo(item.href)}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="site-header__menu"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigasyon menüsü"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <div className="site-wrap mobile-menu__inner">
              <nav className="mobile-menu__nav">
                {navItems
                  .filter((item) => !("isCV" in item && item.isCV))
                  .map((item, index) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive = activeSection === sectionId;

                    return (
                      <button
                        key={item.label}
                        type="button"
                        className={`mobile-menu__link ${isActive ? "is-active" : ""}`}
                        onClick={() => goTo(item.href)}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{item.label}</strong>
                      </button>
                    );
                  })}
              </nav>

              <button type="button" className="btn-dark" onClick={openCV}>
                CV&apos;yi görüntüle
                <FileText size={16} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .site-header {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          z-index: 120;
          padding-top: 14px;
          pointer-events: none;
        }

        .site-header__inner {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding-inline: 0.72rem 0.58rem;
          border: 1px solid rgba(255, 255, 255, 0.88);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.84);
          box-shadow: var(--shadow-xs);
          pointer-events: auto;
          transition:
            background-color 0.25s var(--ease),
            box-shadow 0.25s var(--ease),
            border-color 0.25s var(--ease);
        }

        .site-header.is-scrolled .site-header__inner {
          border-color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: var(--shadow-sm);
        }

        @supports (backdrop-filter: blur(12px)) {
          .site-header__inner {
            backdrop-filter: blur(12px);
          }
        }

        .site-header__brand {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.4rem 0.55rem 0.4rem 0.15rem;
          color: var(--ink);
          font-size: 0.82rem;
          font-weight: 760;
        }

        .site-header__brand-mark {
          width: 35px;
          height: 35px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--ink);
          color: white;
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .site-header__nav {
          display: flex;
          align-items: center;
          gap: 0.18rem;
        }

        .site-header__link,
        .site-header__cv {
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.66rem 0.82rem;
          border-radius: 999px;
          color: var(--ink-3);
          font-size: 0.72rem;
          font-weight: 700;
          transition:
            color 0.2s var(--ease),
            background-color 0.2s var(--ease);
        }

        .site-header__link:hover,
        .site-header__link.is-active {
          background: var(--surface-2);
          color: var(--ink);
        }

        .site-header__cv {
          margin-left: 0.2rem;
          background: var(--ink);
          color: white;
        }

        .site-header__cv:hover {
          background: #29292d;
        }

        .site-header__menu {
          width: 42px;
          height: 42px;
          display: none;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--surface-2);
          color: var(--ink);
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 110;
          overflow-y: auto;
          background: var(--page);
        }

        .mobile-menu__inner {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
          padding-top: 7.5rem;
          padding-bottom: 2rem;
        }

        .mobile-menu__nav {
          border-top: 1px solid var(--rule);
        }

        .mobile-menu__link {
          width: 100%;
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          gap: 1rem;
          align-items: baseline;
          padding-block: 1.25rem;
          border-bottom: 1px solid var(--rule);
          color: var(--ink-3);
          text-align: left;
        }

        .mobile-menu__link.is-active {
          color: var(--ink);
        }

        .mobile-menu__link span {
          font-size: 0.65rem;
          font-weight: 760;
          letter-spacing: 0.12em;
        }

        .mobile-menu__link strong {
          color: inherit;
          font-size: clamp(2rem, 10vw, 3.25rem);
          font-weight: 820;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        @media (max-width: 900px) {
          .site-header__nav {
            display: none;
          }

          .site-header__menu {
            display: inline-flex;
          }
        }

        @media (max-width: 767px) {
          .site-header {
            padding-top: 8px;
          }

          .site-header__inner {
            height: 56px;
          }

          .site-header__brand span:last-child {
            display: none;
          }

          .site-header__brand-mark {
            width: 36px;
            height: 36px;
          }

          .site-header__inner {
            backdrop-filter: none !important;
            background: rgba(255, 255, 255, 0.96);
          }
        }
      `}</style>
    </>
  );
}
