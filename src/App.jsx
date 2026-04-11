import { useState, useEffect, useRef } from "react";
import { useScroll } from "./hooks/useScroll";
import { getTheme } from "./hooks/useTheme";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Tentang from "./component/Tentang";
import Menu from "./component/Menu";
import Kontak from "./component/Kontak";
import Footer from "./component/Footer";
import MenuModal from "./component/MenuModal";
import "./styles/globals.css";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const homeRef = useRef(null);
  const tentangRef = useRef(null);
  const menuRef = useRef(null);
  const kontakRef = useRef(null);
  const sectionRefs = { home: homeRef, tentang: tentangRef, menu: menuRef, kontak: kontakRef };

  const { activeSection, scrolled } = useScroll(sectionRefs);
  const t = getTheme(isDark, scrolled);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  const scrollTo = (id) => {
    const el = sectionRefs[id]?.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64, fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif", background: t.bg, color: t.text, overflowX: "hidden", transition: "background .35s,color .35s" }}>
      {selectedItem && <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} t={t} />}
      <Navbar activeSection={activeSection} scrolled={scrolled} isDark={isDark} setIsDark={setIsDark} scrollTo={scrollTo} t={t} />
      <Hero homeRef={homeRef} isDark={isDark} scrollTo={scrollTo} t={t} />
      <div style={{ height: 1, background: t.divider }} />
      <Tentang tentangRef={tentangRef} t={t} />
      <div style={{ height: 1, background: t.divider }} />
      <Menu menuRef={menuRef} t={t} setSelectedItem={setSelectedItem} />
      <div style={{ height: 1, background: t.divider }} />
      <Kontak kontakRef={kontakRef} isDark={isDark} t={t} />
      <div style={{ height: 1, background: t.divider }} />
      <Footer scrollTo={scrollTo} t={t} />
    </div>
  );
}