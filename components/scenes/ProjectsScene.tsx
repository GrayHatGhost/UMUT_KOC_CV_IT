"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ImageIcon,
} from "lucide-react";

import {
  projects,
  type Project,
} from "@/src/content/projects";

const ProjectModal = dynamic(
  () => import("@/components/projects/ProjectModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

const ease = [0.22, 1, 0.36, 1] as const;

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
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.7,
              delay,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}

export default function ProjectsScene() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [failedCovers, setFailedCovers] = useState<
    Set<string>
  >(() => new Set());

  const markCoverAsFailed = (projectId: string) => {
    setFailedCovers((current) => {
      const next = new Set(current);
      next.add(projectId);
      return next;
    });
  };

  return (
    <>
      <section
        className="projects-apple page-section"
        aria-labelledby="projects-title"
      >
        <div className="site-wrap">
          <div className="projects-apple__intro-grid">
            <Reveal className="projects-apple__intro-main">
              <article className="apple-card projects-apple__intro-card">
                <div>
                  <p className="card-eyebrow">
                    DİJİTAL PROJELER
                  </p>

                  <h2
                    id="projects-title"
                    className="projects-apple__title"
                  >
                    İhtiyacı anlamak,
                    <span>çalışan ürün çıkarmak.</span>
                  </h2>
                </div>

                <p className="projects-apple__intro-copy">
                  Bir talebi kullanılabilir sayfalara,
                  yönetilebilir içerik yapılarına ve çalışan
                  otomasyon akışlarına dönüştürdüğüm seçili
                  projeler.
                </p>
              </article>
            </Reveal>

            <Reveal
              delay={0.08}
              className="projects-apple__intro-side"
            >
              <aside className="apple-card apple-card--dark projects-apple__stat-card">
                <div>
                  <p className="card-eyebrow">
                    SEÇİLİ ÇALIŞMALAR
                  </p>

                  <p className="projects-apple__stat-number">
                    {String(projects.length).padStart(2, "0")}
                  </p>
                </div>

                <p className="projects-apple__stat-copy">
                  Web siteleri, yönetim panelleri ve veri
                  otomasyonu. Her projede ihtiyaç analizi,
                  test, yayın ve bakım sorumluluğu.
                </p>
              </aside>
            </Reveal>
          </div>

          <div className="projects-apple__grid">
            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                delay={index * 0.07}
                className={[
                  "projects-apple__item",
                  index === 0
                    ? "projects-apple__item--featured"
                    : "",
                  index === projects.length - 1
                    ? "projects-apple__item--wide"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <ProjectCard
                  project={project}
                  featured={index === 0}
                  wide={index === projects.length - 1}
                  imageFailed={failedCovers.has(project.id)}
                  onImageError={() =>
                    markCoverAsFailed(project.id)
                  }
                  onOpen={() =>
                    setSelectedProject(project)
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>

        <style jsx>{`
          .projects-apple {
            overflow: clip;
          }

          .projects-apple__intro-grid {
            display: grid;
            grid-template-columns:
              minmax(0, 1.4fr)
              minmax(280px, 0.6fr);
            gap: var(--grid-gap);
            align-items: stretch;
          }

          :global(.projects-apple__intro-main),
          :global(.projects-apple__intro-side) {
            min-width: 0;
            height: 100%;
          }

          .projects-apple__intro-card,
          .projects-apple__stat-card {
            min-height: 440px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 3rem;
          }

          .projects-apple__title {
            max-width: 12ch;
            margin-top: 1rem;
            color: var(--ink);
            font-size: var(--f-section);
            font-weight: 850;
            letter-spacing: -0.062em;
            line-height: 0.95;
            text-wrap: balance;
          }

          .projects-apple__title span {
            display: block;
            color: var(--ink-3);
          }

          .projects-apple__intro-copy {
            max-width: 55ch;
            color: var(--ink-2);
            font-size: var(--f-body);
            line-height: 1.7;
          }

          .projects-apple__stat-number {
            margin-top: 0.7rem;
            color: white;
            font-size: clamp(5rem, 9vw, 8.5rem);
            font-weight: 850;
            letter-spacing: -0.08em;
            line-height: 0.82;
          }

          .projects-apple__stat-copy {
            max-width: 33ch;
            color: var(--ink-inverse-2);
            font-size: 0.95rem;
            line-height: 1.68;
          }

          .projects-apple__grid {
            display: grid;
            grid-template-columns: repeat(
              12,
              minmax(0, 1fr)
            );
            gap: var(--grid-gap);
            margin-top: var(--grid-gap);
          }

          :global(.projects-apple__item) {
            min-width: 0;
            grid-column: span 5;
          }

          :global(.projects-apple__item--featured) {
            grid-column: span 7;
          }

          :global(.projects-apple__item--wide) {
            grid-column: 1 / -1;
          }

          @media (max-width: 980px) {
            .projects-apple__intro-grid {
              grid-template-columns: 1fr;
            }

            .projects-apple__intro-card,
            .projects-apple__stat-card {
              min-height: 400px;
            }

            :global(.projects-apple__item),
            :global(.projects-apple__item--featured) {
              grid-column: span 6;
            }

            :global(.projects-apple__item--wide) {
              grid-column: 1 / -1;
            }
          }

          @media (max-width: 720px) {
            .projects-apple__intro-card,
            .projects-apple__stat-card {
              min-height: 390px;
            }

            .projects-apple__grid {
              grid-template-columns: 1fr;
            }

            :global(.projects-apple__item),
            :global(.projects-apple__item--featured),
            :global(.projects-apple__item--wide) {
              grid-column: 1;
            }
          }

          /* Yerleşim dengesi */
          .projects-apple__intro-card,
          .projects-apple__stat-card {
            min-height: 360px;
            display: grid;
            grid-template-rows: auto auto;
            align-content: space-between;
            gap: var(--content-gap-xl);
          }

          .projects-apple__title {
            max-width: 13ch;
            line-height: 1;
          }

          .projects-apple__title span {
            margin-top: 0.08em;
          }

          .projects-apple__intro-copy {
            max-width: 60ch;
            font-size: var(--f-body);
            line-height: 1.68;
          }

          .projects-apple__stat-number {
            margin-top: 0.8rem;
            line-height: 0.86;
          }

          .projects-apple__stat-copy {
            max-width: 36ch;
            font-size: var(--f-body);
            line-height: 1.68;
          }

          .projects-apple__grid {
            align-items: stretch;
          }

          :global(.projects-apple__item) {
            height: 100%;
          }

          @media (max-width: 980px) {
            .projects-apple__intro-card,
            .projects-apple__stat-card {
              min-height: 390px;
            }
          }

          @media (max-width: 720px) {
            .projects-apple__intro-card,
            .projects-apple__stat-card {
              min-height: auto;
            }
          }

          /* Masaüstü yerleşim sistemi */
          @media (min-width: 1025px) {
            .projects-apple__intro-grid {
              grid-template-columns:
                minmax(0, 1.28fr)
                minmax(340px, 0.72fr);
            }

            .projects-apple__intro-card,
            .projects-apple__stat-card {
              min-height: 380px;
              grid-template-rows: auto auto;
              align-content: space-between;
              gap: 1.9rem;
            }

            .projects-apple__title {
              max-width: 14ch;
              line-height: 1;
            }

            .projects-apple__intro-copy {
              max-width: 62ch;
              font-size: var(--f-body);
              line-height: 1.68;
            }

            .projects-apple__stat-number {
              margin-top: 0.75rem;
              line-height: 0.86;
            }

            .projects-apple__stat-copy {
              max-width: 34ch;
              font-size: var(--f-body);
              line-height: 1.68;
            }

            .projects-apple__grid {
              gap: var(--grid-gap);
              align-items: stretch;
            }

            :global(.projects-apple__item) {
              height: 100%;
            }
          }




        `}</style>
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

function ProjectCard({
  project,
  featured,
  wide,
  imageFailed,
  onImageError,
  onOpen,
}: {
  project: Project;
  featured: boolean;
  wide: boolean;
  imageFailed: boolean;
  onImageError: () => void;
  onOpen: () => void;
}) {
  const cover = project.images[0];
  const hasCover = Boolean(cover?.src) && !imageFailed;

  return (
    <button
      type="button"
      className={[
        "apple-card",
        "apple-card--interactive",
        "project-card",
        featured ? "project-card--featured" : "",
        wide ? "project-card--wide" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onOpen}
      aria-label={`${project.title} projesini incele`}
    >
      <div className="project-card__media">
        {hasCover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={
              wide
                ? "(max-width: 720px) 100vw, 88vw"
                : "(max-width: 720px) 100vw, 52vw"
            }
            className="project-card__image"
            onError={onImageError}
          />
        ) : (
          <div className="project-card__fallback">
            <ImageIcon
              size={28}
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <span>Proje görseli eklenecek</span>
          </div>
        )}

        <span className="project-card__number">
          {project.number}
        </span>
      </div>

      <div className="project-card__content">
        <div>
          <div className="project-card__categories">
            {project.category
              .split(" · ")
              .slice(0, 3)
              .map((category) => (
                <span key={category}>{category}</span>
              ))}
          </div>

          <h3 className="project-card__title">
            {project.title}
          </h3>

          <p className="project-card__copy">
            {project.shortDescription}
          </p>
        </div>

        <span className="project-card__action">
          Projeyi incele
          <ArrowUpRight
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>
      </div>

      <style jsx>{`
        .project-card {
          width: 100%;
          height: 100%;
          min-height: 600px;
          display: grid;
          grid-template-rows: minmax(290px, 1.1fr) auto;
          padding: 0;
          text-align: left;
          cursor: pointer;
        }

        .project-card--featured {
          min-height: 670px;
        }

        .project-card--wide {
          min-height: 510px;
          grid-template-columns: minmax(0, 1.15fr) minmax(
              320px,
              0.85fr
            );
          grid-template-rows: 1fr;
        }

        .project-card__media {
          position: relative;
          min-height: 0;
          overflow: hidden;
          margin: 0.62rem 0.62rem 0;
          border-radius: calc(var(--radius-lg) - 8px);
          background:
            linear-gradient(
              145deg,
              #eeeeF1,
              #e3e3e7
            );
        }

        .project-card__image {
          object-fit: cover;
          object-position: top center;
          transition: transform 0.7s var(--ease);
        }

        .project-card:hover .project-card__image {
          transform: scale(1.025);
        }

        .project-card__fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          color: var(--ink-3);
          font-size: 0.75rem;
          font-weight: 650;
        }

        .project-card__number {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
          min-width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.72);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: var(--ink);
          box-shadow: var(--shadow-xs);
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .project-card__content {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2rem;
          padding: clamp(1.45rem, 2.6vw, 2.25rem);
        }

        .project-card__categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.42rem;
        }

        .project-card__categories span {
          display: inline-flex;
          padding: 0.38rem 0.62rem;
          border-radius: 999px;
          background: var(--surface-2);
          color: var(--ink-3);
          font-size: 0.6rem;
          font-weight: 740;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .project-card__title {
          max-width: 18ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: clamp(1.65rem, 2.8vw, 2.85rem);
          font-weight: 820;
          letter-spacing: -0.052em;
          line-height: 1.02;
          text-wrap: balance;
        }

        .project-card__copy {
          max-width: 58ch;
          margin-top: 0.9rem;
          color: var(--ink-2);
          font-size: 0.9rem;
          line-height: 1.65;
        }

        .project-card__action {
          display: inline-flex;
          align-items: center;
          gap: 0.48rem;
          color: var(--ink);
          font-size: 0.75rem;
          font-weight: 740;
        }

        .project-card__action :global(svg) {
          transition: transform 0.3s var(--ease);
        }

        .project-card:hover
          .project-card__action
          :global(svg) {
          transform: translate(3px, -3px);
        }

        @media (max-width: 980px) {
          .project-card,
          .project-card--featured {
            min-height: 600px;
          }

          .project-card--wide {
            min-height: 500px;
          }
        }

        @media (max-width: 720px) {
          .project-card,
          .project-card--featured,
          .project-card--wide {
            min-height: 560px;
            grid-template-columns: 1fr;
            grid-template-rows: minmax(260px, 1fr) auto;
          }

          .project-card__media {
            min-height: 270px;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .project-card:hover .project-card__image {
            transform: none;
          }

          .project-card:hover
            .project-card__action
            :global(svg) {
            transform: none;
          }
        }

        /* Proje kartı yerleşim dengesi */
        .project-card {
          min-height: 520px;
          grid-template-rows: minmax(285px, 1fr) auto;
        }

        .project-card--featured {
          min-height: 560px;
        }

        .project-card--wide {
          min-height: 430px;
          grid-template-columns:
            minmax(0, 1.12fr)
            minmax(320px, 0.88fr);
        }

        .project-card__content {
          display: grid;
          grid-template-rows: auto auto;
          align-content: space-between;
          gap: var(--content-gap-lg);
          padding: clamp(1.35rem, 2vw, 1.9rem);
        }

        .project-card__title {
          max-width: 20ch;
          margin-top: 0.8rem;
          line-height: 1.05;
        }

        .project-card__copy {
          max-width: 62ch;
          margin-top: 0.85rem;
          font-size: var(--f-body);
          line-height: 1.66;
        }

        .project-card__action {
          min-height: 24px;
          align-self: end;
        }

        @media (max-width: 980px) {
          .project-card,
          .project-card--featured {
            min-height: 500px;
          }

          .project-card--wide {
            min-height: 420px;
          }
        }

        @media (max-width: 720px) {
          .project-card,
          .project-card--featured,
          .project-card--wide {
            min-height: auto;
            grid-template-rows: minmax(260px, 54vw) auto;
          }

          .project-card__content {
            gap: var(--content-gap-lg);
          }
        }

        /* Mobil düzeltme:
           Tam genişlikteki son proje kartı masaüstü iki kolon
           tanımını mobilde taşımamalı. */
        @media (max-width: 720px) {
          .project-card,
          .project-card--featured,
          .project-card--wide {
            width: 100%;
            min-width: 0;
            grid-template-columns: minmax(0, 1fr);
            grid-template-rows: minmax(250px, 68vw) auto;
            overflow: hidden;
          }

          .project-card--wide {
            min-height: auto;
          }

          .project-card__media,
          .project-card__content,
          .project-card__content > div {
            width: auto;
            min-width: 0;
          }

          .project-card__media {
            min-height: 250px;
            margin: 0.5rem 0.5rem 0;
          }

          .project-card__content {
            grid-template-rows: auto auto;
            gap: 1.4rem;
            padding: 1.3rem;
          }

          .project-card__categories {
            width: 100%;
            gap: 0.35rem;
          }

          .project-card__categories span {
            max-width: 100%;
            padding: 0.34rem 0.55rem;
            overflow-wrap: anywhere;
            white-space: normal;
          }

          .project-card__title {
            max-width: none;
            font-size: clamp(1.65rem, 8vw, 2.25rem);
            line-height: 1.08;
            overflow-wrap: anywhere;
          }

          .project-card__copy {
            max-width: none;
            line-height: 1.66;
            overflow-wrap: anywhere;
          }

          .project-card__action {
            width: fit-content;
            align-self: start;
          }
        }

        /* Masaüstü proje kartı sistemi */
        @media (min-width: 1025px) {
          .project-card {
            min-height: 540px;
            grid-template-rows: minmax(300px, 1fr) auto;
          }

          .project-card--featured {
            min-height: 580px;
          }

          .project-card--wide {
            min-height: 450px;
            grid-template-columns:
              minmax(0, 1.12fr)
              minmax(360px, 0.88fr);
            grid-template-rows: 1fr;
          }

          .project-card__media {
            margin: 0.7rem 0.7rem 0;
            border-radius: calc(var(--radius-lg) - 9px);
          }

          .project-card--wide .project-card__media {
            margin: 0.7rem 0 0.7rem 0.7rem;
          }

          .project-card__content {
            grid-template-rows: auto auto;
            align-content: space-between;
            gap: 1.45rem;
            padding: 1.75rem;
          }

          .project-card--wide .project-card__content {
            padding: 1.95rem 2.1rem;
          }

          .project-card__categories {
            gap: 0.4rem;
          }

          .project-card__title {
            max-width: 20ch;
            margin-top: 0.9rem;
            line-height: 1.06;
          }

          .project-card--featured .project-card__title {
            max-width: 22ch;
          }

          .project-card--wide .project-card__title {
            max-width: 18ch;
          }

          .project-card__copy {
            max-width: 60ch;
            margin-top: 0.85rem;
            font-size: var(--f-body);
            line-height: 1.66;
          }

          .project-card__action {
            align-self: end;
            min-height: 24px;
          }
        }






      `}</style>
    </button>
  );
}
