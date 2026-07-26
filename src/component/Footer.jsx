export default function Footer({ scrollTo, t }) {
  return (
    <footer
      style={{ background: t.footerBg, borderTop: `1px solid ${t.border}` }}
    >
      <div
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          padding: "48px 36px 36px",
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gap: 48,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <img
              src="/assets/Logo.png"
              alt="Logo"
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                objectFit: "cover",
                border: `1px solid ${t.borderStrong}`,
              }}
            />
            <div>
              <div
                className="serif"
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: t.text,
                  lineHeight: 1.1,
                }}
              >
                Soto Ayam
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: t.textDim,
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                Masakan Khas Pacitan
              </div>
            </div>
          </div>
          <p
            style={{
              fontSize: 12,
              color: t.textMuted,
              lineHeight: 1.8,
              maxWidth: 260,
            }}
          >
            Menyajikan cita rasa otentik masakan khas Pacitan dengan bahan segar
            pilihan dan bumbu rempah turun-temurun.
          </p>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: t.accent,
              textTransform: "uppercase",
              letterSpacing: ".12em",
              marginBottom: 16,
            }}
          >
            Navigasi
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Beranda", id: "home" },
              { label: "Tentang Kami", id: "tentang" },
              { label: "Menu", id: "menu" },
              { label: "Kontak", id: "kontak" },
            ].map((nav) => (
              <span
                key={nav.id}
                onClick={() => scrollTo(nav.id)}
                style={{ fontSize: 13, color: t.textMuted, cursor: "pointer" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = t.accentSoft)
                }
                onMouseOut={(e) => (e.currentTarget.style.color = t.textMuted)}
              >
                {nav.label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: t.accent,
              textTransform: "uppercase",
              letterSpacing: ".12em",
              marginBottom: 16,
            }}
          >
            Informasi
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "📍", text: "Jl. Hercules Blok J No.6, Kota Madiun" },
              { icon: "🕕", text: "Buka Setiap Hari | 06.00 WIB – Habis" },
              { icon: "⭐", text: "Rating 5.0 | Sejak 2025" },
            ].map((info) => (
              <div
                key={info.text}
                style={{ display: "flex", gap: 9, alignItems: "flex-start" }}
              >
                <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>
                  {info.icon}
                </span>
                <span
                  style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.6 }}
                >
                  {info.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${t.divider}`,
          padding: "16px 36px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 11, color: t.textDim }}>
          © 2025 RM. Soto Ayam Kampung Khas Pacitan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
