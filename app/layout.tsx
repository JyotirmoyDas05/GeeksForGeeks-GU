import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyFooterReveal from "@/components/ui/StickyFooterReveal";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import CodeGlyphField from "@/components/CodeGlyphField";

export const metadata: Metadata = {
  title: "GFG GU Student Chapter ",
  description:
    "Website for the Geeks for Geeks Community Charter of Guwahati University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Google Fonts - moved from CSS @import for compatibility with Tailwind CSS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Agrandir fonts from OnlineWebFonts */}
        <link
          href="https://db.onlinewebfonts.com/c/eccf30d3af8a69bf0b97f01c6d46b8e2?family=Agrandir+Grand+Heavy"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/61d512c3f7f8d9cc4b4eb326d833f80c?family=Agrandir+Tight+Bold"
          rel="stylesheet"
        />
      </head>
      <body>
        <CodeGlyphField className="glyph-bg" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTransition>
            <Nav />
            <div className="main-content">{children}</div>
            <StickyFooterReveal>
              <Footer />
            </StickyFooterReveal>
          </PageTransition>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
