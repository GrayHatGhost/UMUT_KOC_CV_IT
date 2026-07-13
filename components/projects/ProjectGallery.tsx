"use client";

import Image from "next/image";
import { type ProjectImage } from "@/src/content/projects";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6">
      {images.map((img, index) => (
        <figure key={index} className="m-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10">
            {/* Gerçek bir projede unoptimized yerine doğru Next.js imaj ayarları kullanılabilir. Burada demo için img tag'i de kullanabiliriz, ama Next Image daha iyi. */}
            {/* Resimler yoksa fallback göstersin diye object-cover vs */}
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white/20 text-sm">
                Görsel bulunamadı
              </div>
            )}
          </div>
          {img.caption && (
            <figcaption className="mt-3 text-center text-xs text-white/40">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
