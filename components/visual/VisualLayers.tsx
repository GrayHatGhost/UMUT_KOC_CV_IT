// Film grain + vignette + ambient light görsel katmanları
// PROMPT.md §8

export default function VisualLayers() {
  return (
    <>
      <div className="ambient-orb ambient-orb--one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--two" aria-hidden="true" />
      <div className="ambient-orb ambient-orb--three" aria-hidden="true" />

      {/* Film grain */}
      <div className="grain-layer" aria-hidden="true" />

      {/* Vignette */}
      <div className="vignette-layer" aria-hidden="true" />

      {/* Ambient ışık — üstten geniş yumuşak radial gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-[98]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
