import { useState, useEffect, useRef } from "react";

const WA_NUMBER = "6281234567890";
const waLink = (pesan = "") =>
  `https://wa.me/${WA_NUMBER}${pesan ? `?text=${encodeURIComponent(pesan)}` : ""}`;

const menuUtama = [
  {
    id: 1,
    nama: "Soto Ayam Khas Pacitan",
    deskripsi: "Kuah bening gurih dengan ayam kampung pilihan, tauge segar, telur, dan perpaduan rempah khas Pacitan yang menggugah selera.",
    deskripsiLengkap: "Soto Ayam khas Pacitan hadir dengan kuah bening yang jernih namun kaya rasa. Menggunakan ayam kampung pilihan yang dimasak perlahan bersama rempah asli Pacitan — serai, daun jeruk, lengkuas, dan kunyit — menghasilkan kaldu yang gurih alami. Disajikan dengan tauge segar, telur rebus, soun, daun bawang, dan bawang goreng renyah.",
    harga: "Rp 10.000",
    img: "/assets/menu/sotoayam.jpeg",
    pedas: true,
    andalan: true,
    rating: "5.0",
    porsi: "1 Porsi",
    kategori: "Makanan Utama",
  },
  {
    id: 2,
    nama: "Rawon Daging",
    deskripsi: "Kuah hitam pekat dari kluwek pilihan, daging sapi empuk, tauge, telur asin, dan sambal yang kaya akan bumbu rempah Jawa Timur.",
    deskripsiLengkap: "Rawon daging sapi yang dimasak dengan bumbu kluwek asli pilihan, menghasilkan kuah hitam pekat yang kaya rasa dan aroma. Daging sapi dimasak hingga empuk dan menyerap bumbu sempurna. Disajikan dengan tauge pendek, telur asin, sambal rawit, kerupuk udang, dan nasi putih pulen.",
    harga: "Rp 12.000",
    img: "/assets/menu/rawondaging.jpg",
    pedas: true,
    andalan: true,
    rating: "5.0",
    porsi: "1 Porsi",
    kategori: "Makanan Utama",
  },
];

