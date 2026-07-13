"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, aiApproachText, type Project } from "@/src/content/projects";
import ProjectModal from "@/components/projects/ProjectModal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectsScene() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section
        aria-label="Dijital projeler"
        className="section-shell projects-shell"
        style={{ background: "transparent" }}
      >
        <div
          className="site-wrap max-lg:block!"
          style={{
            paddingTop: "clamp(6rem, 14vw, 12rem)",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.9fr)",
            gap: "clamp(1.5rem, 4vw, 4rem)",
            alignItems: "start",
          }}
        >
          {/* Başlık */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease }}
            className="section-intro"
          >
            <p className="t-label" style={{ marginBottom: "1.5rem" }}>Dijital Projeler</p>
            <div className="clip">
              <motion.h2
                className="t-section"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.08 }}
                style={{ maxWidth: "14ch" }}
              >
                İhtiyacı anlamak,<br />
                <span style={{ color: "var(--ink-3)" }}>çalışan ürün çıkarmak.</span>
              </motion.h2>
            </div>
          </motion.div>

          {/* AI Yaklaşım metni */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            style={{
              marginTop: "clamp(6rem, 9vw, 9rem)",
              maxWidth: "56ch",
            }}
            className="scene-panel"
          >
            <div style={{ padding: "clamp(1.4rem, 2.6vw, 2rem)" }}>
              {aiApproachText.paragraphs.map((p, i) => (
              <p
                key={i}
                className="t-body"
                style={{ marginBottom: i < aiApproachText.paragraphs.length - 1 ? "1rem" : 0 }}
              >
                {p}
              </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Proje satırları */}
        <div
          style={{
            paddingBottom: "clamp(5rem, 12vw, 10rem)",
            marginTop: "clamp(4rem, 9vw, 8rem)",
          }}
        >
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            isOpen={selected !== null}
            onClose={() => setSelected(null)}
            project={selected}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectRow({
  project, index, total, onClick,
}: { project: Project; index: number; total: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        borderTop: "1px solid var(--rule)",
        borderBottom: index === total - 1 ? "1px solid var(--rule)" : "none",
      }}
    >
      <div className="site-wrap">
        <motion.button
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="project-row-shell"
          style={{
            display: "block",
            width: "100%",
            maxWidth: index % 3 === 0 ? "min(100%, 88rem)" : index % 3 === 1 ? "min(100%, 82rem)" : "min(100%, 86rem)",
            marginLeft: index % 3 === 0 ? "clamp(0rem, 7vw, 6rem)" : index % 3 === 1 ? "auto" : "clamp(0rem, 3vw, 2rem)",
            textAlign: "left",
            paddingTop: "clamp(2rem, 4.5vw, 4rem)",
            paddingBottom: "clamp(2rem, 4.5vw, 4rem)",
            paddingInline: "clamp(1.25rem, 2.5vw, 2rem)",
            cursor: "pointer",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease, delay: 0.05 * index }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "clamp(1.5rem, 4vw, 4rem)",
              alignItems: "center",
            }}
            className="max-sm:block!"
          >
            {/* Numara */}
            <span
              className="t-label"
              style={{
                color: hovered ? "var(--amber)" : "var(--ink-3)",
                transition: "color 0.3s",
              }}
            >
              {project.number}
            </span>

            {/* Başlık + meta */}
            <div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 3rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.08,
                  color: "var(--ink)",
                  transform: hovered ? "translateX(10px)" : "translateX(0)",
                  transition: "transform 0.5s var(--ease)",
                  marginBottom: "0.5rem",
                }}
              >
                {project.title}
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                <span className="t-label" style={{ color: "var(--amber)" }}>
                  {project.category.split(" · ")[0]}
                </span>
                <span className="t-small" style={{ color: "var(--ink-3)" }}>·</span>
                <span className="t-small">{project.shortDescription}</span>
              </div>
            </div>

            {/* Ok */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: hovered ? "var(--ink)" : "var(--ink-3)",
                transition: "color 0.3s",
              }}
            >
              <ArrowUpRight
                size={20}
                style={{
                  transform: hovered ? "translate(4px,-4px)" : "translate(0,0)",
                  transition: "transform 0.4s var(--ease)",
                }}
              />
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
