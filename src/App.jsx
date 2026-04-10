import { useState, useEffect, useRef } from "react";

// ── Ganti nomor WhatsApp di sini ──────────────────────────────
const WA_NUMBER = "6281234567890"; // format: 62 + nomor tanpa 0 depan
// ─────────────────────────────────────────────────────────────

const waLink = (pesan = "") =>
  `https://wa.me/${WA_NUMBER}${pesan ? `?text=${encodeURIComponent(pesan)}` : ""}`;

const menuUtama = [
  {
    id: 1,
    nama: "Soto Ayam Khas Pacitan",
    deskripsi:
      "Kuah bening gurih dengan ayam kampung pilihan, tauge segar, telur, dan perpaduan rempah khas Pacitan yang menggugah selera.",
    harga: "Rp 10.000",
    img: "/assets/menu/sotoayam.jpeg",
    pedas: true,
    andalan: true,
  },
  {
    id: 2,
    nama: "Rawon Daging",
    deskripsi:
      "Kuah hitam pekat dari kluwek pilihan, daging sapi empuk, tauge, telur asin, dan sambal yang kaya akan bumbu rempah Jawa Timur.",
    harga: "Rp 12.000",
    img: "/assets/menu/rawondaging.jpg",
    pedas: true,
    andalan: true,
  },
];

const pelengkap = [
  { nama: "Perkedel", harga: "Rp 2.000", img: "/assets/menu/perkedel.jpeg" },
  { nama: "Telur Asin", harga: "Rp 3.000", img: "/assets/menu/telorasin.jpg" },
  { nama: "Tempe Goreng", harga: "Rp 2.000", img: "/assets/menu/tempegoreng.jpg" },
  { nama: "Kerupuk", harga: "Rp 2.000", img: "/assets/menu/kerupuk.jpg" },
  { nama: "Keripik Usus", harga: "Rp 2.000", img: "/assets/menu/keripikusus.jpg" },
  { nama: "Kacang Goreng", harga: "Rp 2.000", img: "/assets/menu/kacanggoreng.jpg" },
  { nama: "Es Teh Manis", harga: "Rp 3.000", img: "/assets/menu/esteh.jpg" },
  { nama: "Es Jeruk Peras", harga: "Rp 3.000", img: "/assets/menu/esjerukperas.jpg" },
];

const filterChips = [
  { label: "Semua", icon: "🍽" },
  { label: "Soto", icon: "🍲" },
  { label: "Rawon", icon: "🥩" },
  { label: "Lauk", icon: "🍳" },
  { label: "Minuman", icon: "🥤" },
];

const filterMap = {
  Semua: null,
  Soto: ["Soto Ayam Khas Pacitan"],
  Rawon: ["Rawon Daging"],
  Lauk: ["Perkedel", "Telur Asin", "Tempe Goreng", "Kerupuk", "Keripik Usus", "Kacang Goreng"],
  Minuman: ["Es Teh Manis", "Es Jeruk Peras"],
};

