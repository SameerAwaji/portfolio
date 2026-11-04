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
    const projectLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".project-index a[href^='#']"),
    );
    const projectObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        for (const link of projectLinks) {
          if (link.hash === `#${visible.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
      },
      { threshold: [0.35, 0.6] },
    );
    for (const link of projectLinks) {
      const section = document.getElementById(link.hash.slice(1));
      if (section) projectObserver.observe(section);
    }

    const mediaAbort = new AbortController();
    const shotObservers: IntersectionObserver[] = [];
    const refreshMedia = (media: HTMLElement) => {
      const group = Array.from(media.querySelectorAll<HTMLElement>("[data-shot]"));
      if (group.length === 0 || group.every((shot) => shot.dataset.state === "empty")) {
        media.dataset.state = "empty";
        return;
      }
      const states = group.map((shot) => shot.dataset.state ?? "pending");
      if (states.every((state) => state === "error")) media.dataset.state = "error";
      else if (states.some((state) => state === "loading")) media.dataset.state = "loading";
      else media.dataset.state = "ready";
    };
    const markShot = (shot: HTMLElement, state: string) => {
      shot.dataset.state = state;
      const media = shot.closest<HTMLElement>("[data-media]");
      if (media) refreshMedia(media);
    };
    for (const shot of Array.from(document.querySelectorAll<HTMLElement>("[data-shot]"))) {
      const img = shot.querySelector("img");
      if (!img) {
        markShot(shot, "empty");
        continue;
      }
      const watch = () => {
        let timer = 0;
        const commit = () => {
          if (timer) window.clearTimeout(timer);
          markShot(shot, img.naturalWidth > 0 ? "ready" : "error");
        };
        const fail = () => {
          if (timer) window.clearTimeout(timer);
          markShot(shot, "error");
        };
        img.addEventListener("load", commit, { signal: mediaAbort.signal });
        img.addEventListener("error", fail, { signal: mediaAbort.signal });
        if (img.complete) commit();
        else {
          timer = window.setTimeout(() => {
            if (!img.complete) markShot(shot, "loading");
          }, 400);
        }
      };
      if (img.complete) watch();
      else {
        const observer = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          watch();
        }, { rootMargin: "200px" });
        observer.observe(shot);
        shotObservers.push(observer);
      }
    }
    for (const media of Array.from(document.querySelectorAll<HTMLElement>("[data-media]"))) {
      if (!media.querySelector("[data-shot]")) media.dataset.state = "empty";
    }

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
      const activeId = activeNavigationId();
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
    const setViewerState = (state: "empty" | "loading" | "ready" | "error") => {
      if (!viewer) return;
      viewer.dataset.state = state;
      const status = viewer.querySelector<HTMLElement>(".viewer-status");
      if (!status) return;
      status.hidden = state === "ready";
      status.textContent = state === "ready" ? "" : viewer.getAttribute(`data-label-${state}`) ?? "";
    };
    const openImage = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("[data-image-viewer]");
      if (!trigger || !viewer || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const sourceImage = trigger.querySelector("img");
      const imageContainer = viewer.querySelector(".image-viewer-content");
      const caption = viewer.querySelector("#image-viewer-caption");
      if (!sourceImage || !imageContainer || !caption || !viewer.showModal) return;
      event.preventDefault();
      const image = new Image();
      image.alt = sourceImage.alt;
      image.decoding = "async";
      setViewerState("loading");
      image.onload = () => setViewerState("ready");
      image.onerror = () => setViewerState("error");
      image.src = trigger.href;
      imageContainer.replaceChildren(image);
      caption.textContent = sourceImage.alt;
      imageTrigger = trigger;
      if (!viewer.open) viewer.showModal();
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
      setViewerState("empty");
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
        gallery.scrollTo({ left: event.key === "Home" ? 0 : (locale === "ar" ? -1 : 1) * gallery.scrollWidth, behavior: "instant" });
      } else {
        gallery.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * (step + 14), behavior: "instant" });
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
      projectObserver.disconnect();
      for (const observer of shotObservers) observer.disconnect();
      mediaAbort.abort();
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
    };
  }, [locale, pathname]);

  return null;
}
