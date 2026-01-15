"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Marquee from "@/components/ui/marquee";
import {
  MaglevTooltip,
  calculateMaglevPosition,
} from "@/components/ui/animated-tooltip";

type TeamMember = { id: number; name: string; image: string; alt: string };

const teamMembers: TeamMember[] = [
  { id: 1, name: "Ankita", image: "/ankita.jpg", alt: "DevOps Lead" },
  { id: 2, name: "Bhairab", image: "/bhairab.jpg", alt: "Game Dev Co-lead" },
  { id: 3, name: "Bhargab", image: "/bhargav.jpg", alt: "AI/ML Lead" },
  {
    id: 4,
    name: "Bitopan",
    image: "/bitopan.jpg",
    alt: "Robotics & IoT Co-lead",
  },
  { id: 5, name: "Debakalpa", image: "/Debakalpa.jpg", alt: "Event Co-lead" },
  {
    id: 6,
    name: "Dibyajyoti",
    image: "/Dibyajyoti.jpg",
    alt: "Social Media Co-lead",
  },
  { id: 7, name: "Diya", image: "/Diya.jpg", alt: "DSA Lead" },
  {
    id: 8,
    name: "Diya",
    image: "/Diya-3rd-sem.jpg",
    alt: "Robotics & IoT Co-lead",
  },
  { id: 9, name: "Dawar", image: "/Dawar.jpeg", alt: "PR Co-lead" },
  { id: 10, name: "Denim", image: "/denim_d.jpg", alt: "Robotics & IoT Lead" },
  { id: 11, name: "Dhritee", image: "/dhritee_.jpg", alt: "Event Lead" },
  { id: 12, name: "Gaurab", image: "/gaurav.jpg", alt: "Developer Lead" },
  {
    id: 13,
    name: "Garima",
    image: "/garima.jpg",
    alt: "Graphics & Design Co-lead",
  },
  {
    id: 14,
    name: "Jyotirmoy",
    image: "/jyotirmoy.jpeg",
    alt: "DevOps Co-lead",
  },
  {
    id: 15,
    name: "Jupitora",
    image: "/jupitora.jpg",
    alt: "Reels & Content Associate Lead",
  },
  {
    id: 16,
    name: "Jyotishman",
    image: "/jyotishman.jpg",
    alt: "Event Co-lead",
  },
  { id: 17, name: "Mandeep", image: "/mandeep.jpg", alt: "PR Associate" },
  { id: 18, name: "Muskan", image: "/Muskan.jpg", alt: "Developer Co-lead" },
  {
    id: 19,
    name: "Mriganga",
    image: "/Mriganga_.jpg",
    alt: "Robotics & IoT Lead",
  },
  { id: 20, name: "Nahid", image: "/Nahid.jpg", alt: "Graphics & Design Lead" },
  { id: 21, name: "Nitin", image: "/nitin.jpg", alt: "Technical Lead" },
  {
    id: 22,
    name: "Nishita",
    image: "/Nishita.jpg",
    alt: "Reels & Content Associate Lead",
  },
  {
    id: 23,
    name: "Neelim",
    image: "/neelim.jpg",
    alt: "Graphics & Design Associate",
  },
  {
    id: 24,
    name: "Parisa",
    image: "/parisa.jpg",
    alt: "Graphics & Design Associate",
  },
  {
    id: 25,
    name: "Prachi",
    image: "/prachi.jpg",
    alt: "Reels & Content Associate Lead",
  },
  {
    id: 26,
    name: "Pritom",
    image: "/pritom.jpg",
    alt: "Reels & Content Associate Lead",
  },
  { id: 27, name: "Pragyan", image: "/pragyan.jpg", alt: "DevOps Lead" },
  { id: 28, name: "Prajnan", image: "/prajnan.jpg", alt: "Social Media Lead" },
  { id: 29, name: "Priyam", image: "/priyam.jpg", alt: "PR Lead" },
  {
    id: 30,
    name: "Shruti",
    image: "/Shruti.jpg",
    alt: "Graphics & Design Co-lead",
  },
  {
    id: 31,
    name: "Sagarika",
    image: "/Sagarika.jpeg",
    alt: "PR Associate Lead",
  },
  { id: 32, name: "Sampurna", image: "/Sampurna.jpg", alt: "AI-ML Lead" },
  { id: 33, name: "Sahid", image: "/sahid.jpg", alt: "Developer Co-lead" },
  {
    id: 34,
    name: "Sarangapani",
    image: "/Sarangapani.jpg",
    alt: "Event Associate",
  },
  { id: 35, name: "Simanta", image: "/simanta.jpg", alt: "Campus Lead" },
  {
    id: 36,
    name: "Tanbir",
    image: "/tanbir.jpg",
    alt: "Reels & Content Associate Lead",
  },
  {
    id: 37,
    name: "Taniya",
    image: "/taniya.jpg",
    alt: "Reels & Content Associate Lead",
  },
  { id: 38, name: "Tanmoy", image: "/tanmoy_.jpg", alt: "AI/ML Co-lead" },
  { id: 39, name: "Uddipta", image: "/uddipta.jpg", alt: "Game Dev Lead" },
  { id: 40, name: "Vrishank", image: "/vrishank.jpg", alt: "PR Co-lead" },
];

