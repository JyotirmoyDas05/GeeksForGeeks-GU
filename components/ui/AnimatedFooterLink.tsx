"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const STAGGER = 0.035;

// TextRoll Component
const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn(
        "relative inline-block overflow-hidden whitespace-nowrap",
        className
      )}
      style={{
        lineHeight: 1.2,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
              style={{ whiteSpace: "pre" }}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
              style={{ whiteSpace: "pre" }}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

// AnimatedFooterLink Component
interface AnimatedFooterLinkProps {
  href: string;
  children: React.ReactNode;
  direction?: "left" | "right" | "center";
  className?: string;
  style?: React.CSSProperties;
}

function AnimatedFooterLink({
  href,
  children,
  direction = "left",
  className = "",
  style,
}: AnimatedFooterLinkProps) {
  return (
    <a href={href} className={`group inline-block ${className}`} style={style}>
      {/* Content Wrapper for Dynamic Width */}
      <span className="relative inline-flex items-center">
        {/* Rolling Text Wrapper */}
        <TextRoll>{String(children)}</TextRoll>

        {/* Arrow SVG Icon */}
        <span
          className="inline-block ml-2 opacity-0 -translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:-translate-y-[0.05em] translate-x-[0.3em]"
          style={{ verticalAlign: "middle" }}
        >
          <svg
            className="ml-[0.3em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
            fill="none"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        {/* Animated Underline - Now Dynamic */}
        <span
          className={`absolute bottom-0 h-[2px] bg-[#2ecc71] transition-all duration-300 ease-out
            ${
              direction === "left"
                ? "w-0 group-hover:w-full origin-left left-0"
                : direction === "right"
                ? "w-0 group-hover:w-full origin-right right-0"
                : "w-0 group-hover:w-full origin-center left-1/2 -translate-x-1/2"
            }
          `}
        />
      </span>
    </a>
  );
}

// Export both components
export { TextRoll };
export default AnimatedFooterLink;
