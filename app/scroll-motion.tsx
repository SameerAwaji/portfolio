"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const allowedDetails = ["project", "note"] as const;

export default function SiteBehavior({ locale }: { locale: "en" | "ar" }) {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";

    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const navigationLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.site-header nav a[href^="#"]'),
    );
    const navigationSections = Array.from(
      new Set(
        navigationLinks
          .map((link) => document.getElementById(link.hash.slice(1)))
          .filter((section): section is HTMLElement => Boolean(section)),
      ),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) revealItems.forEach((item) => item.classList.add("is-visible"));
    else root.classList.add("motion-ready");

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

    if (!reduceMotion) revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    let previousActiveId = "";
    const activeNavigationId = () => {
      const marker = window.innerHeight * 0.34;
      let activeId = "";
      for (const section of navigationSections) {
        if (section.getBoundingClientRect().top <= marker) activeId = section.id;
      }
      return activeId;
    };

    const updateFrame = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      // Complete geometry reads before updating styles; reveals use the observer.
      const activeId = activeNavigationId();
      root.style.setProperty(
        "--scroll-progress",
        String(Math.min(1, Math.max(0, progress))),
      );
      if (activeId !== previousActiveId) {
        for (const link of navigationLinks) {
          if (activeId && link.hash === `#${activeId}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
        previousActiveId = activeId;
      }
      frame = 0;
    };
    const requestFrame = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateFrame);
    };

    updateFrame();
    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame);

    const closeMobileMenu = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(".mobile-menu a")) return;
      target.closest<HTMLDetailsElement>(".mobile-menu")?.removeAttribute("open");
    };

    const dismissMobileMenu = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu[open]");
      if (!menu) return;
      menu.removeAttribute("open");
      menu.querySelector<HTMLElement>("summary")?.focus();
    };

    const viewer = document.querySelector<HTMLDialogElement>(".image-viewer");
    let imageTrigger: HTMLAnchorElement | null = null;
    const openImage = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("[data-image-viewer]");
      if (!trigger || !viewer || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const sourceImage = trigger.querySelector("img");
      const imageContainer = viewer.querySelector(".image-viewer-content");
      const caption = viewer.querySelector("#image-viewer-caption");
      if (!sourceImage || !imageContainer || !caption || !viewer.showModal) return;
      event.preventDefault();
      const image = new Image();
      image.src = trigger.href;
      image.alt = sourceImage.alt;
      image.decoding = "async";
      imageContainer.replaceChildren(image);
      caption.textContent = sourceImage.alt;
      imageTrigger = trigger;
      viewer.showModal();
    };
    const closeImage = (event: MouseEvent) => {
      if ((event.target as HTMLElement | null)?.closest("[data-close-viewer]")) viewer?.close();
      if (event.target === viewer && viewer) {
        const bounds = viewer.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
      }
    };
    const restoreImageFocus = () => {
      viewer?.querySelector(".image-viewer-content")?.replaceChildren();
      imageTrigger?.focus({ preventScroll: true });
      imageTrigger = null;
    };

    // Retain the same project/section when switching the homepage language.
    const languageLink = document.querySelector<HTMLAnchorElement>(".language-link");
    const syncLanguageHash = () => {
      if (!languageLink || !["/", "/ar"].includes(pathname)) return;
      languageLink.hash = window.location.hash;
    };
    syncLanguageHash();
    window.addEventListener("hashchange", syncLanguageHash);

    const moveGallery = (event: KeyboardEvent) => {
      const gallery = (event.target as HTMLElement)?.closest<HTMLElement>(".phone-gallery");
      if (!gallery || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      if (gallery.scrollWidth <= gallery.clientWidth) return;
      event.preventDefault();
      const step = gallery.querySelector("figure")?.getBoundingClientRect().width ?? 240;
      if (event.key === "Home" || event.key === "End") {
        gallery.scrollTo({ left: event.key === "Home" ? 0 : (locale === "ar" ? -1 : 1) * gallery.scrollWidth, behavior: reduceMotion ? "instant" : "smooth" });
      } else {
        gallery.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * (step + 14), behavior: reduceMotion ? "instant" : "smooth" });
      }
    };

    const trackInteraction = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest<HTMLElement>("[data-analytics]");
      if (!tracked) return;

      const payload: Record<string, string> = {
        event: tracked.dataset.analytics ?? "unknown",
        path: window.location.pathname,
        locale,
      };

      for (const detail of allowedDetails) {
        const value = tracked.dataset[detail];
        if (value) payload[detail] = value;
      }

      const body = JSON.stringify(payload);
      if (navigator.sendBeacon?.("/api/portfolio-events", body)) return;
      void fetch("/api/portfolio-events", {
        method: "POST",
        body,
        keepalive: true,
        headers: { "content-type": "application/json" },
      }).catch(() => { /* Optional analytics must never interrupt navigation. */ });
    };

    document.addEventListener("keydown", dismissMobileMenu);
    document.addEventListener("keydown", moveGallery);
    document.addEventListener("click", closeMobileMenu);
    document.addEventListener("click", trackInteraction);
    document.addEventListener("click", openImage);
    viewer?.addEventListener("click", closeImage);
    viewer?.addEventListener("close", restoreImageFocus);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestFrame);
      window.removeEventListener("resize", requestFrame);
      document.removeEventListener("keydown", dismissMobileMenu);
      document.removeEventListener("keydown", moveGallery);
      window.removeEventListener("hashchange", syncLanguageHash);
      document.removeEventListener("click", closeMobileMenu);
      document.removeEventListener("click", trackInteraction);
      document.removeEventListener("click", openImage);
      viewer?.removeEventListener("click", closeImage);
      viewer?.removeEventListener("close", restoreImageFocus);
      viewer?.close();
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scroll-progress");
    };
  }, [locale, pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
