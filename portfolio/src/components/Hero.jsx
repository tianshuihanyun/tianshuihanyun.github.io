import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef(null);
  const noiseRef = useRef(null);
  const userPausedRef = useRef(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const w = 256, h = 256;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(w, h);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.random() * 255;
      imgData.data[i] = v;
      imgData.data[i + 1] = v;
      imgData.data[i + 2] = v;
      imgData.data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    if (noiseRef.current) {
      noiseRef.current.style.backgroundImage = `url(${dataUrl})`;
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo("video", { opacity: 0 }, { opacity: 1, duration: 1.5 });
      tl.fromTo(titleRef.current, { clipPath: "inset(0 50% 0 50%)", y: 60, opacity: 0 },
        { clipPath: "inset(0 0% 0 0%)", y: 0, opacity: 1, duration: 1.2 }, "-=0.8");
      tl.fromTo(subtitleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4");
      tl.fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPausedRef.current) {
            video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
          }
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  const toggleVideo = () => {
    if (videoRef.current.paused) {
      userPausedRef.current = false;
      videoRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      userPausedRef.current = true;
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      <div className="hero-overlay" />
      <div ref={noiseRef} className="hero-noise" />
      <div className="hero-bottom-fade" />
      <video ref={videoRef} className="hero-video" src="/assets/视频背景.mp4" autoPlay muted loop playsInline preload="metadata" />
      <button className="video-toggle" onClick={toggleVideo} aria-label={playing ? "暂停" : "播放"}>
        {playing ? "I I" : ">"}
      </button>
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          <span className="hero-title-line">三维空间 · 视觉创意</span>
        </h1>
        <p className="hero-subtitle" ref={subtitleRef}>视觉设计 / AI 创意 / 3D设计</p>
        <div className="hero-cta" ref={ctaRef}>
          <a className="cta-primary" href="#projects">查看作品</a>
          <a className="cta-secondary" href="#contact">联系我</a>
        </div>
      </div>
    </section>
  );
}



