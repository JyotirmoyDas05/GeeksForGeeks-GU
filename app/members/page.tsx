"use client";


import CodeGlyphField from "@/components/CodeGlyphField";
import MembersSection from "@/components/MembersSection";
import Footer from "@/components/Footer";

export default function Members() {
  return (
    <>
      <CodeGlyphField className="glyph-bg" />
        <div className="min-h-screen">
          <MembersSection />
          <Footer />
        </div>

    </>
  );
}
