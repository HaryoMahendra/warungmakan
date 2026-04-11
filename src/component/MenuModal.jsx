import { useEffect } from "react";
import { IconWA } from "./icons/Icons";
import { waLink } from "../constants/data";

export default function MenuModal({ item, onClose, t }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const pesanMsg = `Halo RM Soto Ayam, saya ingin memesan *${item.nama}* (${item.harga}) 🙏`;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "rgba(0,0,0,0.72)", display: "flex", alignItems: "flex-end", justifyContent: "center",
      backdropFilter: "blur(6px)", animation: "fadeIn .18s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: t.card, borderRadius: "24px 24px 0 0",
        width: "100%", maxWidth: 540, maxHeight: "88vh", overflowY: "auto",
        animation: "slideUp .28s cubic-bezier(.34,1.1,.64,1)",
        border: `1px solid ${t.borderStrong}`, borderBottom: "none",
      }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/8", overflow: "hidden", borderRadius: "24px 24px 0 0" }}>
          <img src={item.img} alt={item.nama} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.8) 0%,rgba(0,0,0,.1) 55%,transparent 100%)" }} />
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14, background: "rgba(0,0,0,.55)",
            border: "1px solid rgba(255,255,255,.15)", borderRadius: "50%", width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", cursor: "pointer", fontSize: 16,
          }}>✕</button>
          <div style={{ position: "absolute", top: 14, left: 14 }}>
            {item.andalan && <span style={{ background: t.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: ".05em", textTransform: "uppercase" }}>Andalan</span>}
          </div>
          <div style={{ position: "absolute", bottom: 18, left: 20, right: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "'Playfair Display',Georgia,serif", marginBottom: 4 }}>{item.nama}</div>
            <div style={{ fontSize: 11, color: "rgba(255,210,130,.8)", letterSpacing: ".08em", textTransform: "uppercase" }}>{item.kategori}</div>
          </div>
        </div>
        <div style={{ padding: "22px 22px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, paddingBottom: 20, borderBottom: `1px solid ${t.divider}` }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 900, color: t.accent, lineHeight: 1, fontFamily: "'Playfair Display',Georgia,serif" }}>{item.harga}</div>
              <div style={{ fontSize: 11, color: t.textDim, marginTop: 4 }}>{item.porsi || "1 Porsi"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, color: "#f59e0b", letterSpacing: 3 }}>★★★★★</div>
              <div style={{ fontSize: 11, color: t.textDim, marginTop: 3 }}>Rating {item.rating || "5.0"}</div>
            </div>
          </div>
          <div style={{ fontSize: 13.5, color: t.textMuted, lineHeight: 1.85, marginBottom: 22 }}>{item.deskripsiLengkap || item.deskripsi}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
            {[item.kategori, item.harga, item.porsi || "1 Porsi"].map(l => (
              <span key={l} style={{ background: t.surface, border: `1px solid ${t.border}`, color: t.accentSoft, fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 6 }}>{l}</span>
            ))}
          </div>
          <a href={waLink(pesanMsg)} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "#16a34a", color: "#fff", fontSize: 14, fontWeight: 700,
            padding: "15px 28px", borderRadius: 12, textDecoration: "none",
          }}>
            <IconWA /> Pesan Sekarang — {item.harga}
          </a>
        </div>
      </div>
    </div>
  );
}