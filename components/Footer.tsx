"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Logo from "./Logo";
import { useTransition } from "./transition-context";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import AnimatedFooterLink from "./ui/AnimatedFooterLink";
import PixelatedHoverEffect from "./PixelatedHoverEffect";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  // removed logoSectionRef and related desktop/mobile logo blocks per request
  const navSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const largeBrandingRef = useRef<HTMLDivElement>(null);
  const largeLogoRef = useRef<HTMLDivElement>(null);
  const largeTextRef = useRef<HTMLHeadingElement>(null);
  const mobileBrandingRef = useRef<HTMLDivElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const mobileLargeTextRef = useRef<HTMLHeadingElement>(null);
  const mobileSubTextRef = useRef<HTMLHeadingElement>(null);

  // Respect global transition state: if a page transition is active we should
  // unmount the footer to avoid it peeking through overlays. useTransition
  // throws when used outside the provider, so wrap in try/catch and fall back
  // to checking the document-level class (compatibility shim).
  let isTransitionActive = false;
  try {
    const _ctx = useTransition();
    isTransitionActive = _ctx.isTransitionActive;
  } catch (e) {
    if (typeof window !== "undefined") {
      isTransitionActive =
        document.documentElement.classList.contains("transition-active");
    }
  }

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Hide navbar when footer is visible, show when scrolling back up
      const navbar = document.querySelector("nav");
      if (navbar) {
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: "top bottom", // When footer top hits bottom of viewport
          end: "top top", // When footer top hits top of viewport
          onEnter: () => {
            // Footer is entering viewport - hide navbar
            gsap.to(navbar, {
              y: -200,
              opacity: 0,
              duration: 0.6,
              ease: "power3.inOut",
            });
          },
          onLeaveBack: () => {
            // Scrolling back up above footer - show navbar
            gsap.to(navbar, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.inOut",
            });
          },
        });
      }

      // Animate navigation links
      const navLinks = navSectionRef.current?.querySelectorAll("a");
      if (navLinks) {
        gsap.from(navLinks, {
          x: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: navSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Animate contact section
      gsap.from(contactSectionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate social icons
      const socialIcons = socialSectionRef.current?.querySelectorAll("a");
      if (socialIcons) {
        gsap.from(socialIcons, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Animate copyright
      gsap.from(copyrightRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: copyrightRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate large branding section - Awwwards style
      if (largeLogoRef.current) {
        gsap.from(largeLogoRef.current, {
          scale: 0.8,
          opacity: 0,
          rotation: -10,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: largeBrandingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (largeTextRef.current) {
        // Wait for font to load before animating
        document.fonts.ready.then(() => {
          if (!largeTextRef.current) return;

          // Split text animation - each word appears sequentially
          const words = largeTextRef.current.innerText.split(" ");
          const wordsHTML = words
            .map(
              (word) =>
                `<span class="inline-block footer-large-text" style="font-family: 'Agrandir Grand Heavy', sans-serif; font-weight: 700;">${word}</span>`
            )
            .join(" ");
          largeTextRef.current.innerHTML = wordsHTML;

          const wordElements = largeTextRef.current.querySelectorAll("span");
          gsap.from(wordElements, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: largeBrandingRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      // Animate mobile branding section with a modern reveal effect
      if (mobileBrandingRef.current) {
        // Logo animation - scale with blur
        if (mobileLogoRef.current) {
          gsap.from(mobileLogoRef.current, {
            scale: 0.5,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileBrandingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Large text animation - slide up with fade
        if (mobileLargeTextRef.current) {
          gsap.from(mobileLargeTextRef.current, {
            y: 60,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileBrandingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // Subtext animation - slide up with fade
        if (mobileSubTextRef.current) {
          gsap.from(mobileSubTextRef.current, {
            y: 40,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.9,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobileBrandingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  // Conditional render after all hooks have been called
  if (isTransitionActive) return null;

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#222525] px-6 sm:px-8 lg:px-14 flex flex-col min-h-screen pb-28 lg:pb-36"
    >
      <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Desktop Layout - Exact Figma positioning */}
        <div
          className="hidden lg:block relative pt-9 flex-1"
          style={{ minHeight: "155px" }}
        >
          {/* Desktop layout retained */}
          {/* Navigation Links - Center Left (33.333% + 87px from Figma) */}
          <div
            ref={navSectionRef}
            className="absolute flex flex-col gap-[13px]"
            style={{
              left: "calc(33.333% + 87px)",
              top: "18px",
            }}
          >
            <h3
              className="text-white mb-[28px]"
              style={{
                fontFamily: "Agrandir Grand Heavy, Poppins, sans-serif",
                fontSize: "24px",
                lineHeight: "normal",
                letterSpacing: "0.48px",
                fontWeight: 600,
              }}
            >
              Links
            </h3>
            <AnimatedFooterLink
              href="/about"
              direction="left"
              className="text-[#d1d5db] hover:text-[#2ecc71] transition-colors duration-300"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "20px",
                lineHeight: "normal",
                letterSpacing: "-0.4px",
                fontWeight: 500,
                color: "#d1d5db",
              }}
            >
              About Us
            </AnimatedFooterLink>
            <AnimatedFooterLink
              href="/events"
              direction="center"
              className="text-[#d1d5db] hover:text-[#2ecc71] transition-colors duration-300"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "20px",
                lineHeight: "normal",
                letterSpacing: "-0.4px",
                fontWeight: 500,
                color: "#d1d5db",
              }}
            >
              Events
            </AnimatedFooterLink>
            <AnimatedFooterLink
              href="/contact"
              direction="right"
              className="text-[#d1d5db] hover:text-[#2ecc71] transition-colors duration-300"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "20px",
                lineHeight: "normal",
                letterSpacing: "-0.4px",
                fontWeight: 500,
                color: "#d1d5db",
              }}
            >
              Contact
            </AnimatedFooterLink>
          </div>

          {/* Contact Section - Center Right (58.333% + 66px from Figma) */}
          <div
            ref={contactSectionRef}
            className="absolute flex flex-col gap-2"
            style={{
              left: "calc(58.333% + 66px)",
              top: "16px",
            }}
          >
            <h3
              className="text-white mb-[28px]"
              style={{
                fontFamily: "Agrandir Grand Heavy, Poppins, sans-serif",
                fontSize: "24px",
                lineHeight: "normal",
                letterSpacing: "0.48px",
                fontWeight: 600,
              }}
            >
              Contact Us
            </h3>
            <a
              href="mailto:gfggucampusbody@gmail.com"
              className="text-[#868686] hover:text-[#2ecc71] transition-colors duration-300 mt-2"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "16px",
                lineHeight: "25px",
                letterSpacing: "-0.32px",
                fontWeight: 500,
              }}
            >
              gfggucampusbody@gmail.com
            </a>
          </div>

          {/* Socials Section - Right (83.333% + 71px from Figma) */}
          <div
            ref={socialSectionRef}
            className="absolute flex flex-col gap-2"
            style={{
              left: "calc(83.333% + 71px)",
              top: "13px",
            }}
          >
            <h3
              className="text-white mb-[28px]"
              style={{
                fontFamily: "Agrandir Grand Heavy, Poppins, sans-serif",
                fontSize: "24px",
                lineHeight: "normal",
                letterSpacing: "0.48px",
                fontWeight: 600,
              }}
            >
              Socials
            </h3>
            <div className="flex items-center gap-[13.5px]">
              <a
                href="https://www.linkedin.com/company/gfg-chapter-gauhati-university"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/gfg4gu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
        {/* Awwwards-style Large Branding Section - Desktop */}
        <div
          ref={largeBrandingRef}
          className="hidden lg:flex items-end justify-between pb-12 pt-8 gap-8 footer-large-branding"
        >
          {/* Large Logo on the Left */}
          <div ref={largeLogoRef} className="flex-shrink-0">
            <PixelatedHoverEffect
              intensity={0.4}
              pixelSize={15}
              hoverRadius={0.5}
            >
              <Logo className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[300px] xl:h-[300px]" />
            </PixelatedHoverEffect>
          </div>

          {/* Large Text on the Right */}
          <div className="flex-1 flex flex-col items-end justify-center">
            <PixelatedHoverEffect
              intensity={0.35}
              pixelSize={18}
              hoverRadius={0.45}
            >
              <h1
                ref={largeTextRef}
                className="footer-large-text text-[#fefefe] leading-none tracking-tighter"
                style={{
                  fontSize: "clamp(3.5rem, 5.8vw, 7.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  textAlign: "right",
                  fontFamily: "Agrandir Grand Heavy, sans-serif",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                }}
              >
                GFG Campus Body
              </h1>
            </PixelatedHoverEffect>
            <PixelatedHoverEffect
              intensity={0.35}
              pixelSize={18}
              hoverRadius={0.45}
            >
              <h2
                className="footer-subtext text-[#fefefe] leading-none tracking-tighter"
                style={{
                  fontSize: "clamp(2rem, 4vw, 6rem)",
                  fontWeight: 800,
                  textAlign: "left",
                  fontFamily:
                    "Agrandir Tight Bold, Agrandir Grand Heavy, sans-serif",
                  whiteSpace: "nowrap",
                  marginTop: "6px",
                  opacity: 0.95,
                }}
              >
                Gauhati University
              </h2>
            </PixelatedHoverEffect>
          </div>
        </div>{" "}
        {/* Mobile & Tablet Layout - Absolute-positioned to mirror desktop */}
        <div className="lg:hidden relative pt-6" style={{ minHeight: "320px" }}>
          {/* Navigation Links - positioned similar to desktop but adapted for small screens */}
          <div
            ref={navSectionRef}
            className="absolute flex flex-col gap-[13px] z-20"
            style={{ left: "6px", top: "8px" }}
          >
            <h3
              className="text-white mb-[12px]"
              style={{
                fontFamily: "Agrandir Grand Heavy, Poppins, sans-serif",
                fontSize: "20px",
                lineHeight: "normal",
                letterSpacing: "0.48px",
                fontWeight: 600,
              }}
            >
              Links
            </h3>
            <AnimatedFooterLink
              href="/about"
              direction="left"
              className="text-[#d1d5db] hover:text-[#2ecc71] transition-colors duration-300"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "16px",
                fontWeight: 500,
                color: "#d1d5db",
              }}
            >
              About Us
            </AnimatedFooterLink>
            <AnimatedFooterLink
              href="/events"
              direction="center"
              className="text-[#d1d5db] hover:text-[#2ecc71] transition-colors duration-300"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "16px",
                fontWeight: 500,
                color: "#d1d5db",
              }}
            >
              Events
            </AnimatedFooterLink>
            <AnimatedFooterLink
              href="/members"
              direction="right"
              className="text-[#d1d5db] hover:text-[#2ecc71] transition-colors duration-300"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "16px",
                fontWeight: 500,
                color: "#d1d5db",
              }}
            >
              Members
            </AnimatedFooterLink>
          </div>

          {/* Contact Section - positioned center-right on mobile */}
          <div
            ref={contactSectionRef}
            className="absolute flex flex-col gap-2 z-20"
            style={{ left: "50%", transform: "translateX(-50%)", top: "8px" }}
          >
            <h3
              className="text-white mb-3"
              style={{
                fontFamily: "Agrandir Grand Heavy, Poppins, sans-serif",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Contact Us
            </h3>
            <a
              href="mailto:gfggucampusbody@gmail.com"
              className="text-[#868686] hover:text-[#2ecc71] transition-colors duration-300 break-all mt-2"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              gfggucampusbody@gmail.com
            </a>
          </div>

          {/* Socials Section - positioned right on mobile */}
          <div
            ref={socialSectionRef}
            className="absolute flex flex-col gap-2 z-20"
            style={{ right: "6px", top: "8px" }}
          >
            <h3
              className="text-white mb-4"
              style={{
                fontFamily: "Agrandir Grand Heavy, Poppins, sans-serif",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Socials
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/gfg-chapter-gauhati-university"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.instagram.com/gfg4gu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Copyright was moved to absolute bottom-left to sit below branding for both mobile and desktop */}
        </div>
        {/* Awwwards-style Large Branding Section - Mobile */}
        <div
          ref={mobileBrandingRef}
          className="lg:hidden flex flex-col items-center gap-4 pb-4 pt-6 footer-large-branding"
        >
          {/* Large Logo */}
          <div ref={mobileLogoRef} className="flex-shrink-0">
            <Logo className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]" />
          </div>

          {/* Large Text */}
          <div className="flex flex-col items-center gap-1">
            <h1
              ref={mobileLargeTextRef}
              className="footer-large-text text-[#fefefe] leading-none tracking-tighter text-center"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 3.25rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                fontFamily: "Agrandir Grand Heavy, sans-serif",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              GFG Campus Body
            </h1>
            <h2
              ref={mobileSubTextRef}
              className="footer-subtext text-[#fefefe] leading-none tracking-tighter text-center"
              style={{
                fontSize: "clamp(0.9rem, 3.5vw, 1.25rem)",
                fontWeight: 800,
                fontFamily:
                  "Agrandir Tight Bold, Agrandir Grand Heavy, sans-serif",
                whiteSpace: "nowrap",
                opacity: 0.95,
              }}
            >
              Gauhati University
            </h2>
          </div>
        </div>
        {/* Copyright placed in normal flow below branding so it never overlaps */}
        {/* Copyright - Desktop */}
        <div className="hidden lg:block w-full pl-4 lg:pl-14 pb-6">
          <p
            ref={copyrightRef}
            className="text-[#868686]"
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            © GFG GU Community - {currentYear}
          </p>
        </div>

        {/* Copyright - Mobile */}
        <div className="lg:hidden w-full text-left pb-6">
          <p
            ref={copyrightRef}
            className="text-[#868686]"
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            © GFG GU Community - {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
