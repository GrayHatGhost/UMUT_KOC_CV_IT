"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";

import Dialog from "@/components/dialog/Dialog";
import {
  designWorks,
  type DesignWork,
} from "@/src/content/design-works";

type DesignCatalogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialWorkId?: string | null;
};

const SWIPE_THRESHOLD = 46;
const DETAILS_HINT_DURATION = 3400;

export default function DesignCatalogModal({
  isOpen,
  onClose,
  initialWorkId,
}: DesignCatalogModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDetailsHint, setShowDetailsHint] =
    useState(false);

  const [failedImages, setFailedImages] = useState<
    Set<string>
  >(() => new Set());

  const touchStartXRef = useRef<number | null>(null);
  const thumbnailStripRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const requestedIndex = initialWorkId
      ? designWorks.findIndex(
          (work) => work.id === initialWorkId,
        )
      : 0;

    setActiveIndex(
      requestedIndex >= 0 ? requestedIndex : 0,
    );
  }, [initialWorkId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setShowDetailsHint(true);

    const timer = window.setTimeout(() => {
      setShowDetailsHint(false);
    }, DETAILS_HINT_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  const activeWork = useMemo(
    () => designWorks[activeIndex] ?? designWorks[0],
    [activeIndex],
  );

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? designWorks.length - 1
        : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === designWorks.length - 1
        ? 0
        : current + 1,
    );
  };

  useEffect(() => {
    if (!isOpen || designWorks.length < 2) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen]);

  useEffect(() => {
    const strip = thumbnailStripRef.current;

    const activeThumbnail =
      strip?.querySelector<HTMLElement>(
        `[data-design-index="${activeIndex}"]`,
      );

    if (!strip || !activeThumbnail) return;
    if (strip.scrollWidth <= strip.clientWidth) return;

    const targetLeft =
      activeThumbnail.offsetLeft -
      (strip.clientWidth - activeThumbnail.offsetWidth) /
        2;

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    strip.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth",
    });
  }, [activeIndex]);

  if (!activeWork) return null;

  const activeImageAvailable =
    Boolean(activeWork.image) &&
    !failedImages.has(activeWork.id);

  const markImageAsFailed = (workId: string) => {
    setFailedImages((current) => {
      const next = new Set(current);
      next.add(workId);
      return next;
    });
  };

  const handleTouchStart = (
    event: React.TouchEvent<HTMLElement>,
  ) => {
    touchStartXRef.current =
      event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLElement>,
  ) => {
    const startX = touchStartXRef.current;
    const endX =
      event.changedTouches[0]?.clientX ?? null;

    touchStartXRef.current = null;

    if (startX === null || endX === null) return;

    const difference = endX - startX;

    if (Math.abs(difference) < SWIPE_THRESHOLD) {
      return;
    }

    if (difference > 0) {
      showPrevious();
      return;
    }

    showNext();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Görsel tasarım arşivi"
      size="wide"
    >
      <article className="design-catalog">
        <header className="design-catalog__header">
          <div>
            <p className="card-eyebrow">
              TASARIM ARŞİVİ
            </p>

            <h2 className="design-catalog__heading">
              {String(designWorks.length).padStart(
                2,
                "0",
              )}{" "}
              seçili çalışma.
            </h2>

            <p className="design-catalog__header-copy">
              Sosyal medya, kurumsal duyuru ve
              bilgilendirme amaçlı hazırladığım tasarımları
              tek bir katalog içinde inceleyebilirsin.
            </p>
          </div>

          <div
            className="design-catalog__counter"
            aria-live="polite"
          >
            <strong>
              {String(activeIndex + 1).padStart(2, "0")}
            </strong>
            <span>/</span>
            <span>
              {String(designWorks.length).padStart(
                2,
                "0",
              )}
            </span>
          </div>
        </header>

        <div className="design-catalog__viewer-grid">
          <section
            className="design-catalog__viewer"
            aria-label={`${activeWork.title} tasarım önizlemesi`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="design-catalog__media">
              {activeImageAvailable ? (
                <Image
                  key={activeWork.id}
                  src={activeWork.image}
                  alt={activeWork.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                  className="design-catalog__image"
                  onError={() =>
                    markImageAsFailed(activeWork.id)
                  }
                />
              ) : (
                <div className="design-catalog__fallback">
                  <ImageIcon
                    size={36}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />

                  <span>
                    Tasarım görseli eklenecek
                  </span>

                  <strong>{activeWork.title}</strong>

                  <small>
                    public/images/designs/
                    {activeWork.id}.webp
                  </small>
                </div>
              )}

              <span className="design-catalog__media-number">
                {activeWork.number}
              </span>

              {designWorks.length > 1 && (
                <div className="design-catalog__nav">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Önceki tasarım"
                  >
                    <ChevronLeft
                      size={21}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Sonraki tasarım"
                  >
                    <ChevronRight
                      size={21}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}

              {showDetailsHint && (
                <div
                  className="design-catalog__details-hint"
                  aria-hidden="true"
                >
                  <ChevronDown
                    size={16}
                    strokeWidth={1.9}
                  />
                  <span>
                    Açıklama ve tüm çalışmalar aşağıda
                  </span>
                </div>
              )}
            </div>

            <div className="design-catalog__progress">
              {designWorks.map((work, index) => (
                <button
                  key={work.id}
                  type="button"
                  className={
                    index === activeIndex
                      ? "is-active"
                      : undefined
                  }
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${work.number}. tasarıma git`}
                  aria-current={
                    index === activeIndex
                      ? "true"
                      : undefined
                  }
                />
              ))}
            </div>
          </section>

          <aside
            className="apple-card design-catalog__details"
            aria-live="polite"
          >
            <div>
              <p className="card-eyebrow">
                TASARIM {activeWork.number}
              </p>

              <span className="design-catalog__category">
                {activeWork.category}
              </span>

              <h3 className="design-catalog__title">
                {activeWork.title}
              </h3>

              <p className="design-catalog__purpose">
                {activeWork.purpose}
              </p>
            </div>

            <dl className="design-catalog__meta">
              <div>
                <dt>Platform</dt>
                <dd>{activeWork.platform}</dd>
              </div>

              <div>
                <dt>Araçlar</dt>
                <dd>
                  {activeWork.tools.join(" · ")}
                </dd>
              </div>

              {activeWork.year && (
                <div>
                  <dt>Yıl</dt>
                  <dd>{activeWork.year}</dd>
                </div>
              )}
            </dl>

            {activeImageAvailable ? (
              <a
                href={activeWork.image}
                target="_blank"
                rel="noreferrer"
                className="btn-dark design-catalog__external"
              >
                Görseli yeni sekmede aç
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            ) : (
              <p className="design-catalog__missing-note">
                Bu alan hazır. İlgili WebP dosyası
                eklendiğinde görsel otomatik olarak
                gösterilecek.
              </p>
            )}
          </aside>
        </div>

        <section
          className="design-catalog__library"
          aria-labelledby="design-library-title"
        >
          <div className="design-catalog__library-heading">
            <div>
              <p className="card-eyebrow">
                TÜM ÇALIŞMALAR
              </p>

              <h3 id="design-library-title">
                Katalogdan bir tasarım seç.
              </h3>
            </div>

            <p>
              Yön tuşlarını veya mobilde sağa-sola
              kaydırmayı da kullanabilirsin.
            </p>
          </div>

          <div
            ref={thumbnailStripRef}
            className="design-catalog__thumbnails"
          >
            {designWorks.map((work, index) => {
              const source =
                work.thumbnail ?? work.image;

              const thumbnailAvailable =
                Boolean(source) &&
                !failedImages.has(work.id);

              const isActive =
                index === activeIndex;

              return (
                <button
                  key={work.id}
                  type="button"
                  data-design-index={index}
                  className={`design-catalog__thumbnail ${
                    isActive ? "is-active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${work.title} tasarımını seç`}
                  aria-current={
                    isActive ? "true" : undefined
                  }
                >
                  <span className="design-catalog__thumbnail-media">
                    {thumbnailAvailable ? (
                      <Image
                        src={source}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 92px, 140px"
                        className="design-catalog__thumbnail-image"
                        onError={() =>
                          markImageAsFailed(work.id)
                        }
                      />
                    ) : (
                      <ImageIcon
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}

                    <i>{work.number}</i>
                  </span>

                  <span className="design-catalog__thumbnail-copy">
                    <strong>{work.title}</strong>
                    <small>{work.category}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </article>

      <style jsx global>{`
        .design-catalog {
          min-height: 100%;
          padding: clamp(0.8rem, 2vw, 1.35rem);
        }

        .design-catalog__header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 1.1rem;
          align-items: end;
          padding:
            clamp(1.05rem, 2vw, 1.55rem)
            clamp(0.25rem, 1vw, 0.55rem)
            clamp(0.95rem, 2vw, 1.45rem);
        }

        .design-catalog__heading {
          max-width: 11ch;
          margin-top: 0.9rem;
          color: var(--ink);
          font-size: clamp(2.5rem, 5.6vw, 5.7rem);
          font-weight: 850;
          letter-spacing: -0.066em;
          line-height: 0.92;
          text-wrap: balance;
        }

        .design-catalog__header-copy {
          max-width: 62ch;
          margin-top: 1.2rem;
          color: var(--ink-2);
          font-size: 0.98rem;
          line-height: 1.7;
        }

        .design-catalog__counter {
          min-width: 108px;
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 0.42rem;
          color: var(--ink-3);
          font-size: 0.74rem;
          font-weight: 740;
          letter-spacing: 0.08em;
        }

        .design-catalog__counter strong {
          color: var(--ink);
          font-size: 2.2rem;
          font-weight: 830;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .design-catalog__viewer-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.35fr)
            minmax(300px, 0.65fr);
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .design-catalog__viewer {
          min-width: 0;
          overflow: hidden;
          padding: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.92);
          border-radius: 24px;
          background: var(--surface);
          box-shadow: var(--shadow-sm);
          touch-action: pan-y;
        }

        .design-catalog__media {
          position: relative;
          min-height: clamp(420px, 48vw, 640px);
          overflow: hidden;
          border-radius: 18px;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(255, 255, 255, 0.92),
              transparent 38%
            ),
            linear-gradient(
              145deg,
              #e8e8ec,
              #dcdce2
            );
        }

        .design-catalog__image {
          object-fit: contain;
          object-position: center;
          padding: clamp(0.55rem, 1.4vw, 1rem);
        }

        .design-catalog__fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.72rem;
          padding: 2rem;
          color: var(--ink-3);
          text-align: center;
        }

        .design-catalog__fallback span {
          font-size: 0.65rem;
          font-weight: 760;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .design-catalog__fallback strong {
          max-width: 24ch;
          color: var(--ink);
          font-size: 1.05rem;
        }

        .design-catalog__fallback small {
          max-width: 32ch;
          color: var(--ink-3);
          font-size: 0.68rem;
          overflow-wrap: anywhere;
        }

        .design-catalog__media-number {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 3;
          min-width: 42px;
          height: 42px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.74);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: var(--shadow-xs);
          color: var(--ink);
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .design-catalog__nav {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          z-index: 4;
          display: flex;
          gap: 0.45rem;
        }

        .design-catalog__nav button {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.76);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.93);
          box-shadow: var(--shadow-sm);
          color: var(--ink);
          transition:
            transform 0.22s var(--ease),
            background-color 0.22s var(--ease);
        }

        .design-catalog__nav button:hover {
          transform: translateY(-2px);
          background: white;
        }

        .design-catalog__details-hint {
          position: absolute;
          bottom: 1.1rem;
          left: 50%;
          z-index: 3;
          display: none;
          align-items: center;
          gap: 0.45rem;
          max-width: calc(100% - 8rem);
          padding: 0.62rem 0.82rem;
          border: 1px solid rgba(255, 255, 255, 0.72);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: var(--shadow-sm);
          color: var(--ink-2);
          font-size: 0.66rem;
          font-weight: 720;
          line-height: 1.3;
          white-space: nowrap;
          transform: translateX(-50%);
          animation:
            design-details-hint-in 0.5s var(--ease)
              both,
            design-details-hint-pulse 1.5s 0.55s
              var(--ease) 1;
        }

        .design-catalog__progress {
          display: grid;
          grid-template-columns: repeat(
            10,
            minmax(0, 1fr)
          );
          gap: 0.35rem;
          padding: 0.65rem 0.2rem 0.05rem;
        }

        .design-catalog__progress button {
          height: 3px;
          overflow: hidden;
          border-radius: 999px;
          background: var(--surface-muted);
          transition: background-color 0.22s var(--ease);
        }

        .design-catalog__progress button.is-active {
          background: var(--ink);
        }

        .design-catalog__details {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.5rem;
        }

        .design-catalog__category {
          display: inline-flex;
          width: fit-content;
          margin-top: 1.2rem;
          padding: 0.42rem 0.68rem;
          border-radius: 999px;
          background: var(--surface-2);
          color: var(--ink-3);
          font-size: 0.61rem;
          font-weight: 740;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .design-catalog__title {
          max-width: 14ch;
          margin-top: 1.1rem;
          color: var(--ink);
          font-size: clamp(2rem, 3.7vw, 3.75rem);
          font-weight: 830;
          letter-spacing: -0.058em;
          line-height: 0.98;
          text-wrap: balance;
        }

        .design-catalog__purpose {
          max-width: 45ch;
          margin-top: 1.15rem;
          color: var(--ink-2);
          font-size: 0.93rem;
          line-height: 1.68;
        }

        .design-catalog__meta {
          display: grid;
          border-top: 1px solid var(--rule);
        }

        .design-catalog__meta > div {
          display: grid;
          grid-template-columns: 5rem minmax(0, 1fr);
          gap: 1rem;
          padding-block: 1rem;
          border-bottom: 1px solid var(--rule);
        }

        .design-catalog__meta dt {
          color: var(--ink-3);
          font-size: 0.64rem;
          font-weight: 760;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .design-catalog__meta dd {
          margin: 0;
          color: var(--ink);
          font-size: 0.8rem;
          font-weight: 620;
          line-height: 1.55;
        }

        .design-catalog__external {
          width: fit-content;
        }

        .design-catalog__missing-note {
          padding: 1rem;
          border-radius: 16px;
          background: var(--surface-2);
          color: var(--ink-3);
          font-size: 0.74rem;
          line-height: 1.6;
        }

        .design-catalog__library {
          margin-top: var(--grid-gap);
          padding: clamp(1rem, 2vw, 1.45rem);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          background: var(--surface);
          box-shadow: var(--shadow-sm);
        }

        .design-catalog__library-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 1.35rem;
        }

        .design-catalog__library-heading h3 {
          margin-top: 0.55rem;
          color: var(--ink);
          font-size: clamp(1.4rem, 2.4vw, 2.15rem);
          font-weight: 800;
          letter-spacing: -0.044em;
          line-height: 1.05;
        }

        .design-catalog__library-heading > p {
          max-width: 36ch;
          color: var(--ink-3);
          font-size: 0.72rem;
          line-height: 1.55;
          text-align: right;
        }

        .design-catalog__thumbnails {
          display: grid;
          grid-template-columns: repeat(
            5,
            minmax(0, 1fr)
          );
          gap: 0.7rem;
        }

        .design-catalog__thumbnail {
          min-width: 0;
          display: grid;
          grid-template-columns: 62px minmax(0, 1fr);
          gap: 0.72rem;
          align-items: center;
          padding: 0.48rem;
          border: 1px solid var(--rule);
          border-radius: 17px;
          background: var(--surface-2);
          color: var(--ink);
          text-align: left;
          opacity: 0.7;
          transition:
            opacity 0.22s var(--ease),
            border-color 0.22s var(--ease),
            background-color 0.22s var(--ease),
            transform 0.22s var(--ease);
        }

        .design-catalog__thumbnail:hover,
        .design-catalog__thumbnail.is-active {
          opacity: 1;
          transform: translateY(-2px);
        }

        .design-catalog__thumbnail.is-active {
          border-color: var(--ink);
          background: white;
        }

        .design-catalog__thumbnail-media {
          position: relative;
          width: 62px;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: var(--surface-muted);
          color: var(--ink-3);
        }

        .design-catalog__thumbnail-image {
          object-fit: cover;
        }

        .design-catalog__thumbnail-media i {
          position: absolute;
          right: 0.32rem;
          bottom: 0.32rem;
          z-index: 2;
          min-width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: var(--ink);
          font-size: 0.48rem;
          font-style: normal;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .design-catalog__thumbnail-copy {
          min-width: 0;
          display: grid;
          gap: 0.3rem;
        }

        .design-catalog__thumbnail-copy strong {
          overflow: hidden;
          color: var(--ink);
          font-size: 0.68rem;
          font-weight: 720;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .design-catalog__thumbnail-copy small {
          overflow: hidden;
          color: var(--ink-3);
          font-size: 0.56rem;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        @keyframes design-details-hint-in {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }

          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        @keyframes design-details-hint-pulse {
          0%,
          100% {
            transform: translate(-50%, 0);
          }

          50% {
            transform: translate(-50%, 6px);
          }
        }

        @media (max-width: 1080px) {
          .design-catalog__viewer-grid {
            grid-template-columns: 1fr;
          }

          .design-catalog__details {
            min-height: 500px;
          }

          .design-catalog__details-hint {
            display: flex;
          }

          .design-catalog__thumbnails {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
          }
        }

        @media (max-width: 767px) {
          .design-catalog {
            padding: 0.72rem;
          }

          .design-catalog__header {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding:
              3.25rem 0.35rem
              1.2rem;
          }

          .design-catalog__heading {
            font-size: clamp(2.35rem, 12vw, 4rem);
          }

          .design-catalog__counter {
            justify-content: flex-start;
          }

          .design-catalog__viewer {
            border-radius: 25px;
          }

          .design-catalog__media {
            min-height: min(76vh, 680px);
            border-radius: 20px;
          }

          .design-catalog__image {
            padding: 0.45rem;
          }

          .design-catalog__details {
            min-height: auto;
          }

          .design-catalog__details-hint {
            bottom: 1.15rem;
            max-width: calc(100% - 8.5rem);
            padding: 0.58rem 0.7rem;
            font-size: 0.61rem;
          }

          .design-catalog__library {
            overflow: hidden;
            border-radius: 25px;
            padding: 1rem;
          }

          .design-catalog__library-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.7rem;
          }

          .design-catalog__library-heading > p {
            text-align: left;
          }

          .design-catalog__thumbnails {
            display: flex;
            overflow-x: auto;
            gap: 0.6rem;
            margin-inline: -1rem;
            padding:
              0.1rem 1rem
              0.55rem;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
          }

          .design-catalog__thumbnails::-webkit-scrollbar {
            display: none;
          }

          .design-catalog__thumbnail {
            width: 112px;
            flex: 0 0 112px;
            display: block;
            padding: 0.38rem;
            scroll-snap-align: center;
          }

          .design-catalog__thumbnail-media {
            width: 100%;
          }

          .design-catalog__thumbnail-copy {
            display: none;
          }

          .design-catalog__external {
            width: 100%;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .design-catalog__nav button:hover,
          .design-catalog__thumbnail:hover {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .design-catalog__nav button,
          .design-catalog__thumbnail,
          .design-catalog__progress button {
            transition: none;
          }

          .design-catalog__details-hint {
            animation: none;
          }
        }
      `}</style>
    </Dialog>
  );
}
