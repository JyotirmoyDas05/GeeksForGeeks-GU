"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth = event.target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="group relative -mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">
                  {item.name}
                </div>
                <div className="text-xs text-white">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      ))}
    </>
  );
};

// MaglevTooltip: Simple centered tooltip with tilt on horizontal movement
export const MaglevTooltip = ({
  position,
  activeMemberId,
  teamMembers,
}: {
  position: { left: number; top: number; rotation?: number } | null;
  activeMemberId: number | null;
  teamMembers: { id: number; name: string; image: string; alt: string }[];
}) => {
  return (
    <div>
      <AnimatePresence mode="wait">
        {position && activeMemberId !== null && (
          <motion.div
            key={activeMemberId}
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: position.rotation || 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.6,
              transition: { duration: 0.2 },
            }}
            style={{
              position: "fixed",
              left: `${position.left}px`,
              top: `${position.top}px`,
              transform: "translateX(-50%)", // Center the tooltip horizontally
              transformOrigin: "bottom center",
              pointerEvents: "none",
              zIndex: 10000,
            }}
            className="animated-tooltip-bubble"
          >
            <div className="relative z-30 text-xl sm:text-2xl md:text-3xl font-bold text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-black/80 backdrop-blur-sm rounded-full shadow-xl whitespace-nowrap">
              {teamMembers.find((m) => m.id === activeMemberId)?.alt}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Utility function for calculating simple centered tooltip with tilt
export const calculateMaglevPosition = (
  clientX: number,
  clientY: number,
  avatarRect: DOMRect,
  currentPosition: { left: number; top: number; rotation?: number } | null,
  avatarEl?: HTMLElement
): { left: number; top: number; rotation: number } => {
  // Determine avatar center before scale transform so tooltip stays centered
  let scale = 1;
  if (avatarEl) {
    const computed = window.getComputedStyle(avatarEl).transform;
    if (computed && computed !== "none") {
      const match = computed.match(/matrix\(([^,]+),/);
      if (match) {
        scale = parseFloat(match[1]);
      }
    }
  }
  // Calculate unscaled center X position of avatar in viewport
  const unscaledWidth = avatarRect.width / scale;
  const avatarViewportCenter = avatarRect.left + unscaledWidth / 2;
  const tooltipX = avatarViewportCenter;
  const tooltipOffset = Math.max(avatarRect.height * 0.25, 45); // keep bubble comfortably above avatar while remaining visible
  const tooltipY = avatarRect.top - tooltipOffset;

  // Calculate tilt based on horizontal cursor movement relative to avatar center
  const dx = clientX - avatarViewportCenter;

  // Tilt range: ±45 degrees based on cursor position
  const maxTilt = 45;
  const tiltSensitivity = 100; // pixels from center for max tilt
  let rotation = (dx / tiltSensitivity) * maxTilt;

  // Clamp rotation to ±45 degrees
  rotation = Math.max(-maxTilt, Math.min(maxTilt, rotation));

  // Apply smooth rotation transition
  const rotationSmoothingFactor = 0.15;

  if (currentPosition && currentPosition.rotation !== undefined) {
    rotation =
      currentPosition.rotation +
      (rotation - currentPosition.rotation) * rotationSmoothingFactor;
  }

  return {
    left: tooltipX,
    top: tooltipY,
    rotation: rotation,
  };
};

// TooltipBubble: single-avatar tooltip that can be embedded in other components.
export const TooltipBubble = ({
  item,
  visible,
}: {
  item: { id: number; name: string; designation: string; image: string };
  visible: boolean;
}) => {
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: any) => {
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth =
        event.target && event.target.offsetWidth
          ? event.target.offsetWidth / 2
          : 32;
      x.set(event.nativeEvent ? event.nativeEvent.offsetX - halfWidth : 0);
    });
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 260, damping: 10 },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="pointer-events-none absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
          >
            <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
            <div className="relative z-30 text-base font-bold text-white">
              {item.name}
            </div>
            <div className="text-xs text-white">{item.designation}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render the avatar image; we keep pointer-events on the image so marquee hover still works */}
      <div onMouseMove={handleMouseMove}>
        <Image
          height={100}
          width={100}
          src={item.image}
          alt={item.name}
          className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
        />
      </div>
    </div>
  );
};
