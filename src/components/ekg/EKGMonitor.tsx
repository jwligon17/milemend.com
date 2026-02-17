"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

type EKGMonitorProps = {
  height?: number;
  className?: string;
  speed?: number;
};
export type EKGMonitorHandle = {
  triggerSpike: (intensity?: number) => void;
};

const DEFAULT_HEIGHT = 96;
const SPEED_PX = 2.5;
const DEFAULT_SPEED = SPEED_PX;
const MAX_SAMPLE_ABS = 1.35;
const GLOW_BLUR = 12;
const CORE_LINE_WIDTH = 3.2;
const GLOW_ALPHA = 0.2;
const GLOW_LINE_WIDTH_MULTIPLIER = 3;
const EXTRA_VERTICAL_PADDING = 8;
const CORE_COLOR = "#39ff14";
const CORE_STROKE_COLOR = CORE_COLOR;
const LEADING_DOT_RADIUS = 2.8;
const SPIKE_TEMPLATE = [
  0, 0, 0, 0, // baseline
  0.05, 0.11, 0.15, 0.09, 0.03, 0, // P wave
  0, 0, 0, // isoelectric
  -0.18, -0.62, -1.0, -0.18, // Q + sharp R up
  0.62, 0.3, 0.08, 0, // S dip and recovery
  0, 0, // baseline gap
  0.08, 0.17, 0.25, 0.2, 0.12, 0.04, 0, // T wave
  0, 0, 0, // return baseline
];
const MIN_INTENSITY = 0.6;
const MAX_INTENSITY = 1.5;
const MIN_SPIKE_MS = 250;
const MAX_SPIKE_MS = 450;

