"use client";

import ReactLenis from "lenis/react";
import CodeGlyphField from "@/components/CodeGlyphField";
import AboutHero from "@/components/AboutHero";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <CodeGlyphField className="glyph-bg" />

        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <AboutHero />
          </main>
          <Footer />
        </div>

    </>
  );
}
