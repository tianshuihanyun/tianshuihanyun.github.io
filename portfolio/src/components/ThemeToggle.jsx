import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="切换主题">
      <span className="toggle-track">
        <span>{dark ? "深色" : "浅色"}</span>
        <span className={`toggle-thumb ${dark ? "right" : "left"}`} />
      </span>
    </button>
  );
}
