import { useEffect, useRef } from "react";

export default function BackToTop() {
  const btnRef = useRef(null);

  useEffect(() => {
    const update = () => {
      btnRef.current.classList.toggle("visible", window.scrollY > 400);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button className="back-to-top" ref={btnRef} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="返回顶部">
      U
    </button>
  );
}
