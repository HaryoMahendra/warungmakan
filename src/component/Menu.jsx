import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import {
  menuUtama,
  pelengkap,
  filterChips,
  filterMap,
} from "../constants/data";

const slugify = (s) => s.toLowerCase().replace(/\s+/g, "-");
const unslugify = (slug) =>
  filterChips.find((label) => slugify(label) === slug) || "Semua";

export default function Menu({ t, setSelectedItem }) {
  const { kategori } = useParams();
  const navigate = useNavigate();
  const activeFilter = kategori ? unslugify(kategori) : "Semua";

  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
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
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay = 0, distance = 20) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
    transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}s, transform .6s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  const setActiveFilter = (label) => {
    navigate(label === "Semua" ? "/menu" : `/menu/${slugify(label)}`);
  };

  const showAndalan = activeFilter === "Semua" || activeFilter === "Makanan";
  const andalanItems = showAndalan ? menuUtama : [];
  const pelItems =
    activeFilter === "Semua"
      ? pelengkap
      : pelengkap.filter((p) => filterMap[activeFilter]?.includes(p.nama));
  const allItems = [
    ...andalanItems.map((i) => ({ ...i, _type: "andalan" })),
    ...pelItems.map((i) => ({ ...i, _type: "pelengkap" })),
  ];

  return (
    <section ref={sectionRef} style={{ padding: "80px 36px", background: t.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 36,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <p className="eyebrow" style={{ color: t.accent, ...reveal(0) }}>
              Menu
            </p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(26px,3.2vw,40px)",
                fontWeight: 900,
                lineHeight: 1.08,
                color: t.text,
                ...reveal(0.08),
              }}
            >
              Menu{" "}
              <em style={{ color: t.accent, fontStyle: "italic" }}>Utama</em>
            </h2>
          </div>
        </div>

        <div className="andalan-grid" style={{ marginBottom: 72 }}>
          {menuUtama.map((item, idx) => (
            <div
              key={item.id}
              className="andalan-card"
              style={{
                background: t.card,
                borderColor: t.border,
                ...reveal(0.14 + idx * 0.08, 24),
              }}
              onClick={() => setSelectedItem(item)}
            >
              <div
                className="card-img"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img}
                  alt={item.nama}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 55%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", top: 14, left: 14 }}>
                  {item.andalan && (
                    <span
                      style={{
                        background: t.accent,
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: 6,
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                      }}
                    >
                      Andalan
                    </span>
                  )}
                </div>
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "rgba(0,0,0,.62)",
                    color: "#f59e0b",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 6,
                  }}
                >
                  ★ {item.rating}
                </span>
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 18,
                    right: 18,
                  }}
                >
                  <div
                    className="serif"
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {item.nama}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,210,130,.8)",
                      letterSpacing: ".07em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.kategori}
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "18px 20px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: t.textDim,
                      marginBottom: 3,
                      textTransform: "uppercase",
                    }}
                  >
                    Harga per porsi
                  </div>
                  <div
                    className="serif"
                    style={{ fontSize: 24, fontWeight: 900, color: t.accent }}
                  >
                    {item.harga}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: t.textMuted,
                    maxWidth: 200,
                    lineHeight: 1.7,
                    textAlign: "right",
                  }}
                >
                  {item.deskripsi.substring(0, 70)}…
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 14,
            ...reveal(0.2),
          }}
        >
          <div>
            <p className="eyebrow" style={{ color: t.accent }}>
              Jelajahi
            </p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(22px,2.6vw,32px)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: t.text,
              }}
            >
              {activeFilter === "Semua" ? (
                <>
                  Semua{" "}
                  <em style={{ color: t.accent, fontStyle: "italic" }}>Menu</em>
                </>
              ) : (
                <>
                  Menu{" "}
                  <em style={{ color: t.accent, fontStyle: "italic" }}>
                    {activeFilter}
                  </em>
                </>
              )}
            </h2>
          </div>

         
          <div className="scroll-hide" style={{ display: "flex", gap: 8 }}>
            {filterChips.map((label) => (
              <motion.button
                key={label}
                className="chip-btn"
                onClick={() => setActiveFilter(label)}
                initial={false}
                animate={{
                  backgroundColor:
                    activeFilter === label ? t.chipActive : t.chipBg,
                  color: activeFilter === label ? t.accent : t.textMuted,
                }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "relative",
                  borderColor:
                    activeFilter === label ? t.accentSoft : t.border,
                  fontWeight: activeFilter === label ? 700 : 600,
                }}
              >
                {label}
                
              </motion.button>
            ))}
          </div>
        </div>

        
        <AnimatePresence mode="wait">
          {allItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: t.textMuted,
                fontSize: 14,
              }}
            >
              Tidak ada menu untuk kategori ini.
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              className="menu-grid"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {allItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="menu-card"
                  initial={{ y: 12, opacity: 0, scale: 0.97 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(idx * 0.035, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ background: t.card, borderColor: t.border }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div
                    className="card-img"
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1/1",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.nama}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top,rgba(0,0,0,.62) 0%,transparent 55%)",
                        pointerEvents: "none",
                      }}
                    />
                    {item._type === "andalan" && (
                      <span
                        style={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          background: t.accent,
                          color: "#fff",
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: 5,
                          textTransform: "uppercase",
                        }}
                      >
                        Andalan
                      </span>
                    )}
                    <span
                      style={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        background: "rgba(0,0,0,.68)",
                        color: "#f59e0b",
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "3px 7px",
                        borderRadius: 5,
                      }}
                    >
                      ★ {item.rating || "4.9"}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "10px 12px 14px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: t.text,
                        lineHeight: 1.35,
                      }}
                    >
                      {item.nama}
                    </div>
                    <div
                      className="serif"
                      style={{ fontSize: 13, fontWeight: 900, color: t.accent }}
                    >
                      {item.harga}
                    </div>
                    <div style={{ fontSize: 10, color: t.textDim }}>
                      {item.kategori}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}