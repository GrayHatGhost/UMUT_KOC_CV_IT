"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import SiteHeader from "@/components/layout/SiteHeader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ContactScene from "@/components/scenes/ContactScene";
import DesignArchiveScene from "@/components/scenes/DesignArchiveScene";
import GrowthScene from "@/components/scenes/GrowthScene";
import HeroScene from "@/components/scenes/HeroScene";
import ProjectsScene from "@/components/scenes/ProjectsScene";
import StoryScene from "@/components/scenes/StoryScene";
import VisualLayers from "@/components/visual/VisualLayers";

const CvModal = dynamic(
  () => import("@/components/cv/CvModal"),
  {
    ssr: false,
    loading: () => null,
  },
);

const SECTIONS = [
  "giris",
  "hikayem",
  "gelisim",
  "projeler",
  "tasarim",
  "iletisim",
] as const;

type SectionId = (typeof SECTIONS)[number];

function isSectionId(value: string): value is SectionId {
  return SECTIONS.includes(value as SectionId);
}

export default function Home() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [activeSection, setActiveSection] =
    useState<SectionId>("giris");

  const openCv = useCallback(() => {
    setIsCvOpen(true);
  }, []);

  const closeCv = useCallback(() => {
    setIsCvOpen(false);
  }, []);

  useEffect(() => {
    const sectionElements = SECTIONS.map((id) => ({
      id,
      element: document.getElementById(id),
    })).filter(
      (
        item,
      ): item is {
        id: SectionId;
        element: HTMLElement;
      } => item.element !== null,
    );

    if (sectionElements.length === 0) return;

    const hashSection = window.location.hash.replace("#", "");

    if (isSectionId(hashSection)) {
      setActiveSection(hashSection);
    }

    const visibilityRatios = new Map<SectionId, number>(
      SECTIONS.map((id) => [id, 0]),
    );

    const selectActiveSection = () => {
      const viewportFocusPoint = window.innerHeight * 0.42;

      const candidates = sectionElements
        .map(({ id, element }) => {
          const rect = element.getBoundingClientRect();
          const visibleRatio = visibilityRatios.get(id) ?? 0;

          const sectionFocusPoint =
            rect.top + Math.min(rect.height * 0.38, 320);

          return {
            id,
            visibleRatio,
            distance: Math.abs(
              sectionFocusPoint - viewportFocusPoint,
            ),
          };
        })
        .filter(
          ({ visibleRatio }) => visibleRatio > 0,
        )
        .sort((a, b) => {
          const ratioDifference =
            b.visibleRatio - a.visibleRatio;

          if (Math.abs(ratioDifference) > 0.08) {
            return ratioDifference;
          }

          return a.distance - b.distance;
        });

      const nextSection = candidates[0]?.id;

      if (!nextSection) return;

      setActiveSection((currentSection) =>
        currentSection === nextSection
          ? currentSection
          : nextSection,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement)
            .id as SectionId;

          if (!isSectionId(id)) return;

          visibilityRatios.set(
            id,
            entry.isIntersecting
              ? entry.intersectionRatio
              : 0,
          );
        });

        selectActiveSection();
      },
      {
        rootMargin: "-18% 0px -48% 0px",
        threshold: [
          0,
          0.08,
          0.16,
          0.28,
          0.42,
          0.6,
        ],
      },
    );

    sectionElements.forEach(({ element }) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <VisualLayers />
      <ScrollProgress />

      <SiteHeader
        activeSection={activeSection}
        onOpenCV={openCv}
      />

      <main className="page-shell">
        <div
          id="giris"
          className="page-section-anchor page-section-anchor--hero"
          data-section="giris"
        >
          <HeroScene onOpenCV={openCv} />
        </div>

        <div
          id="hikayem"
          className="page-section-anchor"
          data-section="hikayem"
        >
          <StoryScene />
        </div>

        <div
          id="gelisim"
          className="page-section-anchor"
          data-section="gelisim"
        >
          <GrowthScene />
        </div>

        <div
          id="projeler"
          className="page-section-anchor"
          data-section="projeler"
        >
          <ProjectsScene />
        </div>

        <div
          id="tasarim"
          className="page-section-anchor"
          data-section="tasarim"
        >
          <DesignArchiveScene />
        </div>

        <div
          id="iletisim"
          className="page-section-anchor"
          data-section="iletisim"
        >
          <ContactScene />
        </div>
      </main>

      {isCvOpen && (
        <CvModal
          isOpen={isCvOpen}
          onClose={closeCv}
        />
      )}

      <style jsx global>{`
        .page-section-anchor {
          position: relative;
          z-index: 1;
          opacity: 1;
          filter: none;
          transform: none;
        }

        .page-section-anchor--hero {
          min-height: 100svh;
        }
      `}</style>
    </>
  );
}
