"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  developmentItems,
  experienceGroups,
  experienceNarrative,
  roadmapClosing,
  roadmapStages,
} from "@/src/content/growth";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.68, delay, ease }
      }
    >
      {children}
    </motion.div>
  );
}

export default function GrowthScene() {
  return (
    <section
      aria-labelledby="growth-title"
      className="growth-shell"
      style={{
        position: "relative",
        paddingTop: "clamp(7rem, 13vw, 12rem)",
        paddingBottom: "clamp(7rem, 13vw, 12rem)",
      }}
    >
      <div className="site-wrap">
        <Reveal
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
            BUGÜN VE GELİŞİM YÖNÜM
          </p>

          <h2
            id="growth-title"
            className="t-section"
            style={{
              maxWidth: "16ch",
            }}
          >
            Geçmişten geleceğe.
          </h2>

          <p
            className="t-body"
            style={{
              maxWidth: "55ch",
              marginTop: "1.6rem",
              fontSize: "clamp(1.05rem, 1.5vw, 1.22rem)",
            }}
          >
            Geçmişte uyguladıklarım, bugün geliştirdiklerim ve ulaşmak
            istediğim nokta.
          </p>
        </Reveal>

        <div
          style={{
            borderTop: "1px solid var(--rule)",
          }}
        >
          <section
            aria-labelledby="experience-title"
            className="growth-editorial-section"
          >
            <div className="growth-editorial-heading">
              <p className="t-label">01 · UYGULAMALI DENEYİM</p>

              <h3
                id="experience-title"
                className="t-large"
                style={{
                  maxWidth: "14ch",
                  marginTop: "1rem",
                }}
              >
                Teknik geçmişimi dört temel alanda topluyorum.
              </h3>
            </div>

            <div>
              <div className="experience-groups">
                {experienceGroups.map((group, index) => (
                  <Reveal
                    key={group.number}
                    delay={index * 0.05}
                    className="experience-group"
                  >
                    <div className="experience-group__heading">
                      <span className="experience-group__number">
                        {group.number}
                      </span>

                      <h4>{group.title}</h4>
                    </div>

                    <ul>
                      {group.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>

              <p
                className="t-small"
                style={{
                  maxWidth: "64ch",
                  marginTop: "2rem",
                }}
              >
                {experienceNarrative}
              </p>
            </div>
          </section>

          <section
            aria-labelledby="development-title"
            className="growth-editorial-section"
          >
            <div className="growth-editorial-heading">
              <p className="t-label">02 · ŞU ANDA GELİŞTİRİYORUM</p>

              <h3
                id="development-title"
                className="t-large"
                style={{
                  maxWidth: "15ch",
                  marginTop: "1rem",
                }}
              >
                Kurumsal BT dünyasına hazırlanıyorum.
              </h3>
            </div>

            <ol className="development-list">
              {developmentItems.map((item, index) => (
                <Reveal
                  key={item.number}
                  delay={index * 0.05}
                  className="development-item"
                >
                  <span className="development-item__number">
                    {item.number}
                  </span>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="roadmap-title"
            className="growth-editorial-section"
          >
            <div className="growth-editorial-heading">
              <p className="t-label">03 · YOL HARİTAM</p>

              <h3
                id="roadmap-title"
                className="t-large"
                style={{
                  maxWidth: "14ch",
                  marginTop: "1rem",
                }}
              >
                Üç aşamalı ve gerçekçi bir ilerleme planı.
              </h3>
            </div>

            <div>
              <ol className="roadmap-list">
                {roadmapStages.map((stage, index) => (
                  <Reveal
                    key={stage.label}
                    delay={index * 0.06}
                    className="roadmap-stage"
                  >
                    <p className="roadmap-stage__label">{stage.label}</p>

                    <h4>{stage.title}</h4>

                    <p className="roadmap-stage__description">
                      {stage.description}
                    </p>
                  </Reveal>
                ))}
              </ol>

              <blockquote className="roadmap-closing">
                {roadmapClosing}
              </blockquote>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .growth-editorial-section {
          display: grid;
          grid-template-columns: minmax(13rem, 0.62fr) minmax(0, 1.38fr);
          gap: clamp(3rem, 8vw, 9rem);
          padding-top: clamp(4rem, 8vw, 7rem);
          padding-bottom: clamp(4rem, 8vw, 7rem);
          border-bottom: 1px solid var(--rule);
        }

        .growth-editorial-heading {
          align-self: start;
          position: sticky;
          top: 7rem;
        }

        .experience-groups {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(2rem, 5vw, 5rem);
        }

        .experience-group {
          padding-top: 1.5rem;
          padding-bottom: 1.75rem;
          border-top: 1px solid var(--rule);
        }

        .experience-group__heading {
          display: flex;
          align-items: baseline;
          gap: 1rem;
        }

        .experience-group__number,
        .development-item__number {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .experience-group h4,
        .development-item h4,
        .roadmap-stage h4 {
          color: var(--ink);
          font-family:
            var(--font-display), var(--font-geist), Georgia, serif;
          font-size: clamp(1.25rem, 2vw, 1.75rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          line-height: 1.15;
        }

        .experience-group ul {
          display: grid;
          gap: 0.75rem;
          margin-top: 1.25rem;
          padding-left: 1rem;
        }

        .experience-group li {
          color: var(--ink-2);
          font-size: 0.9375rem;
          line-height: 1.7;
        }

        .experience-group li::marker {
          color: var(--ink-3);
        }

        .development-list,
        .roadmap-list {
          list-style: none;
        }

        .development-item {
          display: grid;
          grid-template-columns: 3rem minmax(0, 1fr);
          gap: 1rem;
          padding-top: 1.6rem;
          padding-bottom: 1.6rem;
          border-top: 1px solid var(--rule);
        }

        .development-item p,
        .roadmap-stage__description {
          max-width: 58ch;
          margin-top: 0.65rem;
          color: var(--ink-3);
          font-size: 0.9375rem;
          line-height: 1.72;
        }

        .roadmap-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-top: 1px solid var(--rule);
        }

        .roadmap-stage {
          min-height: 18rem;
          padding: 1.75rem;
          border-right: 1px solid var(--rule);
        }

        .roadmap-stage:last-child {
          border-right: 0;
        }

        .roadmap-stage__label {
          margin-bottom: clamp(3.5rem, 7vw, 6rem);
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .roadmap-closing {
          max-width: 58ch;
          margin-top: 2.25rem;
          padding-left: 1.25rem;
          border-left: 1px solid var(--rule-strong);
          color: var(--ink-2);
          font-family:
            var(--font-display), var(--font-geist), Georgia, serif;
          font-size: clamp(1.15rem, 2vw, 1.5rem);
          font-style: normal;
          letter-spacing: -0.018em;
          line-height: 1.5;
        }

        @media (max-width: 960px) {
          .growth-editorial-section {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .growth-editorial-heading {
            position: static;
          }
        }

        @media (max-width: 767px) {
          .growth-editorial-section {
            gap: 2.5rem;
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .experience-groups,
          .roadmap-list {
            grid-template-columns: 1fr;
          }

          .roadmap-stage {
            min-height: auto;
            padding: 1.5rem 0;
            border-right: 0;
            border-bottom: 1px solid var(--rule);
          }

          .roadmap-stage:last-child {
            border-bottom: 0;
          }

          .roadmap-stage__label {
            margin-bottom: 1.5rem;
          }

          .development-item {
            grid-template-columns: 2.25rem minmax(0, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
