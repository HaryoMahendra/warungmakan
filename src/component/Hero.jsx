import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { waLink } from "../constants/data";
import { IconWA } from "./icons/Icons";

const heroImages = [
  "/assets/Logo.png",
  "/assets/foto.jpeg",
  "/assets/logo-halal.jpeg",
  "/assets/menu/sotoayam.jpeg",
];

const SLIDE_DURATION = 2000; 

export default function Hero({ isDark, t }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  
  useEffect(() => {
    if (reducedMotion || heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Soto Ayam Khas Pacitan"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: idx === activeSlide ? 1 : 0,
              transition: "opacity 1.4s ease-in-out",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom,rgba(20,10,4,.5) 0%,rgba(20,10,4,.4) 45%,rgba(10,6,2,.72) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 36px",
          textAlign: "center",
        }}
      >
        <div className="reveal d1" style={{ marginBottom: 22 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,0,0,.28)",
              border: "1px solid rgba(251,146,60,.35)",
              color: "#fdba8c",
              fontSize: 11,
              fontWeight: 700,
              padding: "7px 16px",
              borderRadius: 8,
              letterSpacing: ".07em",
              textTransform: "uppercase",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
                flexShrink: 0,
              }}
            />
            Buka Setiap Hari · 06.00 WIB – Habis
          </span>
        </div>

        <p
          className="reveal d2 eyebrow"
          style={{ color: "rgba(253,186,140,.8)", marginBottom: 14 }}
        >
          Soto Ayam Kampung Khas Pacitan
        </p>

        <h1
          className="reveal d3 serif"
          style={{
            fontSize: "clamp(44px,6.5vw,82px)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: "rgba(255,247,237,.94)",
            marginBottom: 22,
            maxWidth: 820,
            textShadow: "0 2px 18px rgba(0,0,0,.3)",
          }}
        >
          Cita Rasa <em style={{ color: "#fb923c", fontStyle: "italic" }}>Otentik</em>
          <br />
          <em style={{ color: "#fb923c", fontStyle: "italic" }}>Warisan</em> Leluhur
        </h1>

        <p
          className="reveal d4"
          style={{
            fontSize: 15,
            color: "rgba(255,230,205,.68)",
            lineHeight: 1.85,
            maxWidth: 480,
            marginBottom: 38,
          }}
        >
          Dimasak dari hati menggunakan rempah pilihan khas Pacitan yang telah
          diwariskan turun-temurun. Setiap mangkuk adalah kehangatan dan
          cerita.
        </p>

        <div
          className="reveal d5"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Link
            to="/menu"
            className="btn-fill"
            style={{
              fontSize: 14,
              padding: "14px 28px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Lihat Menu
            <span>→</span>
          </Link>
          <a
          
            href={waLink("Halo, saya ingin bertanya tentang menu dan pemesanan.")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              padding: "14px 26px",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 10,
              border: "1px solid rgba(251,146,60,.4)",
              color: "#fdba8c",
              background: "rgba(0,0,0,.25)",
              backdropFilter: "blur(6px)",
              textDecoration: "none",
              transition: "background .2s, transform .2s, border-color .2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(251,146,60,.15)";
              e.currentTarget.style.borderColor = "#fb923c";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,.25)";
              e.currentTarget.style.borderColor = "rgba(251,146,60,.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <IconWA size={16} /> Pesan Sekarang
          </a>
        </div>

        
        {heroImages.length > 1 && (
          <div
            className="reveal d5"
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 32,
            }}
          >
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Lihat foto ${idx + 1}`}
                style={{
                  width: idx === activeSlide ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background:
                    idx === activeSlide
                      ? "#fb923c"
                      : "rgba(255,255,255,.35)",
                  transition: "width .35s ease, background .35s ease",
                }}
              />
            ))}
          </div>
        )}

        <div
          className="reveal d5"
          style={{
            display: "inline-flex",
            background: "rgba(0,0,0,.3)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(251,146,60,.2)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {[
            { num: "5+", label: "Menu Pilihan" },
            { num: "★ 5.0", label: "Rating Pelanggan" },
            { num: "1+", label: "Tahun Melayani" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "18px 36px",
                textAlign: "center",
                borderLeft: i > 0 ? "1px solid rgba(251,146,60,.15)" : "none",
                cursor: "default",
                transition: "background .25s, transform .25s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(251,146,60,.08)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                className="serif"
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#fb923c",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,210,160,.55)",
                  marginTop: 6,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}