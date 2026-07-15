"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Briefcase,
  Target,
  Wrench,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  storyChapters,
  storyIntro,
  storyToday,
} from "@/src/content/story";

const ease = [0.22, 1, 0.36, 1] as const;

const chapterIcons: LucideIcon[] = [
  Wrench,
  BookOpen,
  Briefcase,
  Target,
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.14,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.68,
              delay,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}

export default function StoryScene() {
  return (
    <section
      className="story-apple page-section"
      aria-labelledby="story-title"
    >
      <div className="site-wrap">
        <div className="story-apple__intro-grid">
          <Reveal className="story-apple__intro-main">
            <article className="apple-card story-apple__intro-card">
              <div>
                <p className="card-eyebrow">
                  KARİYER HİKÂYEM
                </p>

                <h2
                  id="story-title"
                  className="story-apple__title"
                >
                  Yolum doğrusal ilerlemedi.
                  <span>
                    Teknik merakım ise hiç kaybolmadı.
                  </span>
                </h2>
              </div>

              <p className="story-apple__intro-copy">
                {storyIntro}
              </p>
            </article>
          </Reveal>

          <Reveal
            delay={0.08}
            className="story-apple__intro-side"
          >
            <aside className="apple-card apple-card--soft story-apple__today-card">
              <div className="story-apple__today-top">
                <span>BUGÜN</span>
                <Target
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <p>{storyToday}</p>
            </aside>
          </Reveal>
        </div>

        <div className="story-apple__chapters">
          {storyChapters.map((chapter, index) => {
            const Icon = chapterIcons[index] ?? Target;
            const isClosingChapter =
              index === storyChapters.length - 1;

            return (
              <Reveal
                key={chapter.number}
                delay={index * 0.06}
                className={[
                  "story-apple__chapter-wrap",
                  index % 2 === 0
                    ? "story-apple__chapter-wrap--large"
                    : "story-apple__chapter-wrap--small",
                  isClosingChapter
                    ? "story-apple__chapter-wrap--closing"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <article
                  className={[
                    "apple-card",
                    "apple-card--interactive",
                    "story-apple__chapter",
                    isClosingChapter
                      ? "apple-card--dark story-apple__chapter--dark"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="story-apple__chapter-top">
                    <span className="story-apple__chapter-icon">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="story-apple__chapter-number">
                      {chapter.number}
                    </span>
                  </div>

                  <div>
                    <p className="card-eyebrow">
                      {chapter.period}
                    </p>

                    <h3 className="story-apple__chapter-title">
                      {chapter.title}
                    </h3>

                    <p className="story-apple__chapter-summary">
                      {chapter.summary}
                    </p>
                  </div>

                  <ul className="story-apple__chapter-details">
                    {chapter.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>

                  <p className="story-apple__chapter-closing">
                    {chapter.closing}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .story-apple {
          overflow: clip;
        }

        .story-apple__intro-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.38fr)
            minmax(280px, 0.62fr);
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .story-apple__intro-main,
        .story-apple__intro-side {
          min-width: 0;
          height: 100%;
        }

        .story-apple__intro-card,
        .story-apple__today-card {
          min-height: 460px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
        }

        .story-apple__title {
          max-width: 12ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: var(--f-section);
          font-weight: 850;
          letter-spacing: -0.062em;
          line-height: 0.95;
          text-wrap: balance;
        }

        .story-apple__title span {
          display: block;
          color: var(--ink-3);
        }

        .story-apple__intro-copy {
          max-width: 58ch;
          color: var(--ink-2);
          font-size: var(--f-body);
          line-height: 1.72;
        }

        .story-apple__today-card {
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(255, 255, 255, 0.82),
              transparent 34%
            ),
            var(--surface-muted);
        }

        .story-apple__today-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: var(--ink);
        }

        .story-apple__today-top span {
          color: var(--ink-3);
          font-size: var(--f-label);
          font-weight: 780;
          letter-spacing: 0.145em;
        }

        .story-apple__today-card > p {
          max-width: 24ch;
          color: var(--ink);
          font-size: clamp(1.65rem, 3.2vw, 3rem);
          font-weight: 790;
          letter-spacing: -0.048em;
          line-height: 1.05;
          text-wrap: balance;
        }

        .story-apple__chapters {
          display: grid;
          grid-template-columns: repeat(
            12,
            minmax(0, 1fr)
          );
          gap: var(--grid-gap);
          margin-top: var(--grid-gap);
        }

        .story-apple__chapter-wrap {
          min-width: 0;
          grid-column: span 5;
        }

        .story-apple__chapter-wrap--large {
          grid-column: span 7;
        }

        .story-apple__chapter-wrap--closing {
          grid-column: span 7;
        }

        .story-apple__chapter {
          min-height: 580px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.15rem;
        }

        .story-apple__chapter-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .story-apple__chapter-icon {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--rule);
          border-radius: 16px;
          background: var(--surface-2);
          color: var(--ink);
        }

        .story-apple__chapter-number {
          color: var(--ink-3);
          font-size: 0.68rem;
          font-weight: 780;
          letter-spacing: 0.13em;
        }

        .story-apple__chapter-title {
          max-width: 15ch;
          margin-top: 0.9rem;
          color: var(--ink);
          font-size: var(--f-card-title);
          font-weight: 820;
          letter-spacing: -0.052em;
          line-height: 1.03;
          text-wrap: balance;
        }

        .story-apple__chapter-summary {
          max-width: 58ch;
          margin-top: 1rem;
          color: var(--ink-2);
          font-size: 0.95rem;
          line-height: 1.68;
        }

        .story-apple__chapter-details {
          display: grid;
          gap: 0.75rem;
          padding-top: 1.35rem;
          border-top: 1px solid var(--rule);
          list-style: none;
        }

        .story-apple__chapter-details li {
          position: relative;
          padding-left: 1.15rem;
          color: var(--ink-2);
          font-size: 0.84rem;
          line-height: 1.62;
        }

        .story-apple__chapter-details li::before {
          content: "";
          position: absolute;
          top: 0.7em;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.32;
        }

        .story-apple__chapter-closing {
          padding-top: 1.2rem;
          border-top: 1px solid var(--rule);
          color: var(--ink);
          font-size: 0.94rem;
          font-weight: 650;
          line-height: 1.62;
        }

        .story-apple__chapter--dark
          .story-apple__chapter-icon {
          border-color: var(--rule-inverse);
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .story-apple__chapter--dark
          .story-apple__chapter-number,
        .story-apple__chapter--dark
          .story-apple__chapter-summary,
        .story-apple__chapter--dark
          .story-apple__chapter-details li {
          color: var(--ink-inverse-2);
        }

        .story-apple__chapter--dark
          .story-apple__chapter-title,
        .story-apple__chapter--dark
          .story-apple__chapter-closing {
          color: white;
        }

        .story-apple__chapter--dark
          .story-apple__chapter-details,
        .story-apple__chapter--dark
          .story-apple__chapter-closing {
          border-color: var(--rule-inverse);
        }

        @media (max-width: 980px) {
          .story-apple__intro-grid {
            grid-template-columns: 1fr;
          }

          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 420px;
          }

          .story-apple__chapter-wrap,
          .story-apple__chapter-wrap--large,
          .story-apple__chapter-wrap--closing {
            grid-column: span 6;
          }
        }

        @media (max-width: 720px) {
          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 390px;
          }

          .story-apple__chapters {
            grid-template-columns: 1fr;
          }

          .story-apple__chapter-wrap,
          .story-apple__chapter-wrap--large,
          .story-apple__chapter-wrap--closing {
            grid-column: 1;
          }

          .story-apple__chapter {
            min-height: auto;
          }
        }

        /* Yerleşim dengesi */
        .story-apple__intro-card,
        .story-apple__today-card {
          min-height: 360px;
          display: grid;
          grid-template-rows: auto auto;
          align-content: space-between;
          gap: var(--content-gap-xl);
        }

        .story-apple__title {
          max-width: 13ch;
          margin-top: 1rem;
          line-height: 1;
        }

        .story-apple__title span {
          margin-top: 0.08em;
        }

        .story-apple__intro-copy {
          max-width: 62ch;
          line-height: 1.74;
        }

        .story-apple__today-card > p {
          max-width: 25ch;
          line-height: 1.08;
        }

        .story-apple__chapters {
          align-items: stretch;
        }

        .story-apple__chapter-wrap {
          height: 100%;
        }

        .story-apple__chapter {
          min-height: 500px;
          display: grid;
          grid-template-rows: auto auto minmax(0, 1fr) auto;
          align-content: start;
          gap: var(--content-gap-lg);
        }

        .story-apple__chapter-title {
          max-width: 17ch;
          margin-top: 0.85rem;
          line-height: 1.08;
        }

        .story-apple__chapter-summary {
          max-width: 62ch;
          margin-top: 0.9rem;
          line-height: 1.7;
        }

        .story-apple__chapter-details {
          align-content: start;
          gap: 0.78rem;
          padding-top: 1.2rem;
        }

        .story-apple__chapter-details li {
          line-height: 1.64;
        }

        .story-apple__chapter-closing {
          padding-top: 1.15rem;
          line-height: 1.66;
        }

        @media (max-width: 980px) {
          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 340px;
          }

          .story-apple__chapter {
            min-height: 470px;
          }
        }

        @media (max-width: 720px) {
          .story-apple__intro-card,
          .story-apple__today-card,
          .story-apple__chapter {
            min-height: auto;
          }

          .story-apple__chapter {
            gap: 1.35rem;
          }
        }

        /* Mobilde Hikâyem ile bir sonraki bölüm arasındaki
           gereksiz çift dikey boşluğu azaltır. */
        @media (max-width: 720px) {
          .story-apple.page-section {
            padding-bottom: 2rem;
          }
        }

        /* Masaüstü yerleşim sistemi */
        @media (min-width: 1025px) {
          .story-apple__intro-grid {
            grid-template-columns:
              minmax(0, 1.25fr)
              minmax(340px, 0.75fr);
          }

          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 380px;
            grid-template-rows: auto auto;
            align-content: space-between;
            gap: 1.8rem;
          }

          .story-apple__title {
            max-width: 14ch;
            line-height: 1;
          }

          .story-apple__intro-copy {
            max-width: 64ch;
            line-height: 1.72;
          }

          .story-apple__today-card > p {
            max-width: 22ch;
            line-height: 1.08;
          }

          .story-apple__chapters {
            align-items: stretch;
            row-gap: var(--grid-gap);
          }

          .story-apple__chapter-wrap {
            height: 100%;
          }

          .story-apple__chapter {
            min-height: 505px;
            grid-template-rows:
              auto
              auto
              minmax(0, 1fr)
              auto;
            gap: 1.65rem;
          }

          .story-apple__chapter-title {
            max-width: 18ch;
            margin-top: 0.8rem;
            line-height: 1.07;
          }

          .story-apple__chapter-wrap--large
            .story-apple__chapter-title,
          .story-apple__chapter-wrap--closing
            .story-apple__chapter-title {
            max-width: 22ch;
          }

          .story-apple__chapter-summary {
            max-width: 62ch;
            margin-top: 0.85rem;
            line-height: 1.68;
          }

          .story-apple__chapter-details {
            align-content: start;
            gap: 0.72rem;
            padding-top: 1.2rem;
          }

          .story-apple__chapter-closing {
            padding-top: 1.15rem;
            line-height: 1.64;
          }
        }






      `}</style>
    </section>
  );
}
