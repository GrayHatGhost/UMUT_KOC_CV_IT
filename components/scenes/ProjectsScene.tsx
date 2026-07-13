"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { projects, type Project } from "@/src/content/projects";

const ProjectModal = dynamic(
  () => import("@/components/projects/ProjectModal"),
  {
    ssr: false,
  },
);

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectsScene() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section
        aria-labelledby="projects-title"
        className="projects-shell"
        style={{
          position: "relative",
          paddingTop: "clamp(7rem, 13vw, 12rem)",
          paddingBottom: "clamp(7rem, 13vw, 12rem)",
        }}
      >
        <div className="site-wrap">
          <motion.header
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.72, ease }
            }
            className="section-intro"
            style={{
              marginBottom: "clamp(4rem, 9vw, 8rem)",
            }}
          >
            <p
              className="t-label"
              style={{
                marginBottom: "1.4rem",
              }}
            >
              DİJİTAL PROJELER
            </p>

            <h2
              id="projects-title"
              className="t-section"
              style={{
                maxWidth: "15ch",
              }}
            >
              İhtiyacı anlamak,
              <span
                style={{
                  display: "block",
                  color: "var(--ink-3)",
                }}
              >
                çalışan ürün çıkarmak.
              </span>
            </h2>

            <p
              className="t-body"
              style={{
                maxWidth: "55ch",
                marginTop: "1.6rem",
                fontSize: "clamp(1.05rem, 1.5vw, 1.22rem)",
              }}
            >
              İhtiyaç analizi, yapı planlama, test, yayın ve bakım
              süreçlerini üstlendiğim seçili dijital çalışmalar.
            </p>
          </motion.header>

          <div
            className="project-list"
            style={{
              borderBottom: "1px solid var(--rule)",
            }}
          >
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setSelectedProject(project)}
                shouldReduceMotion={Boolean(shouldReduceMotion)}
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          .project-list {
            width: 100%;
          }

          @media (max-width: 767px) {
            .project-list {
              border-bottom: 0 !important;
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

function ProjectRow({
  project,
  index,
  onOpen,
  shouldReduceMotion,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${project.title} proje detaylarını aç`}
      className="project-editorial-row"
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 22 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.66,
              delay: index * 0.06,
              ease,
            }
      }
    >
      <span className="project-editorial-row__number">
        {project.number}
      </span>

      <span className="project-editorial-row__content">
        <span className="project-editorial-row__category">
          {project.category}
        </span>

        <span className="project-editorial-row__title">
          {project.title}
        </span>

        <span className="project-editorial-row__description">
          {project.shortDescription}
        </span>
      </span>

      <span
        className="project-editorial-row__action"
        aria-hidden="true"
      >
        <span>Projeyi incele</span>
        <ArrowUpRight size={20} />
      </span>

      <style jsx>{`
        .project-editorial-row {
          width: 100%;
          display: grid;
          grid-template-columns: 4rem minmax(0, 1fr) auto;
          gap: clamp(1.5rem, 4vw, 4rem);
          align-items: start;
          padding-top: clamp(2.5rem, 5vw, 4.5rem);
          padding-bottom: clamp(2.5rem, 5vw, 4.5rem);
          border-top: 1px solid var(--rule);
          color: var(--ink);
          text-align: left;
          background: transparent;
          transition:
            background-color 0.3s var(--ease),
            padding-inline 0.3s var(--ease);
        }

        .project-editorial-row:hover,
        .project-editorial-row:focus-visible {
          padding-inline: clamp(0.75rem, 1.4vw, 1.25rem);
          background: rgba(255, 255, 255, 0.025);
        }

        .project-editorial-row__number {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.14em;
          line-height: 1.4;
          transition: color 0.3s var(--ease);
        }

        .project-editorial-row__content {
          display: grid;
          min-width: 0;
        }

        .project-editorial-row__category {
          margin-bottom: 1rem;
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.12em;
          line-height: 1.5;
          text-transform: uppercase;
        }

        .project-editorial-row__title {
          max-width: 24ch;
          color: var(--ink);
          font-family:
            var(--font-display), var(--font-geist), Georgia, serif;
          font-size: clamp(1.8rem, 3.3vw, 3.7rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.03;
          transition: transform 0.35s var(--ease);
        }

        .project-editorial-row__description {
          max-width: 68ch;
          margin-top: 1.25rem;
          color: var(--ink-3);
          font-size: 0.95rem;
          line-height: 1.75;
          transition: color 0.3s var(--ease);
        }

        .project-editorial-row__action {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          align-self: center;
          color: var(--ink-3);
          font-size: 0.8125rem;
          font-weight: 560;
          white-space: nowrap;
          transition:
            color 0.3s var(--ease),
            transform 0.3s var(--ease);
        }

        .project-editorial-row:hover
          .project-editorial-row__number,
        .project-editorial-row:focus-visible
          .project-editorial-row__number,
        .project-editorial-row:hover
          .project-editorial-row__description,
        .project-editorial-row:focus-visible
          .project-editorial-row__description,
        .project-editorial-row:hover
          .project-editorial-row__action,
        .project-editorial-row:focus-visible
          .project-editorial-row__action {
          color: var(--ink-2);
        }

        .project-editorial-row:hover
          .project-editorial-row__title,
        .project-editorial-row:focus-visible
          .project-editorial-row__title {
          transform: translateX(8px);
        }

        .project-editorial-row:hover
          .project-editorial-row__action,
        .project-editorial-row:focus-visible
          .project-editorial-row__action {
          transform: translate(4px, -4px);
        }

        @media (max-width: 767px) {
          .project-editorial-row {
            grid-template-columns: 2.25rem minmax(0, 1fr);
            gap: 1rem;
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
          }

          .project-editorial-row:hover,
          .project-editorial-row:focus-visible {
            padding-inline: 0;
            background: transparent;
          }

          .project-editorial-row__action {
            grid-column: 2;
            margin-top: 1.5rem;
            justify-self: start;
          }

          .project-editorial-row:hover
            .project-editorial-row__title,
          .project-editorial-row:focus-visible
            .project-editorial-row__title,
          .project-editorial-row:hover
            .project-editorial-row__action,
          .project-editorial-row:focus-visible
            .project-editorial-row__action {
            transform: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-editorial-row,
          .project-editorial-row__title,
          .project-editorial-row__action {
            transition: none;
          }
        }
      `}</style>
    </motion.button>
  );
}
