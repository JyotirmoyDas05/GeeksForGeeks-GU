"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Utility function to split text into individual letter spans
const splitTextIntoLetters = (text: string): string => {
  return text
    .split("")
    .map((char, index) =>
      char === " "
        ? `<span class="letter space" data-letter="${index}">&nbsp;</span>`
        : `<span class="letter" data-letter="${index}">${char}</span>`
    )
    .join("");
};

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  image: string;
  alt: string;
}

// Team members data - EDIT THIS SECTION TO UPDATE YOUR TEAM
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "ALEX CHEN", // ← Change this to actual name
    image: "/img_(1).jpg", // ← Change this to actual photo path
    alt: "Alex Chen - Team Lead", // ← Change this to actual role
  },
  {
    id: 2,
    name: "MAYA PATEL", // ← Change this to actual name
    image: "/img_(2).jpg", // ← Change this to actual photo path
    alt: "Maya Patel - Frontend Developer", // ← Change this to actual role
  },
  {
    id: 3,
    name: "JORDAN SMITH", // ← Change this to actual name
    image: "/img_(3).jpg", // ← Change this to actual photo path
    alt: "Jordan Smith - Backend Developer", // ← Change this to actual role
  },
  {
    id: 4,
    name: "SOFIA RODRIGUEZ", // ← Change this to actual name
    image: "/img_(4).jpg", // ← Change this to actual photo path
    alt: "Sofia Rodriguez - UI/UX Designer", // ← Change this to actual role
  },
  {
    id: 5,
    name: "ETHAN TAYLOR", // ← Change this to actual name
    image: "/img_(5).jpg", // ← Change this to actual photo path
    alt: "Ethan Taylor - DevOps Engineer", // ← Change this to actual role
  },
  // To add more members, copy the structure above and increment the id:
  // {
  //   id: 6,
  //   name: "NEW MEMBER NAME",
  //   image: "/new-member-photo.jpg",
  //   alt: "New Member Name - Their Role",
  // },
];

