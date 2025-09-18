"use client";

import React, { useEffect, useRef } from "react";
import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";
import InlineLogo from "@/components/InlineLogo";
import TeamSection from "@/components/TeamSection";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  return (
    <>
      {/* Page-level responsive styles (optional, see CSS block below) */}
      <ReactLenis root>
        <main
          className={[
            // full viewport, respect mobile browser UI with svh
            "min-h-[100svh]",
            // layout: center content, allow stacking on narrow screens
            "flex flex-col items-center justify-center",
            // pad horizontally with responsive gutters
            "px-4 sm:px-6 md:px-8",
          ].join(" ")}
        >
          {/* Hero container constrained for readability */}
          <section
            className={[
              "w-full max-w-[100rem]",
              // hero should fill viewport height while allowing nav overlay
              "min-h-[100svh]",
              // center content naturally
              "flex flex-col items-center justify-center",
              // internal horizontal padding mirrors main
              "px-4 sm:px-6 md:px-8",
              // provide top padding so content never hides under nav
              "pt-28 sm:pt-32",
              // subtle bottom padding so first scroll feels smooth
              "pb-16 sm:pb-24",
            ].join(" ")}
          >
            <div
              className={[
                "flex flex-col items-center justify-center text-center",
                // responsive gap
                "gap-5 sm:gap-7 md:gap-9",
                // width constraints
                "w-full max-w-5xl",
                // smooth entrance spacing
                "mx-auto",
              ].join(" ")}
            >
              <TextAnimation>
                <div className="flex flex-col items-center justify-center text-center w-full">
                  {/* Inline Logo scales responsively with a max width */}
                  <InlineLogo
                    className={[
                      "inline-logo",
                      // size: clamp for fluid logo size; Tailwind inline style as fallback below
                      "w-[clamp(122px,70vw,272px)]",
                      "h-auto",
                      // ensure proper centering
                      "mx-auto",
                    ].join(" ")}
                  />

                  {/* Responsive heading: fluid + safe line-height */}
                  <h1
                    className={[
                      // refined clamp to avoid lateral clipping on ultra‑narrow devices
                      "text-[clamp(1.9rem,7.2vw,4.25rem)]",
                      "leading-[1.07] font-bold tracking-tight",
                      "break-words max-w-[22ch] sm:max-w-[28ch] md:max-w-[32ch]",
                      "text-center mx-auto px-1",
                    ].join(" ")}
                    style={{ fontFamily: "Broadway-font" }}
                  >
                    GeeksforGeeks
                  </h1>
                </div>
              </TextAnimation>
            </div>
          </section>
          {/* Spacer to ensure Motto begins after initial fold without awkward huge hero height */}
          <div className="h-12 sm:h-16 md:h-20" aria-hidden="true" />
          {/* Our Motto Section */}
          <MottoSection />
          {/* Meet our Team Section */}
          <TeamSection />
        </main>
      </ReactLenis>
    </>
  );
}

// Animated Motto Heading Component
function AnimatedMottoHeading() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const heading = headingRef.current;
    const words = heading.querySelectorAll(".word");

    // Set initial state - words start below and invisible
    gsap.set(words, {
      y: 100,
      opacity: 0,
    });

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 85%",
        end: "top 50%",
        scrub: false,
        toggleActions: "play none none reverse",
        // Refresh on resize for responsive behavior
        invalidateOnRefresh: true,
      },
    });

    // Animate words in sequence
    tl.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === heading) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <h2
      ref={headingRef}
      className={[
        "font-bold leading-tight tracking-tight",
        "text-3xl sm:text-4xl md:text-5xl",
      ].join(" ")}
    >
      {/* Screen reader text for accessibility */}
      <span className="sr-only">Our Motto</span>
      <span aria-hidden="true">
        <span className="word inline-block">Our</span>{" "}
        <span className="word inline-block">
          <span className="text-[#0f9d58]">Motto</span>
        </span>
      </span>
    </h2>
  );
}

// Motto Section
function MottoSection() {
  return (
    <section
      className={[
        "w-full max-w-[95rem] mx-auto",
        // layout: stack then row
        "flex flex-col md:flex-row items-center md:items-start justify-between",
        // spacing tuned per breakpoint
        "gap-8 sm:gap-10 md:gap-14",
        // vertical rhythm
        "py-10 sm:py-14 md:py-20",
        // horizontal padding for narrow screens
        "px-4 sm:px-6 md:px-8",
        "text-foreground relative",
      ].join(" ")}
    >
      <div
        className={[
          "flex-1 flex flex-col items-start text-left",
          "gap-4 sm:gap-5 md:gap-6",
          // limit paragraph width for readability
          "max-w-xl",
        ].join(" ")}
      >
        <AnimatedMottoHeading />
        <p
          className={[
            "text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed",
          ].join(" ")}
        >
          Empowering students to learn, grow, and innovate together. We believe
          in collaboration, curiosity, and making technology accessible to all.
        </p>
      </div>
      <div className="flex-1 w-full flex items-center justify-center mt-6 md:mt-0">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <Image
            src="/Background-image.png"
            alt="Our Motto"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
            width={640}
            height={480}
            priority
          />
        </div>
      </div>
    </section>
  );
}
