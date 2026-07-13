"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { storyChapters } from "@/src/content/story";

const ease = [0.22, 1, 0.36, 1] as const;

export default function StoryScene() {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const chapters = chapterRefs.current.filter(
      (chapter): chapter is HTMLElement => chapter !== null,
    );

    if (chapters.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const mostVisible = visibleEntries[0];

        if (!mostVisible) return;

        const index = Number(
          (mostVisible.target as HTMLElement).dataset.chapterIndex,
        );

        if (Number.isNaN(index)) return;

        setActiveChapter((current) => (current === index ? current : index));
      },
      {
        rootMargin: "-28% 0px -28% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    chapters.forEach((chapter) => observer.observe(chapter));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="story-title"
      className="story-shell"
      style={{
        position: "relative",
        paddingTop: "clamp(7rem, 13vw, 12rem)",
        paddingBottom: "clamp(6rem, 12vw, 11rem)",
      }}
    >
      <div className="site-wrap">
        <motion.header
          initial={
            shouldReduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.7, ease }
          }
          className="section-intro"
          style={{
            marginBottom: "clamp(4rem, 9vw, 8rem)",
          }}
        >
          <p
            className="t-label"
            style={{
              marginBottom: "1.4rem",
            }}
          >
            HİKÂYEM
          </p>

          <h2
            id="story-title"
            className="t-section"
            style={{
              maxWidth: "15ch",
            }}
          >
            Yolum doğrusal ilerlemedi.
          </h2>

          <p
            className="t-body"
            style={{
              maxWidth: "52ch",
              marginTop: "1.6rem",
              fontSize: "clamp(1.05rem, 1.5vw, 1.22rem)",
            }}
          >
            Teknik merakım ise hiçbir zaman kaybolmadı.
          </p>
        </motion.header>

        <div
          style={{
            borderBottom: "1px solid var(--rule)",
          }}
        >
          {storyChapters.map((chapter, index) => {
            const isActive = activeChapter === index;

            return (
              <article
                key={chapter.number}
                ref={(element) => {
                  chapterRefs.current[index] = element;
                }}
                data-chapter-index={index}
                aria-labelledby={`story-chapter-${chapter.number}`}
                className={[
                  "story-editorial-entry",
                  isActive
                    ? "story-editorial-entry--active"
                    : "story-editorial-entry--muted",
                ].join(" ")}
                style={{
                  borderTop: "1px solid var(--rule)",
                  opacity: isActive ? 1 : 0.38,
                  transition: shouldReduceMotion
                    ? "none"
                    : "opacity 0.45s var(--ease)",
                }}
              >
                <div
                  className="story-editorial-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(11rem, 0.58fr) minmax(0, 1.42fr)",
                    gap: "clamp(2.5rem, 8vw, 9rem)",
                    paddingTop: "clamp(3.5rem, 7vw, 6.5rem)",
                    paddingBottom: "clamp(3.5rem, 7vw, 6.5rem)",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <p
                      aria-hidden="true"
                      style={{
                        color: isActive ? "var(--ink)" : "var(--ink-3)",
                        fontFamily:
                          "var(--font-display), var(--font-geist), Georgia, serif",
                        fontSize: "clamp(4.5rem, 9vw, 8.75rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.065em",
                        lineHeight: 0.82,
                        transition: shouldReduceMotion
                          ? "none"
                          : "color 0.45s var(--ease)",
                      }}
                    >
                      {chapter.number}
                    </p>

                    <p
                      className="t-label"
                      style={{
                        maxWidth: "15rem",
                        marginTop: "clamp(1.5rem, 3vw, 2.4rem)",
                        color: isActive ? "var(--ink-2)" : "var(--ink-3)",
                        transition: shouldReduceMotion
                          ? "none"
                          : "color 0.45s var(--ease)",
                      }}
                    >
                      {chapter.period}
                    </p>
                  </div>

                  <div>
                    <h3
                      id={`story-chapter-${chapter.number}`}
                      style={{
                        maxWidth: "21ch",
                        color: isActive ? "var(--ink)" : "var(--ink-3)",
                        fontFamily:
                          "var(--font-display), var(--font-geist), Georgia, serif",
                        fontSize: "clamp(1.8rem, 3.2vw, 3.35rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.035em",
                        lineHeight: 1.06,
                        transition: shouldReduceMotion
                          ? "none"
                          : "color 0.45s var(--ease)",
                      }}
                    >
                      {chapter.title}
                    </h3>

                    <div
                      style={{
                        display: "grid",
                        gap: "1.15rem",
                        maxWidth: "62ch",
                        marginTop: "clamp(1.8rem, 3vw, 2.75rem)",
                      }}
                    >
                      {chapter.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="t-body"
                          style={{
                            color: isActive
                              ? "var(--ink-2)"
                              : "var(--ink-3)",
                            transition: shouldReduceMotion
                              ? "none"
                              : "color 0.45s var(--ease)",
                          }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .story-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }

          .story-editorial-entry--muted {
            opacity: 0.72 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-editorial-entry {
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