const TeamSection: React.FC = () => {
  const teamRef = useRef<HTMLDivElement>(null);
  const profileImagesRef = useRef<HTMLDivElement>(null);
  const profileNamesRef = useRef<HTMLDivElement>(null);
  const defaultNameRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorArrowRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [currentHover, setCurrentHover] = useState<number | null>(null);
  const [currentMobileActive, setCurrentMobileActive] = useState<number | null>(
    null
  );
  const [showCursorArrow, setShowCursorArrow] = useState(false);

  // GSAP quickTo functions for smooth cursor following
  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  // Touch/long press handling
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const longPressThreshold = 500; // 500ms for long press

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    // Initialize GSAP animations and cursor arrow
    const ctx = gsap.context(() => {
      // Initialize cursor arrow position and quickTo functions
      if (cursorArrowRef.current) {
        gsap.set(cursorArrowRef.current, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
        });

        // Create quickTo functions for smooth cursor following
        xTo.current = gsap.quickTo(cursorArrowRef.current, "x", {
          duration: 0.6,
          ease: "power3.out",
        });
        yTo.current = gsap.quickTo(cursorArrowRef.current, "y", {
          duration: 0.6,
          ease: "power3.out",
        });
      }

      // Split text into letters for all name elements
      if (defaultNameRef.current) {
        const defaultH1 = defaultNameRef.current.querySelector("h1");
        if (defaultH1) {
          defaultH1.innerHTML = splitTextIntoLetters("OUR SQUAD");
        }
      }

      nameRefs.current.forEach((nameRef) => {
        if (nameRef) {
          const h1 = nameRef.querySelector("h1");
          if (h1) {
            const memberName = h1.textContent || "";
            h1.innerHTML = splitTextIntoLetters(memberName);
          }
        }
      });

      // Set initial states
      gsap.set(".profile-names .name:not(.default) .letter", {
        y: "100%",
        opacity: 0,
      });

      gsap.set(".profile-names .name.default .letter", {
        y: "100%",
        opacity: 0,
      });

      gsap.set(".profile-images .image", {
        scale: 1,
        x: 0,
        transformOrigin: "center center",
      });

      // Animate default text in on load
      gsap.to(".profile-names .name.default .letter", {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "center",
        },
        ease: "back.out(1.7)",
        delay: 0.5,
      });
    }, teamRef);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
      ctx.revert();
    };
  }, []);

  // Mouse move handler for cursor arrow following
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !showCursorArrow || !xTo.current || !yTo.current) return;

    const rect = profileImagesRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xTo.current(x);
    yTo.current(y);
  };

  // Calculate slide positions for images
  const calculateSlidePositions = (hoveredIndex: number) => {
    const positions: number[] = [];
    const slideDistance = isDesktop ? 60 : 30; // Adjust slide distance

    imageRefs.current.forEach((_, index) => {
      if (index < hoveredIndex) {
        // Images to the left slide left
        positions[index] = -slideDistance;
      } else if (index > hoveredIndex) {
        // Images to the right slide right
        positions[index] = slideDistance;
      } else {
        // Hovered image stays in place
        positions[index] = 0;
      }
    });

    return positions;
  };

  // Handle image hover (desktop)
  const handleImageHover = (memberId: number, index: number) => {
    if (!isDesktop || currentHover === memberId) return;

    setCurrentHover(memberId);
    setShowCursorArrow(true);

    // Show cursor arrow with animation
    if (cursorArrowRef.current) {
      gsap.to(cursorArrowRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }

    // Kill any existing tweens to prevent conflicts
    gsap.killTweensOf(".profile-images .image");
    gsap.killTweensOf(".profile-names .name .letter");

    const ctx = gsap.context(() => {
      const slidePositions = calculateSlidePositions(index);

      // Animate all images with sliding and scaling - smoother transitions
      imageRefs.current.forEach((img, i) => {
        if (img) {
          if (i === index) {
            // Scale up hovered image with smoother easing
            gsap.to(img, {
              scale: 2,
              x: slidePositions[i],
              duration: 0.6,
              ease: "power2.out",
              zIndex: 20,
            });
          } else {
            // Scale down and slide other images with consistent timing
            gsap.to(img, {
              scale: 0.75,
              x: slidePositions[i],
              duration: 0.6,
              ease: "power2.out",
              zIndex: 1,
            });
          }
        }
      });

      // Text animations (same as before)
      gsap.to(".profile-names .name.default .letter", {
        y: "-100%",
        opacity: 0,
        duration: 0.25,
        stagger: {
          amount: 0.1,
          from: "center",
        },
        ease: "power2.in",
      });

      nameRefs.current.forEach((nameRef, i) => {
        if (nameRef && i !== index) {
          const letters = nameRef.querySelectorAll(".letter");
          gsap.to(letters, {
            y: "-100%",
            opacity: 0,
            duration: 0.15,
            stagger: {
              amount: 0.05,
              from: "center",
            },
            ease: "power2.in",
          });
        }
      });

      if (nameRefs.current[index]) {
        const letters = nameRefs.current[index]!.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          {
            y: "100%",
            opacity: 0,
          },
          {
            y: "0%",
            opacity: 1,
            duration: 0.5,
            stagger: {
              amount: 0.25,
              from: "center",
            },
            ease: "back.out(1.7)",
            delay: 0.05,
          }
        );
      }
    }, teamRef);
  };

  // Handle image mouse leave - improved to prevent jitter
  const handleImageLeave = () => {
    if (!isDesktop) return;

    // Don't reset immediately, let handleContainerLeave handle the full reset
    // This prevents jitter when moving between images quickly

    // Only hide cursor arrow if we're not immediately moving to another image
    setTimeout(() => {
      if (!currentHover) {
        setShowCursorArrow(false);
        if (cursorArrowRef.current) {
          gsap.to(cursorArrowRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          });
        }
      }
    }, 50); // Small delay to check if we're hovering another image
  };

  // Handle container leave (desktop)
  const handleContainerLeave = () => {
    if (!isDesktop) return;

    setCurrentHover(null);
    setShowCursorArrow(false);

    // Hide cursor arrow
    if (cursorArrowRef.current) {
      gsap.to(cursorArrowRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    // Kill any existing tweens to prevent conflicts
    gsap.killTweensOf(".profile-images .image");
    gsap.killTweensOf(".profile-names .name .letter");

    const ctx = gsap.context(() => {
      // Reset all image scales and positions with smoother timing
      gsap.to(".profile-images .image", {
        scale: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        zIndex: 1,
      });

      // Animate out all member names quickly
      nameRefs.current.forEach((nameRef) => {
        if (nameRef) {
          const letters = nameRef.querySelectorAll(".letter");
          gsap.to(letters, {
            y: "-100%",
            opacity: 0,
            duration: 0.2,
            stagger: {
              amount: 0.05,
              from: "center",
            },
            ease: "power2.in",
          });
        }
      });

      // Animate default text back in
      gsap.fromTo(
        ".profile-names .name.default .letter",
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: {
            amount: 0.2,
            from: "center",
          },
          ease: "back.out(1.7)",
          delay: 0.15,
        }
      );
    }, teamRef);
  };

  // Mobile/tablet touch handlers
  const handleTouchStart = (memberId: number, index: number) => {
    if (isDesktop) return;

    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }

    // Add touch feedback
    if (imageRefs.current[index]) {
      gsap.to(imageRefs.current[index], {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      });
    }

    // Set timeout for long press
    touchTimeoutRef.current = setTimeout(() => {
      handleMobileActivation(memberId, index);
    }, longPressThreshold);
  };

  const handleTouchEnd = (index: number) => {
    if (isDesktop) return;

    // Clear timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }

    // Remove touch feedback
    if (imageRefs.current[index] && currentMobileActive !== index) {
      gsap.to(imageRefs.current[index], {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMobileClick = (memberId: number, index: number) => {
    if (isDesktop) return;

    // Handle immediate tap activation
    if (currentMobileActive === memberId) {
      // Deactivate if already active
      setCurrentMobileActive(null);
      handleMobileDeactivation();
    } else {
      // Activate new profile
      handleMobileActivation(memberId, index);
    }
  };

  const handleMobileActivation = (memberId: number, index: number) => {
    setCurrentMobileActive(memberId);

    gsap.killTweensOf(".profile-images .image");
    gsap.killTweensOf(".profile-names .name .letter");

    const ctx = gsap.context(() => {
      const slidePositions = calculateSlidePositions(index);

      // Animate images with mobile-optimized scaling - smoother timing
      imageRefs.current.forEach((img, i) => {
        if (img) {
          if (i === index) {
            gsap.to(img, {
              scale: 1.5,
              x: slidePositions[i],
              duration: 0.5,
              ease: "power2.out",
              zIndex: 20,
            });
          } else {
            gsap.to(img, {
              scale: 0.8,
              x: slidePositions[i],
              duration: 0.5,
              ease: "power2.out",
              zIndex: 1,
            });
          }
        }
      });

      // Text animations
      gsap.to(".profile-names .name.default .letter", {
        y: "-100%",
        opacity: 0,
        duration: 0.25,
        stagger: {
          amount: 0.1,
          from: "center",
        },
        ease: "power2.in",
      });

      if (nameRefs.current[index]) {
        const letters = nameRefs.current[index]!.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          {
            y: "100%",
            opacity: 0,
          },
          {
            y: "0%",
            opacity: 1,
            duration: 0.5,
            stagger: {
              amount: 0.25,
              from: "center",
            },
            ease: "back.out(1.7)",
            delay: 0.05,
          }
        );
      }
    }, teamRef);
  };

  const handleMobileDeactivation = () => {
    gsap.killTweensOf(".profile-images .image");
    gsap.killTweensOf(".profile-names .name .letter");

    const ctx = gsap.context(() => {
      // Reset all images with smoother timing
      gsap.to(".profile-images .image", {
        scale: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        zIndex: 1,
      });

      // Hide member names
      nameRefs.current.forEach((nameRef) => {
        if (nameRef) {
          const letters = nameRef.querySelectorAll(".letter");
          gsap.to(letters, {
            y: "-100%",
            opacity: 0,
            duration: 0.2,
            stagger: {
              amount: 0.05,
              from: "center",
            },
            ease: "power2.in",
          });
        }
      });

      // Show default text
      gsap.fromTo(
        ".profile-names .name.default .letter",
        {
          y: "100%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          stagger: {
            amount: 0.2,
            from: "center",
          },
          ease: "back.out(1.7)",
          delay: 0.15,
        }
      );
    }, teamRef);
  };

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div ref={teamRef} className="team">
        {/* Profile Images Container */}
        <div
          ref={profileImagesRef}
          className="profile-images"
          onMouseLeave={handleContainerLeave}
          onMouseMove={handleMouseMove}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="image"
              onMouseEnter={() => handleImageHover(member.id, index)}
              onMouseLeave={handleImageLeave}
              onTouchStart={() => handleTouchStart(member.id, index)}
              onTouchEnd={() => handleTouchEnd(index)}
              onClick={() => handleMobileClick(member.id, index)}
            >
              <Image
                src={member.image}
                alt={member.alt}
                width={120}
                height={120}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </div>
          ))}

          {/* Cursor following arrow overlay */}
          <div ref={cursorArrowRef} className="cursor-arrow">
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
        </div>

        {/* Profile Names Container */}
        <div ref={profileNamesRef} className="profile-names">
          {/* Default Name */}
          <div ref={defaultNameRef} className="name default">
            <h1>OUR SQUAD</h1>
          </div>

          {/* Member Names */}
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => {
                nameRefs.current[index] = el;
              }}
              className="name"
              style={{
                display:
                  currentHover === member.id ||
                  currentMobileActive === member.id
                    ? "flex"
                    : "none",
              }}
            >
              <h1>{member.name}</h1>
            </div>
          ))}
        </div>

        {/* Styles */}
        <style jsx>{`
          .team {
            width: 100%;
            min-height: 100vh;
            background: var(--background);
            color: var(--foreground);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: "Barlow Condensed", Arial, sans-serif;
            padding: 6rem 1rem;
            overflow-x: hidden;
          }

          .profile-images {
            display: flex;
            gap: 18px;
            justify-content: center;
            align-items: center;
            margin-bottom: 36px;
            max-width: 900px;
            flex-wrap: wrap;
            position: relative;
            overflow: visible;
          }

          .profile-images .image {
            width: 120px;
            height: 120px;
            padding: 5px;
            cursor: pointer;
            background: #1e2022;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: box-shadow 0.3s ease, transform 0.2s ease;
            overflow: hidden;
            position: relative;
            will-change: transform;
          }

          .profile-images .image:hover {
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
          }

          .cursor-arrow {
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 60px;
            background: rgba(34, 197, 94, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            pointer-events: none;
            z-index: 30;
            backdrop-filter: blur(4px);
            box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
            border: 1px solid rgba(34, 197, 94, 0.2);
          }

          .cursor-arrow svg {
            width: 24px;
            height: 24px;
            transform: rotate(-45deg);
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
          }

          .profile-names .name.default h1 {
            color: var(--muted-foreground);
          }

          .profile-names .name h1 :global(.letter) {
            display: inline-block;
            will-change: transform;
            transform-origin: center bottom;
          }

          .profile-names .name h1 :global(.letter.space) {
            width: 0.3em;
          }

          /* Mobile Responsive */
          @media (max-width: 900px) {
            .team {
              flex-direction: column;
              justify-content: flex-start;
              padding: 2rem 1rem;
              min-height: 60vh;
            }

            .profile-images {
              flex-wrap: wrap;
              gap: 12px;
              margin-bottom: 24px;
              max-width: 100%;
            }

            .profile-images .image {
              width: 80px;
              height: 80px;
              cursor: pointer;
              touch-action: manipulation;
              -webkit-tap-highlight-color: transparent;
            }

            .cursor-arrow {
              display: none; /* Hide cursor arrow on mobile */
            }

            .profile-names {
              height: 180px;
            }

            .profile-names .name h1 {
              font-size: clamp(3.75rem, 18vw, 6.75rem);
            }
          }

          @media (max-width: 600px) {
            .profile-images {
              gap: 8px;
            }

            .profile-images .image {
              width: 60px;
              height: 60px;
            }

            .profile-names {
              height: 150px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default TeamSection;
