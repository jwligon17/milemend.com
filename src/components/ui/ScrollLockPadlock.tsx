"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

import styles from "@/components/ui/ScrollLockPadlock.module.css";

type ScrollLockPadlockProps = {
  targetRef: RefObject<HTMLElement>;
};

type VisualState = {
  opacity: number;
  shackleTranslateY: number;
  parallax: number;
  isLocked: boolean;
  reducedMotion: boolean;
};

const START_AT = 0.01;
const END_AT = 0.1;
const FADE_START = 0.1;
const FADE_END = 0.2;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ScrollLockPadlock({ targetRef }: ScrollLockPadlockProps) {
  const [visual, setVisual] = useState<VisualState>({
    opacity: 0,
    shackleTranslateY: -25,
    parallax: 0,
    isLocked: false,
    reducedMotion: false,
  });

  useEffect(() => {
    let rafId: number | null = null;
    let needsUpdate = true;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const calculate = () => {
      rafId = null;

      if (!needsUpdate) return;
      needsUpdate = false;

      const targetEl = targetRef.current;
      if (!targetEl) {
        setVisual((prev) =>
          prev.opacity === 0 && prev.shackleTranslateY === -25 && prev.parallax === 0 && !prev.isLocked
            ? prev
            : {
                ...prev,
                opacity: 0,
                shackleTranslateY: -25,
                parallax: 0,
                isLocked: false,
              },
        );
        return;
      }

      const reduceMotion = mediaQuery.matches;

      // Section progress: 0 when section top hits viewport top, 1 when section bottom hits viewport bottom.
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const sectionTop = targetEl.getBoundingClientRect().top + scrollY;
      const sectionHeight = targetEl.offsetHeight;
      const sectionScrollable = Math.max(sectionHeight - vh, 1);
      const sectionProgress = clamp((scrollY - sectionTop) / sectionScrollable, 0, 1);

      // In-view check ensures lock is hidden when section does not intersect viewport.
      const sectionBottom = sectionTop + sectionHeight;
      const inView = scrollY + vh > sectionTop && scrollY < sectionBottom;

      const lockProgress = clamp((sectionProgress - START_AT) / (END_AT - START_AT), 0, 1);
      const shackleTranslateY = reduceMotion ? (sectionProgress < END_AT ? -25 : 0) : -25 + 25 * lockProgress;

      const fadeProgress = clamp((sectionProgress - FADE_START) / (FADE_END - FADE_START), 0, 1);
      const baseOpacity = inView ? 1 : 0;
      const opacity = reduceMotion
        ? baseOpacity * (sectionProgress < FADE_END ? 1 : 0)
        : baseOpacity * (1 - fadeProgress);

      // Subtle slower-than-content drift while traversing this section.
      const parallax = reduceMotion ? 0 : sectionProgress * 60 * 0.35;
      const isLocked = reduceMotion ? sectionProgress >= END_AT : lockProgress >= 1;

      setVisual((prev) => {
        const unchanged =
          Math.abs(prev.opacity - opacity) < 0.001 &&
          Math.abs(prev.shackleTranslateY - shackleTranslateY) < 0.01 &&
          Math.abs(prev.parallax - parallax) < 0.01 &&
          prev.isLocked === isLocked &&
          prev.reducedMotion === reduceMotion;

        if (unchanged) return prev;

        return {
          opacity,
          shackleTranslateY,
          parallax,
          isLocked,
          reducedMotion: reduceMotion,
        };
      });
    };

    const requestUpdate = () => {
      needsUpdate = true;
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(calculate);
    };

    const handleMotionChange = () => requestUpdate();

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [targetRef]);

  const wrapperClassName = [styles.wrapper, visual.isLocked ? styles.locked : "", visual.reducedMotion ? styles.reducedMotion : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClassName}
      style={{
        opacity: visual.opacity,
        transform: `translateY(calc(-50% + ${visual.parallax}px))`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className={styles.svg} aria-hidden="true" focusable="false">
        <g id="padlock-shackle" className={styles.shackle} style={{ transform: `translateY(${visual.shackleTranslateY}px)` }}>
          <path d="M35 52V38c0-13.8 11.2-25 25-25s25 11.2 25 25v14" />
        </g>

        <g id="padlock-body">
          <rect className={styles.body} x="24" y="48" width="72" height="58" rx="12" />
          <circle className={styles.keyhole} cx="60" cy="74" r="6" />
          <rect className={styles.keyhole} x="57.5" y="80" width="5" height="15" rx="2.5" />
        </g>
      </svg>
    </div>
  );
}
