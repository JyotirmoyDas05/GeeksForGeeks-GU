import type { Metadata } from "next";
import Nav from "@/components/Nav";
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
      <body>
        <CodeGlyphField className="glyph-bg" />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTransition>
            <Nav />
            {children}
          </PageTransition>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
