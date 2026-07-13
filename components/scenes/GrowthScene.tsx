"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Headphones,
  MonitorCog,
  Network,
  Wrench,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  developmentItems,
  developmentNarrative,
  experienceGroups,
  experienceNarrative,
  growthIntro,
  type ExperienceIcon,
} from "@/src/content/growth";

const ease = [0.22, 1, 0.36, 1] as const;

const experienceIcons: Record<ExperienceIcon, LucideIcon> = {
  hardware: Wrench,
  windows: MonitorCog,
  network: Network,
  support: Headphones,
};

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
        amount: 0.16,
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

export default function GrowthScene() {
  return (
    <section
      className="growth-apple page-section"
      aria-labelledby="growth-title"
    >
      <div className="site-wrap">
        <Reveal className="growth-apple__heading">
          <p className="card-eyebrow">
            UYGULAMALI IT SUPPORT DENEYİMİ
          </p>

          <h2
            id="growth-title"
            className="growth-apple__title"
          >
            Sorunu yalnızca çözmek değil,
            <span>nedenini anlamak.</span>
          </h2>

          <p className="growth-apple__intro">
            {growthIntro}
          </p>
        </Reveal>

        <div className="growth-apple__experience-grid">
          {experienceGroups.map((group, index) => {
            const Icon = experienceIcons[group.icon];

            return (
              <Reveal
                key={group.number}
                delay={index * 0.06}
                className="growth-apple__card-wrap"
              >
                <article className="apple-card apple-card--interactive growth-apple__card">
                  <div className="growth-apple__card-top">
                    <span className="growth-apple__icon">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="growth-apple__number">
                      {group.number}
                    </span>
                  </div>

                  <div>
                    <p className="card-eyebrow">
                      {group.eyebrow}
                    </p>

                    <h3 className="growth-apple__card-title">
                      {group.title}
                    </h3>

                    <p className="growth-apple__card-copy">
                      {group.description}
                    </p>
                  </div>

                  <ul className="growth-apple__examples">
                    {group.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={0.08}
          className="growth-apple__experience-note-wrap"
        >
          <aside className="apple-card apple-card--soft growth-apple__experience-note">
            <span className="growth-apple__note-mark">
              <Wrench
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>

            <p>{experienceNarrative}</p>
          </aside>
        </Reveal>

        <Reveal
          delay={0.1}
          className="growth-apple__development-wrap"
        >
          <article className="apple-card apple-card--dark growth-apple__development">
            <div className="growth-apple__development-intro">
              <span className="growth-apple__development-icon">
                <BookOpen
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="card-eyebrow">
                  ŞU ANDA GELİŞTİRDİĞİM ALANLAR
                </p>

                <h3 className="growth-apple__development-title">
                  Uygulamalı temelimi kurumsal süreçlerle
                  tamamlıyorum.
                </h3>

                <p className="growth-apple__development-copy">
                  Teknik bilgi kadar kayıt tutma, iletişim,
                  önceliklendirme ve süreç takibinin de iyi bir
                  IT Support hizmetinin parçası olduğunu
                  biliyorum.
                </p>
              </div>
            </div>

            <div className="growth-apple__development-list">
              {developmentItems.map((item) => (
                <div
                  key={item.number}
                  className="growth-apple__development-item"
                >
                  <span>{item.number}</span>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="growth-apple__quote">
              {developmentNarrative}
            </blockquote>
          </article>
        </Reveal>
      </div>

      <style jsx>{`
        .growth-apple {
          overflow: clip;
        }

        .growth-apple__heading {
          max-width: 900px;
          margin-bottom: clamp(2.4rem, 5vw, 4.25rem);
        }

        .growth-apple__title {
          max-width: 12ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: var(--f-section);
          font-weight: 840;
          letter-spacing: -0.06em;
          line-height: 0.96;
          text-wrap: balance;
        }

        .growth-apple__title span {
          display: block;
          color: var(--ink-3);
        }

        .growth-apple__intro {
          max-width: 62ch;
          margin-top: 1.45rem;
          color: var(--ink-2);
          font-size: var(--f-body);
          line-height: 1.72;
        }

        .growth-apple__experience-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: var(--grid-gap);
        }

        .growth-apple__card-wrap {
          min-width: 0;
          height: 100%;
        }

        .growth-apple__card {
          min-height: 520px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.5rem;
        }

        .growth-apple__card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .growth-apple__icon,
        .growth-apple__development-icon,
        .growth-apple__note-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
        }

        .growth-apple__icon {
          width: 46px;
          height: 46px;
          border: 1px solid var(--rule);
          border-radius: 16px;
          background: var(--surface-2);
          color: var(--ink);
        }

        .growth-apple__number {
          color: var(--ink-3);
          font-size: 0.68rem;
          font-weight: 780;
          letter-spacing: 0.13em;
        }

        .growth-apple__card-title {
          max-width: 16ch;
          margin-top: 0.9rem;
          color: var(--ink);
          font-size: var(--f-card-title);
          font-weight: 810;
          letter-spacing: -0.05em;
          line-height: 1.04;
          text-wrap: balance;
        }

        .growth-apple__card-copy {
          max-width: 55ch;
          margin-top: 1.1rem;
          color: var(--ink-2);
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .growth-apple__examples {
          display: grid;
          gap: 0.72rem;
          padding-top: 1.35rem;
          border-top: 1px solid var(--rule);
          list-style: none;
        }

        .growth-apple__examples li {
          position: relative;
          padding-left: 1.15rem;
          color: var(--ink-2);
          font-size: 0.86rem;
          line-height: 1.58;
        }

        .growth-apple__examples li::before {
          content: "";
          position: absolute;
          top: 0.7em;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ink);
          opacity: 0.3;
        }

        .growth-apple__experience-note-wrap {
          margin-top: var(--grid-gap);
        }

        .growth-apple__experience-note {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          gap: 1rem;
          align-items: flex-start;
          padding-block: clamp(1.3rem, 2.4vw, 1.85rem);
        }

        .growth-apple__note-mark {
          width: 38px;
          height: 38px;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.62);
          color: var(--ink);
        }

        .growth-apple__experience-note p {
          max-width: 80ch;
          color: var(--ink-2);
          font-size: 0.92rem;
          line-height: 1.68;
        }

        .growth-apple__development-wrap {
          margin-top: clamp(3.5rem, 7vw, 6.5rem);
        }

        .growth-apple__development {
          display: grid;
          grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);
          gap: clamp(2.5rem, 6vw, 6.5rem);
        }

        .growth-apple__development-intro {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 4rem;
        }

        .growth-apple__development-icon {
          width: 50px;
          height: 50px;
          border: 1px solid var(--rule-inverse);
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .growth-apple__development-title {
          max-width: 12ch;
          margin-top: 1rem;
          color: white;
          font-size: clamp(2rem, 3.8vw, 3.75rem);
          font-weight: 830;
          letter-spacing: -0.06em;
          line-height: 0.98;
          text-wrap: balance;
        }

        .growth-apple__development-copy {
          max-width: 48ch;
          margin-top: 1.25rem;
          color: var(--ink-inverse-2);
          font-size: 0.96rem;
          line-height: 1.7;
        }

        .growth-apple__development-list {
          border-top: 1px solid var(--rule-inverse);
        }

        .growth-apple__development-item {
          display: grid;
          grid-template-columns: 2.5rem minmax(0, 1fr);
          gap: 1rem;
          padding-block: 1.35rem;
          border-bottom: 1px solid var(--rule-inverse);
        }

        .growth-apple__development-item > span {
          color: rgba(255, 255, 255, 0.42);
          font-size: 0.65rem;
          font-weight: 760;
          letter-spacing: 0.12em;
        }

        .growth-apple__development-item h4 {
          color: white;
          font-size: 1rem;
          font-weight: 720;
          letter-spacing: -0.02em;
          line-height: 1.35;
        }

        .growth-apple__development-item p {
          max-width: 60ch;
          margin-top: 0.38rem;
          color: var(--ink-inverse-2);
          font-size: 0.84rem;
          line-height: 1.62;
        }

        .growth-apple__quote {
          grid-column: 1 / -1;
          max-width: 74ch;
          margin-top: 0.5rem;
          padding-top: 1.6rem;
          border-top: 1px solid var(--rule-inverse);
          color: rgba(255, 255, 255, 0.82);
          font-size: clamp(1rem, 1.45vw, 1.2rem);
          font-weight: 560;
          line-height: 1.65;
        }

        @media (max-width: 960px) {
          .growth-apple__card {
            min-height: 500px;
          }

          .growth-apple__development {
            grid-template-columns: 1fr;
          }

          .growth-apple__development-intro {
            gap: 2.5rem;
          }

          .growth-apple__development-title {
            max-width: 15ch;
          }
        }

        @media (max-width: 720px) {
          .growth-apple__experience-grid {
            grid-template-columns: 1fr;
          }

          .growth-apple__card {
            min-height: auto;
            gap: 2.2rem;
          }

          .growth-apple__experience-note {
            grid-template-columns: 1fr;
          }

          .growth-apple__development {
            gap: 2.5rem;
          }

          .growth-apple__development-item {
            grid-template-columns: 2rem minmax(0, 1fr);
          }
        }

        @media (hover: none), (pointer: coarse) {
          .growth-apple__card {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
