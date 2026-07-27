import { useEffect, useRef, useState } from "react";

export default function Tentang({ tentangRef, t }) {
  const [visible, setVisible] = useState(false);
  const localRef = useRef(null);

  useEffect(() => {
    const node = localRef.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay = 0, distance = 20) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  const stats = [
    { val: "Rp. 2.000", label: "Harga Mulai" },
    { val: "Setiap Hari", label: "Buka" },
    { val: "500+", label: "Porsi Terjual" },
  ];

  const keunggulan = [
    { icon: "🍽️", label: "Melayani Dine in dan Take Away" },
    { icon: "🌿", label: "Bahan Alami Tanpa Pengawet" },
    { icon: "🔥", label: "Dimasak Langsung" },
  ];

  return (
    <section
      ref={(node) => {
        localRef.current = node;
        if (tentangRef) tentangRef.current = node;
      }}
      id="tentang"
      style={{ padding: "90px 36px", background: t.bgAlt, overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div
          className="tentang-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: 64,
            alignItems: "stretch",
          }}
        >
          <div style={{ position: "relative", height: "100%" }}>
            <div
              style={{
                ...reveal(0, 32),
                borderRadius: 24,
                overflow: "hidden",
                border: `1px solid ${t.border}`,
                position: "relative",
                zIndex: 1,
                height: "100%",
                minHeight: 420,
              }}
            >
              <img
                src="/assets/foto.jpeg"
                alt="Rumah Makan Soto Ayam Kampung"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p className="eyebrow" style={{ color: t.accent, ...reveal(0.1) }}>
              Tentang Kami
            </p>

            <h2
              className="serif"
              style={{
                fontSize: "clamp(28px,3.4vw,44px)",
                fontWeight: 900,
                lineHeight: 1.08,
                color: t.text,
                marginBottom: 20,
                ...reveal(0.18),
              }}
            >
              Soto Ayam Kampung
              <br />
              <em style={{ color: t.accent, fontStyle: "italic" }}>
                Khas Pacitan
              </em>
            </h2>

            <p
              style={{
                fontSize: 14,
                color: t.textMuted,
                lineHeight: 1.9,
                marginBottom: 14,
                ...reveal(0.26),
              }}
            >
              Hadir sejak 2025 di Kota Madiun, Soto Ayam Kampungmembawa
              cita rasa bumbu khas Pacitan. Setiap hidangan dimasak
              langsung dari bahan segar tanpa pengawet, menjaga keaslian rasa
              yang sudah dikenal turun-temurun.
            </p>
            <p
              style={{
                fontSize: 14,
                color: t.textMuted,
                lineHeight: 1.9,
                marginBottom: 22,
                ...reveal(0.32),
              }}
            >
              Dengan harga yang sangat terjangkau dan porsi yang mengenyangkan,
              kami hadir untuk semua kalangan yang ingin menikmati masakan
              rumahan berkualitas.
            </p>

            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                marginBottom: 24,
                ...reveal(0.38),
              }}
            >
              {keunggulan.map((item) => (
                <div
                  key={item.label}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1 }}>
                    {item.icon}
                  </span>
                  <span
                    style={{ fontSize: 12.5, fontWeight: 600, color: t.text }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderLeft: `3px solid ${t.accent}`,
                paddingLeft: 16,
                marginBottom: 26,
                ...reveal(0.44),
              }}
            >
              <p
                style={{
                  fontSize: 13.5,
                  fontStyle: "italic",
                  color: t.textMuted,
                  lineHeight: 1.8,
                  marginBottom: 6,
                }}
              >
                "Resep ini saya pelajari langsung dari keluarga di Pacitan —
                setiap mangkuk soto yang kami sajikan dimasak dengan cara yang
                sama seperti dulu, tanpa jalan pintas."
              </p>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: t.text }}>
                — Pemilik Rumah Makan Soto Ayam Kampung
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 24,
                ...reveal(0.5),
              }}
            >
              <span style={{ fontWeight: 800, color: t.text, fontSize: 15 }}>
                Rating 5.0
              </span>
              <span
                style={{ color: "#f59e0b", fontSize: 16, letterSpacing: 3 }}
              >
                ★★★★★
              </span>
            </div>

            <div
              style={{
                display: "flex",
                borderRadius: 16,
                overflow: "hidden",
                background: t.accent,
                ...reveal(0.58, 16),
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "18px 12px",
                    borderLeft:
                      i > 0 ? "1px solid rgba(255,255,255,.28)" : "none",
                  }}
                >
                  <div
                    className="serif"
                    style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,.88)",
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
