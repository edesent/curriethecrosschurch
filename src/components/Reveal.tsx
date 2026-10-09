"use client";

import { useEffect } from "react";

/**
 * Fades in every [data-reveal] element as it scrolls into view. Mounted once
 * in the layout. Content is visible without JavaScript; the hidden state only
 * applies once the html element has the "js" class.
 */
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Number(el.dataset.reveal || 0) * 90}ms`;
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
  return null;
}
