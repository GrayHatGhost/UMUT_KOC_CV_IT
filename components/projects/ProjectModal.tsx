"use client";

import { type Project } from "@/src/content/projects";
import Dialog from "@/components/dialog/Dialog";

type Props = { project: Project | null; isOpen: boolean; onClose: () => void };

export default function ProjectModal({ project, isOpen, onClose }: Props) {
  if (!project) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} ariaLabel={project.title} size="wide">
      <div style={{ padding: "clamp(2rem, 5vw, 4rem)" }}>
        {/* Üst bilgi */}
        <div style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
          <p className="t-label" style={{ marginBottom: "1rem" }}>
            PROJE {project.number} · {project.category}
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "#0C0C0C",
              maxWidth: "22ch",
            }}
          >
            {project.title}
          </h2>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm font-medium transition-opacity hover:opacity-60"
              style={{ color: "#0C0C0C", textDecoration: "underline", textUnderlineOffset: "4px" }}
            >
              Canlı siteyi aç ↗
            </a>
          )}
        </div>

        {/* İçerik grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr minmax(260px, 320px)",
            gap: "clamp(2rem, 6vw, 6rem)",
          }}
          className="max-lg:grid-cols-1!"
        >
          {/* Sol: özet */}
          <div>
            <h3 className="t-label mb-5">PROJE ÖZETİ</h3>
            <div className="space-y-4" style={{ marginBottom: "2.5rem" }}>
              {project.summary.map((p, i) => (
                <p key={i} style={{ fontSize: "0.9375rem", color: "#6B6B6B", lineHeight: 1.75 }}>{p}</p>
              ))}
            </div>

            {/* Görseller */}
            <div style={{ borderTop: "1px solid #E8E5E0", paddingTop: "2rem" }}>
              <h3 className="t-label mb-5">EKRAN GÖRÜNTÜLERİ</h3>
              <div className="space-y-4">
                {project.images.map((img, i) => (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      aspectRatio: "16/9",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#F0EDE8",
                      border: "1px solid #E8E5E0",
                    }}
                  >
                    {img.src ? (
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span style={{ fontSize: "0.6875rem", color: "#C8C4BC", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          Proje ekran görüntüsü eklenecek
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "#B0B0B0" }}>{project.title}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ: meta */}
          <aside className="space-y-8">
            {[
              { label: "ROLÜM VE SÜREÇ", items: project.role },
              { label: "ÖZELLİKLER", items: project.features },
              { label: "ÇIKARIMLAR", items: project.learnings },
            ].map(({ label, items }) => (
              <div key={label} style={{ borderTop: "1px solid #E8E5E0", paddingTop: "1.5rem" }}>
                <h3 className="t-label mb-4">{label}</h3>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li
                      key={i}
                      style={{ fontSize: "0.875rem", color: "#6B6B6B", lineHeight: 1.6, display: "flex", gap: "0.75rem" }}
                    >
                      <span style={{ color: "#C8C4BC", flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </Dialog>
  );
}
