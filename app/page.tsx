"use client";

import React from "react";
import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";
import InlineLogo from "@/components/InlineLogo";
import TeamSection from "@/components/TeamSection";
import Image from "next/image";

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
              "w-full",
              // limit readable width; still fluid for wide screens
              "max-w-[100rem]",
              // ensure hero takes up more than full viewport height to push motto section below fold
              "min-h-[calc(120svh)]",
              // use flex to center hero content in the viewport
              "flex flex-col items-center justify-center",
              // position relative for absolute positioning of content
              "relative",
            ].join(" ")}
          >
            {/* Centered content container */}
            <div
              className={[
                // absolute positioning to center in viewport regardless of section height
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                // account for navbar height
                "mt-[calc(2rem)] sm:mt-[calc(1rem)] md:mt-[calc(0rem)]",
                // stack logo + heading vertically and center
                "flex flex-col items-center justify-center text-center",
                // keep a bit of gap that scales with screen
                "gap-4 sm:gap-6 md:gap-8",
                // prevent overflow on very narrow devices
                "w-full max-w-[90rem]",
                // ensure content doesn't overflow viewport width
                "px-4 sm:px-6 md:px-8",
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
                      // fluid type using clamp; Tailwind doesn't yet expose arbitrary clamp tokens for font-size without brackets
                      "text-[clamp(2rem,8vw,5rem)]",
                      // strong but not too tight line height
                      "leading-[1.05]",
                      // weight and tracking for a hero feel
                      "font-bold tracking-tight",
                      // ensure no overflow on tiny widths
                      "break-words",
                      // prevent accidental horizontal scroll
                      "max-w-[min(95ch,100%)]",
                      // center the text explicitly
                      "text-center mx-auto",
                    ].join(" ")}
                    // extra fallback if some older browser ignores the arbitrary value
                    style={{
                      fontSize: "clamp(2rem, 8vw, 5rem)",
                      fontFamily: "Broadway-font",
                    }}
                  >
                    GeeksforGeeks
                  </h1>
                </div>
              </TextAnimation>
            </div>
          </section>
          {/* Our Motto Section */}
          <MottoSection />
          {/* Meet our Team Section */}
          <TeamSection />
        </main>
      </ReactLenis>
    </>
  );
}

// Motto Section
function MottoSection() {
  return (
    <section className="w-full max-w-[100rem] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-12 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 text-foreground relative">
      <div className="flex-1 flex flex-col items-start justify-center text-left gap-3 sm:gap-4 md:gap-6 w-full">
        <TextAnimation>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 leading-tight">
            Our <span className="text-[#0f9d58]">Motto</span>
          </h2>
        </TextAnimation>
        <p className="text-base sm:text-lg md:text-xl max-w-full md:max-w-xl text-muted-foreground leading-relaxed">
          Empowering students to learn, grow, and innovate together. We believe
          in collaboration, curiosity, and making technology accessible to all.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center w-full md:w-auto mt-4 sm:mt-6 md:mt-0">
        <Image
          src="/Background-image.png"
          alt="Our Motto"
          className="rounded-xl shadow-lg w-full max-w-[280px] sm:max-w-xs md:max-w-md h-auto object-cover"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
