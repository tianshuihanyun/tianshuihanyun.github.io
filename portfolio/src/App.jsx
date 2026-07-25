import ThemeProvider from "./hooks/ThemeProvider";
import { useTheme } from "./hooks/useTheme";
import ScrollProgress from "./components/ScrollProgress";
import Dock from "./components/Dock";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Advantages from "./components/Advantages";
import Contact from "./components/Contact";
import BackToTop from "./components/BackToTop";
import ClickSpark from "./components/ClickSpark";
import "./App.css";

const navItems = [
  { icon: "首页", label: "首页", onClick: () => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: "经历", label: "经历", onClick: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: "作品", label: "作品", onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: "优势", label: "优势", onClick: () => document.getElementById("advantages")?.scrollIntoView({ behavior: "smooth" }) },
  { icon: "联系", label: "联系", onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
];

function ThemeDockToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button className="dock-theme-toggle" onClick={toggle} aria-label="切换主题">
      {dark ? "浅色" : "深色"}
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ClickSpark sparkColor="#c084fc" sparkSize={8} sparkRadius={18} sparkCount={6} duration={500}>
        <ScrollProgress />
        <Dock items={navItems} panelHeight={56} baseSize={44} magnification={66}>
          <ThemeDockToggle />
        </Dock>
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Advantages />
          <Contact />
        </main>
        <BackToTop />
      </ClickSpark>
    </ThemeProvider>
  );
}
