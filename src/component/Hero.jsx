import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { waLink } from "../constants/data";
import { IconWA } from "./icons/Icons";

const heroImages = [
  "/assets/foto.jpeg",
  "/assets/menu/sotoayam.jpeg",
  "/assets/menu/rawondaging.jpg",
  "/assets/menu/menulainnya.jpg",
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
            "linear-gradient(to bottom, rgba(8,4,1,.72) 0%, rgba(8,4,1,.62) 45%, rgba(5,2,1,.85) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "radial-gradient(60% 55% at 50% 46%, rgba(0,0,0,.42) 0%, transparent 72%)",
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

        <h1
          className="reveal d3 serif"
          style={{
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-.015em",
            color: "#fff8ee",
            marginBottom: 45,
            maxWidth: 820,
            textShadow: "0 3px 24px rgba(0,0,0,.55), 0 1px 3px rgba(0,0,0,.6)",
          }}
        >
          <span
            style={{ fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 600 }}
          >
            Selamat Datang di
          </span>
          <br />
          <span
            style={{ fontSize: "clamp(38px, 6vw, 72px)", color: "#fb923c" }}
          >
            Soto Ayam Kampung
          </span>
          <br />
          <br />
          <span style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700 }}>
            Khas Pacitan
          </span>
        </h1>

        <div
          className="reveal d5"
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Link
            to="/menu"
            style={{
              fontSize: 15 /* Ditingkatkan dari 14px ke 15px */,
              fontWeight: 700,
              padding: "15px 32px",
              borderRadius: 999,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#1a0d02",
              background: "linear-gradient(90deg,#fb923c,#ea580c)",
              boxShadow: "0 12px 32px -10px rgba(234,88,12,.6)",
              transition: "transform .2s, box-shadow .2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 16px 36px -10px rgba(234,88,12,.75)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px -10px rgba(234,88,12,.6)";
            }}
          >
            Lihat Menu →
          </Link>
          <a
            href={waLink(
              "Halo, saya ingin bertanya tentang menu dan pemesanan.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 15 /* Ditingkatkan dari 14px ke 15px */,
              fontWeight: 700,
              padding: "15px 30px",
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#ffe8cf",
              border: "1.5px solid rgba(251,146,60,.4)",
              background: "rgba(251,146,60,.08)",
              backdropFilter: "blur(10px)",
              textDecoration: "none",
              transition: "background .2s, transform .2s, border-color .2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(251,146,60,.2)";
              e.currentTarget.style.borderColor = "#fb923c";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(251,146,60,.08)";
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
                    idx === activeSlide ? "#fb923c" : "rgba(255,255,255,.4)",
                  transition: "width .35s ease, background .35s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