// ── Sun & Moon icons ──
const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [scrolled, setScrolled] = useState(false);
  const [toastItem, setToastItem] = useState(null);
  // ── NEW: theme toggle ──
  const [isDark, setIsDark] = useState(true);

  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const tentangRef = useRef(null);
  const kontakRef = useRef(null);

  const sectionRefs = {
    home: homeRef,
    menu: menuRef,
    tentang: tentangRef,
    kontak: kontakRef,
  };

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  // Scroll spy
  useEffect(() => {
    const sections = ["home", "menu", "tentang", "kontak"];

const onScroll = () => {
  setScrolled(window.scrollY > 10);

  const isBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

  if (isBottom) {
    setActiveSection("kontak"); // 🔥 paksa aktif kontak
    return;
  }

  for (let i = sections.length - 1; i >= 0; i--) {
    const id = sections[i];
    const el = sectionRefs[id]?.current;

    if (el && window.scrollY >= el.offsetTop - 80) {
      setActiveSection(id);
      break;
    }
  }
};
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── UPDATED: kontak now scrolls, not opens WA ──
  const scrollTo = (id) => {
    const el = sectionRefs[id]?.current;
    if (!el) return;
    const offset = 70;
    const top = el.offsetTop - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const filteredPelengkap =
    activeFilter === "Semua"
      ? pelengkap
      : pelengkap.filter((p) => filterMap[activeFilter]?.includes(p.nama));

  const filteredAndalan =
    activeFilter === "Semua" || activeFilter === "Soto" || activeFilter === "Rawon"
      ? menuUtama.filter((m) =>
          activeFilter === "Semua" ? true : filterMap[activeFilter]?.includes(m.nama)
        )
      : [];

  // ── Theme-aware color tokens ──
  const t = {
    bg: isDark ? "#0c0802" : "#faf7f2",
    bgCard: isDark ? "#170f06" : "#ffffff",
    bgSurface: isDark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
    nav: isDark
      ? scrolled ? "rgba(12,8,2,0.94)" : "rgba(12,8,2,0.7)"
      : scrolled ? "rgba(250,247,242,0.96)" : "rgba(250,247,242,0.75)",
    navBorder: scrolled
      ? isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.1)"
      : "1px solid transparent",
    text: isDark ? "#fff" : "#1a0f00",
    textMuted: isDark ? "rgba(255,255,255,.42)" : "rgba(26,15,0,.5)",
    textDim: isDark ? "rgba(255,255,255,.28)" : "rgba(26,15,0,.35)",
    border: isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.08)",
    borderHover: isDark ? "rgba(251,146,60,.25)" : "rgba(249,115,22,.35)",
    divider: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.07)",
    chipBg: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)",
    chipBorder: isDark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.1)",
    chipColor: isDark ? "rgba(255,255,255,.6)" : "rgba(26,15,0,.55)",
    footerBg: isDark ? "#080400" : "#f0ece4",
    footerBorder: isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.08)",
    infoCardBg: isDark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.03)",
    infoCardBorder: isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.09)",
    toggleBg: isDark ? "rgba(255,255,255,.09)" : "rgba(0,0,0,.07)",
    toggleBorder: isDark ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.15)",
    toggleColor: isDark ? "rgba(255,255,255,.8)" : "rgba(26,15,0,.7)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "62px",
        fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
        background: t.bg,
        color: t.text,
        overflowX: "hidden",
        transition: "background .3s, color .3s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }

        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.4; transform:scale(1.5); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes toastIn {
          0%   { opacity:0; transform:translateY(20px) scale(.95); }
          15%  { opacity:1; transform:translateY(0) scale(1); }
          80%  { opacity:1; }
          100% { opacity:0; }
        }

        .float-card { animation: floatY 4s ease-in-out infinite; }
        .pulse-dot  { animation: pulseDot 2s ease-in-out infinite; }
        .fade-up    { animation: fadeSlideUp .5s ease both; }

        .nav-link {
          cursor:pointer; padding:7px 15px; border-radius:22px;
          font-size:13px; font-weight:600;
          border:1px solid transparent;
          transition:all .22s ease;
          user-select:none;
        }

        .btn-primary {
          background:linear-gradient(135deg,#f97316,#dc2626);
          color:#fff; font-size:14px; font-weight:700;
          padding:13px 28px; border-radius:26px; border:none; cursor:pointer;
          box-shadow:0 8px 28px rgba(220,38,38,.35);
          transition:transform .15s,box-shadow .15s;
          font-family:inherit; letter-spacing:.01em;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(220,38,38,.5); }
        .btn-primary:active { transform:scale(.97); }

        .btn-ghost {
          border:1px solid rgba(255,255,255,.16);
          color:#fff; font-size:14px; font-weight:600;
          padding:13px 28px; border-radius:26px; cursor:pointer;
          transition:background .2s,border-color .2s;
          font-family:inherit; background:rgba(255,255,255,.07);
        }
        .btn-ghost:hover { background:rgba(255,255,255,.14); }

        .btn-wa {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#25d366,#128c4a);
          color:#fff; font-size:13px; font-weight:700;
          padding:11px 22px; border-radius:24px; border:none; cursor:pointer;
          box-shadow:0 6px 20px rgba(37,211,102,.3);
          transition:transform .15s,box-shadow .15s;
          font-family:inherit; text-decoration:none;
        }
        .btn-wa:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(37,211,102,.45); }

        /* ── THEME TOGGLE BUTTON ── */
        .theme-toggle {
          display:inline-flex; align-items:center; gap:7px;
          font-size:12px; font-weight:600;
          padding:8px 16px; border-radius:20px; cursor:pointer;
          font-family:inherit;
          transition:background .2s, border-color .2s, transform .15s;
        }
        .theme-toggle:hover { transform:scale(1.04); }
        .theme-toggle:active { transform:scale(.97); }

        /* ── ANDALAN CARD ── */
        .andalan-card {
          border-radius:22px; overflow:hidden;
          border:1px solid;
          cursor:pointer; transition:transform .22s,box-shadow .22s;
        }
        .andalan-card:hover {
          transform:translateY(-6px);
          box-shadow:0 20px 48px rgba(220,38,38,.22);
        }

        /* ── PELENGKAP CARD ── */
        .pel-card {
          border:1px solid;
          border-radius:18px; overflow:hidden;
          text-align:center; transition:all .22s; cursor:pointer;
          display:flex; flex-direction:column;
        }
        .pel-card:hover {
          border-color:rgba(249,115,22,.35) !important;
          transform:translateY(-4px);
          box-shadow:0 8px 24px rgba(249,115,22,.12);
        }

        /* ── PESAN BUTTON ── */
        .pesan-btn {
          display:inline-flex; align-items:center; gap:6px;
          background:linear-gradient(135deg,#25d366,#128c4a);
          color:#fff; font-size:12px; font-weight:700;
          padding:9px 18px; border-radius:18px; border:none; cursor:pointer;
          transition:transform .15s,box-shadow .15s;
          font-family:inherit; white-space:nowrap;
        }
        .pesan-btn:hover { transform:scale(1.06); box-shadow:0 4px 18px rgba(37,211,102,.4); }

        /* ── FILTER CHIPS ── */
        .chip {
          display:inline-flex; align-items:center; gap:7px;
          border-radius:40px; padding:9px 18px;
          cursor:pointer; transition:all .2s; white-space:nowrap;
          font-family:inherit; font-size:13px; font-weight:600;
        }
        .chip:hover  { background:rgba(249,115,22,.14) !important; border-color:rgba(249,115,22,.35) !important; color:#fb923c !important; }
        .chip.active { background:rgba(249,115,22,.2) !important;  border-color:rgba(249,115,22,.5)  !important; color:#f97316 !important; }

        .scroll-hide { overflow-x:auto; -ms-overflow-style:none; scrollbar-width:none; }
        .scroll-hide::-webkit-scrollbar { display:none; }

        .toast {
          position:fixed; bottom:28px; left:50%; transform:translateX(-50%);
          background:linear-gradient(135deg,#25d366,#128c4a);
          color:#fff; font-size:13px; font-weight:700;
          padding:12px 24px; border-radius:40px;
          box-shadow:0 8px 28px rgba(37,211,102,.4);
          z-index:9999; white-space:nowrap;
          animation:toastIn 2.5s ease forwards;
          pointer-events:none;
        }

        .section-label {
          font-size:11px; font-weight:700; color:#f97316;
          text-transform:uppercase; letter-spacing:.14em; margin-bottom:5px;
        }
        .section-title {
          font-size:24px; font-weight:800; margin-bottom:22px; line-height:1.2;
        }

        .stat-num {
          font-size:22px; font-weight:900;
          background:linear-gradient(135deg,#fb923c,#fbbf24);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .stat-label { font-size:11px; font-weight:500; letter-spacing:.04em; }

        .tentang-card {
          border-radius:20px; padding:20px;
          transition:border-color .2s;
        }
        .tentang-card:hover { border-color:rgba(251,146,60,.3) !important; }

        /* ── MENU ANDALAN: horizontal card ── */
        .menu-andalan-grid {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:18px;
        }
        @media(max-width:640px){
          .menu-andalan-grid { grid-template-columns:1fr; }
        }
        .andalan-h-card {
          border-radius:20px; overflow:hidden;
          border:1px solid;
          cursor:pointer;
          display:flex; flex-direction:column;
          transition:transform .22s, box-shadow .22s, border-color .22s;
        }
        .andalan-h-card:hover {
          transform:translateY(-5px);
          box-shadow:0 18px 44px rgba(220,38,38,.2);
        }
        .andalan-h-img-wrap {
          width:100%;
          aspect-ratio:16/9;
          overflow:hidden;
          position:relative;
          flex-shrink:0;
        }
        .andalan-h-img-wrap img {
          width:100%; height:100%;
          object-fit:cover; display:block;
          transition:transform .35s ease;
        }
        .andalan-h-card:hover .andalan-h-img-wrap img { transform:scale(1.05); }

        /* ── SEMUA MENU unified grid ── */
        .all-menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 220px));
  gap: 16px;
  justify-content: center; /* 🔥 INI KUNCINYA */
}

.menu-item-card {
  width: 100%;
  max-width: 220px; /* biar konsisten */
  border: 1px solid;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
}

.menu-item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
        .menu-item-img-wrap {
          width:100%; aspect-ratio:1/1; overflow:hidden; position:relative;
        }
        .menu-item-img-wrap img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform .3s ease;
        }
        .menu-item-card:hover .menu-item-img-wrap img { transform:scale(1.07); }

        /* ── PELENGKAP GRID (kept for compat) ── */
        .pel-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill, minmax(140px, 1fr));
          gap:14px;
        }
        .pel-img-wrap {
          width:100%; aspect-ratio:1/1; overflow:hidden;
        }
        .pel-img-wrap img {
          width:100%; height:100%;
          object-fit:cover; display:block;
          transition:transform .3s ease;
        }
        .pel-card:hover .pel-img-wrap img { transform:scale(1.06); }
      `}</style>

      {/* ── TOAST ── */}
      {toastItem && (
        <div className="toast">✅ Diarahkan ke WhatsApp — {toastItem}</div>
      )}

      {/* ══════════════════════ NAVBAR ══════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: 62,
          background: t.nav,
          backdropFilter: "blur(20px)",
          borderBottom: t.navBorder,
          transition: "background .3s, border-color .3s",
        }}
      >
        {/* Logo */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => scrollTo("home")}
        >
          <img
            src="/assets/Logo.png"
            alt="Logo Bu Iwing"
            style={{
              width: 38, height: 38, borderRadius: 11, objectFit: "cover",
              boxShadow: "0 0 0 2px rgba(249,115,22,.35)",
            }}
          />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.1, color: t.text }}>
              Bu Iwing
            </div>
            <div style={{ fontSize: 10, color: t.textDim, fontWeight: 500 }}>
              Warung Makan Khas Pacitan
            </div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 3 }}>
          {["home", "menu", "tentang", "kontak"].map((id) => (
            <span
              key={id}
              className="nav-link"
              style={{
                color: activeSection === id ? "#fff" : t.chipColor,
                background:
                  activeSection === id
                    ? "linear-gradient(135deg,rgba(251,146,60,.22),rgba(220,38,38,.22))"
                    : "transparent",
                borderColor:
                  activeSection === id ? "rgba(251,146,60,.38)" : "transparent",
              }}
              onClick={() => scrollTo(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
        </div>

        {/* ── THEME TOGGLE (replaced WA button) ── */}
        <button
          className="theme-toggle"
          style={{
            background: t.toggleBg,
            border: `1px solid ${t.toggleBorder}`,
            color: t.toggleColor,
          }}
          onClick={() => setIsDark(!isDark)}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <IconSun /> : <IconMoon />}
          {isDark ? "Terang" : "Gelap"}
        </button>
      </nav>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        ref={homeRef}
        id="home"
        style={{
          position: "relative",
          padding: "64px 24px 56px",
          overflow: "hidden",
          background: t.bg,
          transition: "background .3s",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: isDark
              ? "radial-gradient(ellipse 75% 55% at 60% 0%,rgba(220,38,38,.28) 0%,transparent 68%),radial-gradient(ellipse 45% 40% at 95% 90%,rgba(249,115,22,.12) 0%,transparent 60%)"
              : "radial-gradient(ellipse 75% 55% at 60% 0%,rgba(249,115,22,.12) 0%,transparent 68%),radial-gradient(ellipse 45% 40% at 95% 90%,rgba(220,38,38,.07) 0%,transparent 60%)",
          }}
        />
        {/* grid */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)"
              : "linear-gradient(rgba(0,0,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.03) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div
          style={{
            position: "relative", zIndex: 1,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 36,
            alignItems: "center",
            maxWidth: 860,
            margin: "0 auto",
          }}
        >
          {/* Left */}
          <div className="fade-up">
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(249,115,22,.12)",
                border: "1px solid rgba(249,115,22,.25)",
                color: "#fb923c",
                fontSize: 11, fontWeight: 700,
                padding: "6px 14px", borderRadius: 22,
                marginBottom: 22,
                letterSpacing: ".06em", textTransform: "uppercase",
              }}
            >
              <span
                className="pulse-dot"
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }}
              />
              Buka Setiap Hari · 06.00 – Habis
            </span>

            <p
              style={{
                fontSize: 11, fontWeight: 700,
                color: t.textMuted,
                textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 9,
              }}
            >
              Selamat Datang di
            </p>

            <h1
              style={{
                fontSize: "clamp(32px,5.5vw,56px)",
                fontWeight: 900, lineHeight: 1.05, marginBottom: 10, color: t.text,
              }}
            >
              Warung Makan
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#f97316 30%,#fbbf24)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}
              >
                Bu Iwing
              </span>
            </h1>

            <p style={{ fontSize: 15, fontWeight: 600, color: "#fb923c", marginBottom: 14, letterSpacing: ".01em" }}>
              Masakan Khas Pacitan
            </p>

            <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.8, maxWidth: 380, marginBottom: 30 }}>
              Cita rasa otentik warisan leluhur, dimasak dengan penuh cinta
              menggunakan rempah pilihan khas Pacitan sejak 2025.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <button className="btn-primary" onClick={() => scrollTo("menu")}>
                Lihat Menu →
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { num: "5+", label: "Menu" },
                { num: "1th", label: "Tahun" },
                { num: "★ 5.0", label: "Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label" style={{ color: t.textDim }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating card */}
          <div
            className="float-card"
            style={{
              background: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)",
              border: `1px solid ${isDark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.1)"}`,
              borderRadius: 26, padding: 20, width: 182,
              position: "relative",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{
                position: "absolute", top: -11, right: 12,
                background: "linear-gradient(135deg,#fbbf24,#f97316)",
                color: "#7c2d00",
                fontSize: 10, fontWeight: 700,
                padding: "4px 11px", borderRadius: 10,
              }}
            >
              Sejak 2025
            </div>
            <img
              src="/assets/Logo.png"
              alt="Warung Bu Iwing"
              style={{
                width: "100%", aspectRatio: "1/1",
                borderRadius: 18, objectFit: "cover",
                display: "block", marginBottom: 12,
              }}
            />
            <p style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 2 }}>
              Warung Bu Iwing
            </p>
            <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 8 }}>
              Masakan Tradisional
            </p>
            <div
              style={{
                background: "rgba(249,115,22,.15)",
                border: "1px solid rgba(249,115,22,.25)",
                borderRadius: 8, padding: "4px 8px",
                fontSize: 10, fontWeight: 600, color: "#fb923c",
                display: "inline-block", marginBottom: 10,
              }}
            >
              📍 Kota Madiun · Jatim
            </div>
            <div style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.1)"}`, paddingTop: 10, textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#fb923c" }}>5+</div>
              <div style={{ fontSize: 10, color: t.textDim, letterSpacing: ".1em", textTransform: "uppercase" }}>Menu</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: t.divider }} />

      {/* ══════════════════════ MENU ANDALAN ══════════════════════ */}
      <section ref={menuRef} id="menu" style={{ padding: "44px 24px", background: t.bg, transition: "background .3s" }}>
        <div className="section-label">Menu Andalan</div>
        <div className="section-title" style={{ color: t.text }}>
          Pilihan <span style={{ color: "#f97316" }}>Terbaik</span> Kami
        </div>

        {/* ── IMPROVED: 2-col grid, each card = image top + info bottom ── */}
        <div className="menu-andalan-grid">
          {menuUtama.map((item) => (
            <div
              key={item.id}
              className="andalan-h-card"
              style={{ background: t.bgCard, borderColor: t.border }}
            >
              {/* Image */}
              <div className="andalan-h-img-wrap">
                <img src={item.img} alt={item.nama} />
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 90,
                    background: "linear-gradient(transparent,rgba(0,0,0,.65))",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 5 }}>
                  {item.andalan && (
                    <span style={{ background: "linear-gradient(135deg,#f97316,#dc2626)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 10 }}>
                      ★ Andalan
                    </span>
                  )}
                  {item.pedas && (
                    <span style={{ background: "rgba(220,38,38,.82)", color: "#fecaca", fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 8 }}>
                      🌶 Pedas
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: t.text, marginBottom: 7 }}>
                  {item.nama}
                </div>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.75, marginBottom: 16, flex: 1 }}>
                  {item.deskripsi}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#fb923c" }}>{item.harga}</div>
                    <div style={{ fontSize: 12, color: "#fbbf24" }}>★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: t.divider }} />

      {/* ══════════════════════ FILTER + SEMUA MENU ══════════════════════ */}
      <section style={{ padding: "40px 0 0", background: t.bg, transition: "background .3s" }}>
        <div style={{ padding: "0 24px" }}>
          <div className="section-label">Jelajahi</div>
          <div className="section-title" style={{ color: t.text }}>
            Semua <span style={{ color: "#f97316" }}>Menu</span>
          </div>
        </div>

        {/* Filter chips */}
        <div className="scroll-hide" style={{ padding: "0 24px 16px" }}>
          <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
            {filterChips.map((chip) => (
              <button
                key={chip.label}
                className={`chip${activeFilter === chip.label ? " active" : ""}`}
                style={{
                  background: t.chipBg,
                  border: `1px solid ${t.chipBorder}`,
                  color: t.chipColor,
                }}
                onClick={() => setActiveFilter(chip.label)}
              >
                <span style={{ fontSize: 15 }}>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── UNIFIED GRID: andalan + pelengkap dalam satu grid ── */}
        {(() => {
          // Build combined list based on filter
          const [selectedItem, setSelectedItem] = useState(null);
          const showAndalan = activeFilter === "Semua" || activeFilter === "Soto" || activeFilter === "Rawon";
          const anadalanItems = showAndalan
            ? menuUtama.filter((m) => activeFilter === "Semua" ? true : filterMap[activeFilter]?.includes(m.nama))
            : [];
          const pelItems = activeFilter === "Semua"
            ? pelengkap
            : pelengkap.filter((p) => filterMap[activeFilter]?.includes(p.nama));

          const totalItems = anadalanItems.length + pelItems.length;
          if (totalItems === 0) {
            return (
              <div style={{ padding: "40px 24px", textAlign: "center", color: t.textMuted, fontSize: 14 }}>
                Tidak ada menu untuk kategori ini.
              </div>
            );
          }

          return (
            <div style={{ padding: "0 24px 32px" }}>
              <div className="all-menu-grid">
                {/* Andalan items */}
                {anadalanItems.map((item) => (
                  <div
                    key={`a-${item.id}`}
                    className="menu-item-card"
                    style={{ background: t.bgCard, borderColor: t.border }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="menu-item-img-wrap">
                      <img src={item.img} alt={item.nama} />
                      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ background: "linear-gradient(135deg,#f97316,#dc2626)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>
                          ★ Andalan
                        </span>
                        {item.pedas && (
                          <span style={{ background: "rgba(220,38,38,.8)", color: "#fecaca", fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 7 }}>
                            🌶 Pedas
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ padding: "10px 12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1.4 }}>{item.nama}</div>
                      <div style={{ fontSize: 13, fontWeight: 900, color: "#fb923c" }}>{item.harga}</div>
                      <div style={{ fontSize: 10, color: "#fbbf24" }}>★★★★★</div>
                      <div style={{ fontSize: 10, color: t.textDim, marginTop: 2 }}>Ketuk untuk pesan</div>
                    </div>
                  </div>
                ))}

                {/* Pelengkap items */}
                {pelItems.map((item, idx) => (
                  <div
                    key={`p-${idx}`}
                    className="menu-item-card"
                    style={{ background: t.bgSurface, borderColor: t.border }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="menu-item-img-wrap">
                      <img src={item.img} alt={item.nama} />
                    </div>
                    <div style={{ padding: "10px 12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: t.text, lineHeight: 1.4 }}>{item.nama}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#f97316" }}>{item.harga}</div>
                      <div style={{ fontSize: 10, color: t.textDim, marginTop: 2 }}>Ketuk untuk pesan</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      <div style={{ height: 1, background: t.divider }} />

      {/* ══════════════════════ TENTANG ══════════════════════ */}
      <section ref={tentangRef} id="tentang" style={{ padding: "44px 24px", background: t.bg, transition: "background .3s" }}>
        <div className="section-label">Tentang Kami</div>
        <div className="section-title" style={{ color: t.text }}>
          Warung <span style={{ color: "#f97316" }}>Bu Iwing</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
          {[
            { icon: "🍳", title: "Dimasak Segar", desc: "Setiap hari dimasak dari bahan segar pilihan, tanpa pengawet." },
            { icon: "📍", title: "Lokasi Strategis", desc: "Jl. Hercules No J7, Bumi Antariksa, Kota Madiun." },
            { icon: "🕕", title: "Buka Setiap Hari", desc: "Kami buka setiap hari mulai pukul 06.00 pagi hingga habis." },
            { icon: "🌶️", title: "Bumbu Khas", desc: "Racikan bumbu turun-temurun dari Pacitan, kaya rempah alami." },
            { icon: "💰", title: "Harga Terjangkau", desc: "Porsi kenyang, harga bersahabat, cocok untuk semua kalangan." },
            { icon: "⭐", title: "5 Bintang", desc: "Dipercaya pelanggan setia selama kurang lebih 1 tahun." },
          ].map((c) => (
            <div
              key={c.title}
              className="tentang-card"
              style={{
                background: t.bgSurface,
                border: `1px solid ${t.border}`,
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 5 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.65 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: t.divider }} />

      {/* ══════════════════════ KONTAK / CTA ══════════════════════ */}
      <section
        ref={kontakRef}
        id="kontak"
        style={{
          padding: "44px 24px",
          background: isDark
            ? "linear-gradient(135deg,rgba(220,38,38,.08),rgba(249,115,22,.05))"
            : "linear-gradient(135deg,rgba(249,115,22,.06),rgba(220,38,38,.04))",
          textAlign: "center",
          transition: "background .3s",
        }}
      >
        <div className="section-label" style={{ textAlign: "center" }}>Kontak</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10, color: t.text }}>
          Mau <span style={{ color: "#f97316" }}>Pesan?</span>
        </h2>
        <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.8, maxWidth: 340, margin: "0 auto 28px" }}>
          Hubungi kami langsung via WhatsApp untuk pemesanan, pertanyaan, atau info lebih lanjut.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <a
            className="btn-wa"
            style={{ fontSize: 14, padding: "13px 28px" }}
            href={waLink("Halo Bu Iwing, saya ingin memesan makanan 🙏")}
            target="_blank"
            rel="noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.847L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.573-.5-5.065-1.372l-.361-.215-3.764.982.998-3.656-.234-.374A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Pesan Disini
          </a>
          <button
            style={{
              background: isDark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.05)",
              border: `1px solid ${isDark ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.12)"}`,
              color: t.text, fontSize: 14, fontWeight: 600,
              padding: "13px 28px", borderRadius: 26, cursor: "pointer",
              transition: "background .2s", fontFamily: "inherit",
            }}
            onClick={() => scrollTo("menu")}
          >
            Lihat Menu Lengkap
          </button>
        </div>

        {/* Info row */}
        <div
          style={{
            display: "inline-flex", gap: 28, marginTop: 32,
            padding: "16px 28px",
            background: t.infoCardBg,
            border: `1px solid ${t.infoCardBorder}`,
            borderRadius: 18, flexWrap: "wrap", justifyContent: "center",
          }}
        >
          {[
            { icon: "📍", text: "Jl. Hercules No J7" },
            { icon: "🕕", text: "06.00 – Habis WIB" },
            { icon: "📅", text: "Buka Setiap Hari" },
          ].map((i) => (
            <div key={i.text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: t.textMuted }}>
              <span style={{ fontSize: 16 }}>{i.icon}</span>
              {i.text}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer
        style={{
          background: t.footerBg,
          borderTop: `1px solid ${t.footerBorder}`,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background .3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/assets/Logo.png"
            alt="Logo"
            style={{ width: 34, height: 34, borderRadius: 9, objectFit: "cover" }}
          />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 1 }}>
              Warung Makan Bu Iwing
            </div>
            <div style={{ fontSize: 10, color: t.textDim }}>
              Jl. Hercules No J7, Bumi Antariksa, Kota Madiun · © 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}