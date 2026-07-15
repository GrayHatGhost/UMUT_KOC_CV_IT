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

const experienceIcons: Record<
  ExperienceIcon,
  LucideIcon
> = {
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

                  <div className="growth-apple__card-body">
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
                  önceliklendirme ve süreç takibinin de iyi
                  bir IT Support hizmetinin parçası olduğunu
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
          max-width: 940px;
          margin-bottom: clamp(2.75rem, 4.8vw, 4rem);
        }

        .growth-apple__title {
          max-width: 13ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: var(--f-section);
          font-weight: 840;
          letter-spacing: -0.06em;
          line-height: 1;
          text-wrap: balance;
        }

        .growth-apple__title span {
          display: block;
          margin-top: 0.08em;
          color: var(--ink-3);
        }

        .growth-apple__intro {
          max-width: 68ch;
          margin-top: 1.35rem;
          color: var(--ink-2);
          font-size: var(--f-body);
          line-height: 1.72;
        }

        .growth-apple__experience-grid {
          display: grid;
          grid-template-columns: repeat(
            2,
            minmax(0, 1fr)
          );
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .growth-apple__card-wrap {
          min-width: 0;
          height: 100%;
        }

        .growth-apple__card {
          min-height: 510px;
          height: 100%;
          display: grid;
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto;
          gap: 1.65rem;
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

        .growth-apple__card-body {
          align-self: start;
        }

        .growth-apple__card-title {
          max-width: 18ch;
          margin-top: 0.85rem;
          color: var(--ink);
          font-size: var(--f-card-title);
          font-weight: 810;
          letter-spacing: -0.05em;
          line-height: 1.07;
          text-wrap: balance;
        }

        .growth-apple__card-copy {
          max-width: 58ch;
          margin-top: 1rem;
          color: var(--ink-2);
          font-size: 0.96rem;
          line-height: 1.68;
        }

        .growth-apple__examples {
          display: grid;
          gap: 0.72rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--rule);
          list-style: none;
        }

        .growth-apple__examples li {
          position: relative;
          padding-left: 1.15rem;
          color: var(--ink-2);
          font-size: 0.86rem;
          line-height: 1.6;
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
          grid-template-columns:
            auto
            minmax(0, 1fr);
          gap: 1rem;
          align-items: center;
          min-height: 92px;
          padding-block: 1.35rem;
        }

        .growth-apple__note-mark {
          width: 40px;
          height: 40px;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.62);
          color: var(--ink);
        }

        .growth-apple__experience-note p {
          max-width: 84ch;
          color: var(--ink-2);
          font-size: 0.92rem;
          line-height: 1.68;
        }

        .growth-apple__development-wrap {
          margin-top: var(--grid-gap);
        }

        .growth-apple__development {
          min-height: 610px;
          display: grid;
          grid-template-columns:
            minmax(320px, 0.9fr)
            minmax(0, 1.1fr);
          gap: clamp(2.75rem, 4vw, 4.5rem);
        }

        .growth-apple__development-intro {
          display: grid;
          grid-template-rows:
            auto
            minmax(0, 1fr);
          align-content: space-between;
          gap: 3rem;
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
          max-width: 14ch;
          margin-top: 1rem;
          color: white;
          font-size: clamp(2rem, 3.5vw, 3.45rem);
          font-weight: 830;
          letter-spacing: -0.058em;
          line-height: 1.02;
          text-wrap: balance;
        }

        .growth-apple__development-copy {
          max-width: 50ch;
          margin-top: 1.2rem;
          color: var(--ink-inverse-2);
          font-size: 0.94rem;
          line-height: 1.68;
        }

        .growth-apple__development-list {
          align-self: stretch;
          border-top: 1px solid var(--rule-inverse);
        }

        .growth-apple__development-item {
          display: grid;
          grid-template-columns:
            2.25rem
            minmax(0, 1fr);
          gap: 0.9rem;
          padding-block: 1.2rem;
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
          line-height: 1.42;
        }

        .growth-apple__development-item p {
          max-width: 62ch;
          margin-top: 0.42rem;
          color: var(--ink-inverse-2);
          font-size: 0.84rem;
          line-height: 1.62;
        }

        .growth-apple__quote {
          grid-column: 1 / -1;
          max-width: 80ch;
          margin-top: 0;
          padding-top: 1.45rem;
          border-top: 1px solid var(--rule-inverse);
          color: rgba(255, 255, 255, 0.84);
          font-size: clamp(1rem, 1.4vw, 1.18rem);
          font-weight: 560;
          line-height: 1.65;
        }

        @media (max-width: 960px) {
          .growth-apple__development {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .growth-apple__development-intro {
            grid-template-rows: auto auto;
            gap: 2rem;
          }
        }

        @media (max-width: 720px) {
          .growth-apple.page-section {
            padding-top: 2rem;
          }

          :global(.growth-apple__heading) {
            width: 100%;
            max-width: none;
            margin-inline: auto;
            margin-bottom: 2.35rem;
            text-align: center;
          }

          :global(.growth-apple__heading)
            .card-eyebrow {
            width: 100%;
            text-align: center;
          }

          :global(.growth-apple__heading)
            .growth-apple__title {
            width: 100%;
            max-width: 11.5ch;
            margin-inline: auto;
            text-align: center;
          }

          :global(.growth-apple__heading)
            .growth-apple__intro {
            width: 100%;
            max-width: 32rem;
            margin-inline: auto;
            margin-top: 1.2rem;
            text-align: center;
            line-height: 1.68;
          }

          .growth-apple__experience-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          :global(.growth-apple__card-wrap),
          :global(.growth-apple__experience-note-wrap),
          :global(.growth-apple__development-wrap) {
            width: 100%;
            min-width: 0;
          }

          .growth-apple__card {
            min-height: auto;
            gap: 1.4rem;
          }

          .growth-apple__experience-note {
            grid-template-columns: 1fr;
            align-items: flex-start;
          }

          .growth-apple__development {
            grid-template-columns: minmax(0, 1fr);
            gap: 1.9rem;
            overflow: hidden;
          }

          .growth-apple__development-title {
            max-width: none;
            font-size: clamp(1.85rem, 8.5vw, 2.55rem);
            line-height: 1.07;
          }

          .growth-apple__development-copy {
            max-width: none;
            line-height: 1.65;
          }

          .growth-apple__development-item {
            grid-template-columns:
              1.65rem
              minmax(0, 1fr);
            gap: 0.7rem;
          }

          .growth-apple__quote {
            grid-column: auto;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
