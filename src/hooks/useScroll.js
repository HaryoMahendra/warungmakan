import { useState, useEffect } from "react";

export function useScroll(sectionRefs) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = ["home", "tentang", "menu", "kontak"];
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (isBottom) { setActiveSection("kontak"); return; }
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sectionRefs[sections[i]]?.current;
        if (el && window.scrollY >= el.offsetTop - 80) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionRefs]);

  return { activeSection, scrolled };
}