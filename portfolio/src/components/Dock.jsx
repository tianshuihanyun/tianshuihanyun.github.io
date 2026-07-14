import { useRef, useState, useCallback } from "react";
import "./Dock.css";

export default function Dock({
  items, children, className = "",
  magnification = 64, distance = 250, panelHeight = 56, baseSize = 46,
}) {
  const [mouseX, setMouseX] = useState(null);
  const [hovered, setHovered] = useState(false);
  const itemRefs = useRef([]);
  const outerRef = useRef(null);

  // 固定宽度=baseSize，所有放大效果通过 transform:scale 实现（不影响布局）
  const getScale = useCallback((index) => {
    if (mouseX === null) return 1;
    const el = itemRefs.current[index];
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - center);
    if (dist >= distance) return 1;
    const ratio = 1 + (1 - dist / distance) * (magnification / baseSize - 1);
    return Math.max(1, Math.min(ratio, magnification / baseSize));
  }, [mouseX, distance, magnification, baseSize]);

  const handleMouseMove = useCallback((e) => {
    setMouseX(e.clientX);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
    setHovered(false);
  }, []);

  return (
    <div
      ref={outerRef}
      className={`dock-outer ${hovered ? "is-hovered" : ""}`}
      style={{ height: hovered ? Math.max(panelHeight + 80, magnification + 20) : panelHeight }}
    >
      <div
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        role="toolbar"
        aria-label="导航栏"
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className="dock-item"
            style={{ width: baseSize, height: baseSize }}
            onClick={item.onClick}
            tabIndex={0}
            role="button"
            aria-label={item.label}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); item.onClick?.(); } }}
          >
            <span
              className="dock-icon"
              style={{ transform: `scale(${getScale(i)})` }}
            >
              {item.icon}
            </span>
            <span className="dock-label">{item.label}</span>
          </div>
        ))}
        {children && <span className="dock-separator" />}
        {children}
      </div>
    </div>
  );
}
