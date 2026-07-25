import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.fromTo(contentRef.current.children, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="section-inner contact-inner">
        <h2 className="contact-title" ref={titleRef}>一起 <span className="accent">创造</span></h2>
        <div className="contact-content" ref={contentRef}>
          <p className="contact-desc">欢迎交流视觉设计、AI 创意与 3D 项目合作。</p>
          <div className="contact-links">
            <a href="mailto:2501558749@qq.com" className="contact-link">电子邮箱</a>
            <a href="https://github.com/hanqingyan3293" className="contact-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="contact-link contact-placeholder" aria-disabled="true">B站待补充</span>
            <span className="contact-link contact-placeholder" aria-disabled="true">微信待补充</span>
          </div>
          <p className="contact-footer-text">&copy; 2026 hanqingyan3293 版权所有</p>
        </div>
      </div>
    </section>
  );
}

