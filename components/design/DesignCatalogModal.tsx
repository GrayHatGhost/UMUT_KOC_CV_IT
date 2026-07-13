"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  ImageIcon,
} from "lucide-react";

import Dialog from "@/components/dialog/Dialog";
import {
  designWorks,
  type DesignWork,
} from "@/src/content/design-works";

const DesignLightbox = dynamic(
  () => import("./DesignLightbox"),
  {
    ssr: false,
  },
);

type DesignCatalogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialWorkId?: string | null;
};

export default function DesignCatalogModal({
  isOpen,
  onClose,
  initialWorkId,
}: DesignCatalogModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxWork, setLightboxWork] =
    useState<DesignWork | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    if (!isOpen) return;

    const requestedIndex = initialWorkId
      ? designWorks.findIndex((work) => work.id === initialWorkId)
      : 0;

    setActiveIndex(requestedIndex >= 0 ? requestedIndex : 0);
    setLightboxWork(null);
  }, [initialWorkId, isOpen]);

  const activeWork = useMemo(
    () => designWorks[activeIndex] ?? designWorks[0],
    [activeIndex],
  );

  useEffect(() => {
    if (!isOpen || lightboxWork || designWorks.length < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === 0 ? designWorks.length - 1 : current - 1,
        );
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === designWorks.length - 1 ? 0 : current + 1,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, lightboxWork]);

  if (!activeWork) return null;

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? designWorks.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === designWorks.length - 1 ? 0 : current + 1,
    );
  };

  const markImageAsFailed = (workId: string) => {
    setFailedImages((current) => {
      const next = new Set(current);
      next.add(workId);
      return next;
    });
  };

  const imageAvailable =
    Boolean(activeWork.image) && !failedImages.has(activeWork.id);

  const handleClose = () => {
    setLightboxWork(null);
    onClose();
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={handleClose}
        ariaLabel="Tasarım arşivi kataloğu"
        size="wide"
      >
        <article className="design-catalog">
          <header className="design-catalog__header">
            <div>
              <p className="t-label">TASARIM ARŞİVİ</p>

              <h2 className="design-catalog__title">
                Görsel çalışmalar
              </h2>
            </div>

            <p className="design-catalog__intro">
              Sosyal medya, duyuru ve kurumsal iletişim için
              hazırladığım seçili tasarımlar.
            </p>
          </header>

          <div className="design-catalog__layout">
            <nav
              className="design-catalog__thumbnails"
              aria-label="Tasarım seçimi"
            >
              {designWorks.map((work, index) => {
                const thumbnailAvailable =
                  Boolean(work.thumbnail || work.image) &&
                  !failedImages.has(work.id);
                const isActive = index === activeIndex;

                return (
                  <button
                    key={work.id}
                    type="button"
                    className={[
                      "catalog-thumbnail",
                      isActive
                        ? "catalog-thumbnail--active"
                        : "",
                    ].join(" ")}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`${work.title} tasarımını seç`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="catalog-thumbnail__visual">
                      {thumbnailAvailable ? (
                        <Image
                          src={work.thumbnail || work.image}
                          alt=""
                          fill
                          sizes="(max-width: 767px) 96px, 124px"
                          className="catalog-thumbnail__image"
                          onError={() =>
                            markImageAsFailed(work.id)
                          }
                        />
                      ) : (
                        <ImageIcon
                          size={18}
                          aria-hidden="true"
                        />
                      )}
                    </span>

                    <span className="catalog-thumbnail__copy">
                      <span>{work.number}</span>
                      <strong>{work.title}</strong>
                    </span>
                  </button>
                );
              })}
            </nav>

            <section
              className="design-catalog__viewer"
              aria-labelledby={`catalog-work-${activeWork.id}`}
            >
              <button
                type="button"
                className="design-catalog__stage"
                onClick={() => setLightboxWork(activeWork)}
                aria-label={`${activeWork.title} tasarımını büyüt`}
              >
                {imageAvailable ? (
                  <Image
                    src={activeWork.image}
                    alt={activeWork.title}
                    fill
                    priority
                    sizes="(max-width: 767px) 100vw, (max-width: 1100px) 70vw, 680px"
                    className="design-catalog__main-image"
                    onError={() =>
                      markImageAsFailed(activeWork.id)
                    }
                  />
                ) : (
                  <span className="design-catalog__placeholder">
                    <ImageIcon size={26} aria-hidden="true" />
                    <span>Tasarım görseli eklenecek</span>
                    <small>{activeWork.title}</small>
                  </span>
                )}

                <span
                  className="design-catalog__expand"
                  aria-hidden="true"
                >
                  <Expand size={17} />
                  Büyüt
                </span>
              </button>

              <div className="design-catalog__mobile-count">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(designWorks.length).padStart(2, "0")}
              </div>
            </section>

            <aside className="design-catalog__details">
              <div>
                <p className="design-catalog__number">
                  TASARIM {activeWork.number}
                </p>

                <p className="design-catalog__category">
                  {activeWork.category}
                </p>

                <h3
                  id={`catalog-work-${activeWork.id}`}
                  className="design-catalog__work-title"
                >
                  {activeWork.title}
                </h3>

                <p className="design-catalog__purpose">
                  {activeWork.purpose}
                </p>
              </div>

              <dl className="design-catalog__metadata">
                <div>
                  <dt>Platform</dt>
                  <dd>{activeWork.platform}</dd>
                </div>

                <div>
                  <dt>Araçlar</dt>
                  <dd>{activeWork.tools.join(" · ")}</dd>
                </div>

                {activeWork.year && (
                  <div>
                    <dt>Yıl</dt>
                    <dd>{activeWork.year}</dd>
                  </div>
                )}
              </dl>

              <div className="design-catalog__navigation">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Önceki tasarım"
                >
                  <ChevronLeft size={17} />
                  Önceki
                </button>

                <span aria-live="polite">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(designWorks.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Sonraki tasarım"
                >
                  Sonraki
                  <ChevronRight size={17} />
                </button>
              </div>
            </aside>
          </div>
        </article>

        <style jsx>{`
          .design-catalog {
            min-height: min(
              820px,
              calc(100dvh - clamp(1.5rem, 4vw, 3rem))
            );
            display: flex;
            flex-direction: column;
            background: var(--surface-dark);
            color: var(--ink);
          }

          .design-catalog__header {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.62fr);
            gap: 2rem;
            align-items: end;
            padding:
              clamp(2rem, 4vw, 3.5rem)
              clamp(4.5rem, 6vw, 5.5rem)
              clamp(1.75rem, 3vw, 2.5rem)
              clamp(2rem, 4vw, 3.5rem);
            border-bottom: 1px solid var(--rule);
          }

          .design-catalog__title {
            margin-top: 0.65rem;
            color: var(--ink);
            font-family:
              var(--font-display), var(--font-geist), Georgia,
              serif;
            font-size: clamp(2rem, 3.6vw, 3.8rem);
            font-weight: 700;
            letter-spacing: -0.045em;
            line-height: 1;
          }

          .design-catalog__intro {
            max-width: 40ch;
            color: var(--ink-3);
            font-size: 0.9rem;
            line-height: 1.7;
          }

          .design-catalog__layout {
            flex: 1;
            min-height: 0;
            display: grid;
            grid-template-columns:
              minmax(150px, 0.28fr)
              minmax(0, 1.18fr)
              minmax(260px, 0.54fr);
            grid-template-areas: "thumbs viewer details";
          }

          .design-catalog__thumbnails {
            grid-area: thumbs;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 0.65rem;
            overflow-y: auto;
            padding: 1.25rem;
            border-right: 1px solid var(--rule);
            background: #080808;
          }

          .catalog-thumbnail {
            width: 100%;
            display: grid;
            grid-template-columns: 4.2rem minmax(0, 1fr);
            gap: 0.75rem;
            align-items: center;
            padding: 0.55rem;
            border: 1px solid transparent;
            color: var(--ink-3);
            text-align: left;
            transition:
              color 0.2s var(--ease),
              border-color 0.2s var(--ease),
              background-color 0.2s var(--ease);
          }

          .catalog-thumbnail:hover,
          .catalog-thumbnail:focus-visible {
            color: var(--ink-2);
            background: rgba(255, 255, 255, 0.025);
          }

          .catalog-thumbnail--active {
            border-color: var(--rule-strong);
            background: var(--surface);
            color: var(--ink);
          }

          .catalog-thumbnail__visual {
            position: relative;
            overflow: hidden;
            aspect-ratio: 4 / 5;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--surface);
            color: var(--ink-3);
          }

          :global(.catalog-thumbnail__image) {
            object-fit: cover;
            filter: grayscale(1) brightness(0.78);
          }

          .catalog-thumbnail--active
            :global(.catalog-thumbnail__image) {
            filter: grayscale(0.3) brightness(0.92);
          }

          .catalog-thumbnail__copy {
            min-width: 0;
            display: grid;
            gap: 0.35rem;
          }

          .catalog-thumbnail__copy span {
            font-size: 0.625rem;
            font-weight: 650;
            letter-spacing: 0.12em;
          }

          .catalog-thumbnail__copy strong {
            overflow: hidden;
            color: inherit;
            font-size: 0.75rem;
            font-weight: 560;
            line-height: 1.4;
            text-overflow: ellipsis;
          }

          .design-catalog__viewer {
            grid-area: viewer;
            min-width: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: clamp(1rem, 3vw, 2.5rem);
            background: #050505;
          }

          .design-catalog__stage {
            position: relative;
            width: min(100%, 680px);
            height: min(68dvh, 700px);
            min-height: 30rem;
            overflow: hidden;
            border: 1px solid var(--rule);
            background: #080808;
            cursor: zoom-in;
          }

          :global(.design-catalog__main-image) {
            object-fit: contain;
          }

          .design-catalog__placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.7rem;
            padding: 2rem;
            color: var(--ink-3);
            text-align: center;
          }

          .design-catalog__placeholder > span {
            font-size: 0.6875rem;
            font-weight: 650;
            letter-spacing: 0.13em;
            text-transform: uppercase;
          }

          .design-catalog__placeholder small {
            color: var(--ink-3);
            font-size: 0.75rem;
          }

          .design-catalog__expand {
            position: absolute;
            right: 1rem;
            bottom: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.65rem 0.85rem;
            border: 1px solid var(--rule-strong);
            border-radius: 999px;
            background: rgba(8, 8, 8, 0.92);
            color: var(--ink-2);
            font-size: 0.75rem;
            font-weight: 560;
            transition:
              color 0.2s var(--ease),
              background-color 0.2s var(--ease),
              border-color 0.2s var(--ease);
          }

          .design-catalog__stage:hover
            .design-catalog__expand,
          .design-catalog__stage:focus-visible
            .design-catalog__expand {
            border-color: rgba(255, 255, 255, 0.5);
            background: #151515;
            color: var(--ink);
          }

          .design-catalog__mobile-count {
            display: none;
          }

          .design-catalog__details {
            grid-area: details;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 2.5rem;
            padding:
              clamp(2rem, 4vw, 3.5rem)
              clamp(1.5rem, 3vw, 2.75rem);
            border-left: 1px solid var(--rule);
            background: var(--surface);
          }

          .design-catalog__number,
          .design-catalog__category,
          .design-catalog__metadata dt {
            color: var(--ink-3);
            font-size: 0.6875rem;
            font-weight: 650;
            letter-spacing: 0.13em;
            line-height: 1.5;
            text-transform: uppercase;
          }

          .design-catalog__category {
            margin-top: 1rem;
          }

          .design-catalog__work-title {
            max-width: 15ch;
            margin-top: 1.1rem;
            color: var(--ink);
            font-family:
              var(--font-display), var(--font-geist), Georgia,
              serif;
            font-size: clamp(1.75rem, 2.7vw, 3rem);
            font-weight: 700;
            letter-spacing: -0.04em;
            line-height: 1.04;
          }

          .design-catalog__purpose {
            max-width: 37ch;
            margin-top: 1.4rem;
            color: var(--ink-2);
            font-size: 0.9rem;
            line-height: 1.72;
          }

          .design-catalog__metadata {
            display: grid;
            border-top: 1px solid var(--rule);
          }

          .design-catalog__metadata > div {
            display: grid;
            grid-template-columns:
              minmax(5rem, 0.42fr)
              minmax(0, 1fr);
            gap: 1rem;
            padding-top: 0.95rem;
            padding-bottom: 0.95rem;
            border-bottom: 1px solid var(--rule);
          }

          .design-catalog__metadata dd {
            color: var(--ink-2);
            font-size: 0.8125rem;
            line-height: 1.6;
          }

          .design-catalog__navigation {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 0.75rem;
            align-items: center;
            padding-top: 1.25rem;
            border-top: 1px solid var(--rule);
          }

          .design-catalog__navigation button {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            color: var(--ink-3);
            font-size: 0.75rem;
            font-weight: 560;
            transition: color 0.2s var(--ease);
          }

          .design-catalog__navigation button:last-child {
            justify-self: end;
          }

          .design-catalog__navigation button:hover,
          .design-catalog__navigation button:focus-visible {
            color: var(--ink);
          }

          .design-catalog__navigation > span {
            color: var(--ink-3);
            font-size: 0.625rem;
            font-weight: 650;
            letter-spacing: 0.12em;
          }

          @media (max-width: 1100px) {
            .design-catalog__header {
              grid-template-columns: 1fr;
              padding-right: 4.5rem;
            }

            .design-catalog__layout {
              grid-template-columns:
                8rem
                minmax(0, 1fr);
              grid-template-areas:
                "thumbs viewer"
                "thumbs details";
            }

            .design-catalog__details {
              border-top: 1px solid var(--rule);
              border-left: 0;
            }

            .design-catalog__stage {
              height: min(62dvh, 620px);
            }
          }

          @media (max-width: 767px) {
            .design-catalog {
              min-height: 100dvh;
            }

            .design-catalog__header {
              grid-template-columns: 1fr;
              gap: 1rem;
              padding:
                max(4.75rem, env(safe-area-inset-top))
                1.25rem
                1.75rem;
            }

            .design-catalog__layout {
              display: flex;
              flex-direction: column;
            }

            .design-catalog__viewer {
              order: 1;
              min-height: auto;
              padding: 0.75rem;
            }

            .design-catalog__stage {
              width: 100%;
              height: 66dvh;
              min-height: 27rem;
            }

            .design-catalog__mobile-count {
              display: block;
              align-self: flex-end;
              margin-top: 0.75rem;
              color: var(--ink-3);
              font-size: 0.625rem;
              font-weight: 650;
              letter-spacing: 0.12em;
            }

            .design-catalog__details {
              order: 2;
              padding: 2rem 1.25rem;
              border-top: 1px solid var(--rule);
              border-left: 0;
            }

            .design-catalog__thumbnails {
              order: 3;
              flex-direction: row;
              overflow-x: auto;
              padding: 1rem 1.25rem
                max(1.25rem, env(safe-area-inset-bottom));
              border-top: 1px solid var(--rule);
              border-right: 0;
            }

            .catalog-thumbnail {
              width: 6rem;
              flex: 0 0 6rem;
              display: block;
              padding: 0.4rem;
            }

            .catalog-thumbnail__visual {
              width: 100%;
            }

            .catalog-thumbnail__copy {
              display: none;
            }

            .design-catalog__navigation {
              margin-top: 0.5rem;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .catalog-thumbnail,
            .design-catalog__expand,
            .design-catalog__navigation button {
              transition: none;
            }
          }
        `}</style>
      </Dialog>

      <DesignLightbox
        work={lightboxWork}
        onClose={() => setLightboxWork(null)}
      />
    </>
  );
}
