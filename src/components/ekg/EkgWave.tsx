"use client";

import type { CSSProperties } from "react";
import { useEffect, useId, useRef } from "react";

const PERIOD = 320;
const SEGMENT_COUNT = 12;
const SCROLL_MULTIPLIER = 0.15;
const IMPULSE_DISTANCE = 130;
const IMPULSE_DURATION_MS = 420;
const WAVE_PATH =
  "M0 32 L40 32 L64 32 L84 14 L98 52 L116 8 L132 56 L152 32 L220 32 L240 22 L252 32 L320 32";
const CORE_STROKE_WIDTH = 3;
const GLOW_STROKE_WIDTH = 8;
const GLOW_OPACITY = 0.2;

type EkgShiftVars = CSSProperties & { "--ekgShift"?: string };

export function EkgWave() {
  const glowFilterId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollShiftRef = useRef(0);
  const impulseShiftRef = useRef(0);
  const impulseStartRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const setShift = () => {
    const container = containerRef.current;
    if (!container) return;

    const totalShift = scrollShiftRef.current + impulseShiftRef.current;
    const loopedShift = ((totalShift % PERIOD) + PERIOD) % PERIOD;
    container.style.setProperty("--ekgShift", loopedShift.toFixed(3));
  };

  const animateImpulse = (timestamp: number) => {
    if (prefersReducedMotionRef.current || impulseStartRef.current === null) {
      impulseShiftRef.current = 0;
      setShift();
      rafRef.current = null;
      return;
    }

    const elapsed = timestamp - impulseStartRef.current;
    const progress = Math.min(1, elapsed / IMPULSE_DURATION_MS);
    const eased = 1 - progress;
    impulseShiftRef.current = IMPULSE_DISTANCE * eased * eased * eased;
    setShift();

    if (progress < 1) {
      rafRef.current = window.requestAnimationFrame(animateImpulse);
      return;
    }

    impulseStartRef.current = null;
    impulseShiftRef.current = 0;
    setShift();
    rafRef.current = null;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionPreference = () => {
      prefersReducedMotionRef.current = mediaQuery.matches;
      if (mediaQuery.matches) {
        scrollShiftRef.current = 0;
        impulseShiftRef.current = 0;
        impulseStartRef.current = null;
        if (rafRef.current !== null) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      } else {
        scrollShiftRef.current = (window.scrollY || 0) * SCROLL_MULTIPLIER;
      }
      setShift();
    };

    const onScroll = () => {
      if (prefersReducedMotionRef.current) return;
      scrollShiftRef.current = (window.scrollY || 0) * SCROLL_MULTIPLIER;
      setShift();
    };

    scrollShiftRef.current = (window.scrollY || 0) * SCROLL_MULTIPLIER;
    syncMotionPreference();

    window.addEventListener("scroll", onScroll, { passive: true });
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncMotionPreference);
    } else {
      mediaQuery.addListener(syncMotionPreference);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", syncMotionPreference);
      } else {
        mediaQuery.removeListener(syncMotionPreference);
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handlePointerDown = () => {
    if (typeof window === "undefined" || prefersReducedMotionRef.current) return;

    impulseStartRef.current = performance.now();
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(animateImpulse);
    }
  };

  const wrapperStyle: EkgShiftVars = { "--ekgShift": "0" };

  return (
    <div
      ref={containerRef}
      className="mt-6 h-20 w-full overflow-x-hidden overflow-y-visible py-2"
      style={wrapperStyle}
      onPointerDown={handlePointerDown}
    >
      <svg viewBox="0 0 640 64" className="h-full w-full" aria-hidden="true" focusable="false" style={{ overflow: "visible" }}>
        <defs>
          <filter id={glowFilterId} filterUnits="userSpaceOnUse" x="-120" y="-120" width="880" height="304">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
        </defs>
        <g
          style={{
            transform: "translate3d(calc(var(--ekgShift, 0) * -1px), 0, 0)",
            willChange: "transform",
          }}
        >
          {Array.from({ length: SEGMENT_COUNT }, (_, i) => i - 1).map((segment) => (
            <g key={segment} transform={`translate(${segment * PERIOD} 0)`}>
              <path
                d={WAVE_PATH}
                fill="none"
                stroke="#30ff05"
                strokeWidth={GLOW_STROKE_WIDTH}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={GLOW_OPACITY}
                vectorEffect="non-scaling-stroke"
                filter={`url(#${glowFilterId})`}
              />
              <path
                d={WAVE_PATH}
                fill="none"
                stroke="#30ff05"
                strokeWidth={CORE_STROKE_WIDTH}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
