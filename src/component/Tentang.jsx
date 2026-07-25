export default function Tentang({ tentangRef, t }) {
  return (
    <section ref={tentangRef} id="tentang" style={{ padding: "80px 36px", background: t.bgAlt }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div className="tentang-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          {/* Foto warung */}
          <div style={{ borderRadius: 24, overflow: "hidden", border: `1px solid ${t.border}` }}>
            <img
              src="/assets/Logo.png"
              alt="Rumah Makan Soto Ayam Kampung"
              style={{ width: "100%", height: "100%", minHeight: 420, objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Teks */}
          <div>
            <p className="eyebrow" style={{ color: t.accent }}>Tentang Kami</p>
            <h2 className="serif" style={{ fontSize: "clamp(28px,3.4vw,44px)", fontWeight: 900, lineHeight: 1.08, color: t.text, marginBottom: 22 }}>
              Rumah Makan<br /><em style={{ color: t.accent, fontStyle: "italic" }}>Soto Ayam Kampung</em>
            </h2>
            <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.9, marginBottom: 18 }}>
              Hadir sejak 2025 di Kota Madiun, Rumah Makan Soto Ayam membawa cita rasa otentik masakan khas Pacitan. Setiap hidangan dimasak langsung dari bahan segar tanpa pengawet, menjaga keaslian rasa yang sudah dikenal turun-temurun.
            </p>
            <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.9, marginBottom: 26 }}>
              Dengan harga yang sangat terjangkau dan porsi yang mengenyangkan, kami hadir untuk semua kalangan yang ingin menikmati masakan rumahan berkualitas.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px" }}>
              {[
                "Bahan segar setiap hari, tanpa pengawet",
                "Bumbu asli, rempah turun-temurun khas Pacitan",
                "Buka tiap hari, pukul 06.00 WIB - habis",
              ].map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 13.5, color: t.textMuted, lineHeight: 1.6 }}>
                  <span style={{ color: t.accent, marginTop: 2 }}>•</span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: `1px solid ${t.border}`, marginBottom: 30 }}>
              {[{ label: "Mulai dari", val: "Rp 2.000" }, { label: "Buka", val: "Tiap Hari" }, { label: "Sejak", val: "2025" }].map((item, i) => (
                <div key={item.label} style={{ flex: 1, padding: "14px 16px", textAlign: "center", background: t.surface, borderLeft: i > 0 ? `1px solid ${t.border}` : "none" }}>
                  <div style={{ fontSize: 10, color: t.textDim, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 3 }}>{item.label}</div>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 900, color: t.accent }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}