"use client";

import Dialog from "@/components/dialog/Dialog";
import { profile } from "@/src/content/profile";
import { Download, ExternalLink, Mail } from "lucide-react";

type CvModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} ariaLabel="Öz Geçmiş">
      <div style={{ padding: "clamp(2rem, 5vw, 4rem)" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p className="t-label mb-2">ÖZ GEÇMİŞ</p>
          <h2 className="t-section" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{profile.name}</h2>
          <p className="t-subtitle mt-2" style={{ color: "#6B6B6B" }}>{profile.role} · {profile.location}</p>
        </div>

        {/* Eylemler */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid #E8E5E0",
          }}
        >
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "#0C0C0C", color: "#F9F8F6" }}
          >
            <ExternalLink size={18} />
            CV&apos;yi yeni sekmede aç
          </a>
          <a
            href={profile.cvPath}
            download
            className="flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition-colors"
            style={{ border: "1px solid #E8E5E0", color: "#0C0C0C", background: "#FFFFFF" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C8C4BC")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E5E0")}
          >
            <Download size={18} />
            PDF olarak indir
          </a>
        </div>

        {/* İletişim */}
        <div>
          <h3 className="t-label mb-4">İLETİŞİM BİLGİLERİ</h3>
          <div className="space-y-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm transition-colors hover:opacity-60"
              style={{ color: "#0C0C0C", padding: "0.5rem 0" }}
            >
              <Mail size={16} style={{ color: "#B0B0B0" }} />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:opacity-60"
              style={{ color: "#0C0C0C", padding: "0.5rem 0" }}
            >
              <ExternalLink size={16} style={{ color: "#B0B0B0" }} />
              LinkedIn profili
            </a>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
