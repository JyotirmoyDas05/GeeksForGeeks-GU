"use client";

import { useRef, useEffect, memo } from "react";

interface StaticNoiseProps {
  opacity?: number;
  className?: string;
}

/**
 * Optimized static noise effect using pre-generated noise buffer
 * with UV offset sampling for animation (much cheaper than regenerating pixels).
 */
function StaticNoiseComponent({
  opacity = 0.2,
  className = "",
}: StaticNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    const targetFps = 6; // Low FPS for subtle, performant effect
    const frameInterval = 1000 / targetFps;

    // Smaller buffer + lower density for performance
    const scale = 0.5; // Render at 50% resolution
    const noiseSize = 128; // Smaller buffer
    const noiseBuffer = new Uint32Array(noiseSize * noiseSize);
    for (let i = 0; i < noiseBuffer.length; i++) {
      // 10% density for subtle grain
      if (Math.random() < 0.1) {
        const isLight = Math.random() > 0.5;
        const gray = isLight
          ? 200 + Math.floor(Math.random() * 55)
          : 50 + Math.floor(Math.random() * 80);
        noiseBuffer[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
      }
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Use scaled dimensions for performance
        canvas.width = Math.max(1, Math.floor(parent.clientWidth * scale));
        canvas.height = Math.max(1, Math.floor(parent.clientHeight * scale));
      }
    };

    const loop = (timestamp: number) => {
      // Throttle frame rate
      if (timestamp - lastTime < frameInterval) {
        animationId = requestAnimationFrame(loop);
        return;
      }
      lastTime = timestamp;

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(loop);
        return;
      }

      // Sample from pre-generated noise buffer with random offset
      const offsetX = Math.floor(Math.random() * (noiseSize - w));
      const offsetY = Math.floor(Math.random() * (noiseSize - h));

      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const srcIdx =
            ((offsetY + y) % noiseSize) * noiseSize +
            ((offsetX + x) % noiseSize);
          buffer32[y * w + x] = noiseBuffer[srcIdx];
        }
      }

      ctx.putImageData(idata, 0, 0);
      animationId = requestAnimationFrame(loop);
    };

    // Initial setup
    resize();
    animationId = requestAnimationFrame(loop);

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay z-10 transition-opacity duration-400 ${className}`}
      style={{
        opacity,
        imageRendering: "pixelated", // Keep crisp pixels when scaled up
      }}
    />
  );
}

// Memoize to prevent unnecessary re-renders
const StaticNoise = memo(StaticNoiseComponent);
export default StaticNoise;
