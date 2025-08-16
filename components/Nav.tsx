"use client";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

function Nav() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-30 flex justify-center p-0 transition-all duration-300 pointer-events-none"
      )}
    >
      <div
        className={cn(
          "flex justify-between items-center w-full mx-auto transition-all duration-300 pointer pointer-events-auto",
          isScrolled
        ? "max-w-4xl px-8 lg:px-10 py-14 bg-background/50 border border-border rounded-xl backdrop-blur-lg shadow-2xl mt-4"
        : "max-w-6xl px-10 lg:px-20 py-16"
        )}
        style={{ gap: "2.5rem" }}
      >
        <div
          className="nav-logo"
          style={{
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        paddingLeft: "1.5rem",
          }}
        >
          <Link href="/">GFG GU</Link>
        </div>
        <div
          className="nav-links"
          style={{
        display: "flex",
        gap: "2rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        alignItems: "center",
          }}
        >
          <Link href="/members">Members</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div
          style={{
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        paddingRight: "1.5rem"
          }}
        >
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
