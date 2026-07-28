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

  const keunggulan = [
    {
      icon: "🍽️",
      label: "Dine In & Take Away",
      desc: "Nyaman untuk makan di tempat atau dibawa pulang kapan saja",
    },
    {
      icon: "🌿",
      label: "Bahan Alami Tanpa Pengawet",
      desc: "Rempah segar diracik langsung tiap hari, tanpa bahan instan",
    },
    {
      icon: "🔥",
      label: "Dimasak Langsung",
      desc: "Kuah kaldu direbus perlahan agar rasanya keluar maksimal",
    },
    {
      icon: "🐔",
      label: "Ayam Kampung Asli",
      desc: "Dipilih dari peternak lokal, teksturnya kenyal dan gurih",
    },
  ];

  const infoRow = [
    { icon: "📍", label: "Kota Madiun" },
    { icon: "🕐", label: "Buka Setiap Hari, 07.00 – 20.00" },
    { icon: "💸", label: "Mulai dari Rp2.000" },
  ];

  // Ganti meta (jumlahUlasan, foto, waktu, food, service) sesuai data asli dari Google Maps kalau ada
  const reviews = [
    {
      nama: "Frey Saputra",
      jumlahUlasan: "3 ulasan",
      waktu: "5 bulan lalu",
      rating: 5,
      pesan: "Rasanya sangat mantul bosku... buat menu sarapan dan makan siangmu.",
      food: 5,
      service: 5,
    },
    {
      nama: "Salsabila Shinta",
      jumlahUlasan: "10 ulasan · 1 foto",
      waktu: "7 bulan lalu",
      rating: 5,
      pesan: "Mantap enak rekomen 👍🏻👍🏻👍🏻",
      food: 5,
      service: 5,
    },
    {
      nama: "Bama Pratama",
      jumlahUlasan: "2 ulasan",
      waktu: "2 bulan lalu",
      rating: 5,
      pesan: "",
      food: 5,
      service: 5,
      Ordertype: "Dine in",
      Priceperperson: "Rp 2.000 – 15.000",
    },
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
                ...reveal(0.24),
              }}
            >
              Hadir sejak 2025 di Kota Madiun, Soto Ayam Kampung membawa cita
              rasa bumbu khas Pacitan yang diwariskan turun-temurun. Racikan
              kunyit, serai, dan rempah pilihan direbus perlahan bersama ayam
              kampung asli hingga menghasilkan kuah kuning bening yang gurih
              dan harum — bukan sekadar soto biasa, tapi kenangan rasa rumah.
            </p>
            <p
              style={{
                fontSize: 14,
                color: t.textMuted,
                lineHeight: 1.9,
                marginBottom: 14,
                ...reveal(0.3),
              }}
            >
              Setiap mangkuk disajikan hangat dengan pelengkap khas: suwiran
              ayam kampung, tauge segar, seledri, bawang goreng renyah, dan
              sambal rumahan yang dibuat baru setiap hari. Semua bahan dipilih
              langsung dari pasar tradisional pagi hari agar kesegarannya
              terjaga sampai ke meja Anda.
            </p>
            <p
              style={{
                fontSize: 14,
                color: t.textMuted,
                lineHeight: 1.9,
                marginBottom: 22,
                ...reveal(0.36),
              }}
            >
              Dengan harga yang sangat terjangkau dan porsi yang mengenyangkan,
              kami hadir untuk semua kalangan — dari pelajar, pekerja kantoran,
              hingga keluarga — yang ingin menikmati masakan rumahan
              berkualitas tanpa menguras kantong.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 22,
                ...reveal(0.4),
              }}
            >
              {infoRow.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "7px 12px",
                    borderRadius: 999,
                    border: `1px solid ${t.border}`,
                    fontSize: 12,
                    fontWeight: 600,
                    color: t.text,
                  }}
                >
                  <span style={{ fontSize: 13 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
                marginBottom: 24,
                ...reveal(0.46),
              }}
            >
              {keunggulan.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 20, lineHeight: 1.2 }}>
                    {item.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: t.text,
                        marginBottom: 3,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        color: t.textMuted,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                borderLeft: `3px solid ${t.accent}`,
                paddingLeft: 16,
                marginBottom: 26,
                ...reveal(0.52),
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
                sama seperti dulu, tanpa jalan pintas. Buat kami, konsistensi
                rasa adalah bentuk penghormatan pada resep keluarga sendiri."
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
                ...reveal(0.58),
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
              <span style={{ fontSize: 12, color: t.textMuted }}>
                dari pelanggan setia kami
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 72,
            ...reveal(0.1),
          }}
        >
          <p
            className="eyebrow"
            style={{ color: t.accent, marginBottom: 8, textAlign: "center" }}
          >
            Kata Pelanggan
          </p>
          <h3
            className="serif"
            style={{
              fontSize: "clamp(22px,2.6vw,32px)",
              fontWeight: 900,
              color: t.text,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            Cerita di Balik Setiap Mangkuk
          </h3>
          <p
            style={{
              fontSize: 13.5,
              color: t.textMuted,
              textAlign: "center",
              maxWidth: 520,
              margin: "0 auto 36px",
              lineHeight: 1.8,
            }}
          >
            Bukan kami yang bicara, tapi mereka yang sudah mencicipi langsung
            setiap hari.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {reviews.map((r, i) => (
              <div
                key={r.nama}
                style={{
                  ...reveal(0.16 + i * 0.08, 16),
                  background: t.bg,
                  border: `1px solid ${t.border}`,
                  borderRadius: 16,
                  padding: "20px 20px 18px",
                }}
              >
                {/* Header: avatar + nama + meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: t.accent,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {r.nama.charAt(0)}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: t.text,
                          textDecoration: "underline",
                          textUnderlineOffset: 2,
                        }}
                      >
                        {r.nama}
                      </div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>
                        {r.jumlahUlasan}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 16,
                      color: t.textMuted,
                      lineHeight: 1,
                      letterSpacing: 1,
                    }}
                  >
                    ⋮
                  </span>
                </div>

                {/* Rating + waktu */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ color: "#f59e0b", fontSize: 14, letterSpacing: 2 }}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </span>
                  <span style={{ fontSize: 11.5, color: t.textMuted }}>
                    {r.waktu}
                  </span>
                </div>

                {/* Teks review */}
                {r.pesan && (
                  <p
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: t.text,
                      lineHeight: 1.7,
                      marginBottom: 14,
                    }}
                  >
                    {r.pesan}
                  </p>
                )}

                {/* Food / Service */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 20,
                    marginTop: r.pesan ? 0 : 4,
                  }}
                >
                  {r.food != null && (
                    <span style={{ fontSize: 12.5, color: t.text }}>
                      <strong>Food:</strong> {r.food}
                    </span>
                  )}
                  {r.service != null && (
                    <span style={{ fontSize: 12.5, color: t.text }}>
                      <strong>Service:</strong> {r.service}
                    </span>
                  )}
                </div>

                {/* Order type / Harga per orang */}
                {(r.Ordertype || r.Priceperperson) && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 20,
                      marginTop: 8,
                    }}
                  >
                    {r.Ordertype && (
                      <span style={{ fontSize: 12.5, color: t.text }}>
                        <strong>Order type:</strong> {r.Ordertype}
                      </span>
                    )}
                    {r.Priceperperson && (
                      <span style={{ fontSize: 12.5, color: t.text }}>
                        <strong>Price per person:</strong> {r.Priceperperson}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}