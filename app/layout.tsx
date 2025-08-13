import type { Metadata } from "next";
import  Nav from "@/components/Nav";
import "./globals.css";



export const metadata: Metadata = {
  title: "Gfg Gu",
  description: "Website for the Geeks for Geeks Community Charter of Guwahati University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
