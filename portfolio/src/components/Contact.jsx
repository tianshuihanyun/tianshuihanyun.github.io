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
          <p className="contact-desc">如有品牌设计、视觉创意或 AI 艺术相关合作需求，欢迎联系。</p>
          <div className="contact-links">
            <a href="mailto:tianshui@example.com" className="contact-link">电子邮箱</a>
            <a href="#" className="contact-link">GitHub</a>
            <a href="#" className="contact-link">站酷</a>
            <a href="#" className="contact-link">微信</a>
          </div>
          <p className="contact-footer-text">&copy; 2026 Tianshui Hanyun 版权所有</p>
        </div>
      </div>
    </section>
  );
}
