import { waLink } from "../constants/data";
import { IconWA } from "./icons/Icons";

export default function Hero({ homeRef, isDark, scrollTo, t }) {
  return (
    <section ref={homeRef} id="home" style={{ position: "relative", minHeight: "calc(100vh - 64px)", overflow: "hidden", display: "flex", alignItems: "center" }}>
      <img src="/assets/menu/sotoayam.jpeg" alt="Soto Ayam Khas Pacitan" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom,rgba(0,0,0,.55) 0%,rgba(0,0,0,.45) 50%,rgba(0,0,0,.65) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "radial-gradient(ellipse 55% 65% at 8% 88%,rgba(234,88,12,.18) 0%,transparent 58%)" }} />

      <div style={{ position: "relative", zIndex: 3, width: "100%", minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 36px", textAlign: "center" }}>

        <div className="reveal d1" style={{ marginBottom: 22 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,.32)", border: "1px solid rgba(251,146,60,.4)", color: "#fb923c", fontSize: 11, fontWeight: 700, padding: "7px 16px", borderRadius: 8, letterSpacing: ".07em", textTransform: "uppercase", backdropFilter: "blur(6px)" }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
            Buka Setiap Hari · 06.00 WIB – Habis
          </span>
        </div>

        <p className="reveal d2 eyebrow" style={{ color: "rgba(251,146,60,.85)", marginBottom: 14 }}>Soto Ayam Kampung Khas Pacitan</p>

        <h1 className="reveal d3 serif" style={{ fontSize: "clamp(44px,6.5vw,82px)", fontWeight: 900, lineHeight: 1.05, color: "#ffffff", marginBottom: 22, maxWidth: 820, textShadow: "0 2px 24px rgba(0,0,0,.45)" }}>
          Cita Rasa <em style={{ color: "#fb923c", fontStyle: "italic" }}>Otentik</em><br /><em style={{ color: "#fb923c", fontStyle: "italic" }}>Warisan</em> Leluhur
        </h1>

        <p className="reveal d4" style={{ fontSize: 15, color: "rgba(255,230,195,.75)", lineHeight: 1.85, maxWidth: 480, marginBottom: 38 }}>
          Dimasak dari hati menggunakan rempah pilihan khas Pacitan yang telah diwariskan turun-temurun. Setiap mangkuk adalah kehangatan dan cerita.
        </p>

        <div className="reveal d5" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 56 }}>
          <button className="btn-fill" onClick={() => scrollTo("menu")} style={{ fontSize: 14, padding: "14px 28px" }}>Jelajahi Menu</button>
        </div>

        <div className="reveal d5" style={{ display: "inline-flex", background: "rgba(0,0,0,.35)", backdropFilter: "blur(10px)", border: "1px solid rgba(251,146,60,.2)", borderRadius: 16, overflow: "hidden" }}>
          {[{ num: "5+", label: "Menu Pilihan" }, { num: "★ 5.0", label: "Rating Pelanggan" }, { num: "1+", label: "Tahun Melayani" }].map((s, i) => (
            <div key={s.label} style={{ padding: "18px 36px", textAlign: "center", borderLeft: i > 0 ? "1px solid rgba(251,146,60,.15)" : "none" }}>
              <div className="serif" style={{ fontSize: 28, fontWeight: 900, color: "#fb923c", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "rgba(255,210,160,.6)", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}