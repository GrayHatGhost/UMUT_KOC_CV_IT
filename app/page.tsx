"use client";

import { useState, useEffect, useCallback } from "react";
import HeroScene from "@/components/scenes/HeroScene";
import StoryScene from "@/components/scenes/StoryScene";
import GrowthScene from "@/components/scenes/GrowthScene";
import ProjectsScene from "@/components/scenes/ProjectsScene";
import DesignArchiveScene from "@/components/scenes/DesignArchiveScene";
import ContactScene from "@/components/scenes/ContactScene";
import SiteHeader from "@/components/layout/SiteHeader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CvModal from "@/components/cv/CvModal";
import VisualLayers from "@/components/visual/VisualLayers";

const SECTIONS = ["giris", "hikayem", "gelisim", "projeler", "tasarim", "iletisim"] as const;
type SectionId = typeof SECTIONS[number];

export default function Home() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("giris");

  // Intersection Observer — aktif sahneyi belirler
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Ekranın ortasına geldiğinde aktiflenir
          rootMargin: "-35% 0px -35% 0px",
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Sahne sınıfını hesapla
  const getSceneClass = useCallback(
    (id: SectionId) => {
      const activeIdx = SECTIONS.indexOf(activeSection);
      const thisIdx = SECTIONS.indexOf(id);
      if (thisIdx < activeIdx) return "scene scene-behind";
      if (thisIdx === activeIdx) return "scene scene-active";
      return "scene scene-ahead";
    },
    [activeSection]
  );

  return (
    <>
      <VisualLayers />
      <ScrollProgress />
      <SiteHeader activeSection={activeSection} onOpenCV={() => setIsCvOpen(true)} />

      <main className="page-shell">
        <div id="giris" className={getSceneClass("giris")}>
          <HeroScene onOpenCV={() => setIsCvOpen(true)} />
        </div>
        <div id="hikayem" className={getSceneClass("hikayem")}>
          <StoryScene />
        </div>
        <div id="gelisim" className={getSceneClass("gelisim")}>
          <GrowthScene />
        </div>
        <div id="projeler" className={getSceneClass("projeler")}>
          <ProjectsScene />
        </div>
        <div id="tasarim" className={getSceneClass("tasarim")}>
          <DesignArchiveScene />
        </div>
        <div id="iletisim" className={getSceneClass("iletisim")}>
          <ContactScene />
        </div>
      </main>

      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </>
  );
}
