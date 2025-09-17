import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import CodeGlyphField from "@/components/CodeGlyphField";
import ReactLenis from "lenis/react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GFG GU Student Chapter ",
  description: "Website for the Geeks for Geeks Community Charter of Guwahati University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CodeGlyphField className="glyph-bg" />
          <CodeGlyphField className="glyph-bg" />
          <CodeGlyphField className="glyph-bg" />
          <CodeGlyphField className="glyph-bg" />
          <CodeGlyphField className="glyph-bg" />
          <CodeGlyphField className="glyph-bg" />
          <ReactLenis root>
            <PageTransition>
              {children}
              <Nav />
            </PageTransition>
            <Analytics />
          </ReactLenis>
          
          {/* Single Footer with responsive positioning */}
          <div className="relative md:fixed md:bottom-0 md:left-0 md:right-0 md:z-[100]">
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
