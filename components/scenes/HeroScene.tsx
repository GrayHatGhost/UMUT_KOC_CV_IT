"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  FileText,
  Headphones,
  MonitorCog,
  Network,
  Wrench,
} from "lucide-react";

type HeroSceneProps = {
  onOpenCV: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const focusItems = [
  { label: "Donanım", icon: Wrench },
  { label: "Kullanıcı desteği", icon: Headphones },
  { label: "Ağ ve bağlantı", icon: Network },
  { label: "Teknik operasyon", icon: MonitorCog },
] as const;

export default function HeroScene({ onOpenCV }: HeroSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.7, delay, ease },
  });

  return (
    <section className="hero-apple" aria-labelledby="hero-title">
      <div className="site-wrap">
        <div className="hero-apple__grid">
          <motion.article
            className="apple-card hero-apple__main"
            {...reveal(0.06)}
          >
            <div>
              <p className="card-eyebrow">IT SUPPORT · İSTANBUL</p>

              <h1 id="hero-title" className="hero-apple__title">
                Teknik sorunları çözen,
                <span>süreçleri öğrenen ve sorumluluk alan biriyim.</span>
              </h1>
            </div>

            <div className="hero-apple__bottom">
              <p className="hero-apple__description">
                Donanım, Windows, kullanıcı desteği ve dijital
                operasyonlarda uygulamalı deneyime sahip bir IT Support
                adayıyım.
              </p>

              <div className="hero-apple__actions">
                <a href="#gelisim" className="btn-dark">
                  Çalışmalarımı incele
                  <ArrowDownRight size={16} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  className="btn-ghost"
                  onClick={onOpenCV}
                >
                  CV&apos;yi aç
                  <FileText size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.article>

          <motion.aside
            className="apple-card apple-card--dark hero-apple__side"
            {...reveal(0.16)}
          >
            <div>
              <p className="card-eyebrow">ŞU ANDA ARADIĞIM ROL</p>

              <h2 className="hero-apple__side-title">
                Bir ekibin içinde güvenilir teknik destek noktası olmak.
              </h2>

              <p className="card-copy">
                Kullanıcılara yakın olduğum, işleyişi öğrenebildiğim ve
                kurumun ihtiyaçlarıyla birlikte daha fazla sorumluluk
                alabildiğim bir IT Support rolü arıyorum.
              </p>
            </div>

            <div className="hero-apple__focus-grid">
              {focusItems.map(({ label, icon: Icon }) => (
                <div key={label} className="hero-apple__focus">
                  <span className="hero-apple__focus-icon">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>

      <style jsx>{`
        .hero-apple {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: clamp(7.5rem, 14vh, 10rem);
          padding-bottom: clamp(3.5rem, 8vh, 6rem);
        }

        .hero-apple__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.42fr) minmax(320px, 0.58fr);
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .hero-apple__main,
        .hero-apple__side {
          min-height: min(68vh, 670px);
        }

        .hero-apple__main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 4rem;
        }

        .hero-apple__title {
          max-width: 12ch;
          margin-top: clamp(1.25rem, 2.8vw, 2.2rem);
          color: var(--ink);
          font-size: var(--f-hero);
          font-weight: 850;
          letter-spacing: -0.065em;
          line-height: 0.93;
          text-wrap: balance;
        }

        .hero-apple__title span {
          display: block;
          color: var(--ink-3);
        }

        .hero-apple__bottom {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 2rem;
          align-items: end;
        }

        .hero-apple__description {
          max-width: 48ch;
          color: var(--ink-2);
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.65;
        }

        .hero-apple__actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.65rem;
        }

        .hero-apple__side {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
        }

        .hero-apple__side-title {
          max-width: 12ch;
          margin-top: 1.2rem;
          color: white;
          font-size: clamp(2rem, 3.7vw, 3.7rem);
          font-weight: 820;
          letter-spacing: -0.055em;
          line-height: 0.98;
          text-wrap: balance;
        }

        .hero-apple__focus-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.65rem;
        }

        .hero-apple__focus {
          min-height: 84px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--rule-inverse);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.78rem;
          font-weight: 650;
        }

        .hero-apple__focus-icon {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.09);
          color: white;
        }

        @media (max-width: 1000px) {
          .hero-apple__grid {
            grid-template-columns: 1fr;
          }

          .hero-apple__main,
          .hero-apple__side {
            min-height: auto;
          }

          .hero-apple__main {
            min-height: 620px;
          }

          .hero-apple__side {
            min-height: 520px;
          }
        }

        @media (max-width: 767px) {
          .hero-apple {
            min-height: auto;
            padding-top: 6.5rem;
            padding-bottom: 3.25rem;
          }

          .hero-apple__main {
            min-height: 610px;
            gap: 3rem;
          }

          .hero-apple__bottom {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .hero-apple__actions {
            justify-content: flex-start;
          }

          .hero-apple__actions :global(a),
          .hero-apple__actions :global(button) {
            flex: 1 1 auto;
          }

          .hero-apple__side {
            min-height: 500px;
          }

          .hero-apple__focus-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 420px) {
          .hero-apple__focus-grid {
            grid-template-columns: 1fr;
          }

          .hero-apple__side {
            min-height: auto;
          }
        }

        /* Yerleşim dengesi */
        .hero-apple__main,
        .hero-apple__side {
          min-height: clamp(520px, 58vh, 580px);
        }

        .hero-apple__main {
          display: grid;
          grid-template-rows: auto auto;
          align-content: space-between;
          gap: var(--content-gap-xl);
        }

        .hero-apple__main > div:first-child,
        .hero-apple__side > div:first-child {
          display: grid;
          align-content: start;
          gap: var(--content-gap-lg);
        }

        .hero-apple__title {
          max-width: 13ch;
          margin-top: 0;
          line-height: 0.96;
        }

        .hero-apple__title span {
          margin-top: 0.08em;
        }

        .hero-apple__bottom {
          gap: var(--content-gap-lg);
          align-items: center;
          padding-top: var(--content-gap-lg);
          border-top: 1px solid var(--rule);
        }

        .hero-apple__description {
          max-width: 55ch;
          font-size: var(--f-body);
          line-height: 1.68;
        }

        .hero-apple__actions {
          align-items: center;
        }

        .hero-apple__actions :global(a),
        .hero-apple__actions :global(button) {
          min-width: 152px;
        }

        .hero-apple__side {
          display: grid;
          grid-template-rows: auto auto;
          align-content: space-between;
          gap: var(--content-gap-xl);
        }

        .hero-apple__side-title {
          max-width: 13ch;
          margin-top: 0;
          font-size: clamp(1.95rem, 3vw, 3.15rem);
          line-height: 1.02;
        }

        .hero-apple__side :global(.card-copy) {
          margin-top: 0;
          font-size: var(--f-body);
          line-height: 1.68;
        }

        .hero-apple__focus-grid {
          align-items: stretch;
        }

        .hero-apple__focus {
          min-height: 84px;
          gap: 0.75rem;
          padding: 0.95rem;
          font-size: 0.76rem;
          line-height: 1.35;
        }

        @media (max-width: 1000px) {
          .hero-apple__main,
          .hero-apple__side {
            min-height: auto;
          }

          .hero-apple__main {
            min-height: 560px;
          }

          .hero-apple__side {
            min-height: 480px;
          }
        }

        @media (max-width: 767px) {
          .hero-apple__main,
          .hero-apple__side {
            min-height: auto;
          }

          .hero-apple__bottom {
            gap: var(--content-gap-lg);
          }

          .hero-apple__actions {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
          }

          .hero-apple__actions :global(a),
          .hero-apple__actions :global(button) {
            width: 100%;
            min-width: 0;
          }
        }

        /* Mobil görünüm — sabit başlık görünürken kartın
           üst kısmını kapatmayan daha kompakt yetkinlik listesi */
        @media (max-width: 420px) {
          .hero-apple__side {
            min-height: auto;
            gap: 2rem;
          }

          .hero-apple__side-title {
            max-width: none;
            font-size: clamp(2rem, 10vw, 2.75rem);
            line-height: 1.03;
          }

          .hero-apple__focus-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .hero-apple__focus {
            min-height: 0;
            display: grid;
            grid-template-columns: 36px minmax(0, 1fr);
            align-items: center;
            justify-content: start;
            gap: 0.8rem;
            padding: 0.78rem 0.85rem;
            border-radius: 17px;
            line-height: 1.35;
          }

          .hero-apple__focus-icon {
            width: 36px;
            height: 36px;
          }
        }

        /* Masaüstü yerleşim sistemi */
        @media (min-width: 1025px) {
          .hero-apple {
            min-height: 100svh;
            padding-top: clamp(8.5rem, 12vh, 10rem);
            padding-bottom: clamp(4.5rem, 7vh, 6rem);
          }

          .hero-apple__grid {
            grid-template-columns:
              minmax(0, 1.28fr)
              minmax(380px, 0.72fr);
            gap: var(--grid-gap);
          }

          .hero-apple__main,
          .hero-apple__side {
            min-height: clamp(540px, 60vh, 600px);
          }

          .hero-apple__main {
            grid-template-rows: auto auto;
            align-content: space-between;
            gap: 1.9rem;
          }

          .hero-apple__title {
            max-width: 14ch;
            margin-top: 0;
            line-height: 0.96;
          }

          .hero-apple__bottom {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(250px, auto);
            gap: 2rem;
            align-items: center;
            padding-top: 1.5rem;
          }

          .hero-apple__description {
            max-width: 56ch;
            font-size: var(--f-body);
            line-height: 1.68;
          }

          .hero-apple__actions {
            align-items: center;
            justify-content: flex-end;
          }

          .hero-apple__actions :global(a),
          .hero-apple__actions :global(button) {
            min-width: 150px;
          }

          .hero-apple__side {
            grid-template-rows: auto auto;
            align-content: space-between;
            gap: 1.9rem;
          }

          .hero-apple__side-title {
            max-width: 13.5ch;
            margin-top: 0;
            font-size: clamp(2rem, 3vw, 3.2rem);
            line-height: 1.02;
          }

          .hero-apple__side :global(.card-copy) {
            max-width: 42ch;
            margin-top: 0;
            font-size: var(--f-body);
            line-height: 1.68;
          }

          .hero-apple__focus-grid {
            gap: 0.7rem;
          }

          .hero-apple__focus {
            min-height: 86px;
            gap: 0.75rem;
            padding: 0.95rem;
            font-size: 0.76rem;
            line-height: 1.35;
          }
        }






      `}</style>
    </section>
  );
}
