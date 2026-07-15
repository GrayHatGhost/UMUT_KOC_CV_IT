"use client";

import {
  BriefcaseBusiness,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Mail,
  MapPin,
  MonitorCog,
  Network,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import Dialog from "@/components/dialog/Dialog";
import { profile } from "@/src/content/profile";

type CvModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const skillIcons = [
  Wrench,
  Network,
  Headphones,
  MonitorCog,
] as const;

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
      <article className="cv-apple">
        <header className="cv-apple__header">
          <div>
            <p className="card-eyebrow">
              ÖZ GEÇMİŞ · IT SUPPORT
            </p>

            <h2 className="cv-apple__name">
              {profile.name}
            </h2>

            <p className="cv-apple__role">
              {profile.role}
              <span>·</span>
              {profile.headline}
            </p>
          </div>

          <div className="cv-apple__header-actions">
            <a
              href={profile.cvPath}
              target="_blank"
              rel="noreferrer"
              className="btn-dark"
            >
              PDF&apos;yi aç
              <ExternalLink
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            <a
              href={profile.cvPath}
              download
              className="btn-ghost"
            >
              İndir
              <Download
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          </div>
        </header>

        <div className="cv-apple__hero-grid">
          <section className="apple-card apple-card--dark cv-apple__profile-card">
            <div>
              <p className="card-eyebrow">
                PROFİL
              </p>

              <h3>
                Uygulamalı teknik temel,
                <span>uzun vadeli gelişim.</span>
              </h3>
            </div>

            <div className="cv-apple__profile-copy">
              <p>{profile.about}</p>
              <p>{profile.careerObjective}</p>
            </div>
          </section>

          <aside className="apple-card cv-apple__contact-card">
            <div>
              <p className="card-eyebrow">
                İLETİŞİM VE BİLGİLER
              </p>

              <h3>
                Görüşme ve iş fırsatları için.
              </h3>
            </div>

            <div className="cv-apple__contact-list">
              <ContactRow
                icon={Phone}
                label="Telefon"
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                value={profile.phone}
              />

              <ContactRow
                icon={Mail}
                label="E-posta"
                href={`mailto:${profile.email}`}
                value={profile.email}
              />

              <ContactRow
                icon={ExternalLink}
                label="LinkedIn"
                href={profile.linkedin}
                value="linkedin.com/in/umutkoco"
                external
              />

              <ContactRow
                icon={Globe2}
                label="Portföy"
                href={profile.portfolio}
                value="umutkoc.vercel.app"
                external
              />

              <ContactRow
                icon={MapPin}
                label="Konum"
                value={profile.location}
              />

              <ContactRow
                icon={ShieldCheck}
                label="Askerlik"
                value={profile.militaryStatus}
              />
            </div>
          </aside>
        </div>

        <section className="apple-card cv-apple__applied">
          <div className="cv-apple__section-intro">
            <div>
              <p className="card-eyebrow">
                UYGULAMALI DENEYİM
              </p>

              <h3>
                {profile.appliedExperience.title}
              </h3>
            </div>

            <p>
              {profile.appliedExperience.context}
            </p>
          </div>

          <div className="cv-apple__applied-grid">
            <p className="cv-apple__applied-summary">
              {profile.appliedExperience.summary}
            </p>

            <ul className="cv-apple__list">
              {profile.appliedExperience.bullets.map(
                (bullet) => (
                  <li key={bullet}>{bullet}</li>
                ),
              )}
            </ul>
          </div>
        </section>

        <section className="cv-apple__section">
          <div className="cv-apple__section-heading">
            <div>
              <p className="card-eyebrow">
                PROFESYONEL DENEYİM
              </p>

              <h3>
                İş hayatında üstlendiğim sorumluluklar.
              </h3>
            </div>

            <BriefcaseBusiness
              size={24}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>

          <div className="cv-apple__experience-grid">
            {profile.experience.map((experience) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className="apple-card cv-apple__experience-card"
              >
                <div className="cv-apple__experience-top">
                  <span>
                    {experience.type === "volunteer"
                      ? "GÖNÜLLÜ"
                      : "PROFESYONEL"}
                  </span>

                  <time>{experience.period}</time>
                </div>

                <div>
                  <p>{experience.company}</p>

                  <h4>{experience.role}</h4>

                  {experience.location && (
                    <small>
                      {experience.location}
                    </small>
                  )}
                </div>

                <p className="cv-apple__experience-description">
                  {experience.description}
                </p>

                <ul className="cv-apple__list">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-apple__section">
          <div className="cv-apple__section-heading">
            <div>
              <p className="card-eyebrow">
                TEKNİK YETKİNLİKLER
              </p>

              <h3>
                Teknik destek odağımı oluşturan alanlar.
              </h3>
            </div>

            <Wrench
              size={24}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>

          <div className="cv-apple__skills-grid">
            {profile.skills.map((group, index) => {
              const Icon =
                skillIcons[index] ?? MonitorCog;

              return (
                <article
                  key={group.category}
                  className="apple-card apple-card--soft cv-apple__skill-card"
                >
                  <span className="cv-apple__skill-icon">
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>

                  <h4>{group.category}</h4>

                  <ul className="cv-apple__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <div className="cv-apple__bottom-grid">
          <section className="apple-card cv-apple__education">
            <div className="cv-apple__small-heading">
              <span>
                <GraduationCap
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="card-eyebrow">
                  EĞİTİM
                </p>

                <h3>
                  Akademik geçmiş.
                </h3>
              </div>
            </div>

            <div className="cv-apple__education-list">
              {profile.education.map((education) => (
                <article
                  key={`${education.school}-${education.degree}`}
                >
                  <span>{education.status}</span>
                  <h4>{education.degree}</h4>
                  <p>{education.school}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="apple-card cv-apple__languages">
            <div className="cv-apple__small-heading">
              <span>
                <Globe2
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="card-eyebrow">
                  DİLLER
                </p>

                <h3>
                  İletişim seviyesi.
                </h3>
              </div>
            </div>

            <div className="cv-apple__language-list">
              {profile.languages.map((language) => (
                <div key={language.language}>
                  <strong>{language.language}</strong>
                  <span>{language.level}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="apple-card apple-card--dark cv-apple__pdf-card">
            <div>
              <p className="card-eyebrow">
                PDF DOSYASI
              </p>

              <h3>
                Başvuruya hazır öz geçmiş.
              </h3>

              <p>
                Görsel CV sürümünü tarayıcıda
                görüntüleyebilir veya cihazına
                indirebilirsin.
              </p>
            </div>

            <div className="cv-apple__pdf-actions">
              <a
                href={profile.cvPath}
                target="_blank"
                rel="noreferrer"
              >
                <FileText
                  size={17}
                  aria-hidden="true"
                />
                Yeni sekmede aç
              </a>

              <a href={profile.cvPath} download>
                <Download
                  size={17}
                  aria-hidden="true"
                />
                PDF olarak indir
              </a>
            </div>
          </section>
        </div>
      </article>

      <style jsx global>{`
        .cv-apple {
          min-height: 100%;
          padding: clamp(1rem, 2.7vw, 2rem);
        }

        .cv-apple__header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 2rem;
          align-items: end;
          padding:
            clamp(2.9rem, 6vw, 5rem)
            clamp(0.35rem, 2vw, 1rem)
            clamp(2rem, 4vw, 3.25rem);
        }

        .cv-apple__name {
          margin-top: 0.85rem;
          color: var(--ink);
          font-size: clamp(3.2rem, 7vw, 7rem);
          font-weight: 860;
          letter-spacing: -0.075em;
          line-height: 0.88;
        }

        .cv-apple__role {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          align-items: center;
          margin-top: 1rem;
          color: var(--ink-2);
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          font-weight: 650;
        }

        .cv-apple__role span {
          color: var(--ink-3);
        }

        .cv-apple__header-actions,
        .cv-apple__pdf-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .cv-apple__hero-grid,
        .cv-apple__bottom-grid {
          display: grid;
          grid-template-columns: repeat(
            12,
            minmax(0, 1fr)
          );
          gap: var(--grid-gap);
        }

        .cv-apple__profile-card {
          grid-column: span 7;
          min-height: 540px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
        }

        .cv-apple__profile-card h3 {
          max-width: 12ch;
          margin-top: 1rem;
          color: white;
          font-size: clamp(2.2rem, 4.4vw, 4.35rem);
          font-weight: 840;
          letter-spacing: -0.062em;
          line-height: 0.96;
          text-wrap: balance;
        }

        .cv-apple__profile-card h3 span {
          display: block;
          color: rgba(255, 255, 255, 0.46);
        }

        .cv-apple__profile-copy {
          display: grid;
          gap: 1.1rem;
          max-width: 67ch;
        }

        .cv-apple__profile-copy p {
          color: var(--ink-inverse-2);
          font-size: 0.96rem;
          line-height: 1.72;
        }

        .cv-apple__contact-card {
          grid-column: span 5;
          min-height: 540px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.5rem;
        }

        .cv-apple__contact-card h3,
        .cv-apple__section-intro h3,
        .cv-apple__section-heading h3 {
          max-width: 15ch;
          margin-top: 0.8rem;
          color: var(--ink);
          font-size: clamp(1.8rem, 3.4vw, 3.3rem);
          font-weight: 820;
          letter-spacing: -0.055em;
          line-height: 0.99;
          text-wrap: balance;
        }

        .cv-apple__contact-list {
          display: grid;
          border-top: 1px solid var(--rule);
        }

        .cv-apple__contact-row {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr);
          gap: 0.75rem;
          align-items: center;
          padding-block: 0.8rem;
          border-bottom: 1px solid var(--rule);
        }

        .cv-apple__contact-row-icon {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: var(--surface-2);
          color: var(--ink);
        }

        .cv-apple__contact-row-copy {
          min-width: 0;
          display: grid;
          gap: 0.15rem;
        }

        .cv-apple__contact-row-copy small {
          color: var(--ink-3);
          font-size: 0.58rem;
          font-weight: 750;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .cv-apple__contact-row-copy a,
        .cv-apple__contact-row-copy span {
          overflow-wrap: anywhere;
          color: var(--ink);
          font-size: 0.76rem;
          font-weight: 620;
          line-height: 1.45;
        }

        .cv-apple__applied,
        .cv-apple__section {
          margin-top: var(--grid-gap);
        }

        .cv-apple__applied {
          min-height: 500px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
        }

        .cv-apple__section-intro {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
        }

        .cv-apple__section-intro > p {
          max-width: 32ch;
          color: var(--ink-3);
          font-size: 0.78rem;
          line-height: 1.6;
          text-align: right;
        }

        .cv-apple__applied-grid {
          display: grid;
          grid-template-columns:
            minmax(260px, 0.65fr)
            minmax(0, 1.35fr);
          gap: clamp(2rem, 5vw, 5rem);
          padding-top: 1.8rem;
          border-top: 1px solid var(--rule);
        }

        .cv-apple__applied-summary {
          color: var(--ink);
          font-size: clamp(1.2rem, 2.1vw, 1.75rem);
          font-weight: 670;
          letter-spacing: -0.03em;
          line-height: 1.45;
        }

        .cv-apple__section {
          padding-block: clamp(2.5rem, 5vw, 4.5rem);
        }

        .cv-apple__section-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-inline: clamp(0.25rem, 2vw, 1rem);
        }

        .cv-apple__section-heading > svg {
          color: var(--ink-3);
        }

        .cv-apple__experience-grid,
        .cv-apple__skills-grid {
          display: grid;
          grid-template-columns: repeat(
            2,
            minmax(0, 1fr)
          );
          gap: var(--grid-gap);
        }

        .cv-apple__experience-card {
          min-height: 550px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .cv-apple__experience-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .cv-apple__experience-top span {
          display: inline-flex;
          padding: 0.42rem 0.66rem;
          border-radius: 999px;
          background: var(--surface-2);
          color: var(--ink-3);
          font-size: 0.58rem;
          font-weight: 760;
          letter-spacing: 0.08em;
        }

        .cv-apple__experience-top time {
          color: var(--ink-3);
          font-size: 0.68rem;
          font-weight: 650;
        }

        .cv-apple__experience-card > div:nth-child(2) > p {
          color: var(--ink-3);
          font-size: 0.72rem;
          font-weight: 680;
        }

        .cv-apple__experience-card h4,
        .cv-apple__skill-card h4,
        .cv-apple__education h4 {
          margin-top: 0.55rem;
          color: var(--ink);
          font-size: clamp(1.35rem, 2.3vw, 2.25rem);
          font-weight: 790;
          letter-spacing: -0.045em;
          line-height: 1.05;
          text-wrap: balance;
        }

        .cv-apple__experience-card small {
          display: block;
          margin-top: 0.55rem;
          color: var(--ink-3);
          font-size: 0.7rem;
        }

        .cv-apple__experience-description {
          color: var(--ink-2);
          font-size: 0.9rem;
          line-height: 1.68;
        }

        .cv-apple__list {
          display: grid;
          gap: 0.74rem;
          list-style: none;
        }

        .cv-apple__list li {
          position: relative;
          padding-left: 1.15rem;
          color: var(--ink-2);
          font-size: 0.84rem;
          line-height: 1.62;
        }

        .cv-apple__list li::before {
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

        .cv-apple__skill-card {
          min-height: 410px;
        }

        .cv-apple__skill-icon,
        .cv-apple__small-heading > span {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--rule);
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.68);
          color: var(--ink);
        }

        .cv-apple__skill-card h4 {
          margin-top: 1.5rem;
        }

        .cv-apple__skill-card .cv-apple__list {
          margin-top: 1.5rem;
        }

        .cv-apple__education {
          grid-column: span 5;
        }

        .cv-apple__languages {
          grid-column: span 3;
        }

        .cv-apple__pdf-card {
          grid-column: span 4;
        }

        .cv-apple__education,
        .cv-apple__languages,
        .cv-apple__pdf-card {
          min-height: 470px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.5rem;
        }

        .cv-apple__small-heading {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .cv-apple__small-heading h3 {
          margin-top: 0.45rem;
          color: var(--ink);
          font-size: clamp(1.55rem, 2.5vw, 2.45rem);
          font-weight: 810;
          letter-spacing: -0.05em;
          line-height: 1.02;
        }

        .cv-apple__education-list,
        .cv-apple__language-list {
          display: grid;
          border-top: 1px solid var(--rule);
        }

        .cv-apple__education-list article,
        .cv-apple__language-list > div {
          padding-block: 1rem;
          border-bottom: 1px solid var(--rule);
        }

        .cv-apple__education-list span {
          color: var(--ink-3);
          font-size: 0.62rem;
          font-weight: 720;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .cv-apple__education-list p {
          margin-top: 0.45rem;
          color: var(--ink-3);
          font-size: 0.76rem;
        }

        .cv-apple__language-list > div {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
        }

        .cv-apple__language-list strong {
          color: var(--ink);
          font-size: 0.88rem;
        }

        .cv-apple__language-list span {
          color: var(--ink-3);
          font-size: 0.72rem;
          text-align: right;
        }

        .cv-apple__pdf-card h3 {
          max-width: 11ch;
          margin-top: 1rem;
          color: white;
          font-size: clamp(2rem, 3.4vw, 3.25rem);
          font-weight: 830;
          letter-spacing: -0.058em;
          line-height: 0.98;
        }

        .cv-apple__pdf-card p {
          max-width: 40ch;
          margin-top: 1rem;
          color: var(--ink-inverse-2);
          font-size: 0.84rem;
          line-height: 1.65;
        }

        .cv-apple__pdf-actions {
          display: grid;
        }

        .cv-apple__pdf-actions a {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding-block: 0.85rem;
          border-bottom: 1px solid var(--rule-inverse);
          color: white;
          font-size: 0.76rem;
          font-weight: 680;
        }

        @media (max-width: 980px) {
          .cv-apple__profile-card,
          .cv-apple__contact-card,
          .cv-apple__education,
          .cv-apple__languages,
          .cv-apple__pdf-card {
            grid-column: span 6;
          }

          .cv-apple__pdf-card {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 760px) {
          .cv-apple {
            padding: 0.72rem;
          }

          .cv-apple__header {
            grid-template-columns: 1fr;
            align-items: start;
            padding:
              4.6rem 0.55rem
              2rem;
          }

          .cv-apple__header-actions > * {
            flex: 1 1 auto;
          }

          .cv-apple__hero-grid,
          .cv-apple__bottom-grid,
          .cv-apple__experience-grid,
          .cv-apple__skills-grid {
            grid-template-columns: 1fr;
          }

          .cv-apple__profile-card,
          .cv-apple__contact-card,
          .cv-apple__education,
          .cv-apple__languages,
          .cv-apple__pdf-card {
            min-height: auto;
            grid-column: 1;
          }

          .cv-apple__section-intro {
            align-items: flex-start;
            flex-direction: column;
          }

          .cv-apple__section-intro > p {
            text-align: left;
          }

          .cv-apple__applied-grid {
            grid-template-columns: 1fr;
          }

          .cv-apple__experience-card,
          .cv-apple__skill-card {
            min-height: auto;
          }
        }
      `}</style>
    </Dialog>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <small>{label}</small>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </>
  );

  return (
    <div className="cv-apple__contact-row">
      <span className="cv-apple__contact-row-icon">
        <Icon
          size={17}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </span>

      <div className="cv-apple__contact-row-copy">
        {content}
      </div>
    </div>
  );
}
