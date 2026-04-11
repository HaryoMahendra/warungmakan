import { IconWA } from "./icons/Icons";
import { waLink } from "../constants/data";

export default function Kontak({ kontakRef, isDark, t }) {
  return (
    <section ref={kontakRef} id="kontak" style={{ padding: "80px 36px", background: t.bgAlt }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="eyebrow" style={{ color: t.accent }}>Hubungi Kami</p>
          <h2 className="serif" style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 900, lineHeight: 1.06, color: t.text, marginBottom: 18 }}>
            Siap <em style={{ color: t.accent, fontStyle: "italic" }}>Memesan</em>?
          </h2>
          <p style={{ fontSize: 14, color: t.textMuted, maxWidth: 360, margin: "0 auto 28px", lineHeight: 1.85 }}>
            Pesan langsung via WhatsApp atau kunjungi kami di lokasi. Kami siap melayani dengan sepenuh hati.
          </p>
          <a className="btn-wa" href={waLink("Halo RM Soto Ayam, saya ingin memesan makanan 🙏")} target="_blank" rel="noreferrer" style={{ display: "inline-flex" }}>
            <IconWA /> Pesan via WhatsApp
          </a>
        </div>

        <div className="kontak-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "stretch" }}>
          <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${t.borderStrong}`, minHeight: 320 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.3112841301335!2d111.53921328485012!3d-7.630304421908749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79bf0039212bad%3A0xb5d6eb252b3cf246!2sRM.%20Soto%20Ayam%20Kampung%20Khas%20Pacitan!5e0!3m2!1sen!2sid!4v1775880274408!5m2!1sen!2sid"
              width="100%" height="100%"
              style={{ display: "block", border: "none", minHeight: 320, filter: isDark ? "invert(90%) hue-rotate(180deg) saturate(.85)" : "none", transition: "filter .3s" }}
              allowFullScreen loading="lazy" title="Lokasi RM Soto Ayam"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { iconPath: <><path d="M12 21s-8-6.5-8-12a8 8 0 1116 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></>, label: "Alamat", value: "Perum Bumi Antariksa, Jl. Hercules Blok J No.6, Klegen, Kartoharjo, Kota Madiun, Jawa Timur" },
              { iconPath: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>, label: "Jam Operasional", value: "Setiap Hari · 06.00 WIB - Habis" },
              { isWA: true, label: "WhatsApp", value: "+62 812-3456-7890 · Respon cepat" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", flex: 1, background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "18px" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: t.surface, border: `1px solid ${t.borderStrong}`, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent }}>
                  {row.isWA
                    ? <IconWA size={20} />
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{row.iconPath}</svg>
                  }
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: t.accent, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 5 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.65 }}>{row.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}