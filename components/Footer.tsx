"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Logo from "./Logo";
import { useTransition } from "./transition-context";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import AnimatedFooterLink from "./ui/AnimatedFooterLink";

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

      // logo/company section was removed; no animation required

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
                `<span class="inline-block footer-large-text">${word}</span>`
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
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  // Conditional render after all hooks have been called
  if (isTransitionActive) return null;

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#222525] px-6 sm:px-8 lg:px-14 flex flex-col"
      style={{ minHeight: "100vh" }}
    >
      <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col">
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
            className="absolute flex flex-col"
            style={{
              left: "calc(58.333% + 66px)",
              top: "16px",
            }}
          >
            <h3
              className="text-white mb-[28px]"
              style={{
                fontFamily: "Poppins, sans-serif",
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
              className="text-[#868686] hover:text-[#2ecc71] transition-colors duration-300"
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
            className="absolute flex flex-col"
            style={{
              left: "calc(83.333% + 71px)",
              top: "13px",
            }}
          >
            <h3
              className="text-white mb-[28px]"
              style={{
                fontFamily: "Poppins, sans-serif",
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
          className="hidden lg:flex items-end justify-between pb-12 pt-8 gap-8"
        >
          {/* Large Logo on the Left */}
          <div ref={largeLogoRef} className="flex-shrink-0">
            <Logo className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px]" />
          </div>

          {/* Large Text on the Right */}
          <div className="flex-1 flex items-center justify-end">
            <h1
              ref={largeTextRef}
              className="footer-large-text text-[#fefefe] leading-none tracking-tighter"
              style={{
                fontSize: "clamp(6rem, 8vw, 10rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                textAlign: "center",
              }}
            >
              GFG Campus Body
            </h1>
          </div>
        </div>{" "}
        {/* Mobile & Tablet Layout - Responsive */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-8 py-9">
          {/* Navigation Links */}
          <div ref={navSectionRef} className="flex flex-col gap-3">
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

          {/* Contact Section */}
          <div ref={contactSectionRef} className="flex flex-col">
            <h3
              className="text-white mb-3"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Contact Us
            </h3>
            <a
              href="mailto:gfggucampusbody@gmail.com"
              className="text-[#868686] hover:text-[#2ecc71] transition-colors duration-300 break-all"
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              gfggucampusbody@gmail.com
            </a>
          </div>

          {/* Socials Section */}
          <div ref={socialSectionRef} className="flex flex-col sm:col-span-2">
            <h3
              className="text-white mb-4"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              Socials
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-white" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p
            ref={copyrightRef}
            className="text-[#868686] sm:col-span-2 mt-4"
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            GFG Community - {currentYear}
          </p>
        </div>
        {/* Awwwards-style Large Branding Section - Mobile */}
        <div className="lg:hidden flex flex-col items-center gap-6 pb-8 pt-6">
          {/* Large Logo */}
          <div className="flex-shrink-0">
            <Logo className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]" />
          </div>

          {/* Large Text */}
          <h1
            className="text-[#fefefe] font-bold leading-none tracking-tighter text-center"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(2rem, 10vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            GFG Campus Body
          </h1>
        </div>
      </div>
    </footer>
  );
}
