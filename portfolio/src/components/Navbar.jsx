import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".nav-item",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.3, ease: "power3.out" }
      );
    }, navRef.current);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-logo" onClick={() => scrollTo("hero")}>
        作品集<span className="dot">.</span>
      </div>
      <div className="nav-links">
        {[
          { label: "经历", id: "experience" },
          { label: "作品", id: "projects" },
          { label: "优势", id: "advantages" },
          { label: "联系", id: "contact" },
        ].map((item) => (
          <button key={item.id} className="nav-item" onClick={() => scrollTo(item.id)}>
            {item.label}
          </button>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
