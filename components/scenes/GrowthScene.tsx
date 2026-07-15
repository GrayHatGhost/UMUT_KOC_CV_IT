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
          font-size: var(--f-body);
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

        /* Yerleşim dengesi */
        .growth-apple__heading {
          max-width: 940px;
          margin-bottom: clamp(2.6rem, 4.5vw, 3.75rem);
        }

        .growth-apple__title {
          max-width: 13ch;
          line-height: 1;
        }

        .growth-apple__title span {
          margin-top: 0.08em;
        }

        .growth-apple__intro {
          max-width: 68ch;
          line-height: 1.74;
        }

        .growth-apple__experience-grid {
          align-items: stretch;
        }

        .growth-apple__card {
          min-height: 460px;
          display: grid;
          grid-template-rows: auto auto minmax(0, 1fr);
          align-content: space-between;
          gap: var(--content-gap-xl);
        }

        .growth-apple__card > div:nth-child(2) {
          display: grid;
          align-content: start;
          gap: var(--content-gap-lg);
        }

        .growth-apple__card-title {
          max-width: 18ch;
          margin-top: 0;
          line-height: 1.06;
        }

        .growth-apple__card-copy {
          max-width: 60ch;
          margin-top: 0;
          font-size: var(--f-body);
          line-height: 1.68;
        }

        .growth-apple__examples {
          align-self: end;
          gap: 0.78rem;
          padding-top: 1.2rem;
        }

        .growth-apple__examples li {
          line-height: 1.64;
        }

        .growth-apple__experience-note {
          align-items: center;
          gap: var(--content-gap-md);
        }

        .growth-apple__development-wrap {
          margin-top: clamp(3rem, 5.5vw, 5rem);
        }

        .growth-apple__development {
          grid-template-columns:
            minmax(280px, 0.8fr)
            minmax(0, 1.2fr);
          gap: clamp(2.5rem, 4.5vw, 4.75rem);
          min-height: 540px;
        }

        .growth-apple__development-intro {
          display: grid;
          grid-template-rows: auto auto;
          align-content: space-between;
          gap: var(--content-gap-xl);
        }

        .growth-apple__development-title {
          max-width: 14ch;
          margin-top: 0;
          line-height: 1.02;
        }

        .growth-apple__development-copy {
          max-width: 52ch;
          margin-top: 0;
          font-size: var(--f-body);
          line-height: 1.68;
        }

        .growth-apple__development-item {
          padding-block: 1.25rem;
        }

        .growth-apple__development-item h4 {
          line-height: 1.42;
        }

        .growth-apple__development-item p {
          margin-top: 0.42rem;
          line-height: 1.64;
        }

        .growth-apple__quote {
          max-width: 78ch;
          margin-top: 0;
          line-height: 1.68;
        }

        @media (max-width: 960px) {
          .growth-apple__card {
            min-height: 430px;
          }

          .growth-apple__development {
            gap: var(--content-gap-2xl);
            min-height: auto;
          }
        }

        @media (max-width: 720px) {
          .growth-apple__card {
            min-height: auto;
            gap: 1.35rem;
          }

          .growth-apple__examples {
            align-self: auto;
          }
        }

        /* Mobil düzeltme:
           Sonradan eklenen masaüstü grid tanımı mobil tek kolonu
           ezmesin; başlık alanı gerçek merkezde kalsın. */
        @media (max-width: 720px) {
          .growth-apple__heading {
            width: 100%;
            max-width: none;
            margin-inline: auto;
            margin-bottom: 2.5rem;
            text-align: center;
          }

          .growth-apple__heading :global(.card-eyebrow) {
            width: 100%;
            text-align: center;
          }

          .growth-apple__title {
            width: 100%;
            max-width: 12ch;
            margin-inline: auto;
            line-height: 1.02;
          }

          .growth-apple__intro {
            width: 100%;
            max-width: 34rem;
            margin-inline: auto;
            margin-top: 1.2rem;
            line-height: 1.72;
          }

          .growth-apple__development {
            width: 100%;
            min-width: 0;
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
            overflow: hidden;
          }

          .growth-apple__development-intro,
          .growth-apple__development-list,
          .growth-apple__development-item,
          .growth-apple__development-item > div {
            width: 100%;
            min-width: 0;
          }

          .growth-apple__development-intro {
            grid-template-rows: auto auto;
            gap: 1.75rem;
          }

          .growth-apple__development-title {
            max-width: none;
            font-size: clamp(1.9rem, 9vw, 2.7rem);
            line-height: 1.06;
            overflow-wrap: anywhere;
          }

          .growth-apple__development-copy {
            max-width: none;
            margin-top: 1rem;
            font-size: 0.92rem;
            line-height: 1.68;
          }

          .growth-apple__development-item {
            grid-template-columns: 1.75rem minmax(0, 1fr);
            gap: 0.75rem;
            padding-block: 1.1rem;
          }

          .growth-apple__development-item > span {
            padding-top: 0.18rem;
          }

          .growth-apple__development-item h4,
          .growth-apple__development-item p {
            max-width: none;
            overflow-wrap: anywhere;
          }

          .growth-apple__development-item h4 {
            line-height: 1.42;
          }

          .growth-apple__development-item p {
            margin-top: 0.38rem;
            line-height: 1.64;
          }

          .growth-apple__quote {
            grid-column: auto;
            max-width: none;
            margin-top: 0;
            padding-top: 1.3rem;
            line-height: 1.65;
          }
        }

        /* Mobil görünüm — başlık merkezi, bölüm aralığı ve
           Reveal sarmalayıcılarının gerçek hizası */
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

          :global(.growth-apple__heading) .card-eyebrow {
            width: 100%;
            max-width: none;
            margin-inline: auto;
            text-align: center;
          }

          :global(.growth-apple__heading)
            .growth-apple__title {
            width: 100%;
            max-width: 11.5ch;
            margin-inline: auto;
            margin-top: 1rem;
            text-align: center;
            line-height: 1.02;
          }

          :global(.growth-apple__heading)
            .growth-apple__intro {
            width: 100%;
            max-width: 32rem;
            margin-inline: auto;
            margin-top: 1.25rem;
            text-align: center;
            line-height: 1.68;
          }

          :global(.growth-apple__card-wrap) {
            width: 100%;
            min-width: 0;
            height: 100%;
          }

          :global(.growth-apple__experience-note-wrap),
          :global(.growth-apple__development-wrap) {
            width: 100%;
            min-width: 0;
          }

          :global(.growth-apple__development-wrap) {
            margin-top: 2.75rem;
          }

          .growth-apple__experience-grid {
            gap: 1rem;
          }

          .growth-apple__development {
            grid-template-columns: minmax(0, 1fr);
            gap: 1.9rem;
          }

          .growth-apple__development-intro {
            gap: 1.6rem;
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
            grid-template-columns: 1.65rem minmax(0, 1fr);
            gap: 0.7rem;
          }
        }

        /* Masaüstü yerleşim sistemi */
        @media (min-width: 1025px) {
          :global(.growth-apple__heading) {
            max-width: 980px;
            margin-bottom: 3.5rem;
          }

          .growth-apple__title {
            max-width: 14ch;
            line-height: 1;
          }

          .growth-apple__intro {
            max-width: 70ch;
            margin-top: 1.3rem;
            line-height: 1.72;
          }

          .growth-apple__experience-grid {
            gap: var(--grid-gap);
            align-items: stretch;
          }

          :global(.growth-apple__card-wrap) {
            height: 100%;
          }

          .growth-apple__card {
            min-height: 470px;
            grid-template-rows:
              auto
              auto
              minmax(0, 1fr);
            align-content: space-between;
            gap: 1.75rem;
          }

          .growth-apple__card-title {
            max-width: 19ch;
            margin-top: 0;
            line-height: 1.06;
          }

          .growth-apple__card-copy {
            max-width: 60ch;
            margin-top: 0;
            font-size: var(--f-body);
            line-height: 1.68;
          }

          .growth-apple__examples {
            align-self: end;
            gap: 0.72rem;
            padding-top: 1.2rem;
          }

          .growth-apple__experience-note {
            grid-template-columns: 42px minmax(0, 1fr);
            gap: 1rem;
            align-items: center;
          }

          :global(.growth-apple__development-wrap) {
            margin-top: 4.5rem;
          }

          .growth-apple__development {
            min-height: 560px;
            grid-template-columns:
              minmax(320px, 0.9fr)
              minmax(0, 1.1fr);
            gap: clamp(2.75rem, 3.6vw, 4rem);
            align-items: stretch;
          }

          .growth-apple__development-intro {
            grid-template-rows: auto auto;
            align-content: space-between;
            gap: 2rem;
          }

          .growth-apple__development-title {
            max-width: 13.5ch;
            margin-top: 0;
            line-height: 1.02;
          }

          .growth-apple__development-copy {
            max-width: 50ch;
            margin-top: 0;
            font-size: var(--f-body);
            line-height: 1.68;
          }

          .growth-apple__development-list {
            align-self: stretch;
          }

          .growth-apple__development-item {
            grid-template-columns: 2.25rem minmax(0, 1fr);
            gap: 0.9rem;
            padding-block: 1.2rem;
          }

          .growth-apple__development-item p {
            max-width: none;
            line-height: 1.6;
          }

          .growth-apple__quote {
            max-width: 80ch;
            margin-top: 0;
            padding-top: 1.45rem;
            line-height: 1.64;
          }
        }








      `}</style>
    </section>
  );
}
