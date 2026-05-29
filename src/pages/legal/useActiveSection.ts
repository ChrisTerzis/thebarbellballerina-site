import { useEffect, useMemo, useState } from 'react';

/** Tracks which section id is most visible while scrolling (for TOC highlight). */
export function useActiveSection({
  sectionIds,
  revision = 0,
}: {
  sectionIds: readonly string[];
  /** Bumps when DOM ids are (re)assigned so the observer re-binds. */
  revision?: number;
}) {
  const key = useMemo(() => sectionIds.join('\0'), [sectionIds]);
  const [activeId, setActiveId] = useState(() => sectionIds[0] ?? '');

  /** When switching legal documents (or section lists), discard ids from the previous doc. */
  useEffect(() => {
    setActiveId(sectionIds[0] ?? '');
  }, [key, sectionIds]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    /**
     * Sticky chrome + DocSection scroll margin (scroll-mt-28 / md:scroll-mt-36).
     * Prefer the section whose top is nearest *at or above* this line ("reading line").
     */
    const scrollLine = () => (window.matchMedia('(min-width: 768px)').matches ? 144 : 112);

    const pickFromLayout = () => {
      let bestId = sectionIds[0] ?? '';
      let bestTop = Number.NEGATIVE_INFINITY;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        const line = scrollLine();
        if (top - line <= 4 && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      setActiveId(bestId);
    };

    const observer = new IntersectionObserver(
      () => {
        pickFromLayout();
      },
      { root: null, rootMargin: '-14% 0px -38% 0px', threshold: [0, 0.05, 0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));

    pickFromLayout();
    window.addEventListener('scroll', pickFromLayout, { passive: true });
    window.addEventListener('resize', pickFromLayout, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', pickFromLayout);
      window.removeEventListener('resize', pickFromLayout);
    };
  }, [key, sectionIds, revision]);

  return activeId;
}
