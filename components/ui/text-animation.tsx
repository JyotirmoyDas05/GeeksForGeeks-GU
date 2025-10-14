"use client";

import React, { useRef, ReactNode } from "react";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface TextAnimationProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

export default function TextAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
}: TextAnimationProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<(HTMLElement | SplitText)[]>([]);
  const lines = useRef<Element[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = [];
      lines.current = [];

      let elements: HTMLElement[] = [];

      // Check if we have multiple children or should target child elements
      const hasWrapper = containerRef.current.hasAttribute("data-copy-wrapper");

      if (hasWrapper) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        // For single child, look for text-containing elements
        const textElements = containerRef.current.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, span, div"
        );
        if (textElements.length > 0) {
          elements = Array.from(textElements) as HTMLElement[];
        } else {
          elements = [containerRef.current];
        }
      }

      elements.forEach((element) => {
        // Skip if element has no text content
        if (!element.textContent?.trim()) return;

        splitRef.current.push(element);

        const split = SplitText.create(element, {
          type: "lines",
          linesClass: "line++",
        });

        splitRef.current.push(split);

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            const firstLine = split.lines[0] as HTMLElement;
            firstLine.style.paddingLeft = textIndent;
          }
          element.style.textIndent = "0";
        }

        lines.current.push(...split.lines);
      });

      if (lines.current.length === 0) return;

      // Set initial state - text hidden
      gsap.set(lines.current, { yPercent: 100 });

      const animationProps = {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        splitRef.current.forEach((split) => {
          if (split && typeof split === "object" && "revert" in split) {
            (split as SplitText).revert();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] }
  );

  // Always wrap in a div for consistent behavior
  return (
    <div
      ref={containerRef}
      data-copy-wrapper={
        React.Children.count(children) > 1 ? "true" : undefined
      }
    >
      {children}
    </div>
  );
}
