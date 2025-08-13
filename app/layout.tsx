import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "GFG GU",
  description:
    "Website for the Geeks for Geeks Community Charter of Guwahati University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageTransition>
          <Nav />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
