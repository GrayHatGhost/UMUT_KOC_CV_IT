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
    const selected = featuredDesignIds
      .map((id) =>
        designWorks.find((work) => work.id === id),
      )
      .filter(
        (
          work,
        ): work is (typeof designWorks)[number] =>
          Boolean(work),
      );

    return selected.length === 3
      ? selected
      : designWorks.slice(0, 3);
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
              aria-label="Seçili tasarımlardan üçlü önizleme"
            >
              <div
                className="design-apple__preview-glow"
                aria-hidden="true"
              />

              {featuredWorks.map((work, index) => {
                const source =
                  work.thumbnail ?? work.image;

                const imageAvailable =
                  Boolean(source) &&
                  !failedImages.has(work.id);

                return (
                  <button
                    key={work.id}
                    type="button"
                    className={`design-apple__preview-card design-apple__preview-card--${
                      index + 1
                    }`}
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
                        sizes="(max-width: 720px) 29vw, 240px"
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

              <div
                className="design-apple__preview-count"
                aria-hidden="true"
              >
                <span>03</span>
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

        <style jsx global>{`
          .design-apple {
            overflow: clip;
          }

          .design-apple__showcase {
            min-height: 670px;
            display: grid;
            grid-template-columns:
              minmax(300px, 0.74fr)
              minmax(0, 1.26fr);
            gap: clamp(2.5rem, 6vw, 6.5rem);
            padding: clamp(1.25rem, 2vw, 1.65rem);
          }

          .design-apple__content {
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 3rem;
            padding: clamp(0.5rem, 2vw, 1.5rem);
          }

          .design-apple__icon {
            width: 48px;
            height: 48px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2.25rem;
            border: 1px solid var(--rule);
            border-radius: 17px;
            background: var(--surface-2);
            color: var(--ink);
          }

          .design-apple__title {
            max-width: 11ch;
            margin-top: 1rem;
            color: var(--ink);
            font-size: var(--f-section);
            font-weight: 850;
            letter-spacing: -0.062em;
            line-height: 0.95;
            text-wrap: balance;
          }

          .design-apple__title span {
            display: block;
            color: var(--ink-3);
          }

          .design-apple__copy {
            max-width: 48ch;
            margin-top: 1.35rem;
            color: var(--ink-2);
            font-size: var(--f-body);
            line-height: 1.72;
          }

          .design-apple__facts {
            display: grid;
            gap: 0.75rem;
            padding-block: 1.25rem;
            border-top: 1px solid var(--rule);
            border-bottom: 1px solid var(--rule);
          }

          .design-apple__facts span {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 1rem;
            color: var(--ink-3);
            font-size: 0.7rem;
          }

          .design-apple__facts strong {
            color: var(--ink);
            font-size: 0.78rem;
            font-weight: 720;
          }

          .design-apple__open {
            width: fit-content;
            margin-top: 1.25rem;
          }

          .design-apple__preview {
            position: relative;
            min-width: 0;
            min-height: 610px;
            overflow: hidden;
            border-radius: calc(var(--radius-lg) - 7px);
            background:
              radial-gradient(
                circle at 50% 26%,
                rgba(255, 255, 255, 0.96),
                transparent 42%
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
            opacity: 0.48;
            background-image: radial-gradient(
              circle,
              rgba(17, 17, 20, 0.16) 0 0.6px,
              transparent 0.78px
            );
            background-size: 24px 24px;
            mask-image: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.7),
              transparent 85%
            );
          }

          .design-apple__preview-glow {
            position: absolute;
            top: 40%;
            left: 50%;
            width: min(70%, 470px);
            aspect-ratio: 1;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.62);
            filter: blur(60px);
            transform: translate(-50%, -50%);
            pointer-events: none;
          }

          .design-apple__preview-card {
            position: absolute;
            top: 50%;
            z-index: 2;
            width: clamp(155px, 24vw, 255px);
            aspect-ratio: 4 / 5;
            overflow: hidden;
            border: 7px solid rgba(255, 255, 255, 0.94);
            border-radius: 24px;
            background: var(--surface);
            box-shadow:
              0 12px 32px rgba(17, 17, 20, 0.08),
              0 32px 72px rgba(17, 17, 20, 0.13);
            color: var(--ink);
            transform-origin: center bottom;
            transition:
              transform 0.38s var(--ease),
              box-shadow 0.38s var(--ease);
          }

          .design-apple__preview-card--1 {
            left: 7%;
            transform: translateY(-47%) rotate(-4deg);
          }

          .design-apple__preview-card--2 {
            left: 50%;
            z-index: 4;
            transform: translate(-50%, -54%);
          }

          .design-apple__preview-card--3 {
            right: 7%;
            transform: translateY(-47%) rotate(4deg);
          }

          .design-apple__preview-card--1:hover {
            transform: translateY(-51%) rotate(-2deg);
          }

          .design-apple__preview-card--2:hover {
            transform: translate(-50%, -58%);
          }

          .design-apple__preview-card--3:hover {
            transform: translateY(-51%) rotate(2deg);
          }

          .design-apple__preview-card:hover {
            box-shadow:
              0 15px 38px rgba(17, 17, 20, 0.1),
              0 42px 92px rgba(17, 17, 20, 0.18);
          }

          .design-apple__preview-image {
            object-fit: cover;
            object-position: center;
          }

          .design-apple__preview-number {
            position: absolute;
            top: 0.75rem;
            left: 0.75rem;
            z-index: 3;
            min-width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.75);
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.92);
            box-shadow: var(--shadow-xs);
            color: var(--ink);
            font-size: 0.58rem;
            font-weight: 800;
            letter-spacing: 0.08em;
          }

          .design-apple__preview-label {
            position: absolute;
            right: 0.55rem;
            bottom: 0.55rem;
            left: 0.55rem;
            z-index: 3;
            overflow: hidden;
            padding: 0.58rem 0.65rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.9);
            color: var(--ink);
            font-size: 0.61rem;
            font-weight: 710;
            line-height: 1.35;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .design-apple__fallback {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.65rem;
            background: linear-gradient(
              145deg,
              #f3f3f5,
              #e6e6ea
            );
            color: var(--ink-3);
          }

          .design-apple__fallback small {
            font-size: 0.6rem;
            font-weight: 720;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .design-apple__preview-count {
            position: absolute;
            right: 1.25rem;
            bottom: 1.25rem;
            z-index: 5;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.55rem 0.72rem;
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.88);
            box-shadow: var(--shadow-xs);
            color: var(--ink-3);
            font-size: 0.6rem;
            font-weight: 760;
            letter-spacing: 0.08em;
          }

          .design-apple__preview-count i {
            width: 20px;
            height: 1px;
            background: var(--rule-strong);
          }

          @media (max-width: 1080px) {
            .design-apple__showcase {
              grid-template-columns: 1fr;
            }

            .design-apple__preview {
              min-height: 590px;
            }
          }

          @media (max-width: 720px) {
            .design-apple__showcase {
              min-height: auto;
              gap: 2.5rem;
            }

            .design-apple__content {
              padding: 0.35rem;
            }

            .design-apple__preview {
              min-height: 390px;
            }

            .design-apple__preview-glow {
              display: none;
            }

            .design-apple__preview-card {
              top: 48%;
              width: 31%;
              border-width: 4px;
              border-radius: 17px;
              box-shadow:
                0 8px 22px rgba(17, 17, 20, 0.08),
                0 20px 44px rgba(17, 17, 20, 0.11);
            }

            .design-apple__preview-card--1 {
              left: 2.5%;
              transform: translateY(-50%) rotate(-2deg);
            }

            .design-apple__preview-card--2 {
              left: 50%;
              transform: translate(-50%, -54%);
            }

            .design-apple__preview-card--3 {
              right: 2.5%;
              transform: translateY(-50%) rotate(2deg);
            }

            .design-apple__preview-card--1:hover {
              transform: translateY(-50%) rotate(-2deg);
            }

            .design-apple__preview-card--2:hover {
              transform: translate(-50%, -54%);
            }

            .design-apple__preview-card--3:hover {
              transform: translateY(-50%) rotate(2deg);
            }

            .design-apple__preview-label {
              display: none;
            }

            .design-apple__preview-number {
              top: 0.45rem;
              left: 0.45rem;
              min-width: 28px;
              height: 28px;
            }

            .design-apple__preview-count {
              right: 0.8rem;
              bottom: 0.8rem;
            }

            .design-apple__open {
              width: 100%;
            }
          }

          @media (hover: none), (pointer: coarse) {
            .design-apple__preview-card:hover {
              box-shadow:
                0 8px 22px rgba(17, 17, 20, 0.08),
                0 20px 44px rgba(17, 17, 20, 0.11);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .design-apple__preview-card {
              transition: none;
            }
          }
        `}</style>
      </section>

      {catalogOpen && (
        <DesignCatalogModal
          isOpen={catalogOpen}
          onClose={() => setCatalogOpen(false)}
          initialWorkId={initialWorkId}
        />
      )}
    </>
  );
}
