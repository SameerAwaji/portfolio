"use client";

import { useEffect } from "react";

export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    const revealVisibleItems = () => {
      const revealLine = window.innerHeight * 0.9;

      for (const item of revealItems) {
        if (item.classList.contains("is-visible")) continue;
        const bounds = item.getBoundingClientRect();
        if (bounds.top >= revealLine || bounds.bottom <= 0) continue;
        item.classList.add("is-visible");
        observer.unobserve(item);
      }
    };

    let frame = 0;
    const updateFrame = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty(
        "--scroll-progress",
        String(Math.min(1, Math.max(0, progress))),
      );
      revealVisibleItems();
      frame = 0;
    };
    const requestFrame = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestFrame);
      window.removeEventListener("resize", requestFrame);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scroll-progress");
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
