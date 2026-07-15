"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Check,
  Copy,
  ExternalLink,
  FileText,
  Mail,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { profile } from "@/src/content/profile";

const ease = [0.22, 1, 0.36, 1] as const;

const commitmentItems = [
  {
    number: "01",
    title: "İşleyişi öğrenmek",
    text: "Kurumun kullandığı sistemleri, cihazları ve günlük destek ihtiyaçlarını tanımak.",
  },
  {
    number: "02",
    title: "Kullanıcı güveni kazanmak",
    text: "Sorunları takip etmek, sonucu kontrol etmek ve anlaşılır geri bildirim vermek.",
  },
  {
    number: "03",
    title: "Sorumluluk almak",
    text: "Teknik ihtiyaçlar geliştikçe yeni alanlar öğrenmek ve ekip içinde daha fazla katkı sunmak.",
  },
] as const;

export default function ContactScene() {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const textarea = document.createElement("textarea");

      textarea.value = profile.email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  const reveal = (delay: number) => ({
    initial: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 24 },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : {
          duration: 0.7,
          delay,
          ease,
        },
  });

  return (
    <section
      className="contact-apple page-section"
      aria-labelledby="contact-title"
    >
      <div className="site-wrap">
        <div className="contact-apple__grid">
          <motion.article
            className="apple-card apple-card--dark contact-apple__commitment"
            {...reveal(0)}
          >
            <div>
              <p className="card-eyebrow">
                BİR SONRAKİ ADIM
              </p>

              <h2
                id="contact-title"
                className="contact-apple__title"
              >
                Bir ekibin içinde büyümek istiyorum.
              </h2>

              <p className="contact-apple__lead">
                Amacım kısa sürede unvan değiştirmek değil;
                çalıştığım kurumun sistemlerini ve işleyişini
                öğrenerek kullanıcıların güvenebileceği
                teknik destek noktası hâline gelmek.
              </p>
            </div>

            <div className="contact-apple__commitment-list">
              {commitmentItems.map((item) => (
                <div
                  key={item.number}
                  className="contact-apple__commitment-item"
                >
                  <span>{item.number}</span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="contact-apple__quote">
              Teknik gelişimimi yalnızca kişisel bir hedef
              olarak değil, çalıştığım kuruma zamanla daha
              fazla katkı sağlayabilmenin aracı olarak
              görüyorum.
            </blockquote>
          </motion.article>

          <motion.aside
            className="apple-card contact-apple__contact"
            {...reveal(0.08)}
          >
            <div>
              <p className="card-eyebrow">
                İLETİŞİM
              </p>

              <h3 className="contact-apple__contact-title">
                Ekibiniz için güvenilir bir teknik destek
                noktası arıyorsanız görüşebiliriz.
              </h3>

              <p className="contact-apple__location">
                {profile.location}
              </p>
            </div>

            <div className="contact-apple__email">
              <span>E-POSTA</span>

              <a href={`mailto:${profile.email}`}>
                {profile.email}
              </a>

              <button
                type="button"
                onClick={copyEmail}
                aria-label={
                  copied
                    ? "E-posta adresi kopyalandı"
                    : "E-posta adresini kopyala"
                }
              >
                {copied ? (
                  <Check
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                ) : (
                  <Copy
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                )}

                {copied ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>

            <div className="contact-apple__actions">
              <a
                href={`mailto:${profile.email}`}
                className="btn-dark"
              >
                E-posta gönder
                <Mail
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                LinkedIn
                <ExternalLink
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>

              <a
                href={profile.cvPath}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                CV&apos;yi aç
                <FileText
                  size={15}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </div>

            <p className="contact-apple__note">
              İş ve görüşme talepleri için e-posta veya
              LinkedIn üzerinden ulaşabilirsiniz.
            </p>
          </motion.aside>
        </div>
      </div>

      <style jsx global>{`
        .contact-apple {
          padding-bottom: clamp(2rem, 5vw, 4rem);
          overflow: clip;
        }

        .contact-apple__grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(320px, 0.65fr);
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .contact-apple__commitment,
        .contact-apple__contact {
          min-height: 690px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
        }

        .contact-apple__title {
          max-width: 12ch;
          margin-top: 1rem;
          color: white;
          font-size: var(--f-section);
          font-weight: 850;
          letter-spacing: -0.062em;
          line-height: 0.95;
          text-wrap: balance;
        }

        .contact-apple__lead {
          max-width: 58ch;
          margin-top: 1.35rem;
          color: var(--ink-inverse-2);
          font-size: var(--f-body);
          line-height: 1.72;
        }

        .contact-apple__commitment-list {
          border-top: 1px solid var(--rule-inverse);
        }

        .contact-apple__commitment-item {
          display: grid;
          grid-template-columns: 2.5rem minmax(0, 1fr);
          gap: 1rem;
          padding-block: 1.3rem;
          border-bottom: 1px solid var(--rule-inverse);
        }

        .contact-apple__commitment-item > span {
          color: rgba(255, 255, 255, 0.42);
          font-size: 0.65rem;
          font-weight: 780;
          letter-spacing: 0.12em;
        }

        .contact-apple__commitment-item h3 {
          color: white;
          font-size: 0.98rem;
          font-weight: 720;
          letter-spacing: -0.02em;
          line-height: 1.4;
        }

        .contact-apple__commitment-item p {
          max-width: 58ch;
          margin-top: 0.38rem;
          color: var(--ink-inverse-2);
          font-size: 0.83rem;
          line-height: 1.62;
        }

        .contact-apple__quote {
          max-width: 68ch;
          padding-top: 1.5rem;
          border-top: 1px solid var(--rule-inverse);
          color: rgba(255, 255, 255, 0.86);
          font-size: clamp(1rem, 1.45vw, 1.2rem);
          font-weight: 570;
          line-height: 1.65;
        }

        .contact-apple__contact-title {
          max-width: 13ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: clamp(2rem, 3.7vw, 3.65rem);
          font-weight: 830;
          letter-spacing: -0.058em;
          line-height: 0.98;
          text-wrap: balance;
        }

        .contact-apple__location {
          margin-top: 1rem;
          color: var(--ink-3);
          font-size: 0.82rem;
          font-weight: 620;
        }

        .contact-apple__email {
          display: grid;
          gap: 0.65rem;
          padding-block: 1.35rem;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
        }

        .contact-apple__email > span {
          color: var(--ink-3);
          font-size: 0.62rem;
          font-weight: 780;
          letter-spacing: 0.12em;
        }

        .contact-apple__email > a {
          overflow-wrap: anywhere;
          color: var(--ink);
          font-size: clamp(1.1rem, 1.7vw, 1.45rem);
          font-weight: 720;
          letter-spacing: -0.03em;
          line-height: 1.35;
        }

        .contact-apple__email button {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--ink-3);
          font-size: 0.72rem;
          font-weight: 700;
          transition: color 0.2s var(--ease);
        }

        .contact-apple__email button:hover {
          color: var(--ink);
        }

        .contact-apple__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .contact-apple__note {
          color: var(--ink-3);
          font-size: 0.72rem;
          line-height: 1.58;
        }

        @media (max-width: 980px) {
          .contact-apple__grid {
            grid-template-columns: 1fr;
          }

          .contact-apple__commitment,
          .contact-apple__contact {
            min-height: 620px;
          }
        }

        @media (max-width: 720px) {
          .contact-apple__commitment,
          .contact-apple__contact {
            min-height: auto;
          }

          .contact-apple__commitment-item {
            grid-template-columns: 2rem minmax(0, 1fr);
          }

          .contact-apple__actions > * {
            flex: 1 1 auto;
          }
        }

        /* Yerleşim dengesi */
        .contact-apple__commitment,
        .contact-apple__contact {
          min-height: 590px;
          gap: var(--content-gap-xl);
        }

        .contact-apple__commitment {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          align-content: stretch;
        }

        .contact-apple__contact {
          display: grid;
          grid-template-rows: auto auto auto auto;
          align-content: space-between;
        }

        .contact-apple__title {
          max-width: 13ch;
          line-height: 1;
        }

        .contact-apple__lead {
          max-width: 62ch;
          margin-top: 1rem;
          line-height: 1.68;
        }

        .contact-apple__commitment-item {
          padding-block: 1.05rem;
        }

        .contact-apple__commitment-item h3 {
          line-height: 1.42;
        }

        .contact-apple__commitment-item p {
          max-width: 62ch;
          margin-top: 0.34rem;
          line-height: 1.6;
        }

        .contact-apple__quote {
          max-width: 72ch;
          padding-top: 1.15rem;
          line-height: 1.62;
        }

        .contact-apple__contact-title {
          max-width: 14ch;
          line-height: 1.02;
        }

        .contact-apple__email {
          gap: 0.62rem;
          padding-block: 1rem;
        }

        .contact-apple__email > a {
          line-height: 1.4;
        }

        .contact-apple__actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.6rem;
        }

        .contact-apple__actions > :first-child {
          grid-column: 1 / -1;
        }

        .contact-apple__actions > * {
          width: 100%;
        }

        .contact-apple__note {
          line-height: 1.56;
        }

        @media (max-width: 980px) {
          .contact-apple__commitment,
          .contact-apple__contact {
            min-height: 590px;
          }
        }

        @media (max-width: 720px) {
          .contact-apple__commitment,
          .contact-apple__contact {
            min-height: auto;
          }

          .contact-apple__actions {
            grid-template-columns: 1fr;
          }

          .contact-apple__actions > :first-child {
            grid-column: auto;
          }
        }

        /* Masaüstü yerleşim sistemi */
        @media (min-width: 1025px) {
          .contact-apple__grid {
            grid-template-columns:
              minmax(0, 1.24fr)
              minmax(380px, 0.76fr);
          }

          .contact-apple__commitment,
          .contact-apple__contact {
            min-height: 610px;
            gap: 1.75rem;
          }

          .contact-apple__commitment {
            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto;
            align-content: stretch;
          }

          .contact-apple__contact {
            grid-template-rows:
              auto
              auto
              auto
              auto;
            align-content: space-between;
          }

          .contact-apple__title {
            max-width: 14ch;
            line-height: 1;
          }

          .contact-apple__lead {
            max-width: 62ch;
            margin-top: 1rem;
            line-height: 1.66;
          }

          .contact-apple__commitment-list {
            align-self: center;
            width: 100%;
          }

          .contact-apple__commitment-item {
            grid-template-columns: 2.25rem minmax(0, 1fr);
            gap: 0.85rem;
            padding-block: 1rem;
          }

          .contact-apple__commitment-item p {
            max-width: 60ch;
            line-height: 1.62;
          }

          .contact-apple__quote {
            max-width: 70ch;
            padding-top: 1.1rem;
            line-height: 1.6;
          }

          .contact-apple__contact-title {
            max-width: 15ch;
            line-height: 1.02;
          }

          .contact-apple__email {
            gap: 0.58rem;
            padding-block: 0.95rem;
          }

          .contact-apple__actions {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 0.65rem;
          }

          .contact-apple__actions > :first-child {
            grid-column: 1 / -1;
          }

          .contact-apple__actions > * {
            width: 100%;
          }
        }




      `}</style>
    </section>
  );
}
