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

      {/* overlay gelap dasar, dipertegas biar teks selalu terbaca di atas foto apa pun */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(8,4,1,.72) 0%, rgba(8,4,1,.62) 45%, rgba(5,2,1,.85) 100%)",
        }}
      />

      {/* vignette tambahan tepat di area teks supaya kontrasnya konsisten */}
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
        <div className="reveal d1" style={{ marginBottom: 22 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,0,0,.4)",
              border: "1px solid rgba(251,146,60,.4)",
              color: "#ffd8b0",
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

        <h1
          className="reveal d3 serif"
          style={{
            fontSize: "clamp(44px,6.5vw,82px)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#fff8ee",
            marginBottom: 45,
            maxWidth: 820,
            textShadow: "0 3px 24px rgba(0,0,0,.55), 0 1px 3px rgba(0,0,0,.6)",
          }}
        >
          Selamat Datang di
          <br />
          <em style={{ color: "#fdba74", fontStyle: "italic" }}>Soto Ayam</em> Kampung Khas Pacitan
        </h1>

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
              border: "1px solid rgba(251,146,60,.45)",
              color: "#ffd8b0",
              background: "rgba(0,0,0,.35)",
              backdropFilter: "blur(6px)",
              textDecoration: "none",
              transition: "background .2s, transform .2s, border-color .2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(251,146,60,.18)";
              e.currentTarget.style.borderColor = "#fb923c";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,.35)";
              e.currentTarget.style.borderColor = "rgba(251,146,60,.45)";
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
                      : "rgba(255,255,255,.4)",
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