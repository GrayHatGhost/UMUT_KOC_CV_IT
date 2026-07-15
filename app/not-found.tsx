import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="page-shell"
      style={{
        minHeight: "100svh",
        display: "grid",
        alignItems: "center",
        paddingBlock: "clamp(7rem, 14vw, 11rem)",
      }}
    >
      <section
        className="site-wrap"
        aria-labelledby="not-found-title"
      >
        <article
          className="apple-card"
          style={{
            minHeight: "min(620px, 72svh)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "3rem",
          }}
        >
          <div>
            <p className="card-eyebrow">404 · SAYFA BULUNAMADI</p>

            <h1
              id="not-found-title"
              style={{
                maxWidth: "10ch",
                marginTop: "1rem",
                color: "var(--ink)",
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                fontWeight: 860,
                letterSpacing: "-0.075em",
                lineHeight: 0.88,
                textWrap: "balance",
              }}
            >
              Aradığın sayfa burada değil.
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.25rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--rule)",
            }}
          >
            <p
              style={{
                maxWidth: "52ch",
                color: "var(--ink-2)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              Bağlantı değişmiş, içerik taşınmış veya adres
              hatalı yazılmış olabilir.
            </p>

            <Link href="/" className="btn-dark">
              Ana sayfaya dön
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
