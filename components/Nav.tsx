"use client";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Spin as Hamburger } from "hamburger-react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  MotionProps,
} from "motion/react";

const pillAnimation: MotionProps = {
  variants: {
    hidden: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      filter: "blur(10px)",
      maskPosition: "0% 150%",
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      maskPosition: "0% 0%",
      transition: { type: "spring", stiffness: 420, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      filter: "blur(10px)",
      maskPosition: "0% 150%",
      transition: { duration: 0.18 },
    },
  },
  initial: "hidden",
  animate: "show",
  exit: "exit",
};

function Nav() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // click outside to close the pill
  React.useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [isOpen]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-30 flex justify-center p-0 transition-all duration-300 pointer-events-none"
      )}
    >
      <div
        ref={wrapRef}
        className={cn(
          "relative flex justify-between items-center w-full mx-auto transition-all duration-300 pointer pointer-events-auto",
          isScrolled
            ? "max-w-4xl px-8 lg:px-10 py-14 bg-background/50 border border-border rounded-xl backdrop-blur-lg shadow-2xl mt-4"
            : "max-w-6xl px-10 lg:px-20 py-16"
        )}
        style={{ gap: "2.5rem" }}
      >
        {/* Logo */}
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

        {/* Desktop Links */}
        <div
          className="nav-links hidden md:flex"
          style={{
            gap: "2rem",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            alignItems: "center",
          }}
        >
          <Link href="/about">About</Link>
          <Link href="/events">Events</Link>
          <Link href="/members">Members</Link>
        </div>

        {/* Right side */}
        <div
          className="flex items-center"
          style={{
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            paddingRight: "1.5rem",
            gap: "1rem",
          }}
        >
          <ThemeToggle />
          <div className="max-[767px]:block hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} size={24} />
          </div>
        </div>

        {/* Singular pill dropdown under navbar (mobile only) */}
        <MotionConfig transition={{ duration: 0.6 }}>
          <AnimatePresence mode="popLayout">
            {isOpen && (
              <motion.div
                key="mobile-pill"
                {...pillAnimation}
                className={cn(
                  "absolute right-4 w-[min(16rem,calc(100vw-2rem))] md:hidden",
                  "translate-y-full mt-3",
                  // glassmorphic visuals:
                  "rounded-3xl bg-background/60 backdrop-blur-3xl", // <- add this
                  "border border-white/10 dark:border-white/5", // subtle frosted border
                  "shadow-2xl",
                  "px-6 py-6",
                  "flex flex-col items-center"
                )}
                // mask for soft reveal similar to your component
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                  WebkitMaskSize: "100% 300%",
                  maskSize: "100% 300%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              >
                <div
                  className="flex flex-col items-center justify-center gap-2 text-[0.95rem] text-center"
                  style={{
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    paddingLeft: "0.15rem",
                    paddingRight: "0.15rem",
                  }}
                >
                  <Link
                    href="/events"
                    onClick={() => setOpen(false)}
                    className="hover:opacity-80"
                  >
                    Events
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="hover:opacity-80"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="hover:opacity-80"
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </div>
    </nav>
  );
}

export default Nav;
