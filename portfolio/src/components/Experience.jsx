import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./BorderGlow";
import GradientText from "./GradientText";
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { x: -200, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.fromTo(".exp-card", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
      });
      gsap.fromTo(".stat-item", { scale: 0.6, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".stat-item", start: "top 85%" },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const glowColors = ["#c084fc", "#f472b6", "#38bdf8"];

  return (
    <section id="experience" className="section experience-section" ref={sectionRef}>
      <div className="section-inner">
        <h2 className="section-title-ch" ref={titleRef}>个人经历</h2>
        <div className="experience-grid" ref={contentRef}>
          <BorderGlow
            colors={glowColors}
            borderRadius={28}
            glowIntensity={0.6}
            edgeSensitivity={35}
            glowRadius={20}
            fillOpacity={0.12}
          >
            <div className="exp-card profile-card" style={{ height: "100%" }}>
              <div className="profile-avatar"><img src="/assets/个人头像.png" alt="头像" /></div>
              <GradientText colors={["#ff9fca", "#91d8ff", "#91e5c7", "#c9b6ff", "#ff9fca"]} animationSpeed={6}><h3 className="profile-name">Tianshui Hanyun</h3></GradientText>
              <p className="profile-role">视觉设计师 / AI设计师 / 品牌设计师</p>
              <p className="profile-desc">拥有多年视觉设计与品牌创意经验，擅长将前沿AI技术与传统设计美学融合。专注于品牌视觉系统、3D建模渲染、手绘插画及数字艺术创作。</p>
              <div className="profile-contact"><span>tianshui@example.com</span><span>China</span></div>
            </div>
          </BorderGlow>

          <BorderGlow
            colors={["#38bdf8", "#a78bfa", "#f472b6"]}
            borderRadius={28}
            glowIntensity={0.6}
            edgeSensitivity={35}
            glowRadius={20}
            fillOpacity={0.12}
          >
            <div className="exp-card stats-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div className="stats-grid" style={{ flex: 1 }}>
                <div className="stat-item"><span className="stat-num">50+</span><span className="stat-label">品牌项目</span></div>
                <div className="stat-item"><span className="stat-num">8+</span><span className="stat-label">年经验</span></div>
                <div className="stat-item"><span className="stat-num">200+</span><span className="stat-label">设计作品</span></div>
                <div className="stat-item"><span className="stat-num">30+</span><span className="stat-label">合作客户</span></div>
              </div>
              <div className="exp-tags">
                <span>品牌设计</span><span>AI绘画</span><span>3D建模</span>
                <span>UI/UX</span><span>插画</span><span>视觉传达</span>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}

