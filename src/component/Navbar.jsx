import { IconSun, IconMoon } from "./icons/Icons";
import { navLabels } from "../constants/data";

export default function Navbar({ activeSection, scrolled, isDark, setIsDark, scrollTo, t }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999,
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", background: t.nav, backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${t.navBorder}`, transition: "background .3s,border-color .3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }} onClick={() => scrollTo("home")}>
        <img src="/assets/Logo.png" alt="Logo" style={{ width: 40, height: 40, borderRadius: 12, objectFit: "cover", border: `2px solid ${t.borderStrong}` }} />
        <div>
          <div className="serif" style={{ fontSize: 15, fontWeight: 900, color: t.text, lineHeight: 1.1 }}>RM. Soto Ayam</div>
          <div style={{ fontSize: 9.5, color: t.textDim, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase" }}>Khas Pacitan</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 0 }}>
        {["home", "tentang", "menu", "kontak"].map(id => (
          <button key={id} className="nav-link-btn nav-text" onClick={() => scrollTo(id)} style={{
            color: activeSection === id ? t.accent : t.textMuted,
            fontWeight: activeSection === id ? 700 : 600,
            borderBottomColor: activeSection === id ? t.accent : "transparent",
          }}>
            {navLabels[id]}
          </button>
        ))}
      </div>

      <button className="theme-btn" onClick={() => setIsDark(!isDark)}
        style={{ borderColor: t.borderStrong, color: t.accentSoft, background: t.toggleBg }}>
        {isDark ? <IconSun /> : <IconMoon />}
      </button>
    </nav>
  );
}