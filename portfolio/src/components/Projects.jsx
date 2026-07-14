import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageModal from "./ImageModal";
gsap.registerPlugin(ScrollTrigger);

const largeProjects = [
  { title: "3D 场景渲染", subtitle: "三维空间 · 光影叙事", image: "/assets/3d建模渲染-场景.png" },
  { title: "产品键盘建模", subtitle: "工业设计 · 写实渲染", image: "/assets/3d建模渲染-键盘.png" },
];

const smallProjects = [
  { title: "卡通小房子", subtitle: "3D 角色场景", image: "/assets/3d-卡通小房子.png" },
  { title: "花瓶建模", subtitle: "产品造型设计", image: "/assets/3d-花瓶.png" },
  { title: "3D 锤子", subtitle: "硬表面建模", image: "/assets/3d-锤子.png" },
  { title: "素描作品", subtitle: "传统美术功底", image: "/assets/学生时素描作品.jpg" },
  { title: "手绘 · 魈", subtitle: "游戏角色同人", image: "/assets/年轻时手绘作品-游戏人物-魈.jpg" },
  { title: "水粉 · 古镇", subtitle: "色彩风景写生", image: "/assets/年轻时水粉色彩作品-古镇风景.jpg" },
  { title: "水粉 · 风景", subtitle: "自然光影记录", image: "/assets/年轻时水粉色彩作品-风景1.jpg" },
  { title: "水粉 · 餐桌", subtitle: "生活静物创作", image: "/assets/年轻时水粉色彩作品-餐桌上的猫.jpg" },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [modal, setModal] = useState({ open: false, src: "", title: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { x: -200, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".project-large", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".project-large", start: "top 85%" },
      });
      gsap.fromTo(".project-small", { y: 40, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: "power3.out",
        scrollTrigger: { trigger: ".project-small", start: "top 90%" },
      });
      document.querySelectorAll(".project-large").forEach((card) => {
        gsap.to(card.querySelector(".project-img-wrap"), {
          y: -30, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="section-inner">
        <h2 className="section-title-ch" ref={titleRef}>精选作品</h2>

        {/* 大图区 */}
        <div className="projects-large">
          {largeProjects.map((p, i) => (
            <div className="project-large" key={i} onClick={() => setModal({ open: true, src: p.image, title: p.title })}>
              <div className="project-img-wrap">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="project-info">
                <h3>{p.title}</h3>
                <p className="project-sub">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 小图区 */}
        <div className="projects-small">
          {smallProjects.map((p, i) => (
            <div className="project-small" key={i} onClick={() => setModal({ open: true, src: p.image, title: p.title })}>
              <div className="project-img-wrap">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="project-info">
                <h3>{p.title}</h3>
                <p className="project-sub">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ImageModal isOpen={modal.open} onClose={() => setModal({ open: false, src: "", title: "" })} src={modal.src} title={modal.title} />
    </section>
  );
}
