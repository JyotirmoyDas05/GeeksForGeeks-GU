"use client";

import React from "react";

interface StickyFooterRevealProps {
  children: React.ReactNode;
}

// Sticky footer reveal implementation based on Olivier Larose's method.
// The outer wrapper uses clip-path to create a "window" through which
// the footer is revealed. The inner wrapper creates extra height with
// negative offset, and the sticky element sticks at the calculated position
// to create the reveal effect as you scroll.
export default function StickyFooterReveal({
  children,
}: StickyFooterRevealProps) {
  const footerHeight = "100vh"; // Full viewport height

  return (
    <div
      className="relative"
      style={{
        height: footerHeight,
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className="relative"
        style={{
          height: `calc(100vh + ${footerHeight})`,
          top: `-100vh`,
        }}
      >
        <div
          className="sticky"
          style={{
            height: footerHeight,
            top: `calc(100vh - ${footerHeight})`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