type ActiveSpike = {
  intensity: number;
  phase: number;
  step: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export const EKGMonitor = forwardRef<EKGMonitorHandle, EKGMonitorProps>(function EKGMonitor(
  { height = DEFAULT_HEIGHT, className, speed = DEFAULT_SPEED },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const ringRef = useRef<Float32Array>(new Float32Array(0));
  const ringSizeRef = useRef(0);
  const ringStartRef = useRef(0);
  const cssWidthRef = useRef(0);
  const cssHeightRef = useRef(0);
  const dprRef = useRef(1);
  const activeSpikesRef = useRef<ActiveSpike[]>([]);
  const noisePhaseRef = useRef(0);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const triggerSpike = useCallback((intensity = 1) => {
    const scaledIntensity = clamp(intensity, MIN_INTENSITY, MAX_INTENSITY);
    const speedPx = Math.max(1, Math.round(speedRef.current));
    const durationMs = MIN_SPIKE_MS + Math.random() * (MAX_SPIKE_MS - MIN_SPIKE_MS);
    const sampleRate = 60 * speedPx;
    const totalSamples = Math.max(6, Math.round((durationMs / 1000) * sampleRate));
    const step = (SPIKE_TEMPLATE.length - 1) / totalSamples;

    activeSpikesRef.current.push({
      intensity: scaledIntensity,
      phase: 0,
      step,
    });
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      triggerSpike,
    }),
    [triggerSpike],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const createIdleSample = () => {
      noisePhaseRef.current += 0.3 + Math.random() * 0.08;
      const sine = Math.sin(noisePhaseRef.current) * 0.014;
      const jitter = (Math.random() - 0.5) * 0.02;
      return clamp(sine + jitter, -1, 1);
    };

    const sampleTemplateAtPhase = (phase: number) => {
      const maxIdx = SPIKE_TEMPLATE.length - 1;
      if (phase <= 0) return SPIKE_TEMPLATE[0];
      if (phase >= maxIdx) return SPIKE_TEMPLATE[maxIdx];

      const leftIdx = Math.floor(phase);
      const frac = phase - leftIdx;
      const left = SPIKE_TEMPLATE[leftIdx];
      const right = SPIKE_TEMPLATE[leftIdx + 1];
      return left + (right - left) * frac;
    };

    const nextSample = () => {
      let sample = createIdleSample();
      const spikes = activeSpikesRef.current;

      for (let i = spikes.length - 1; i >= 0; i -= 1) {
        const spike = spikes[i];
        sample += sampleTemplateAtPhase(spike.phase) * spike.intensity;
        spike.phase += spike.step;

        if (spike.phase >= SPIKE_TEMPLATE.length - 1) {
          spikes.splice(i, 1);
        }
      }

      return clamp(sample, -MAX_SAMPLE_ABS, MAX_SAMPLE_ABS);
    };

    const refillRing = (sampleCount: number) => {
      const count = Math.max(2, sampleCount);
      const samples = new Float32Array(count);
      for (let i = 0; i < count; i += 1) {
        samples[i] = createIdleSample();
      }
      ringRef.current = samples;
      ringSizeRef.current = count;
      ringStartRef.current = 0;
      activeSpikesRef.current = [];
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const cssWidth = Math.max(1, Math.round(rect.width));
      const cssHeight = Math.max(1, Math.round(rect.height));
      const dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cssWidthRef.current = cssWidth;
      cssHeightRef.current = cssHeight;
      dprRef.current = dpr;

      refillRing(cssWidth + 2);
    };

    const draw = () => {
      const cssWidth = cssWidthRef.current;
      const cssHeight = cssHeightRef.current;
      const dpr = dprRef.current || window.devicePixelRatio || 1;
      const px = 1 / dpr;
      const snapToPixel = (value: number) => Math.round(value / px) * px;
      const sampleCount = ringSizeRef.current;
      if (sampleCount < 2 || cssWidth < 2 || cssHeight < 2) {
        frameRef.current = window.requestAnimationFrame(draw);
        return;
      }

      const quantizedSpeed = snapToPixel(speedRef.current);
      const shift = Math.max(1, Math.round(quantizedSpeed));
      ringStartRef.current = (ringStartRef.current + shift) % sampleCount;

      for (let i = 0; i < shift; i += 1) {
        const writeIndex = (ringStartRef.current + sampleCount - shift + i) % sampleCount;
        ringRef.current[writeIndex] = nextSample();
      }

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const glowLineWidth = CORE_LINE_WIDTH * GLOW_LINE_WIDTH_MULTIPLIER;
      const rawPadY = GLOW_BLUR + glowLineWidth * 2 + EXTRA_VERTICAL_PADDING;
      const padY = Math.min(Math.max(1, Math.ceil(rawPadY)), Math.max(1, cssHeight / 2 - 1));
      const usableHeight = Math.max(2, cssHeight - 2 * padY);
      const midY = cssHeight / 2;
      const amplitude = Math.max(1, (usableHeight / 2) * 0.98);
      const xStep = cssWidth / Math.max(1, sampleCount - 1);
      const minY = padY;
      const maxY = cssHeight - padY;

      const sampleToY = (sample: number) => {
        const normalizedValue = clamp(-sample / MAX_SAMPLE_ABS, -1, 1);
        const y = midY - normalizedValue * amplitude;
        return snapToPixel(clamp(y, minY, maxY));
      };

      const waveformPath = new Path2D();
      for (let x = 0; x < sampleCount; x += 1) {
        const sample = ringRef.current[(ringStartRef.current + x) % sampleCount];
        const y = sampleToY(sample);
        const xPos = snapToPixel(x * xStep);
        if (x === 0) {
          waveformPath.moveTo(xPos, y);
        } else {
          waveformPath.lineTo(xPos, y);
        }
      }

      ctx.save();
      ctx.globalAlpha = GLOW_ALPHA;
      ctx.strokeStyle = CORE_STROKE_COLOR;
      ctx.lineWidth = glowLineWidth;
      ctx.shadowColor = CORE_COLOR;
      ctx.shadowBlur = GLOW_BLUR;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke(waveformPath);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = CORE_STROKE_COLOR;
      ctx.lineWidth = CORE_LINE_WIDTH;
      ctx.shadowBlur = 0;
      ctx.filter = "none";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke(waveformPath);
      ctx.restore();

      const newestSample = ringRef.current[(ringStartRef.current + sampleCount - 1) % sampleCount];
      const newestY = sampleToY(newestSample);
      const newestX = snapToPixel(cssWidth);

      ctx.beginPath();
      ctx.arc(newestX, newestY, LEADING_DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = CORE_STROKE_COLOR;
      ctx.shadowBlur = 0;
      ctx.fill();

      frameRef.current = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    frameRef.current = window.requestAnimationFrame(draw);

    const observeTarget = canvas.parentElement ?? canvas;
    resizeObserverRef.current = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserverRef.current.observe(observeTarget);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [height, speed]);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height, display: "block", background: "transparent" }} />;
});
EKGMonitor.displayName = "EKGMonitor";

export default EKGMonitor;
