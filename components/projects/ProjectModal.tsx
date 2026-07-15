"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ImageIcon,
} from "lucide-react";

import Dialog from "@/components/dialog/Dialog";
import {
  aiApproachText,
  type Project,
} from "@/src/content/projects";

type ProjectModalProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] =
    useState(0);

  const [failedImages, setFailedImages] = useState<
    Set<number>
  >(() => new Set());

  useEffect(() => {
    setActiveImageIndex(0);
    setFailedImages(new Set());
  }, [project?.id]);

  const images = project?.images ?? [];

  const activeImage = useMemo(
    () => images[activeImageIndex],
    [activeImageIndex, images],
  );

  useEffect(() => {
    if (!isOpen || images.length < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();

        setActiveImageIndex((current) =>
          current === 0
            ? images.length - 1
            : current - 1,
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        setActiveImageIndex((current) =>
          current === images.length - 1
            ? 0
            : current + 1,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [images.length, isOpen]);

  if (!project) return null;

  const hasActiveImage =
    Boolean(activeImage?.src) &&
    !failedImages.has(activeImageIndex);

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0
        ? images.length - 1
        : current - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === images.length - 1
        ? 0
        : current + 1,
    );
  };

  const markImageAsFailed = (index: number) => {
    setFailedImages((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={`${project.title} proje detayları`}
      size="wide"
    >
      <article className="project-modal">
        <header className="project-modal__header">
          <div>
            <p className="card-eyebrow">
              PROJE {project.number} · {project.category}
            </p>

            <h2 className="project-modal__title">
              {project.title}
            </h2>

            <p className="project-modal__lead">
              {project.shortDescription}
            </p>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-dark project-modal__live"
            >
              Canlı projeyi aç
              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>
          )}
        </header>

        <section
          className="project-modal__gallery"
          aria-label="Proje ekran görüntüleri"
        >
          <div className="project-modal__media">
            {hasActiveImage ? (
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 1160px"
                className="project-modal__image"
                onError={() =>
                  markImageAsFailed(activeImageIndex)
                }
              />
            ) : (
              <div className="project-modal__fallback">
                <ImageIcon
                  size={34}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <span>
                  Proje ekran görüntüsü eklenecek
                </span>

                <strong>{project.title}</strong>
              </div>
            )}

            <div className="project-modal__gallery-top">
              <span>
                {String(activeImageIndex + 1).padStart(
                  2,
                  "0",
                )}{" "}
                / {String(images.length).padStart(2, "0")}
              </span>
            </div>

            {images.length > 1 && (
              <div className="project-modal__gallery-controls">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Önceki ekran görüntüsü"
                >
                  <ChevronLeft
                    size={20}
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Sonraki ekran görüntüsü"
                >
                  <ChevronRight
                    size={20}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="project-modal__gallery-footer">
            <p>
              {activeImage?.caption ??
                activeImage?.alt ??
                "Proje ekran görüntüsü"}
            </p>

            {images.length > 1 && (
              <div className="project-modal__thumbnails">
                {images.map((image, index) => {
                  const isActive =
                    index === activeImageIndex;

                  const imageAvailable =
                    Boolean(image.src) &&
                    !failedImages.has(index);

                  return (
                    <button
                      key={`${project.id}-${index}`}
                      type="button"
                      className={
                        isActive
                          ? "is-active"
                          : undefined
                      }
                      onClick={() =>
                        setActiveImageIndex(index)
                      }
                      aria-label={`${index + 1}. proje görselini göster`}
                      aria-current={
                        isActive ? "true" : undefined
                      }
                    >
                      {imageAvailable ? (
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="72px"
                          className="project-modal__thumbnail-image"
                          onError={() =>
                            markImageAsFailed(index)
                          }
                        />
                      ) : (
                        <ImageIcon
                          size={15}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <div className="project-modal__content-grid">
          <section className="apple-card project-modal__summary">
            <p className="card-eyebrow">
              PROJE ÖZETİ
            </p>

            <div className="project-modal__paragraphs">
              {project.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <MetaCard
            title="Üstlendiğim sorumluluklar"
            number="01"
            items={project.role}
            className="project-modal__role"
          />

          <MetaCard
            title="Öne çıkan özellikler"
            number="02"
            items={project.features}
            className="project-modal__features"
          />

          <section className="apple-card apple-card--dark project-modal__learnings">
            <p className="card-eyebrow">
              03 · KAZANDIĞIM DENEYİMLER
            </p>

            <h3>
              Projenin bana kattığı pratikler
            </h3>

            <ul>
              {project.learnings.map((learning) => (
                <li key={learning}>{learning}</li>
              ))}
            </ul>
          </section>

          <section className="apple-card apple-card--soft project-modal__approach">
            <div>
              <p className="card-eyebrow">
                NASIL GELİŞTİRDİM?
              </p>

              <h3>{aiApproachText.title}</h3>
            </div>

            <div className="project-modal__approach-copy">
              {aiApproachText.paragraphs.map(
                (paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ),
              )}
            </div>
          </section>
        </div>

        <footer className="project-modal__footer">
          <p>
            Proje detaylarını, ekran görüntülerini ve
            sorumluluk alanlarını bu pencere içinde
            inceleyebilirsin.
          </p>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-modal__footer-link"
            >
              <ExternalLink
                size={15}
                aria-hidden="true"
              />
              Yeni sekmede aç
            </a>
          )}
        </footer>
      </article>

      <style jsx>{`
        .project-modal {
          min-height: 100%;
          padding: clamp(0.8rem, 2vw, 1.4rem);
        }

        .project-modal__header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 1.25rem;
          align-items: end;
          padding:
            clamp(1.1rem, 2vw, 1.6rem)
            clamp(0.25rem, 1vw, 0.55rem)
            clamp(1rem, 2.2vw, 1.6rem);
        }

        .project-modal__title {
          max-width: 16ch;
          margin-top: 0.9rem;
          color: var(--ink);
          font-size: clamp(2.4rem, 5.4vw, 5.4rem);
          font-weight: 850;
          letter-spacing: -0.065em;
          line-height: 0.94;
          text-wrap: balance;
        }

        .project-modal__lead {
          max-width: 65ch;
          margin-top: 1.2rem;
          color: var(--ink-2);
          font-size: clamp(1rem, 1.3vw, 1.12rem);
          line-height: 1.68;
        }

        .project-modal__live {
          white-space: nowrap;
        }

        .project-modal__gallery {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          background: var(--surface);
          box-shadow: var(--shadow-sm);
        }

        .project-modal__media {
          position: relative;
          min-height: clamp(320px, 42vw, 560px);
          overflow: hidden;
          margin: 0.5rem;
          border-radius: 18px;
          background:
            linear-gradient(
              145deg,
              #e9e9ed,
              #dedee3
            );
        }

        .project-modal__image {
          object-fit: contain;
          object-position: center;
          background: #e9e9ed;
        }

        .project-modal__fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.7rem;
          padding: 2rem;
          color: var(--ink-3);
          text-align: center;
        }

        .project-modal__fallback span {
          font-size: 0.7rem;
          font-weight: 740;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-modal__fallback strong {
          max-width: 24ch;
          color: var(--ink);
          font-size: 1rem;
        }

        .project-modal__gallery-top {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
        }

        .project-modal__gallery-top span {
          display: inline-flex;
          padding: 0.48rem 0.7rem;
          border: 1px solid rgba(255, 255, 255, 0.72);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--ink);
          box-shadow: var(--shadow-xs);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .project-modal__gallery-controls {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          z-index: 2;
          display: flex;
          gap: 0.45rem;
        }

        .project-modal__gallery-controls button {
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.72);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          color: var(--ink);
          box-shadow: var(--shadow-sm);
          transition:
            transform 0.22s var(--ease),
            background-color 0.22s var(--ease);
        }

        .project-modal__gallery-controls button:hover {
          transform: translateY(-2px);
          background: white;
        }

        .project-modal__gallery-footer {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 1rem;
          align-items: center;
          padding: 0.4rem 0.7rem 0.75rem 1rem;
        }

        .project-modal__gallery-footer > p {
          color: var(--ink-3);
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .project-modal__thumbnails {
          display: flex;
          gap: 0.4rem;
          overflow-x: auto;
          padding: 0.15rem;
        }

        .project-modal__thumbnails button {
          position: relative;
          width: 64px;
          height: 46px;
          flex: 0 0 auto;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 2px solid transparent;
          border-radius: 12px;
          background: var(--surface-muted);
          color: var(--ink-3);
          opacity: 0.58;
          transition:
            opacity 0.2s var(--ease),
            border-color 0.2s var(--ease),
            transform 0.2s var(--ease);
        }

        .project-modal__thumbnails button:hover,
        .project-modal__thumbnails button.is-active {
          opacity: 1;
          transform: translateY(-1px);
        }

        .project-modal__thumbnails button.is-active {
          border-color: var(--ink);
        }

        .project-modal__thumbnail-image {
          object-fit: cover;
        }

        .project-modal__content-grid {
          display: grid;
          grid-template-columns: repeat(
            12,
            minmax(0, 1fr)
          );
          gap: var(--grid-gap);
          margin-top: var(--grid-gap);
        }

        .project-modal__summary {
          grid-column: span 7;
          min-height: 380px;
        }

        .project-modal__paragraphs {
          display: grid;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .project-modal__paragraphs p {
          max-width: 60ch;
          color: var(--ink-2);
          font-size: 1rem;
          line-height: 1.74;
        }

        :global(.project-modal__role) {
          grid-column: span 5;
        }

        :global(.project-modal__features) {
          grid-column: span 5;
        }

        .project-modal__learnings {
          grid-column: span 7;
          min-height: 430px;
        }

        .project-modal__learnings h3 {
          max-width: 13ch;
          margin-top: 1rem;
          color: white;
          font-size: clamp(2rem, 3.7vw, 3.5rem);
          font-weight: 830;
          letter-spacing: -0.058em;
          line-height: 0.98;
        }

        .project-modal__learnings ul {
          display: grid;
          gap: 0.78rem;
          margin-top: 2.5rem;
          list-style: none;
        }

        .project-modal__learnings li {
          position: relative;
          padding-left: 1.15rem;
          color: var(--ink-inverse-2);
          font-size: 0.87rem;
          line-height: 1.62;
        }

        .project-modal__learnings li::before {
          content: "";
          position: absolute;
          top: 0.7em;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
          opacity: 0.42;
        }

        .project-modal__approach {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns:
            minmax(240px, 0.6fr)
            minmax(0, 1.4fr);
          gap: clamp(2rem, 5vw, 5rem);
        }

        .project-modal__approach h3 {
          max-width: 12ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: clamp(1.8rem, 3vw, 3rem);
          font-weight: 820;
          letter-spacing: -0.052em;
          line-height: 1;
        }

        .project-modal__approach-copy {
          display: grid;
          gap: 1rem;
        }

        .project-modal__approach-copy p {
          max-width: 65ch;
          color: var(--ink-2);
          font-size: 0.94rem;
          line-height: 1.72;
        }

        .project-modal__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1rem 0.35rem 0.1rem;
        }

        .project-modal__footer p {
          color: var(--ink-3);
          font-size: 0.72rem;
          line-height: 1.55;
        }

        .project-modal__footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--ink);
          font-size: 0.72rem;
          font-weight: 720;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .project-modal__header {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .project-modal__live {
            width: fit-content;
          }

          .project-modal__summary,
          :global(.project-modal__role),
          :global(.project-modal__features),
          .project-modal__learnings {
            grid-column: 1 / -1;
          }

          .project-modal__approach {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .project-modal {
            padding: 0.72rem;
          }

          .project-modal__header {
            padding:
              3.3rem 0.35rem
              1.2rem;
          }

          .project-modal__title {
            font-size: clamp(2.3rem, 12vw, 4rem);
          }

          .project-modal__gallery {
            border-radius: 25px;
          }

          .project-modal__media {
            min-height: 52vh;
            margin: 0.45rem;
            border-radius: 20px;
          }

          .project-modal__gallery-footer {
            grid-template-columns: 1fr;
            padding: 0.75rem 0.85rem 0.9rem;
          }

          .project-modal__thumbnails {
            width: 100%;
          }

          .project-modal__content-grid {
            grid-template-columns: 1fr;
          }

          .project-modal__summary,
          .project-modal__role,
          .project-modal__features,
          .project-modal__learnings,
          .project-modal__approach {
            grid-column: 1;
          }

          .project-modal__summary,
          .project-modal__learnings {
            min-height: auto;
          }

          .project-modal__footer {
            align-items: flex-start;
            flex-direction: column;
            padding-bottom: 1rem;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .project-modal__gallery-controls button:hover,
          .project-modal__thumbnails button:hover {
            transform: none;
          }
        }
      `}</style>
    </Dialog>
  );
}

function MetaCard({
  title,
  number,
  items,
  className,
}: {
  title: string;
  number: string;
  items: string[];
  className: string;
}) {
  return (
    <section
      className={`apple-card project-meta-card ${className}`}
    >
      <p className="card-eyebrow">
        {number} · {title}
      </p>

      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <style jsx>{`
        .project-meta-card {
          min-height: 380px;
        }

        .project-meta-card ul {
          display: grid;
          gap: 0.78rem;
          margin-top: 1.5rem;
          list-style: none;
        }

        .project-meta-card li {
          position: relative;
          padding-left: 1.15rem;
          color: var(--ink-2);
          font-size: 0.86rem;
          line-height: 1.6;
        }

        .project-meta-card li::before {
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

        @media (max-width: 900px) {
          .project-meta-card {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
