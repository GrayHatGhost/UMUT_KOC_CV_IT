"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ImageIcon,
  Images,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  designWorks,
  featuredDesignIds,
} from "@/src/content/design-works";

const DesignCatalogModal = dynamic(
  () => import("@/components/design/DesignCatalogModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

const ease = [0.22, 1, 0.36, 1] as const;
const PREVIEW_COUNT = 6;

export default function DesignArchiveScene() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [initialWorkId, setInitialWorkId] = useState<
    string | null
  >(null);

  const [failedImages, setFailedImages] = useState<
    Set<string>
  >(() => new Set());

  const shouldReduceMotion = useReducedMotion();

  const featuredWorks = useMemo(() => {
    const explicitlyFeatured = featuredDesignIds
      .map((id) =>
        designWorks.find((work) => work.id === id),
      )
      .filter(
        (
          work,
        ): work is (typeof designWorks)[number] =>
          Boolean(work),
      );

    const featuredIds = new Set(
      explicitlyFeatured.map((work) => work.id),
    );

    const remainingWorks = designWorks.filter(
      (work) => !featuredIds.has(work.id),
    );

    return [
      ...explicitlyFeatured,
      ...remainingWorks,
    ].slice(0, PREVIEW_COUNT);
  }, []);

  const openCatalog = (workId?: string) => {
    setInitialWorkId(
      workId ?? designWorks[0]?.id ?? null,
    );
    setCatalogOpen(true);
  };

  const markImageAsFailed = (workId: string) => {
    setFailedImages((current) => {
      const next = new Set(current);
      next.add(workId);
      return next;
    });
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
      amount: 0.18,
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
    <>
      <section
        className="design-apple page-section"
        aria-labelledby="design-title"
      >
        <div className="site-wrap">
          <motion.article
            className="apple-card design-apple__showcase"
            {...reveal(0)}
          >
            <div className="design-apple__content">
              <div>
                <span className="design-apple__icon">
                  <Images
                    size={22}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>

                <p className="card-eyebrow">
                  GÖRSEL TASARIM ARŞİVİ
                </p>

                <h2
                  id="design-title"
                  className="design-apple__title"
                >
                  Görsel iletişimi
                  <span>daha anlaşılır hâle getirmek.</span>
                </h2>

                <p className="design-apple__copy">
                  Sosyal medya, kurumsal duyuru ve
                  bilgilendirme amaçlı hazırladığım seçili
                  tasarımlar.
                </p>
              </div>

              <div>
                <div className="design-apple__facts">
                  <span>
                    <strong>
                      {String(designWorks.length).padStart(
                        2,
                        "0",
                      )}
                    </strong>
                    seçili çalışma
                  </span>

                  <span>
                    <strong>Instagram</strong>
                    sosyal medya
                  </span>

                  <span>
                    <strong>Photoshop · Canva</strong>
                    üretim araçları
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-dark design-apple__open"
                  onClick={() => openCatalog()}
                >
                  Tüm tasarımları gör
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div
              className="design-apple__preview"
              aria-label={`Seçili tasarımlardan ${featuredWorks.length} görsellik önizleme`}
            >
              <div
                className="design-apple__preview-glow"
                aria-hidden="true"
              />

              <div className="design-apple__preview-grid">
                {featuredWorks.map((work) => {
                  const source =
                    work.thumbnail ?? work.image;

                  const imageAvailable =
                    Boolean(source) &&
                    !failedImages.has(work.id);

                  return (
                    <button
                      key={work.id}
                      type="button"
                      className="design-apple__preview-card"
                      onClick={() =>
                        openCatalog(work.id)
                      }
                      aria-label={`${work.title} tasarımını katalogda incele`}
                    >
                      <span className="design-apple__preview-number">
                        {work.number}
                      </span>

                      {imageAvailable ? (
                        <Image
                          src={source}
                          alt={work.alt}
                          fill
                          sizes="(max-width: 720px) 44vw, (max-width: 1080px) 29vw, 220px"
                          className="design-apple__preview-image"
                          onError={() =>
                            markImageAsFailed(work.id)
                          }
                        />
                      ) : (
                        <span className="design-apple__fallback">
                          <ImageIcon
                            size={24}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          <small>
                            Görsel eklenecek
                          </small>
                        </span>
                      )}

                      <span className="design-apple__preview-label">
                        {work.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="design-apple__preview-count"
                aria-hidden="true"
              >
                <span>
                  {String(featuredWorks.length).padStart(
                    2,
                    "0",
                  )}
                </span>
                <i />
                <span>
                  {String(designWorks.length).padStart(
                    2,
                    "0",
                  )}
                </span>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {catalogOpen && (
        <DesignCatalogModal
          isOpen={catalogOpen}
          onClose={() => setCatalogOpen(false)}
          initialWorkId={initialWorkId}
        />
      )}

      <style jsx global>{`
        .design-apple {
          overflow: clip;
        }

        .design-apple__showcase {
          min-height: 600px;
          display: grid;
          grid-template-columns:
            minmax(340px, 0.78fr)
            minmax(0, 1.22fr);
          gap: clamp(1.25rem, 2.5vw, 2.5rem);
          padding: clamp(0.8rem, 1.2vw, 1rem);
        }

        .design-apple__content {
          min-width: 0;
          display: grid;
          grid-template-rows: auto auto;
          align-content: space-between;
          gap: var(--content-gap-xl);
          padding: clamp(1.15rem, 2.2vw, 2rem);
        }

        .design-apple__icon {
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
          border: 1px solid var(--rule);
          border-radius: 17px;
          background: var(--surface-2);
          color: var(--ink);
        }

        .design-apple__title {
          max-width: 12ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: var(--f-section);
          font-weight: 850;
          letter-spacing: -0.062em;
          line-height: 1;
          text-wrap: balance;
        }

        .design-apple__title span {
          display: block;
          margin-top: 0.08em;
          color: var(--ink-3);
        }

        .design-apple__copy {
          max-width: 52ch;
          margin-top: 1rem;
          color: var(--ink-2);
          font-size: var(--f-body);
          line-height: 1.68;
        }

        .design-apple__facts {
          display: grid;
          border-top: 1px solid var(--rule);
        }

        .design-apple__facts span {
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-block: 0.62rem;
          border-bottom: 1px solid var(--rule);
          color: var(--ink-3);
          font-size: 0.68rem;
          line-height: 1.4;
        }

        .design-apple__facts strong {
          color: var(--ink);
          font-size: 0.78rem;
          font-weight: 720;
        }

        .design-apple__open {
          width: fit-content;
          margin-top: 0.85rem;
        }

        .design-apple__preview {
          position: relative;
          min-width: 0;
          overflow: hidden;
          display: grid;
          align-items: center;
          padding:
            clamp(1rem, 1.8vw, 1.35rem)
            clamp(1rem, 1.8vw, 1.45rem)
            clamp(2.7rem, 3.4vw, 3.1rem);
          border-radius: calc(var(--radius-lg) - 7px);
          background:
            radial-gradient(
              circle at 50% 22%,
              rgba(255, 255, 255, 0.96),
              transparent 45%
            ),
            linear-gradient(
              145deg,
              #e8e8ec,
              #dcdce2
            );
          isolation: isolate;
        }

        .design-apple__preview::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.4;
          background-image: radial-gradient(
            circle,
            rgba(17, 17, 20, 0.14) 0 0.6px,
            transparent 0.78px
          );
          background-size: 24px 24px;
          mask-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.65),
            transparent 90%
          );
        }

        .design-apple__preview-glow {
          position: absolute;
          top: 44%;
          left: 50%;
          z-index: -1;
          width: min(75%, 520px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.62);
          filter: blur(68px);
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .design-apple__preview-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(
            3,
            minmax(0, 1fr)
          );
          gap: clamp(0.65rem, 1.2vw, 1rem);
          align-items: stretch;
        }

        .design-apple__preview-card {
          position: relative;
          min-width: 0;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 4px solid rgba(255, 255, 255, 0.95);
          border-radius: clamp(15px, 1.7vw, 21px);
          background: var(--surface);
          box-shadow:
            0 10px 26px rgba(17, 17, 20, 0.08),
            0 24px 48px rgba(17, 17, 20, 0.11);
          color: var(--ink);
          transform: translateY(0);
          transition:
            transform 0.3s var(--ease),
            box-shadow 0.3s var(--ease);
        }

        .design-apple__preview-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 14px 32px rgba(17, 17, 20, 0.1),
            0 30px 62px rgba(17, 17, 20, 0.15);
        }

        .design-apple__preview-image {
          object-fit: cover;
          object-position: center;
        }

        .design-apple__preview-number {
          position: absolute;
          top: 0.55rem;
          left: 0.55rem;
          z-index: 3;
          min-width: 29px;
          height: 29px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.76);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.93);
          box-shadow: var(--shadow-xs);
          color: var(--ink);
          font-size: 0.52rem;
          font-weight: 800;
          letter-spacing: 0.07em;
        }

        .design-apple__preview-label {
          position: absolute;
          right: 0.42rem;
          bottom: 0.42rem;
          left: 0.42rem;
          z-index: 3;
          overflow: hidden;
          padding: 0.48rem 0.55rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--ink);
          font-size: 0.55rem;
          font-weight: 710;
          line-height: 1.3;
          text-overflow: ellipsis;
          white-space: nowrap;
          backdrop-filter: blur(8px);
        }

        .design-apple__fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          background: linear-gradient(
            145deg,
            #f3f3f5,
            #e6e6ea
          );
          color: var(--ink-3);
        }

        .design-apple__fallback small {
          font-size: 0.56rem;
          font-weight: 720;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .design-apple__preview-count {
          position: absolute;
          right: 1rem;
          bottom: 0.9rem;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 0.48rem;
          padding: 0.52rem 0.68rem;
          border: 1px solid rgba(255, 255, 255, 0.72);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: var(--shadow-xs);
          color: var(--ink-3);
          font-size: 0.58rem;
          font-weight: 760;
          letter-spacing: 0.08em;
        }

        .design-apple__preview-count i {
          width: 18px;
          height: 1px;
          background: var(--rule-strong);
        }

        @media (max-width: 1080px) {
          .design-apple__showcase {
            min-height: auto;
            grid-template-columns: 1fr;
          }

          .design-apple__preview {
            min-height: auto;
          }

          .design-apple__preview-grid {
            grid-template-columns: repeat(
              3,
              minmax(0, 1fr)
            );
          }
        }

        @media (max-width: 720px) {
          .design-apple__showcase {
            gap: 1.5rem;
          }

          .design-apple__content {
            padding: 0.5rem;
          }

          .design-apple__preview {
            padding:
              0.8rem 0.8rem
              3rem;
          }

          .design-apple__preview-glow {
            display: none;
          }

          .design-apple__preview-grid {
            grid-template-columns: repeat(
              2,
              minmax(0, 1fr)
            );
            gap: 0.65rem;
          }

          .design-apple__preview-card {
            border-width: 3px;
            border-radius: 15px;
          }

          .design-apple__preview-label {
            display: none;
          }

          .design-apple__preview-number {
            top: 0.42rem;
            left: 0.42rem;
            min-width: 27px;
            height: 27px;
          }

          .design-apple__preview-count {
            right: 0.75rem;
            bottom: 0.7rem;
          }

          .design-apple__open {
            width: 100%;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .design-apple__preview-card:hover {
            transform: none;
            box-shadow:
              0 10px 26px rgba(17, 17, 20, 0.08),
              0 24px 48px rgba(17, 17, 20, 0.11);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .design-apple__preview-card {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