export default function TeamSection() {
  const [paused, setPaused] = useState(false);
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  const marqueeContainerRef = useRef<HTMLDivElement | null>(null);
  const defaultNameRef = useRef<HTMLDivElement | null>(null);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leaveTimeoutRef = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);
  const hoveredAvatarRef = useRef<HTMLDivElement | null>(null);
  const hoveredMemberIdRef = useRef<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{
    left: number;
    top: number;
    rotation?: number;
  } | null>(null);
  const tooltipPosRef = useRef<typeof tooltipPos>(null);
  const lastCursorRef = useRef<{ x: number; y: number } | null>(null);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.set(".avatar-card", { scale: 1, x: 0, zIndex: 1 });
    if (cursorRef.current) {
      gsap.set(cursorRef.current, {
        x: -9999,
        y: -9999,
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
      });
      xTo.current = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.35,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, []);

  // Helper to split text into letter spans (keeps original animation markup)
  const splitTextIntoLetters = (text: string) =>
    text
      .split("")
      .map((char, index) =>
        char === " "
          ? `<span class="letter space" data-letter="${index}">&nbsp;</span>`
          : `<span class="letter" data-letter="${index}">${char}</span>`
      )
      .join("");

  useEffect(() => {
    tooltipPosRef.current = tooltipPos;
  }, [tooltipPos]);

  // Restore text animation: split letters and run initial/default animation
  useEffect(() => {
    // Split default title
    const defaultH1 = defaultNameRef.current?.querySelector("h1");
    if (defaultH1) {
      defaultH1.innerHTML = splitTextIntoLetters("OUR SQUAD");
    }

    // Split each member name
    nameRefs.current.forEach((nr, i) => {
      if (nr) {
        const h1 = nr.querySelector("h1");
        if (h1) h1.innerHTML = splitTextIntoLetters(teamMembers[i].name);
      }
    });

    // initial letter state
    gsap.set(".profile-names .name .letter", {
      y: "100%",
      opacity: 0,
      force3D: true,
    });

    // animate default in
    gsap.to(".profile-names .name.default .letter", {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "center" },
      ease: "back.out(1.7)",
      delay: 0.5,
      force3D: true,
    });
  }, []);

  // Animate on activeMemberId change
  useEffect(() => {
    if (activeMemberId === null) {
      // hide all member letters
      nameRefs.current.forEach((nr) => {
        if (nr) {
          const letters = nr.querySelectorAll(".letter");
          gsap.to(letters, {
            y: "-100%",
            opacity: 0,
            duration: 0.2,
            stagger: { amount: 0.05, from: "center" },
            ease: "power2.in",
            force3D: true,
          });
        }
      });

      // show default
      gsap.fromTo(
        ".profile-names .name.default .letter",
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: { amount: 0.2, from: "center" },
          ease: "back.out(1.7)",
          delay: 0.15,
          force3D: true,
        }
      );
      return;
    }

    const idx = teamMembers.findIndex((m) => m.id === activeMemberId);
    if (idx === -1) return;

    // hide default
    gsap.to(".profile-names .name.default .letter", {
      y: "-100%",
      opacity: 0,
      duration: 0.25,
      stagger: { amount: 0.1, from: "center" },
      ease: "power2.in",
      force3D: true,
    });

    // hide other names
    nameRefs.current.forEach((nr, i) => {
      if (nr && i !== idx) {
        const letters = nr.querySelectorAll(".letter");
        gsap.to(letters, {
          y: "-100%",
          opacity: 0,
          duration: 0.15,
          stagger: { amount: 0.05, from: "center" },
          ease: "power2.in",
          force3D: true,
        });
      }
    });

    // animate target name in
    const target = nameRefs.current[idx];
    if (target) {
      const letters = target.querySelectorAll(".letter");
      gsap.fromTo(
        letters,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: { amount: 0.25, from: "center" },
          ease: "back.out(1.7)",
          delay: 0.05,
          force3D: true,
        }
      );
    }
  }, [activeMemberId]);

  const cancelTooltipTracking = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const resolveHoveredAvatarElement = () => {
    if (typeof document === "undefined") {
      return hoveredAvatarRef.current;
    }

    if (
      hoveredAvatarRef.current &&
      !document.body.contains(hoveredAvatarRef.current)
    ) {
      hoveredAvatarRef.current = null;
    }

    const memberId = hoveredMemberIdRef.current;
    if (memberId === null) return hoveredAvatarRef.current;

    const selector = `.avatar-card[data-member-id='${memberId}'][data-hovered='true']`;
    const candidate = document.querySelector<HTMLDivElement>(selector);

    if (candidate) {
      hoveredAvatarRef.current = candidate;
      return candidate;
    }

    const candidates = document.querySelectorAll<HTMLDivElement>(
      `.avatar-card[data-member-id='${memberId}']`
    );

    if (!candidates.length) {
      hoveredAvatarRef.current = null;
      return null;
    }

    const pointer = lastCursorRef.current;
    if (pointer) {
      let closest: HTMLDivElement | null = null;
      let minDistance = Number.POSITIVE_INFINITY;

      candidates.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const distance = dx * dx + dy * dy;
        if (distance < minDistance) {
          minDistance = distance;
          closest = el;
        }
      });

      if (closest) {
        hoveredAvatarRef.current = closest;
        return closest;
      }
    }

    hoveredAvatarRef.current = candidates[0] ?? null;
    return hoveredAvatarRef.current;
  };

  const updateTooltipPosition = (pointer?: { x?: number; y?: number }) => {
    const avatarEl = resolveHoveredAvatarElement();
    if (!avatarEl) return;

    const rect = avatarEl.getBoundingClientRect();
    const pointerX =
      pointer?.x ?? lastCursorRef.current?.x ?? rect.left + rect.width / 2;
    const pointerY = pointer?.y ?? lastCursorRef.current?.y ?? rect.top;

    lastCursorRef.current = { x: pointerX, y: pointerY };

    const nextPosition = calculateMaglevPosition(
      pointerX,
      pointerY,
      rect,
      tooltipPosRef.current,
      avatarEl
    );

    // Only update state if position changed significantly (reduce unnecessary re-renders)
    const threshold = 0.5;
    if (
      !tooltipPosRef.current ||
      Math.abs(nextPosition.left - tooltipPosRef.current.left) > threshold ||
      Math.abs(nextPosition.top - tooltipPosRef.current.top) > threshold ||
      Math.abs(
        (nextPosition.rotation ?? 0) - (tooltipPosRef.current.rotation ?? 0)
      ) > 0.5
    ) {
      tooltipPosRef.current = nextPosition;
      setTooltipPos(nextPosition);
    }
  };

  const startTooltipTracking = () => {
    if (!hoveredMemberIdRef.current) return;
    cancelTooltipTracking();
    updateTooltipPosition();

    let frameCount = 0;
    const step = () => {
      if (!hoveredMemberIdRef.current) {
        cancelTooltipTracking();
        return;
      }
      // Update every other frame to reduce CPU load (still smooth at 30fps)
      frameCount++;
      if (frameCount % 2 === 0) {
        updateTooltipPosition();
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const stopTooltipTracking = () => {
    cancelTooltipTracking();
    tooltipPosRef.current = null;
  };

  const handleAvatarEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    member: TeamMember
  ) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    setPaused(true);

    // Get all avatar cards
    const allCards = Array.from(
      document.querySelectorAll<HTMLDivElement>(`.avatar-card`)
    );

    // Use the actual element that was hovered (currentTarget is the element with the event listener)
    const hoveredCard = e.currentTarget;

    if (hoveredCard) {
      if (
        hoveredAvatarRef.current &&
        hoveredAvatarRef.current !== hoveredCard
      ) {
        hoveredAvatarRef.current.removeAttribute("data-hovered");
      }

      hoveredAvatarRef.current = hoveredCard;
      hoveredMemberIdRef.current = member.id;
      hoveredCard.setAttribute("data-hovered", "true");

      setActiveMemberId(member.id);

      const rect = hoveredCard.getBoundingClientRect();
      const initialPointer = {
        x: rect.left + rect.width / 2,
        y: rect.top,
      };

      lastCursorRef.current = initialPointer;
      updateTooltipPosition(initialPointer);
      startTooltipTracking();

      gsap.to(hoveredCard, {
        scale: 2,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        zIndex: 20,
        onUpdate: () => {
          updateTooltipPosition();
        },
      });

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.22,
          ease: "back.out(1.7)",
        });
      }

      // Scale down and slide adjacent cards
      const cardIndex = allCards.indexOf(hoveredCard);
      allCards.forEach((card, i) => {
        if (card !== hoveredCard) {
          const distance = Math.abs(i - cardIndex);
          // Slide all cards with intensity based on distance
          const maxSlide = 60;
          const slide = i < cardIndex ? -maxSlide : maxSlide;
          // Cards further away get progressively less scaling
          const scale = Math.max(0.75, 1 - distance * 0.05);

          gsap.to(card, {
            scale: scale,
            x: slide,
            duration: 0.6,
            ease: "power2.out",
            zIndex: 1,
          });
        }
      });
    }
  };

  const handleAvatarLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget as HTMLElement | null;
    if (
      related &&
      "classList" in related &&
      related.classList.contains("avatar-card")
    ) {
      return; // still hovering over an avatar card
    }

    // debounce the reset slightly to avoid jitter when moving quickly between cards
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    leaveTimeoutRef.current = window.setTimeout(() => {
      leaveTimeoutRef.current = null;
      setPaused(false);
      setActiveMemberId(null);
      stopTooltipTracking();
      if (hoveredAvatarRef.current) {
        hoveredAvatarRef.current.removeAttribute("data-hovered");
      }
      hoveredAvatarRef.current = null;
      hoveredMemberIdRef.current = null;
      lastCursorRef.current = null;
      setTooltipPos(null);

      // Reset all avatar cards
      const allCards = Array.from(
        document.querySelectorAll<HTMLDivElement>(`.avatar-card`)
      );
      allCards.forEach((card) =>
        gsap.to(card, {
          scale: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.inOut",
          zIndex: 1,
        })
      );

      // hide cursor slowly when leaving marquee
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        });
      }
    }, 120);
  };

  const handleMarqueeMouseMove = (e: React.MouseEvent) => {
    if (!xTo.current || !yTo.current) return;

    const offset = 18; // bottom-right offset in px
    const x = e.clientX + offset;
    const y = e.clientY + offset;

    xTo.current(x);
    yTo.current(y);

    // if pointer is over or near an avatar, ensure cursor indicator is visible
    if (isCursorNearAvatar(e.clientX, e.clientY)) {
      if (cursorRef.current)
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.12,
          ease: "power2.out",
        });
    }

    if (hoveredMemberIdRef.current !== null && activeMemberId !== null) {
      const pointer = { x: e.clientX, y: e.clientY };
      lastCursorRef.current = pointer;
      updateTooltipPosition(pointer);
    }
  };

  const handleMarqueeLeave = () => {
    // shrink/hide cursor when pointer leaves the marquee area
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      });
    }
  };

  // Helper: check a few nearby points to see if any element is an avatar-card
  const isCursorNearAvatar = (clientX: number, clientY: number) => {
    if (typeof document === "undefined") return false;
    const offsets = [
      [0, 0],
      [-18, 0],
      [18, 0],
      [0, -18],
      [0, 18],
    ];
    for (const [dx, dy] of offsets) {
      const el = document.elementFromPoint(
        clientX + dx,
        clientY + dy
      ) as HTMLElement | null;
      if (!el) continue;
      if (el.classList.contains("avatar-card")) return true;
      if (el.closest && el.closest(".avatar-card")) return true;
    }
    return false;
  };

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className="team">
        <div
          ref={marqueeContainerRef}
          className={`marquee-container${paused ? " paused" : ""}`}
          onMouseMove={handleMarqueeMouseMove}
          onMouseLeave={handleMarqueeLeave}
        >
          <div ref={cursorRef} className="cursor-indicator" aria-hidden>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 12L12 20M20 12H4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Marquee className="marquee-row" repeat={3} pauseOnHover={false}>
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="avatar-card"
                data-member-id={member.id}
                data-member-index={index}
                onMouseEnter={(e) => handleAvatarEnter(e, member)}
                onMouseLeave={(e) => handleAvatarLeave(e)}
              >
                <Image
                  src={member.image}
                  alt={member.alt}
                  width={100}
                  height={100}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Maglev Tooltip Component */}
        <MaglevTooltip
          position={tooltipPos}
          activeMemberId={activeMemberId}
          teamMembers={teamMembers}
        />

        <div className="profile-names">
          <div
            ref={defaultNameRef}
            className={`name default`}
            style={{ display: activeMemberId === null ? "flex" : "none" }}
          >
            <h1>OUR SQUAD</h1>
          </div>

          {teamMembers.map((member, idx) => (
            <div
              key={member.id}
              ref={(el) => {
                nameRefs.current[idx] = el;
              }}
              className="name"
              style={{
                display: activeMemberId === member.id ? "flex" : "none",
              }}
            >
              <h1>{member.name}</h1>
            </div>
          ))}
        </div>

        <style jsx>{`
          .team {
            width: 100%;
            min-height: 100vh;
            background: transparent;
            color: var(--foreground);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: "Barlow Condensed", Arial, sans-serif;
            padding: 6rem 1rem;
            overflow-x: hidden;
          }
          .marquee-container {
            width: 100%;
            max-width: 100vw;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 36px;
            overflow: visible;
            padding: 80px 0;
            position: relative;
          }
          :global(.marquee-container.paused) :global(.marquee-row > div) {
            animation-play-state: paused !important;
          }
          :global(.marquee-container) :global(.marquee-row) {
            --gap: 1.5rem;
            --duration: 75s;
            overflow: visible;
          }
          :global(.marquee-container) :global(.marquee-row > div) {
            overflow: visible;
          }
          .avatar-card {
            width: 100px;
            height: 100px;
            padding: 5px;
            cursor: pointer;
            background: #1e2022;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            flex-shrink: 0;
            position: relative;
            will-change: transform;
            pointer-events: auto;
            transform-origin: center center;
            transition: box-shadow 0.3s ease;
          }
          .avatar-card::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 250%;
            height: 250%;
            pointer-events: none;
            z-index: 10;
            border-radius: 12px;
          }
          .avatar-card:hover {
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
          }
          :global(.animated-tooltip-bubble) {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            background: black;
            padding: 8px 16px;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
              0 8px 10px -6px rgb(0 0 0 / 0.1);
            position: relative;
          }
          .cursor-indicator {
            position: fixed;
            top: 0;
            left: 0;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: rgba(34, 197, 94, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%) translateZ(0);
            box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
            border: 1px solid rgba(34, 197, 94, 0.2);
          }
          .cursor-indicator svg {
            width: 24px;
            height: 24px;
            transform: rotate(-45deg);
          }
          @media (max-width: 900px) {
            .cursor-indicator {
              width: 44px;
              height: 44px;
            }
            .cursor-indicator svg {
              width: 20px;
              height: 20px;
            }
          }
          @media (max-width: 600px) {
            .cursor-indicator {
              width: 36px;
              height: 36px;
            }
            .cursor-indicator svg {
              width: 18px;
              height: 18px;
            }
          }
          .profile-names {
            width: 100%;
            max-width: 1800px;
            height: 270px;
            position: relative;
            overflow: visible;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .profile-names .name {
            position: absolute;
            width: 100%;
            min-width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 100%;
          }
          .profile-names .name h1 {
            font-size: clamp(6rem, 18vw, 12rem);
            font-weight: 900;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: #22c55e;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            position: relative;
            line-height: 1;
            white-space: nowrap;
            overflow: visible;
            will-change: transform, opacity;
          }
          .profile-names .name h1 :global(.letter) {
            will-change: transform, opacity;
          }
          .profile-names .name.default h1 {
            color: var(--muted-foreground);
          }
          @media (max-width: 900px) {
            .team {
              padding: 2rem 1rem;
              min-height: 60vh;
            }
            .marquee-container {
              gap: 1rem;
              margin-bottom: 24px;
            }
            :global(.marquee-container) :global(.marquee-row) {
              --gap: 1rem;
              --duration: 60s;
            }
            .avatar-card {
              width: 70px;
              height: 70px;
            }
            .profile-names {
              height: 180px;
            }
            .profile-names .name h1 {
              font-size: clamp(3.75rem, 18vw, 6.75rem);
            }
          }
          @media (max-width: 600px) {
            .marquee-container {
              gap: 0.75rem;
            }
            :global(.marquee-container) :global(.marquee-row) {
              --gap: 0.75rem;
              /* Increase duration to slow down marquee on small screens */
              --duration: 90s;
            }
            .avatar-card {
              width: 50px;
              height: 50px;
            }
            .profile-names {
              height: 150px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
