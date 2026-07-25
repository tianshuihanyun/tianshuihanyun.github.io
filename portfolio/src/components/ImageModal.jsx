import { useEffect, useRef, useCallback } from "react";

export default function ImageModal({ isOpen, onClose, src, title }) {
  const overlayRef = useRef(null);
  const visualRef = useRef(null);
  const zoomRef = useRef({ scale: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const resetZoom = useCallback(() => {
    zoomRef.current = { scale: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 };
    if (visualRef.current) {
      visualRef.current.classList.remove("is-zoomable", "is-dragging");
      const el = visualRef.current.querySelector("img, video");
      if (el) el.style.transform = "scale(1) translate(0, 0)";
    }
  }, []);

  const updateZoomable = useCallback(() => {
    const wrapper = visualRef.current;
    const el = wrapper?.querySelector("img, video");
    if (!wrapper || !el) return;
    const naturalWidth = el instanceof HTMLVideoElement ? el.videoWidth : el.naturalWidth;
    const naturalHeight = el instanceof HTMLVideoElement ? el.videoHeight : el.naturalHeight;
    const isLarger = naturalWidth > window.innerWidth * 0.9 || naturalHeight > window.innerHeight * 0.85;
    wrapper.classList.toggle("is-zoomable", isLarger);
  }, []);

  useEffect(() => {
    if (!isOpen) { resetZoom(); return; }
    resetZoom();
  }, [isOpen, src, resetZoom]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleWheel = (e) => {
    if (!visualRef.current?.classList.contains("is-zoomable")) return;
    e.preventDefault();
    const z = zoomRef.current;
    const ratio = e.deltaY < 0 ? 1.12 : 0.89;
    const next = Math.min(5, Math.max(0.1, z.scale * ratio));
    if (next === z.scale) return;
    const rect = visualRef.current.getBoundingClientRect();
    // 鼠标相对于元素中心的位置
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    // 使鼠标指向的图片位置保持不动
    z.x += dx * (z.scale - next) / (z.scale * next);
    z.y += dy * (z.scale - next) / (z.scale * next);
    z.scale = next;
    const el = visualRef.current.querySelector("img, video");
    if (el) el.style.transform = `scale(${z.scale}) translate(${z.x}px, ${z.y}px)`;
  };

  const handlePointerDown = (e) => {
    if (!visualRef.current?.classList.contains("is-zoomable") || zoomRef.current.scale <= 1) return;
    const z = zoomRef.current;
    z.dragging = true;
    z.startX = e.clientX; z.startY = e.clientY;
    z.originX = z.x; z.originY = z.y;
    visualRef.current.classList.add("is-dragging");
    visualRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!zoomRef.current.dragging) return;
    const z = zoomRef.current;
    z.x = z.originX + e.clientX - z.startX;
    z.y = z.originY + e.clientY - z.startY;
    const el = visualRef.current.querySelector("img, video");
    if (el) el.style.transform = `scale(${z.scale}) translate(${z.x}px, ${z.y}px)`;
  };

  const stopDrag = (e) => {
    if (!zoomRef.current.dragging) return;
    zoomRef.current.dragging = false;
    visualRef.current?.classList.remove("is-dragging");
    if (visualRef.current?.hasPointerCapture(e.pointerId)) visualRef.current.releasePointerCapture(e.pointerId);
  };

  if (!isOpen) return null;

  const isVideo = src?.endsWith(".mp4");

  return (
    <div className={`modal-overlay ${isOpen ? "is-open" : ""}`} ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <button className="modal-close" onClick={onClose}>X</button>
      <div
        className="modal-visual"
        ref={visualRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        {isVideo ? (
          <video src={src} controls autoPlay onLoadedMetadata={updateZoomable} />
        ) : (
          <img src={src} alt={title || "preview"} draggable={false} onLoad={updateZoomable} />
        )}
      </div>
      {title && <div className="modal-info">{title}</div>}
    </div>
  );
}


