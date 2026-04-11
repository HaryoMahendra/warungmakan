export default function Tentang({ tentangRef, t }) {
  return (
    <section ref={tentangRef} id="tentang" style={{ padding: "80px 36px", background: t.bgAlt }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div className="tentang-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p className="eyebrow" style={{ color: t.accent }}>Tentang Kami</p>
            <h2 className="serif" style={{ fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 900, lineHeight: 1.08, color: t.text, marginBottom: 22 }}>
              Warung Makan<br /><em style={{ color: t.accent, fontStyle: "italic" }}>RM Soto Ayam</em>
            </h2>
            <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.9, marginBottom: 18 }}>
              Hadir sejak 2025 di Kota Madiun, Rumah Makan Soto Ayam membawa cita rasa otentik masakan khas Pacitan. Setiap hidangan dimasak langsung dari bahan segar tanpa pengawet, menjaga keaslian rasa yang sudah dikenal turun-temurun.
            </p>
            <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.9, marginBottom: 34 }}>
              Dengan harga yang sangat terjangkau dan porsi yang mengenyangkan, kami hadir untuk semua kalangan yang ingin menikmati masakan rumahan berkualitas.
            </p>
            <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: `1px solid ${t.border}` }}>
              {[{ label: "Mulai dari", val: "Rp 2.000" }, { label: "Buka", val: "Tiap Hari" }, { label: "Sejak", val: "2025" }].map((item, i) => (
                <div key={item.label} style={{ flex: 1, padding: "14px 16px", textAlign: "center", background: t.surface, borderLeft: i > 0 ? `1px solid ${t.border}` : "none" }}>
                  <div style={{ fontSize: 10, color: t.textDim, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3 }}>{item.label}</div>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 900, color: t.accent }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-grid">
            {[
              { icon: "🍳", title: "Masak Segar", desc: "Bahan segar setiap hari, tanpa pengawet apapun" },
              { icon: "📍", title: "Lokasi", desc: "Perum Bumi Antariksa, Jl. Hercules J6, Madiun" },
              { icon: "🕕", title: "Buka Tiap Hari", desc: "Pukul 06.00 WIB hingga stok habis" },
              { icon: "🌶", title: "Bumbu Asli", desc: "Rempah turun-temurun khas Pacitan" },
              { icon: "💰", title: "Harga Ramah", desc: "Mulai Rp 2.000 untuk semua kalangan" },
              { icon: "⭐", title: "5 Bintang", desc: "Dipercaya pelanggan setia sejak berdiri" },
            ].map(c => (
              <div key={c.title} className="info-tile" style={{ background: t.card, borderColor: t.border }}>
                <div style={{ fontSize: 22, marginBottom: 9 }}>{c.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: t.text, marginBottom: 5 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: t.textMuted, lineHeight: 1.65 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}