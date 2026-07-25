import { useRef, useCallback, useState } from "react";

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers = [
    [0, 0, 0, 1, 100, true], [0, 0, 1, 0, 60, true], [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true], [0, 0, 15, 0, 30, true], [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false], [0, 0, 3, 0, 50, false], [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false], [0, 0, 25, 2, 20, false], [0, 0, 50, 2, 10, false],
  ];
  return layers.map(([x, y, blur, spread, alpha, inset]) => {
    const a = Math.min(alpha * intensity, 100);
    return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
  }).join(", ");
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 35,
  glowColor = "40 80 80",
  backgroundColor = "transparent",
  borderRadius = 28,
  glowRadius = 20,
  glowIntensity = 0.8,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(0);
  const [edgeProximity, setEdgeProximity] = useState(0);

  const getEdgeProximity = useCallback((el, x, y) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, []);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
    const angleDeg = ((angle * 180) / Math.PI + 90 + 360) % 360;
    setCursorAngle(angleDeg);
    setEdgeProximity(getEdgeProximity(card, e.clientX - rect.left, e.clientY - rect.top));
  }, [getEdgeProximity]);

  const sFactor = edgeSensitivity / 100;
  const glowOpacity = isHovered
    ? Math.max(0, (edgeProximity - sFactor) / (1 - sFactor))
    : 0;
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => { setIsHovered(false); setEdgeProximity(0); }}
      className={className}
      style={{
        position: "relative",
        height: "100%",
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
      }}
    >
      <span
        style={{
          position: "absolute",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "inherit",
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          opacity: glowOpacity * 0.65,
          mixBlendMode: "plus-lighter",
          transition: isHovered ? "opacity 0.2s ease-out" : "opacity 0.5s ease-in-out",
        }}
      >
        <span
          style={{
            position: "absolute",
            borderRadius: "inherit",
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
