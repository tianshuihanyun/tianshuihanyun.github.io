import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const advantages = [
  { icon: "VIS", title: "视觉设计", desc: "深厚的传统美术功底，精通色彩理论与构图法则，将艺术审美融入每个设计细节。" },
  { icon: "AI", title: "AI 创意", desc: "熟练运用 Midjourney、Stable Diffusion 等 AI 工具，探索人机协作的全新创意边界。" },
  { icon: "3D", title: "3D 建模", desc: "Blender / C4D 高精度建模与渲染，从概念草图到照片级输出的完整流程把控。" },
  { icon: "BRD", title: "品牌策略", desc: "从品牌定位、视觉识别到落地执行，构建有辨识度和商业价值的品牌体系。" },
  { icon: "SKT", title: "插画手绘", desc: "素描、水粉、数码插画多风格创作，为品牌注入独特的手工温度与艺术气质。" },
  { icon: "DEV", title: "数字工具", desc: "Photoshop / Illustrator / Figma / Blender 等全流程工具链，高效产出高品质视觉。" },
];

export default function Advantages() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { x: -200, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".advantage-card", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".advantage-card", start: "top 85%" },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="advantages" className="section advantages-section" ref={sectionRef}>
      <div className="section-inner">
        <h2 className="section-title-ch" ref={titleRef}>个人优势</h2>
        <div className="advantages-grid">
          {advantages.map((a, i) => (
            <div className="advantage-card" key={i}>
              <span className="adv-icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
