"use client";

import {
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

import Dialog from "@/components/dialog/Dialog";
import { profile } from "@/src/content/profile";

type CvModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CvModal({
  isOpen,
  onClose,
}: CvModalProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={`${profile.name} öz geçmişi`}
      size="wide"
    >
      <article className="cv-modal">
        <header className="cv-modal__header">
          <div>
            <p className="t-label">ÖZ GEÇMİŞ</p>

            <h2 className="cv-modal__name">
              {profile.name}
            </h2>
          </div>

          <p className="cv-modal__position">
            {profile.role}
            <span aria-hidden="true"> · </span>
            {profile.location}
          </p>
        </header>

        <div className="cv-modal__layout">
          <div className="cv-modal__main">
            <section
              className="cv-modal__section"
              aria-labelledby="cv-summary-title"
            >
              <p
                id="cv-summary-title"
                className="cv-modal__section-label"
              >
                PROFİL
              </p>

              <p className="cv-modal__summary">
                {profile.about}
              </p>
            </section>

            <section
              className="cv-modal__section"
              aria-labelledby="cv-experience-title"
            >
              <p
                id="cv-experience-title"
                className="cv-modal__section-label"
              >
                DENEYİM ÖZETİ
              </p>

              <div className="cv-modal__timeline">
                {profile.experience.map((experience) => (
                  <article
                    key={`${experience.role}-${experience.period}`}
                    className="cv-modal__timeline-item"
                  >
                    <div>
                      <p className="cv-modal__period">
                        {experience.period}
                      </p>

                      <p className="cv-modal__company">
                        {experience.company}
                      </p>
                    </div>

                    <div>
                      <h3>{experience.role}</h3>
                      <p>{experience.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              className="cv-modal__section"
              aria-labelledby="cv-education-title"
            >
              <p
                id="cv-education-title"
                className="cv-modal__section-label"
              >
                EĞİTİM
              </p>

              <div className="cv-modal__education-list">
                {profile.education.map((education) => (
                  <article
                    key={`${education.degree}-${education.school}`}
                    className="cv-modal__education-item"
                  >
                    <p>{education.period}</p>

                    <div>
                      <h3>{education.degree}</h3>
                      <span>{education.school}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="cv-modal__aside">
            <section className="cv-modal__actions">
              <p className="cv-modal__section-label">
                PDF DOSYASI
              </p>

              <div className="cv-modal__action-list">
                <a
                  href={profile.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-modal__action cv-modal__action--primary"
                >
                  <ExternalLink
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span>
                    <strong>Yeni sekmede aç</strong>
                    <small>Tarayıcıda PDF görünümü</small>
                  </span>
                </a>

                <a
                  href={profile.cvPath}
                  download
                  className="cv-modal__action"
                >
                  <Download
                    size={17}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />

                  <span>
                    <strong>PDF olarak indir</strong>
                    <small>Cihazına kaydet</small>
                  </span>
                </a>
              </div>
            </section>

            <section className="cv-modal__skills">
              <p className="cv-modal__section-label">
                TEKNİK ODAK
              </p>

              <div className="cv-modal__skill-groups">
                {profile.skills.map((group) => (
                  <div
                    key={group.category}
                    className="cv-modal__skill-group"
                  >
                    <h3>{group.category}</h3>

                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-modal__contact">
              <p className="cv-modal__section-label">
                İLETİŞİM
              </p>

              <div className="cv-modal__contact-list">
                <a href={`mailto:${profile.email}`}>
                  <Mail
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{profile.email}</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>LinkedIn profili</span>
                </a>

                <p>
                  <MapPin
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span>{profile.location}</span>
                </p>
              </div>
            </section>
          </aside>
        </div>
      </article>

      <style jsx>{`
        .cv-modal {
          min-height: min(
            820px,
            calc(100dvh - clamp(1.5rem, 4vw, 3rem))
          );
          background: var(--surface-dark);
          color: var(--ink);
        }

        .cv-modal__header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 2rem;
          align-items: end;
          padding:
            clamp(2.25rem, 5vw, 4.5rem)
            clamp(4.5rem, 7vw, 6rem)
            clamp(2rem, 4vw, 3.25rem)
            clamp(2rem, 5vw, 4.5rem);
          border-bottom: 1px solid var(--rule);
        }

        .cv-modal__name {
          margin-top: 0.75rem;
          color: var(--ink);
          font-family:
            var(--font-display), var(--font-geist), Georgia,
            serif;
          font-size: clamp(2.7rem, 5vw, 5.8rem);
          font-weight: 700;
          letter-spacing: -0.055em;
          line-height: 0.94;
        }

        .cv-modal__position {
          max-width: 24rem;
          color: var(--ink-3);
          font-size: 0.8125rem;
          font-weight: 650;
          letter-spacing: 0.1em;
          line-height: 1.7;
          text-align: right;
          text-transform: uppercase;
        }

        .cv-modal__layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(280px, 0.65fr);
        }

        .cv-modal__main {
          min-width: 0;
          padding:
            clamp(3rem, 6vw, 5.5rem)
            clamp(2rem, 5vw, 4.5rem);
        }

        .cv-modal__aside {
          min-width: 0;
          padding:
            clamp(3rem, 6vw, 5.5rem)
            clamp(1.5rem, 4vw, 3.25rem);
          border-left: 1px solid var(--rule);
          background: var(--surface);
        }

        .cv-modal__section + .cv-modal__section,
        .cv-modal__aside > section + section {
          margin-top: clamp(3rem, 6vw, 5rem);
          padding-top: clamp(3rem, 6vw, 5rem);
          border-top: 1px solid var(--rule);
        }

        .cv-modal__section-label {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.14em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .cv-modal__summary {
          max-width: 62ch;
          margin-top: 1.5rem;
          color: var(--ink-2);
          font-family:
            var(--font-display), var(--font-geist), Georgia,
            serif;
          font-size: clamp(1.3rem, 2.4vw, 2rem);
          letter-spacing: -0.025em;
          line-height: 1.48;
        }

        .cv-modal__timeline,
        .cv-modal__education-list {
          margin-top: 1.5rem;
          border-bottom: 1px solid var(--rule);
        }

        .cv-modal__timeline-item,
        .cv-modal__education-item {
          display: grid;
          grid-template-columns:
            minmax(8rem, 0.42fr)
            minmax(0, 1.58fr);
          gap: clamp(1.5rem, 4vw, 4rem);
          padding-top: 1.75rem;
          padding-bottom: 1.75rem;
          border-top: 1px solid var(--rule);
        }

        .cv-modal__period,
        .cv-modal__education-item > p {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.1em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .cv-modal__company {
          margin-top: 0.55rem;
          color: var(--ink-3);
          font-size: 0.8125rem;
          line-height: 1.55;
        }

        .cv-modal__timeline-item h3,
        .cv-modal__education-item h3,
        .cv-modal__skill-group h3 {
          color: var(--ink);
          font-family:
            var(--font-display), var(--font-geist), Georgia,
            serif;
          font-size: clamp(1.15rem, 1.8vw, 1.5rem);
          font-weight: 650;
          letter-spacing: -0.025em;
          line-height: 1.2;
        }

        .cv-modal__timeline-item > div:last-child > p {
          max-width: 64ch;
          margin-top: 0.8rem;
          color: var(--ink-3);
          font-size: 0.9rem;
          line-height: 1.75;
        }

        .cv-modal__education-item span {
          display: block;
          margin-top: 0.55rem;
          color: var(--ink-3);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .cv-modal__action-list {
          display: grid;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }

        .cv-modal__action {
          display: grid;
          grid-template-columns: 1.25rem minmax(0, 1fr);
          gap: 0.85rem;
          align-items: center;
          min-height: 68px;
          padding: 1rem;
          border: 1px solid var(--rule);
          background: var(--surface-dark);
          color: var(--ink-2);
          transition:
            color 0.22s var(--ease),
            border-color 0.22s var(--ease),
            background-color 0.22s var(--ease),
            transform 0.22s var(--ease);
        }

        .cv-modal__action--primary {
          border-color: var(--ink);
          background: var(--ink);
          color: var(--bg);
        }

        .cv-modal__action:hover,
        .cv-modal__action:focus-visible {
          border-color: var(--rule-strong);
          background: #181818;
          color: var(--ink);
          transform: translateY(-2px);
        }

        .cv-modal__action--primary:hover,
        .cv-modal__action--primary:focus-visible {
          border-color: #d8d8d8;
          background: #d8d8d8;
          color: #080808;
        }

        .cv-modal__action span {
          display: grid;
          gap: 0.2rem;
        }

        .cv-modal__action strong {
          font-size: 0.875rem;
          font-weight: 620;
          line-height: 1.3;
        }

        .cv-modal__action small {
          color: currentColor;
          font-size: 0.6875rem;
          line-height: 1.4;
          opacity: 0.62;
        }

        .cv-modal__skill-groups {
          display: grid;
          gap: 1.75rem;
          margin-top: 1.5rem;
        }

        .cv-modal__skill-group h3 {
          font-size: 1.08rem;
        }

        .cv-modal__skill-group ul {
          display: grid;
          gap: 0.55rem;
          margin-top: 0.85rem;
          list-style: none;
        }

        .cv-modal__skill-group li {
          position: relative;
          padding-left: 1rem;
          color: var(--ink-3);
          font-size: 0.8125rem;
          line-height: 1.6;
        }

        .cv-modal__skill-group li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--ink-3);
        }

        .cv-modal__contact-list {
          display: grid;
          margin-top: 1.25rem;
          border-top: 1px solid var(--rule);
        }

        .cv-modal__contact-list a,
        .cv-modal__contact-list p {
          display: grid;
          grid-template-columns: 1.2rem minmax(0, 1fr);
          gap: 0.8rem;
          align-items: center;
          min-height: 52px;
          padding-top: 0.8rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid var(--rule);
          color: var(--ink-3);
          font-size: 0.8125rem;
          line-height: 1.5;
        }

        .cv-modal__contact-list a {
          transition: color 0.2s var(--ease);
        }

        .cv-modal__contact-list a:hover,
        .cv-modal__contact-list a:focus-visible {
          color: var(--ink);
        }

        @media (max-width: 960px) {
          .cv-modal__header {
            grid-template-columns: 1fr;
            padding-right: 4.5rem;
          }

          .cv-modal__position {
            text-align: left;
          }

          .cv-modal__layout {
            grid-template-columns: 1fr;
          }

          .cv-modal__aside {
            border-top: 1px solid var(--rule);
            border-left: 0;
          }
        }

        @media (max-width: 767px) {
          .cv-modal {
            min-height: 100dvh;
          }

          .cv-modal__header {
            padding:
              max(4.75rem, env(safe-area-inset-top))
              1.25rem
              2rem;
          }

          .cv-modal__main,
          .cv-modal__aside {
            padding:
              2.5rem
              1.25rem
              max(2.5rem, env(safe-area-inset-bottom));
          }

          .cv-modal__timeline-item,
          .cv-modal__education-item {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .cv-modal__action:hover,
          .cv-modal__action:focus-visible {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cv-modal__action,
          .cv-modal__contact-list a {
            transition: none;
          }

          .cv-modal__action:hover,
          .cv-modal__action:focus-visible {
            transform: none;
          }
        }
      `}</style>
    </Dialog>
  );
}