const pelengkap = [
  { nama: "Perkedel", harga: "Rp 2.000", img: "/assets/menu/perkedel.jpeg", deskripsiLengkap: "Perkedel kentang goreng renyah di luar, lembut di dalam, dibumbui daun bawang dan merica.", kategori: "Lauk", rating: "4.9" },
  { nama: "Telur Asin", harga: "Rp 3.000", img: "/assets/menu/telorasin.jpg", deskripsiLengkap: "Telur bebek asin pilihan dengan kuning telur berminyak dan berpasir, gurih dan nikmat.", kategori: "Lauk", rating: "4.8" },
  { nama: "Tempe Goreng", harga: "Rp 2.000", img: "/assets/menu/tempegoreng.jpg", deskripsiLengkap: "Tempe segar yang digoreng crispy dengan bumbu kunyit dan ketumbar, gurih dan renyah.", kategori: "Lauk", rating: "4.9" },
  { nama: "Kerupuk", harga: "Rp 2.000", img: "/assets/menu/kerupuk.jpg", deskripsiLengkap: "Kerupuk udang dan kerupuk putih renyah, pelengkap wajib setiap mangkuk.", kategori: "Lauk", rating: "4.7" },
  { nama: "Keripik Usus", harga: "Rp 2.000", img: "/assets/menu/keripikusus.jpg", deskripsiLengkap: "Usus ayam yang digoreng hingga super kering dan renyah, cocok sebagai camilan atau lauk.", kategori: "Lauk", rating: "4.9" },
  { nama: "Kacang Goreng", harga: "Rp 2.000", img: "/assets/menu/kacanggoreng.jpg", deskripsiLengkap: "Kacang tanah goreng dengan sedikit garam, renyah dan gurih sebagai pelengkap sempurna.", kategori: "Lauk", rating: "4.8" },
  { nama: "Es Teh Manis", harga: "Rp 3.000", img: "/assets/menu/esteh.jpg", deskripsiLengkap: "Teh manis segar seduh langsung dengan es batu, menyegarkan menemani santap siang.", kategori: "Minuman", rating: "4.9" },
  { nama: "Es Jeruk Peras", harga: "Rp 3.000", img: "/assets/menu/esjerukperas.jpg", deskripsiLengkap: "Jeruk peras segar dicampur sirup gula dan es batu, asam manis menyegarkan.", kategori: "Minuman", rating: "4.9" },
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

const IconSun = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IconMoon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const IconWA = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.528 5.847L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.573-.5-5.065-1.372l-.361-.215-3.764.982.998-3.656-.234-.374A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

// ── MODAL DETAIL ──────────────────────────────────────────────
function MenuModal({ item, onClose, isDark }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const card = isDark ? "#1a0d04" : "#ffffff";
  const text = isDark ? "#fff9f0" : "#1a0800";
  const textMuted = isDark ? "rgba(255,220,180,.55)" : "rgba(26,8,0,.55)";
  const border = isDark ? "rgba(249,115,22,.14)" : "rgba(249,115,22,.16)";
  const infoBg = isDark ? "rgba(249,115,22,.07)" : "rgba(249,115,22,.05)";
  const pesanMsg = `Halo Bu Iwing, saya ingin memesan *${item.nama}* (${item.harga}) 🙏`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        backdropFilter: "blur(5px)",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: card,
          borderRadius: "28px 28px 0 0",
          width: "100%", maxWidth: 520,
          maxHeight: "90vh", overflowY: "auto",
          animation: "slideUp .3s cubic-bezier(.34,1.2,.64,1)",
          border: `1px solid ${border}`,
          borderBottom: "none",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/8", overflow: "hidden", borderRadius: "28px 28px 0 0" }}>
          <img src={item.img} alt={item.nama} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.1) 50%, transparent 100%)" }} />
          {/* Close */}
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(0,0,0,.6)", border: "none", borderRadius: "50%",
            width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", cursor: "pointer", fontSize: 18, lineHeight: 1,
          }}>✕</button>
          {/* Badges */}
          <div style={{ position: "absolute", top: 14, left: 14, display: "flex", flexDirection: "column", gap: 5 }}>
            {item.andalan && (
              <span style={{ background: "linear-gradient(135deg,#f97316,#dc2626)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 10 }}>★ Andalan</span>
            )}
            {item.pedas && (
              <span style={{ background: "rgba(220,38,38,.88)", color: "#fecaca", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 8 }}>🌶 Pedas</span>
            )}
          </div>
          {/* Title overlay */}
          <div style={{ position: "absolute", bottom: 16, left: 20, right: 60 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,.6)", marginBottom: 3 }}>{item.nama}</div>
            <div style={{ fontSize: 12, color: "rgba(255,200,120,.8)" }}>{item.kategori || "Menu"}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px 32px" }}>
          {/* Price + Rating */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#f97316", lineHeight: 1 }}>{item.harga}</div>
              <div style={{ fontSize: 11, color: textMuted, marginTop: 4 }}>{item.porsi || "1 Porsi"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, color: "#fbbf24", letterSpacing: 2 }}>★★★★★</div>
              <div style={{ fontSize: 11, color: textMuted, marginTop: 3 }}>Rating {item.rating || "5.0"}</div>
            </div>
          </div>

          {/* Deskripsi */}
          <div style={{ background: infoBg, border: `1px solid ${border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#f97316", marginBottom: 7, textTransform: "uppercase", letterSpacing: ".1em" }}>Deskripsi</div>
            <div style={{ fontSize: 13, color: textMuted, lineHeight: 1.78 }}>{item.deskripsiLengkap || item.deskripsi || "Menu lezat pilihan Warung Bu Iwing."}</div>
          </div>

          {/* Info chips */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
            {[
              { icon: "🍽", label: item.kategori || "Menu" },
              { icon: "💰", label: item.harga },
              { icon: "📦", label: item.porsi || "1 Porsi" },
            ].map((chip) => (
              <span key={chip.label} style={{
                background: "rgba(249,115,22,.12)", border: "1px solid rgba(249,115,22,.28)",
                color: "#fb923c", fontSize: 11, fontWeight: 700,
                padding: "5px 12px", borderRadius: 20,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ fontSize: 13 }}>{chip.icon}</span>{chip.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a href={waLink(pesanMsg)} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "linear-gradient(135deg,#25d366,#128c4a)",
            color: "#fff", fontSize: 15, fontWeight: 900,
            padding: "15px 28px", borderRadius: 22, textDecoration: "none",
            boxShadow: "0 8px 28px rgba(37,211,102,.4)",
          }}>
            <IconWA />
            Pesan Sekarang — {item.harga}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [scrolled, setScrolled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDark, setIsDark] = useState(true);

  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const tentangRef = useRef(null);
  const kontakRef = useRef(null);
  const sectionRefs = { home: homeRef, menu: menuRef, tentang: tentangRef, kontak: kontakRef };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  useEffect(() => {
    const sections = ["home", "menu", "tentang", "kontak"];
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (isBottom) { setActiveSection("kontak"); return; }
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sectionRefs[sections[i]]?.current;
        if (el && window.scrollY >= el.offsetTop - 80) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = sectionRefs[id]?.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  // Theme tokens — orange/yellow/red palette
  const t = {
    bg: isDark ? "#0d0600" : "#fdf8f3",
    bgCard: isDark ? "#1a0d04" : "#ffffff",
    bgSurface: isDark ? "rgba(249,115,22,.07)" : "rgba(249,115,22,.05)",
    nav: isDark
      ? scrolled ? "rgba(13,6,0,0.96)" : "rgba(13,6,0,0.78)"
      : scrolled ? "rgba(253,248,243,0.97)" : "rgba(253,248,243,0.82)",
    navBorder: scrolled
      ? isDark ? "1px solid rgba(249,115,22,.18)" : "1px solid rgba(249,115,22,.22)"
      : "1px solid transparent",
    text: isDark ? "#fff9f0" : "#1a0800",
    textMuted: isDark ? "rgba(255,220,180,.52)" : "rgba(26,8,0,.55)",
    textDim: isDark ? "rgba(255,200,140,.3)" : "rgba(26,8,0,.38)",
    border: isDark ? "rgba(249,115,22,.13)" : "rgba(249,115,22,.16)",
    divider: isDark ? "rgba(249,115,22,.09)" : "rgba(249,115,22,.11)",
    chipBg: isDark ? "rgba(249,115,22,.08)" : "rgba(249,115,22,.06)",
    chipBorder: isDark ? "rgba(249,115,22,.18)" : "rgba(249,115,22,.2)",
    chipColor: isDark ? "rgba(255,180,80,.72)" : "rgba(160,50,0,.65)",
    footerBg: isDark ? "#080300" : "#fef3e8",
    footerBorder: isDark ? "rgba(249,115,22,.12)" : "rgba(249,115,22,.18)",
    infoCardBg: isDark ? "rgba(249,115,22,.07)" : "rgba(249,115,22,.05)",
    infoCardBorder: isDark ? "rgba(249,115,22,.16)" : "rgba(249,115,22,.2)",
    toggleBg: isDark ? "rgba(249,115,22,.11)" : "rgba(249,115,22,.1)",
    toggleBorder: isDark ? "rgba(249,115,22,.24)" : "rgba(249,115,22,.28)",
    toggleColor: isDark ? "rgba(255,190,80,.88)" : "rgba(160,50,0,.8)",
  };

  // Filter logic
  const showAndalan = activeFilter === "Semua" || activeFilter === "Soto" || activeFilter === "Rawon";
  const andalanItems = showAndalan
    ? menuUtama.filter((m) => activeFilter === "Semua" ? true : filterMap[activeFilter]?.includes(m.nama))
    : [];
  const pelItems = activeFilter === "Semua"
    ? pelengkap
    : pelengkap.filter((p) => filterMap[activeFilter]?.includes(p.nama));
  const allItems = [
    ...andalanItems.map((i) => ({ ...i, _type: "andalan" })),
    ...pelItems.map((i) => ({ ...i, _type: "pelengkap" })),
  ];

  return (
    <div style={{
      minHeight: "100vh", paddingTop: 62,
      fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
      background: t.bg, color: t.text, overflowX: "hidden",
      transition: "background .3s,color .3s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(70px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .float-card{animation:floatY 4s ease-in-out infinite}
        .pulse-dot{animation:pulseDot 2s ease-in-out infinite}
        .fade-up{animation:fadeSlideUp .55s ease both}
        .nav-link{cursor:pointer;padding:7px 14px;border-radius:22px;font-size:13px;font-weight:600;border:1px solid transparent;transition:all .2s;user-select:none;white-space:nowrap}
        .nav-link:hover{background:rgba(249,115,22,.12);color:#f97316!important}
        .btn-primary{background:linear-gradient(135deg,#f97316,#dc2626);color:#fff;font-size:14px;font-weight:800;padding:13px 28px;border-radius:26px;border:none;cursor:pointer;box-shadow:0 8px 28px rgba(220,38,38,.4);transition:transform .15s,box-shadow .15s;font-family:inherit;letter-spacing:.01em}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(220,38,38,.55)}
        .btn-wa{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#25d366,#128c4a);color:#fff;font-size:14px;font-weight:800;padding:14px 28px;border-radius:26px;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(37,211,102,.35);transition:transform .15s,box-shadow .15s;font-family:inherit;text-decoration:none}
        .btn-wa:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(37,211,102,.5)}
        .theme-toggle{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;padding:8px 16px;border-radius:20px;cursor:pointer;font-family:inherit;transition:background .2s,transform .15s}
        .theme-toggle:hover{transform:scale(1.04)}
        .chip{display:inline-flex;align-items:center;gap:6px;border-radius:40px;padding:9px 18px;cursor:pointer;transition:all .2s;white-space:nowrap;font-family:inherit;font-size:13px;font-weight:600}
        .chip:hover{background:rgba(249,115,22,.15)!important;border-color:rgba(249,115,22,.42)!important;color:#f97316!important}
        .chip.active{background:linear-gradient(135deg,rgba(249,115,22,.22),rgba(220,38,38,.18))!important;border-color:rgba(249,115,22,.55)!important;color:#f97316!important}
        .scroll-hide{overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none}
        .scroll-hide::-webkit-scrollbar{display:none}
        .menu-card{border-radius:18px;overflow:hidden;border:1px solid;cursor:pointer;transition:transform .22s,box-shadow .22s,border-color .22s;display:flex;flex-direction:column}
        .menu-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(220,38,38,.22);border-color:rgba(249,115,22,.45)!important}
        .menu-card-img{width:100%;aspect-ratio:4/3;overflow:hidden;position:relative}
        .menu-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}
        .menu-card:hover .menu-card-img img{transform:scale(1.07)}
        .andalan-card{border-radius:22px;overflow:hidden;border:1px solid;cursor:pointer;transition:transform .22s,box-shadow .22s,border-color .22s;display:flex;flex-direction:column}
        .andalan-card:hover{transform:translateY(-6px);box-shadow:0 20px 52px rgba(220,38,38,.28);border-color:rgba(249,115,22,.5)!important}
        .andalan-card-img{width:100%;aspect-ratio:16/9;overflow:hidden;position:relative}
        .andalan-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}
        .andalan-card:hover .andalan-card-img img{transform:scale(1.05)}
        .tentang-card{border-radius:18px;padding:18px;transition:border-color .2s,transform .2s}
        .tentang-card:hover{border-color:rgba(249,115,22,.42)!important;transform:translateY(-2px)}
        .section-label{font-size:11px;font-weight:700;color:#f97316;text-transform:uppercase;letter-spacing:.15em;margin-bottom:6px}
        .section-title{font-size:clamp(20px,4vw,26px);font-weight:900;margin-bottom:24px;line-height:1.2}
        .stat-num{font-size:22px;font-weight:900;background:linear-gradient(135deg,#fb923c,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        @media(max-width:480px){.nav-links{display:none!important}.hero-float{display:none!important}}
      `}</style>

      {/* MODAL */}
      {selectedItem && <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} isDark={isDark} />}

      {/* ── NAVBAR ── */}
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

      {/* ── HERO ── */}
      <section ref={homeRef} id="home" style={{ position: "relative", padding: "60px 24px 52px", overflow: "hidden", background: t.bg, transition: "background .3s" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 65% -5%,rgba(220,38,38,.34) 0%,transparent 65%),radial-gradient(ellipse 50% 45% at 5% 85%,rgba(249,115,22,.18) 0%,transparent 60%),radial-gradient(ellipse 35% 30% at 90% 80%,rgba(251,191,36,.1) 0%,transparent 60%)"
            : "radial-gradient(ellipse 80% 60% at 65% -5%,rgba(249,115,22,.16) 0%,transparent 65%),radial-gradient(ellipse 50% 45% at 5% 85%,rgba(220,38,38,.08) 0%,transparent 60%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: isDark
            ? "linear-gradient(rgba(249,115,22,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.035) 1px,transparent 1px)"
            : "linear-gradient(rgba(249,115,22,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.045) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr auto", gap: 36, alignItems: "center", maxWidth: 860, margin: "0 auto" }}>
          {/* Left content */}
          <div className="fade-up">
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(249,115,22,.14)", border: "1px solid rgba(249,115,22,.3)",
              color: "#fb923c", fontSize: 11, fontWeight: 700,
              padding: "6px 14px", borderRadius: 22, marginBottom: 20,
              letterSpacing: ".07em", textTransform: "uppercase",
            }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80" }} />
              Buka Setiap Hari · 06.00 – Habis
            </span>

            <p style={{ fontSize: 11, fontWeight: 700, color: t.textMuted, textTransform: "uppercase", letterSpacing: ".18em", marginBottom: 8 }}>Selamat Datang di</p>

            <h1 style={{ fontSize: "clamp(32px,5.5vw,56px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 10, color: t.text }}>
              Warung Makan
              <br />
              <span style={{ background: "linear-gradient(135deg,#f97316 10%,#fbbf24 55%,#f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Bu Iwing</span>
            </h1>

            <p style={{ fontSize: 15, fontWeight: 700, color: "#f97316", marginBottom: 12 }}>Masakan Khas Pacitan</p>
            <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.8, maxWidth: 380, marginBottom: 28 }}>
              Cita rasa otentik warisan leluhur, dimasak dengan penuh cinta menggunakan rempah pilihan khas Pacitan sejak 2025.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
              <button className="btn-primary" onClick={() => scrollTo("menu")}>Lihat Menu →</button>
            </div>

            <div style={{ display: "flex", gap: 32 }}>
              {[{ num: "5+", label: "Menu" }, { num: "1th", label: "Berdiri" }, { num: "★ 5.0", label: "Rating" }].map((s) => (
                <div key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div style={{ fontSize: 11, color: t.textDim, letterSpacing: ".04em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating card */}
          <div className="float-card hero-float" style={{
            background: isDark ? "rgba(249,115,22,.08)" : "rgba(249,115,22,.07)",
            border: `1px solid ${isDark ? "rgba(249,115,22,.22)" : "rgba(249,115,22,.28)"}`,
            borderRadius: 26, padding: 20, width: 176,
            backdropFilter: "blur(12px)", position: "relative",
          }}>
            <div style={{
              position: "absolute", top: -11, right: 12,
              background: "linear-gradient(135deg,#fbbf24,#f97316)",
              color: "#7c2d00", fontSize: 10, fontWeight: 800,
              padding: "4px 11px", borderRadius: 10,
            }}>Sejak 2025</div>
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

      {/* ── MENU ANDALAN ── */}
      <section ref={menuRef} id="menu" style={{ padding: "44px 24px 36px", background: t.bg, transition: "background .3s" }}>
        <div className="section-label">Menu Andalan</div>
        <div className="section-title" style={{ color: t.text }}>
          Pilihan <span style={{ color: "#f97316" }}>Terbaik</span> Kami
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {menuUtama.map((item) => (
            <div key={item.id} className="andalan-card" style={{ background: t.bgCard, borderColor: t.border }} onClick={() => setSelectedItem(item)}>
              <div className="andalan-card-img">
                <img src={item.img} alt={item.nama} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.62) 0%,transparent 55%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 5 }}>
                  {item.andalan && <span style={{ background: "linear-gradient(135deg,#f97316,#dc2626)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 10 }}>★ Andalan</span>}
                  {item.pedas && <span style={{ background: "rgba(220,38,38,.88)", color: "#fecaca", fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 8 }}>🌶 Pedas</span>}
                </div>
                <div style={{ position: "absolute", top: 12, right: 12 }}>
                  <span style={{ background: "rgba(0,0,0,.55)", color: "#fbbf24", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 10 }}>★ 5.0</span>
                </div>
                {/* <div style={{ position: "absolute", bottom: 12, right: 12 }}>
                  <span style={{ background: "rgba(249,115,22,.88)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 10 }}>👆 Lihat Detail</span>
                </div> */}
              </div>
              <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ fontSize: 17, fontWeight: 900, color: t.text }}>{item.nama}</div>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.72, flex: 1 }}>{item.deskripsi}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: "#f97316" }}>{item.harga}</div>
                  <span style={{ fontSize: 11, color: "#f97316", fontWeight: 700, background: "rgba(249,115,22,.13)", border: "1px solid rgba(249,115,22,.28)", padding: "4px 11px", borderRadius: 10 }}>Pesan →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: t.divider }} />

      {/* ── SEMUA MENU ── */}
      <section style={{ padding: "40px 0 44px", background: t.bg, transition: "background .3s" }}>
        <div style={{ padding: "0 24px" }}>
          <div className="section-label">Jelajahi</div>
          <div className="section-title" style={{ color: t.text }}>Semua <span style={{ color: "#f97316" }}>Menu</span></div>
        </div>

        {/* Chips */}
        <div className="scroll-hide" style={{ padding: "0 24px 20px" }}>
          <div style={{ display: "flex", gap: 8, minWidth: "max-content" }}>
            {filterChips.map((chip) => (
              <button key={chip.label} className={`chip${activeFilter === chip.label ? " active" : ""}`}
                style={{ background: t.chipBg, border: `1px solid ${t.chipBorder}`, color: t.chipColor }}
                onClick={() => setActiveFilter(chip.label)}>
                <span style={{ fontSize: 15 }}>{chip.icon}</span>{chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {allItems.length === 0 ? (
          <div style={{ padding: "40px 24px", textAlign: "center", color: t.textMuted, fontSize: 14 }}>Tidak ada menu untuk kategori ini.</div>
        ) : (
          <div style={{ padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(158px,1fr))", gap: 14 }}>
            {allItems.map((item, idx) => (
              <div key={idx} className="menu-card"
                style={{ background: item._type === "andalan" ? t.bgCard : t.bgSurface, borderColor: t.border }}
                onClick={() => setSelectedItem(item)}>
                <div className="menu-card-img">
                  <img src={item.img} alt={item.nama} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.52) 0%,transparent 50%)", pointerEvents: "none" }} />
                  {item._type === "andalan" && (
                    <div style={{ position: "absolute", top: 8, left: 8 }}>
                      <span style={{ background: "linear-gradient(135deg,#f97316,#dc2626)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>★ Andalan</span>
                    </div>
                  )}
                  <div style={{ position: "absolute", bottom: 8, right: 8 }}>
                    <span style={{ background: "rgba(249,115,22,.9)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>👆 Detail</span>
                  </div>
                </div>
                <div style={{ padding: "10px 12px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: t.text, lineHeight: 1.35 }}>{item.nama}</div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: item._type === "andalan" ? "#f97316" : "#fb923c" }}>{item.harga}</div>
                  <div style={{ fontSize: 10, color: "#fbbf24" }}>{"★".repeat(5)} {item.rating || "4.9"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div style={{ height: 1, background: t.divider }} />

      {/* ── TENTANG ── */}
      <section ref={tentangRef} id="tentang" style={{ padding: "44px 24px", background: t.bg, transition: "background .3s" }}>
        <div className="section-label">Tentang Kami</div>
        <div className="section-title" style={{ color: t.text }}>Warung <span style={{ color: "#f97316" }}>Bu Iwing</span></div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(168px,1fr))", gap: 14 }}>
          {[
            { icon: "🍳", title: "Dimasak Segar", desc: "Setiap hari dimasak dari bahan segar pilihan, tanpa pengawet." },
            { icon: "📍", title: "Lokasi Strategis", desc: "Jl. Hercules No J7, Bumi Antariksa, Kota Madiun." },
            { icon: "🕕", title: "Buka Setiap Hari", desc: "Kami buka setiap hari mulai pukul 06.00 pagi hingga habis." },
            { icon: "🌶️", title: "Bumbu Khas", desc: "Racikan bumbu turun-temurun dari Pacitan, kaya rempah alami." },
            { icon: "💰", title: "Harga Terjangkau", desc: "Porsi kenyang, harga bersahabat, cocok untuk semua kalangan." },
            { icon: "⭐", title: "5 Bintang", desc: "Dipercaya pelanggan setia selama kurang lebih 1 tahun." },
          ].map((c) => (
            <div key={c.title} className="tentang-card" style={{ background: t.bgSurface, border: `1px solid ${t.border}` }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: t.text, marginBottom: 5 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.65 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: t.divider }} />

      {/* ── KONTAK ── */}
      <section ref={kontakRef} id="kontak" style={{
        padding: "44px 24px 52px",
        background: isDark
          ? "linear-gradient(160deg,rgba(220,38,38,.12) 0%,rgba(249,115,22,.08) 50%,rgba(251,191,36,.06) 100%)"
          : "linear-gradient(160deg,rgba(249,115,22,.08) 0%,rgba(220,38,38,.04) 100%)",
        transition: "background .3s",
      }}>
        {/* CTA Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="section-label" style={{ textAlign: "center" }}>Kontak</div>
          <h2 style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 900, marginBottom: 10, color: t.text }}>
            Mau <span style={{ color: "#f97316" }}>Pesan?</span>
          </h2>
          <p style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.8, maxWidth: 340, margin: "0 auto 24px" }}>
            Hubungi kami langsung via WhatsApp untuk pemesanan, pertanyaan, atau info lebih lanjut.
          </p>
          <a className="btn-wa" href={waLink("Halo Bu Iwing, saya ingin memesan makanan 🙏")} target="_blank" rel="noreferrer"
            style={{ justifyContent: "center", display: "inline-flex" }}>
            <IconWA /> Pesan via WhatsApp
          </a>
        </div>

        {/* Google Maps */}
        <div style={{
          borderRadius: 22, overflow: "hidden",
          border: `2px solid ${isDark ? "rgba(249,115,22,.22)" : "rgba(249,115,22,.3)"}`,
          boxShadow: isDark ? "0 8px 36px rgba(0,0,0,.45),0 0 0 1px rgba(249,115,22,.1)" : "0 8px 32px rgba(220,38,38,.12)",
          marginBottom: 28,
        }}>
          <iframe
            src="https://www.google.com/maps?q=-7.6472642,111.5284371&hl=id&z=17&output=embed"
            width="100%"
            height="320"
            style={{
              display: "block", border: "none",
              filter: isDark ? "invert(90%) hue-rotate(180deg) saturate(0.85)" : "none",
              transition: "filter .3s",
            }}
            allowFullScreen
            loading="lazy"
            title="Lokasi Warung Bu Iwing"
          />
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {[
            { icon: "📍", label: "Alamat", text: "Jl. Hercules No J7, Bumi Antariksa, Kota Madiun" },
            { icon: "🕕", label: "Jam Buka", text: "06.00 – Habis WIB" },
            { icon: "📅", label: "Operasional", text: "Buka Setiap Hari" },
          ].map((i) => (
            <div key={i.text} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              background: t.infoCardBg, border: `1px solid ${t.infoCardBorder}`,
              borderRadius: 14, padding: "14px 16px",
            }}>
              <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{i.icon}</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 3 }}>{i.label}</div>
                <div style={{ fontSize: 12, color: t.textMuted, lineHeight: 1.5 }}>{i.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
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
      <div style={{ fontSize: 11, color: t.textDim }}>Made with ❤️ — Masakan Khas Pacitan</div>
      </footer>
    </div>
  );
}