"use client";

import type { CSSProperties } from "react";
import { useEffect, useId, useRef, useState } from "react";

import styles from "./EKGLine.module.css";

const STROKE_COLOR = "#39ff14";
const GLOW_OPACITY = 0.22;
const BASELINE_PATH = "M 0 40 H 1000";
const SPIKE_PATH = "M 470 40 H 485 L 500 8 L 518 72 L 535 40 H 550";
const DRAW_MS = 560;
const FADE_MS = 280;
const REDUCED_VISIBLE_MS = 240;

type EKGLineProps = {
  autoPulseAfterInteraction?: boolean;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}

export function EKGLine({ autoPulseAfterInteraction = true }: EKGLineProps) {
  const glowFilterId = useId();
  const spikeMeasureRef = useRef<SVGPathElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const pulseTimerRef = useRef<number | null>(null);
  const drawFrameRef = useRef<number | null>(null);
  const modeRef = useRef<"idle" | "draw" | "instant">("idle");
  const hasStartedAutoPulseRef = useRef(false);
  const [dashLen, setDashLen] = useState(0);
  const [writeHeadPoint, setWriteHeadPoint] = useState<{ x: number; y: number } | null>(null);
  const [runKey, setRunKey] = useState(0);
  const [mode, setMode] = useState<"idle" | "draw" | "instant">("idle");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const spike = spikeMeasureRef.current;
    if (!spike) return;

    const length = spike.getTotalLength();
    if (Number.isFinite(length) && length > 0) {
      setDashLen(length);
    }
  }, []);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current);
      }
      if (drawFrameRef.current !== null) {
        window.cancelAnimationFrame(drawFrameRef.current);
      }
    };
  }, []);

  const nextPulseDelay = () => 4000 + Math.floor(Math.random() * 3001);

  const stopWriteHead = () => {
    if (drawFrameRef.current !== null) {
      window.cancelAnimationFrame(drawFrameRef.current);
      drawFrameRef.current = null;
    }
    setWriteHeadPoint(null);
  };

  const animateWriteHead = () => {
    if (prefersReducedMotion) return;

    const spike = spikeMeasureRef.current;
    if (!spike) return;

    stopWriteHead();
    const totalLength = spike.getTotalLength();
    const startPoint = spike.getPointAtLength(0);
    setWriteHeadPoint({ x: startPoint.x, y: startPoint.y });

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DRAW_MS, 1);
      const point = spike.getPointAtLength(totalLength * progress);
      setWriteHeadPoint({ x: point.x, y: point.y });

      if (progress < 1) {
        drawFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      drawFrameRef.current = null;
      setWriteHeadPoint(null);
    };

    drawFrameRef.current = window.requestAnimationFrame(step);
  };

  const triggerSpike = () => {
    if (dashLen <= 0 || modeRef.current !== "idle") return false;

    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    setRunKey((key) => key + 1);
    stopWriteHead();

    if (prefersReducedMotion) {
      setMode("instant");
      hideTimerRef.current = window.setTimeout(() => {
        setMode("idle");
        hideTimerRef.current = null;
      }, REDUCED_VISIBLE_MS);
      return true;
    }

    setMode("draw");
    animateWriteHead();
    return true;
  };

  const scheduleNextPulse = () => {
    if (!autoPulseAfterInteraction) return;
    if (pulseTimerRef.current !== null) {
      window.clearTimeout(pulseTimerRef.current);
    }

    pulseTimerRef.current = window.setTimeout(() => {
      pulseTimerRef.current = null;
      triggerSpike();
      scheduleNextPulse();
    }, nextPulseDelay());
  };

  const handleUserTrigger = () => {
    const started = triggerSpike();
    if (!started || !autoPulseAfterInteraction || hasStartedAutoPulseRef.current) return;
    hasStartedAutoPulseRef.current = true;
    scheduleNextPulse();
  };

  return (
    <div
      className={styles.root}
      onPointerDown={handleUserTrigger}
      aria-label="Replay EKG spike"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleUserTrigger();
        }
      }}
    >
      <svg viewBox="0 0 1000 80" className={styles.svg} aria-hidden="true" focusable="false" style={{ overflow: "visible" }}>
        <defs>
          <filter id={glowFilterId} filterUnits="userSpaceOnUse" x="-120" y="-120" width="1240" height="320">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>
        <path
          d={BASELINE_PATH}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity={GLOW_OPACITY}
          filter={`url(#${glowFilterId})`}
        />
        <path
          d={BASELINE_PATH}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {mode !== "idle" && (
          <>
            <path
              key={`${runKey}-glow`}
              d={SPIKE_PATH}
              fill="none"
              stroke={STROKE_COLOR}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              opacity={GLOW_OPACITY}
              filter={`url(#${glowFilterId})`}
              className={`${styles.spikeBase} ${mode === "draw" ? styles.spikeDraw : styles.spikeInstant}`}
              style={
                {
                  "--dash-len": dashLen,
                  "--draw-ms": `${DRAW_MS}ms`,
                  "--fade-ms": `${FADE_MS}ms`,
                } as CSSProperties
              }
            />
            <path
              key={`${runKey}-core`}
              d={SPIKE_PATH}
              fill="none"
              stroke={STROKE_COLOR}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className={`${styles.spikeBase} ${mode === "draw" ? styles.spikeDraw : styles.spikeInstant}`}
              style={
                {
                  "--dash-len": dashLen,
                  "--draw-ms": `${DRAW_MS}ms`,
                  "--fade-ms": `${FADE_MS}ms`,
                } as CSSProperties
              }
              onAnimationEnd={(event) => {
                if (event.animationName.includes("ekgFade")) {
                  setMode("idle");
                }
              }}
            />
          </>
        )}

        {writeHeadPoint && (
          <>
            <circle
              cx={writeHeadPoint.x}
              cy={writeHeadPoint.y}
              r="5.2"
              fill={STROKE_COLOR}
              opacity={GLOW_OPACITY}
              filter={`url(#${glowFilterId})`}
              className={styles.writeHead}
            />
            <circle cx={writeHeadPoint.x} cy={writeHeadPoint.y} r="3.5" fill={STROKE_COLOR} className={styles.writeHead} />
          </>
        )}

        <path
          ref={spikeMeasureRef}
          d={SPIKE_PATH}
          fill="none"
          stroke={STROKE_COLOR}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}
