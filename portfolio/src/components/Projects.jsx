import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageModal from "./ImageModal";
import Stack from "./Stack";
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

const PREFIX = "/assets/更多作品/";

// 左侧 —— 电脑制作（3D卡通 + 工程文件）
const leftWorks = [
  { title: "3D 卡通小房子", src: PREFIX + "3d-卡通小房子.png" },
  { title: "3D 花瓶", src: PREFIX + "3d-花瓶.png" },
  { title: "3D 锤子", src: PREFIX + "3d-锤子.png" },
  { title: "卡通房子渲染", src: PREFIX + "3d-卡通房子工程文件-渲染.jpg" },
  { title: "工程文件截图", src: PREFIX + "3d-卡通房子工程文件截图.jpg" },
  { title: "工程文件截图2", src: PREFIX + "3d-卡通房子工程文件截图2.png" },
];

// 右侧 —— 手绘创作（手绘 + 素描 + 水粉）
const rightWorks = [
  { title: "手绘 · 魈", src: PREFIX + "年轻时手绘作品-游戏人物-魈.jpg" },
  { title: "手绘 · 安晴", src: PREFIX + "年轻时手绘作品-表情包人物-安晴.jpg" },
  { title: "素描作品", src: PREFIX + "学生时素描作品.jpg" },
  { title: "水粉 · 古镇一角", src: PREFIX + "年轻时水粉色彩作品-古镇一角.jpg" },
  { title: "水粉 · 古镇建筑", src: PREFIX + "年轻时水粉色彩作品-古镇建筑一角.jpg" },
  { title: "水粉 · 古镇风景", src: PREFIX + "年轻时水粉色彩作品-古镇风景.jpg" },
  { title: "水粉 · 建筑一角", src: PREFIX + "年轻时水粉色彩作品-建筑一角.jpg" },
  { title: "水粉 · 风景1", src: PREFIX + "年轻时水粉色彩作品-风景1.jpg" },
  { title: "水粉 · 风景2", src: PREFIX + "年轻时水粉色彩作品-风景2.jpg" },
  { title: "水粉 · 风景3", src: PREFIX + "年轻时水粉色彩作品-风景3.jpg" },
  { title: "水粉 · 餐桌", src: PREFIX + "年轻时水粉色彩作品-餐桌上的猫.jpg" },
];

function buildStackCards(list) {
  return list.map((item) => (
    <img
      key={item.src}
      src={item.src}
      alt={item.title}
      draggable={false}
      style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
    />
  ));
}

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stackSectionRef = useRef(null);
  const [modal, setModal] = useState({ open: false, src: "", title: "" });

  const leftCards = useMemo(() => buildStackCards(leftWorks), []);
  const rightCards = useMemo(() => buildStackCards(rightWorks), []);

  const handleLeftClick = (cardId) => {
    const item = leftWorks[cardId];
    if (item) setModal({ open: true, src: item.src, title: item.title });
  };
  const handleRightClick = (cardId) => {
    const item = rightWorks[cardId];
    if (item) setModal({ open: true, src: item.src, title: item.title });
  };

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
      gsap.fromTo(stackSectionRef.current, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: stackSectionRef.current, start: "top 80%" },
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

        {/* 更多作品 —— 左右两个堆叠卡片 */}
        <div className="more-works" ref={stackSectionRef}>
          <h3 className="more-works-title">更多作品</h3>
          <p className="more-works-desc">拖拽或点击翻看，点击图片查看大图</p>
          <div className="more-works-grid">
            <div className="more-works-col">

              <div className="stack-container">
                <Stack
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  cards={leftCards}
                  onCardClick={handleLeftClick}
                />
              </div>
            </div>
            <div className="more-works-col">

              <div className="stack-container">
                <Stack
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  cards={rightCards}
                  onCardClick={handleRightClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageModal isOpen={modal.open} onClose={() => setModal({ open: false, src: "", title: "" })} src={modal.src} title={modal.title} />
    </section>
  );
}

