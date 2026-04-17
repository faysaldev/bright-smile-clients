import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (selector = ".gsap-reveal") => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector]);
};

export const useStaggerReveal = (
  containerRef: React.RefObject<any>,
  childSelector = ".gsap-stagger",
) => {
  useEffect(() => {
    if (!containerRef.current) return;
    const children = containerRef.current.querySelectorAll(childSelector);
    gsap.fromTo(
      children,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [containerRef, childSelector]);
};

export const useCountUp = (
  ref: React.RefObject<any>,
  target: number,
  duration = 2,
) => {
  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (ref.current)
          ref.current.textContent = Math.round(obj.val).toLocaleString();
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [ref, target, duration]);
};

export const useHeroAnimation = (
  containerRef: React.RefObject<any>,
) => {
  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const el = containerRef.current;

    tl.fromTo(
      el.querySelector(".hero-badge"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
    )
      .fromTo(
        el.querySelector(".hero-title"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3",
      )
      .fromTo(
        el.querySelector(".hero-desc"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4",
      )
      .fromTo(
        el.querySelector(".hero-buttons"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3",
      );

    return () => {
      tl.kill();
    };
  }, [containerRef]);
};

export { gsap, ScrollTrigger };
