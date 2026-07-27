import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getTheme } from "./hooks/useTheme";
import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import Tentang from "./component/Tentang";
import Menu from "./component/Menu";
import Kontak from "./component/Kontak";
import Footer from "./component/Footer";
import MenuModal from "./component/MenuModal";
import ScrollToTop from "./component/ScrollToTop";
import "./styles/globals.css";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const t = getTheme(isDark, scrolled);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64, fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif", background: t.bg, color: t.text, overflowX: "hidden", transition: "background .35s,color .35s" }}>
      <ScrollToTop />
      {selectedItem && <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} t={t} />}
      <Navbar scrolled={scrolled} isDark={isDark} setIsDark={setIsDark} t={t} />

      <Routes>
        <Route path="/" element={<Hero isDark={isDark} t={t} />} />
        <Route path="/tentang" element={<Tentang t={t} />} />
        <Route path="/menu" element={<Menu t={t} setSelectedItem={setSelectedItem} />} />
        <Route path="/menu/:kategori" element={<Menu t={t} setSelectedItem={setSelectedItem} />} />
        <Route path="/kontak" element={<Kontak isDark={isDark} t={t} />} />
      </Routes>

      <div style={{ height: 1, background: t.divider }} />
      <Footer t={t} />
    </div>
  );
}