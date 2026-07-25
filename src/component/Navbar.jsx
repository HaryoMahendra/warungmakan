import { useState } from "react";
import { IconSun, IconMoon } from "./icons/Icons";
import { navLabels } from "../constants/data";

export default function Navbar({ activeSection, scrolled, isDark, setIsDark, scrollTo, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999,
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", background: t.nav, backdropFilter: "blur(24px)",
        borderBottom: `1px solid ${t.navBorder}`, transition: "background .3s,border-color .3s",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <img src="/assets/Logo.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: 12, objectFit: "cover", border: `2px solid ${t.borderStrong}` }} />
          <div>
            <div className="serif" style={{ fontSize: 15, fontWeight: 900, color: t.text, lineHeight: 1.1 }}>Soto Ayam Kampung</div>
            <div style={{ fontSize: 9.5, color: t.textDim, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase" }}>Khas Pacitan</div>
          </div>
        </div>

        {/* Nav links — desktop */}
        <div className="nav-desktop" style={{ display: "flex", gap: 0 }}>
          {["home", "tentang", "menu", "kontak"].map(id => (
            <button key={id} className="nav-link-btn" onClick={() => handleNav(id)} style={{
              color: activeSection === id ? t.accent : t.textMuted,
              fontWeight: activeSection === id ? 700 : 600,
              borderBottomColor: activeSection === id ? t.accent : "transparent",
            }}>
              {navLabels[id]}
            </button>
          ))}
        </div>

        {/* Kanan: theme toggle + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="theme-btn" onClick={() => setIsDark(!isDark)}
            style={{ borderColor: t.borderStrong, color: t.accentSoft, background: t.toggleBg }}>
            {isDark ? <IconSun /> : <IconMoon />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",           // dikontrol CSS
              flexDirection: "column", justifyContent: "center", alignItems: "center",
              gap: 5, width: 38, height: 38, borderRadius: 10,
              background: t.toggleBg, border: `1px solid ${t.borderStrong}`,
              cursor: "pointer", padding: 0,
            }}
          >
            <span style={{ width: 18, height: 2, background: t.accentSoft, borderRadius: 2, transition: "all .2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ width: 18, height: 2, background: t.accentSoft, borderRadius: 2, transition: "all .2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 18, height: 2, background: t.accentSoft, borderRadius: 2, transition: "all .2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Dropdown menu mobile */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, width: "100%", zIndex: 9998,
          background: isDark ? "rgba(16,10,2,.98)" : "rgba(253,246,238,.98)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${t.border}`,
          padding: "12px 0 16px",
          display: "flex", flexDirection: "column",
        }}>
          {["home", "tentang", "menu", "kontak"].map(id => (
            <button key={id} onClick={() => handleNav(id)} style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "13px 28px", textAlign: "left",
              fontSize: 15, fontWeight: activeSection === id ? 700 : 500,
              color: activeSection === id ? t.accent : t.textMuted,
              fontFamily: "inherit", letterSpacing: ".01em",
              borderLeft: activeSection === id ? `3px solid ${t.accent}` : "3px solid transparent",
              transition: "all .15s",
            }}>
              {navLabels[id]}
            </button>
          ))}
        </div>
      )}
    </>
  );
}