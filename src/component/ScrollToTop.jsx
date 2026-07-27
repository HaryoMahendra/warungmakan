import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const prev = prevPathname.current;
    const isMenuToMenu =
      prev.startsWith("/menu") && pathname.startsWith("/menu");

    if (!isMenuToMenu) {
      window.scrollTo(0, 0);
    }

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}