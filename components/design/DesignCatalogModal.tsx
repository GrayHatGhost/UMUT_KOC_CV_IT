"use client";

import { useState } from "react";
import { designWorks, type DesignWork } from "@/src/content/design-works";
import Dialog from "@/components/dialog/Dialog";
import DesignLightbox from "./DesignLightbox";

type DesignCatalogModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DesignCatalogModal({ isOpen, onClose }: DesignCatalogModalProps) {
  const [selectedWork, setSelectedWork] = useState<DesignWork | null>(null);

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        ariaLabel="Tasarım Arşivi Kataloğu"
        size="wide"
      >
        <div className="h-full flex flex-col bg-[#050505]">
          {/* Header */}
          <div className="sticky top-0 z-10 flex flex-col md:flex-row md:items-center justify-between p-6 md:p-10 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
            <div>
              <h2 className="text-2xl font-semibold text-white tracking-tight">Tasarım Arşivi</h2>
              <p className="text-sm text-white/40 mt-1">Görsel üretim ve kampanya tasarımları</p>
            </div>
            {/* Kapat butonu zaten Dialog içinde sağ üstte var */}
          </div>

          {/* Grid İçeriği */}
          <div className="flex-grow p-6 md:p-10 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1600px] mx-auto">
              {designWorks.map((work) => (
                <button
                  key={work.id}
                  onClick={() => setSelectedWork(work)}
                  className="group relative flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-xl"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white/5 border border-white/10 mb-4">
                    <img
                      src={work.thumbnail || work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="text-xs font-medium tracking-[0.15em] text-white/30 uppercase block mb-1">
                      {work.category}
                    </span>
                    <h3 className="text-lg font-medium text-white group-hover:text-white/80 transition-colors">
                      {work.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Dialog>

      <DesignLightbox
        work={selectedWork}
        onClose={() => setSelectedWork(null)}
      />
    </>
  );
}
