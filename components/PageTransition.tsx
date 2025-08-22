"use client";

import Logo from "./Logo";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";

const PageTransition = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoOverlayRef = useRef(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blocksRef.current = [];

      for (let i = 0; i < 10; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();

    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

    if (logoRef.current) {
      const path = logoRef.current.querySelector("path");
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });
      }
    }

    revealPage();

    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      coverPage(url);
    };

    const links = document.querySelectorAll<HTMLAnchorElement>("a[href^='/']");
    const clickHandlers: Array<(e: Event) => void> = [];
    links.forEach((link) => {
      const handler = (e: Event) => {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).href;
        const url = new URL(href, window.location.origin).pathname;
        if (url !== pathname) {
          handleRouteChange(url);
        }
      };
      link.addEventListener("click", handler);
      clickHandlers.push(handler);
    });

    return () => {
      links.forEach((link, i) => {
        link.removeEventListener("click", clickHandlers[i]);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname]);

  const coverPage = (url: string) => {
    const tl = gsap.timeline({
      onComplete: () => router.push(url),
    });

    tl.to(blocksRef.current, {
      scaleX: 1,
      duration: 0.3,
      stagger: 0.015,
      ease: "power2.Out",
      transformOrigin: "left",
    }).set(logoOverlayRef.current, { opacity: 1 }, "-=0.15");

    const logoPath = logoRef.current?.querySelector("path");
    if (logoPath) {
      tl.set(
        logoPath,
        {
          strokeDashoffset: logoPath.getTotalLength(),
          fill: "transparent",
        },
        "-=0.25"
      )
        .to(
          logoPath,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .to(
          logoPath,
          {
            fill: "black",
            duration: 0.6,
            ease: "power2.Out",
          },
          "-=0.3"
        );
    }
    tl.to(logoOverlayRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.Out",
    });
  };

  const revealPage = () => {
    gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });

    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.25,
      stagger: 0.015,
      ease: "power2.Out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
      },
    });
  };

  return (
    <>
      <div ref={overlayRef} className="transition-overlay"></div>
      <div ref={logoOverlayRef} className="logo-overlay">
        <div className="logo-container">
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}
    </>
  );
};

export default PageTransition;
