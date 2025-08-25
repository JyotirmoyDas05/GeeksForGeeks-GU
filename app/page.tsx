"use client";

import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";
import InlineLogo from "@/components/InlineLogo";

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
            "flex flex-col",
            // pad horizontally with responsive gutters
            "px-4 sm:px-6 md:px-8",
          ].join(" ")}
        >
          {/* Hero container constrained for readability */}
          <section
            className={[
              "container mx-auto w-full",
              // limit readable width; still fluid for wide screens
              "max-w-[100rem]",
              // vertical spacing accounts for fixed nav height
              // base top padding is small; increases on bigger screens
              "pt-[calc(5rem+2vh)] sm:pt-[calc(6rem+3vh)] md:pt-[calc(7rem+4vh)]",
              // bottom padding so content breathes on small screens
              "pb-16 sm:pb-20 md:pb-24",
              // use grid to center hero easily
              "grid place-items-center",
            ].join(" ")}
          >
            <div
              className={[
                // stack logo + heading vertically and center
                "flex flex-col items-center text-center",
                // keep a bit of gap that scales with screen
                "gap-4 sm:gap-6 md:gap-8",
                // prevent overflow on very narrow devices
                "w-full max-w-[90rem]",
              ].join(" ")}
            >
              <TextAnimation>
                {/* Inline Logo scales responsively with a max width */}
                <InlineLogo
                  className={[
                    "inline-logo",
                    // size: clamp for fluid logo size; Tailwind inline style as fallback below
                    "w-[clamp(122px,70vw,272px)]",
                    "h-auto",
                  ].join(" ")}
                />

                {/* Responsive heading: fluid + safe line-height */}
                <h1
                  className={[
                    // fluid type using clamp; Tailwind doesn’t yet expose arbitrary clamp tokens for font-size without brackets
                    "text-[clamp(2rem,8vw,5rem)]",
                    // strong but not too tight line height
                    "leading-[1.05]",
                    // weight and tracking for a hero feel
                    "font-bold tracking-tight",
                    // ensure no overflow on tiny widths
                    "break-words",
                    // prevent accidental horizontal scroll
                    "max-w-[min(95ch,100%)]",
                  ].join(" ")}
                  // extra fallback if some older browser ignores the arbitrary value
                  style={{ fontSize: "clamp(2rem, 8vw, 5rem)" }}
                >
                  GeeksforGeeks
                </h1>
              </TextAnimation>
            </div>
          </section>
        </main>
      </ReactLenis>
    </>
  );
}
