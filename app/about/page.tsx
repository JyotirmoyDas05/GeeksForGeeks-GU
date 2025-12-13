"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { teamData, getTotalMemberCount } from "@/lib/teamData";
import { getMemberPhoto } from "@/lib/avatarUtils";
import StaticNoise from "@/components/ui/StaticNoise";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Flatten all members for gallery view
const getAllMembers = () => {
  return teamData.flatMap((group) =>
    group.positions.map((position) => ({
      ...position.member,
      title: position.title,
      groupName: group.group,
      groupColor: group.color,
    }))
  );
};

// Split members into rows for scroll animation
const splitIntoRows = <T,>(arr: T[], rowSize: number): T[][] => {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += rowSize) {
    rows.push(arr.slice(i, i + rowSize));
  }
  return rows;
};

// Team Member Card Component
interface TeamMemberCardProps {
  member: {
    name: string;
    photo: string;
    role: string;
    title: string;
    groupName: string;
    groupColor?: string;
  };
  index: number;
  isLowerRow?: boolean; // For curtain reveal on lower rows
}

function TeamMemberCard({
  member,
  index,
  isLowerRow = false,
}: TeamMemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Curtain reveal + Zoom-out animation for lower rows
  useEffect(() => {
    const curtain = curtainRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!isLowerRow || !imageWrapper) return;

    const triggers: ScrollTrigger[] = [];

    // Zoom-out animation on image
    const zoomTrigger = gsap.fromTo(
      imageWrapper,
      { scale: 1.1 },
      {
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageWrapper,
          start: "top bottom",
          end: "top center",
          scrub: 1,
        },
      }
    ).scrollTrigger;
    if (zoomTrigger) triggers.push(zoomTrigger);

    // Curtain reveal animation
    if (curtain) {
      const curtainTrigger = gsap.fromTo(
        curtain,
        { scaleY: 1, transformOrigin: "top center" },
        {
          scaleY: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: imageWrapper,
            start: "top bottom-=100",
            end: "top center+=100",
            scrub: 0.8,
          },
        }
      ).scrollTrigger;
      if (curtainTrigger) triggers.push(curtainTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [isLowerRow]);

  // Hover animation - border radius transition (CSS transition for performance)
  useEffect(() => {
    const imageWrapper = imageWrapperRef.current;
    if (!imageWrapper) return;

    // Use CSS transitions instead of GSAP for simple hover effects
    imageWrapper.style.transition = "border-radius 0.4s ease-out";
    imageWrapper.style.borderRadius = isHovered ? "20px" : "0px";
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="team-card will-change-transform cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Separator line above card */}
      <div className="h-px bg-neutral-300 dark:bg-neutral-700 mb-4" />

      {/* Name and Role above image */}
      <div className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.15em] font-medium text-neutral-900 dark:text-neutral-100">
          {member.name}{" "}
          <span className="text-neutral-400 dark:text-neutral-500 mx-1">•</span>
          <span className="text-neutral-500 dark:text-neutral-400 font-normal">
            {member.role}
          </span>
        </p>
      </div>

      {/* Image Container */}
      <div
        ref={imageWrapperRef}
        className="relative aspect-4/5 overflow-hidden bg-neutral-200 dark:bg-neutral-800"
        style={{ borderRadius: "0px" }}
      >
        {/* Curtain overlay for lower rows - only covers image */}
        {isLowerRow && (
          <div
            ref={curtainRef}
            className="absolute inset-0 z-30 bg-[#f5f5f0] dark:bg-black pointer-events-none"
            style={{ transformOrigin: "top center" }}
          />
        )}

        {/* Live Static Noise Overlay - fades out on hover */}
        <StaticNoise opacity={isHovered ? 0 : 0.12} />

        <div className="relative w-full h-full">
          <Image
            src={getMemberPhoto(member.photo, member.name)}
            alt={member.name}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovered ? "grayscale-0" : "grayscale"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={index < 8}
          />
        </div>
      </div>
    </div>
  );
}

// Team Row Component for horizontal scroll parallax
interface TeamRowProps {
  members: ReturnType<typeof getAllMembers>;
  rowIndex: number;
  baseIndex: number;
  totalRows: number;
}

function TeamRow({ members, rowIndex, baseIndex, totalRows }: TeamRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const cards = row.querySelectorAll<HTMLElement>(".team-card");
    const isLowerRow = rowIndex >= 2;

    // ---------------------------------------------------
    // VERTICAL STEPPED STAGGER ANIMATION
    // As user scrolls past 50% viewport:
    // - Rightmost cards move UP faster than left cards
    // - Creates a staggered diagonal effect
    // - Only on tablet/desktop (sm+)
    // ---------------------------------------------------

    // Check if we're on tablet+ (640px and above)
    const isDesktop = window.innerWidth >= 640;

    if (isDesktop) {
      // Configuration
      const baseParallax = 30; // Base upward movement for leftmost card
      const extraParallaxPerColumn = 40; // Extra upward movement per column position

      cards.forEach((card, colIndex) => {
        // All cards start at Y = 0
        // As scroll progresses, rightmost cards move UP more
        // colIndex 0: moves -30px (up)
        // colIndex 1: moves -70px (up)
        // colIndex 2: moves -110px (up)
        // colIndex 3: moves -150px (up) - HIGHEST
        const endY = -(baseParallax + colIndex * extraParallaxPerColumn);

        gsap.fromTo(
          card,
          { y: 0 },
          {
            y: endY,
            ease: "power1.out",
            scrollTrigger: {
              trigger: row,
              start: "top 50%",
              end: "bottom 20%",
              scrub: 1.0, // Smoother scrub for less jitter
            },
          }
        );
      });
    }

    // ---------------------------------------------------
    // FADE-IN ANIMATION FOR ALL CARDS
    // Staggered entrance as cards come into view
    // ---------------------------------------------------
    gsap.fromTo(
      cards,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top bottom-=50",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === row) {
          trigger.kill();
        }
      });
    };
  }, [rowIndex, totalRows]);

  const isLowerRow = rowIndex >= 2;

  // Calculate max translateY for padding (rightmost card moves most)
  // baseParallax=30, extraParallaxPerColumn=40, maxCols=3
  // maxTranslateY = 30 + 2*40 = 110px, add buffer = 150px
  const animationPadding = 150;

  return (
    <div
      className="relative"
      style={{
        paddingBottom: `${animationPadding}px`, // Headroom for translateY animation
      }}
    >
      <div
        ref={rowRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
        style={{ willChange: "transform" }}
      >
        {members.map((member, colIndex) => (
          <TeamMemberCard
            key={`${member.name}-${member.groupName}-${baseIndex + colIndex}`}
            member={member}
            index={baseIndex + colIndex}
            isLowerRow={isLowerRow}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const quote1Ref = useRef<HTMLDivElement>(null);
  const quote2Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const allMembers = getAllMembers();
  const totalMembers = getTotalMemberCount();

  // Split members into rows of 3 for desktop
  const memberRows = useMemo(() => splitIntoRows(allMembers, 3), [allMembers]);

  // Hero section animations
  useEffect(() => {
    const title = titleRef.current;
    const count = countRef.current;
    const description = descriptionRef.current;

    if (!title || !count || !description) return;

    gsap.set([title, count], { opacity: 0, y: 40 });
    gsap.set(description, { opacity: 0, y: 30 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        count,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.7"
      )
      .to(
        description,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Quote and CTA animations
  useEffect(() => {
    [quote1Ref, quote2Ref, ctaRef].forEach((ref) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 60 });
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[#f5f5f0] dark:bg-black text-black dark:text-white">
        {/* Hero Section - Drive Capital Style */}
        <section ref={heroRef} className="relative">
          {/* Spacer to push content below fixed navbar */}
          <div className="h-32 sm:h-36 lg:h-40" aria-hidden="true" />
          <div className="page-container pb-8">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
              {/* Left Column - Description */}
              <div className="order-2 lg:order-1">
                <p
                  ref={descriptionRef}
                  className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed"
                >
                  We're enthusiasts in the trenches with you. We're there for
                  the whole journey — in hackathons, in workshops, and for the
                  long, exciting path to success.
                </p>
                {/* Animated Separator Line - draws left to right */}
                <div className="mt-6 h-px bg-neutral-400 dark:bg-neutral-600 w-full max-w-sm animate-line-draw-delayed" />
              </div>

              {/* Right Column - Title */}
              <div className="order-1 lg:order-2 lg:text-right">
                <div className="flex flex-col lg:items-end">
                  <div className="relative">
                    <h1
                      ref={titleRef}
                      className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black tracking-[-0.04em] leading-[0.8] uppercase"
                    >
                      Our
                      <br />
                      Team
                    </h1>
                    <span
                      ref={countRef}
                      className="absolute -top-2 -right-8 sm:-right-12 text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100"
                    >
                      {totalMembers}
                    </span>
                  </div>
                </div>
                {/* Animated Separator Line - draws left to right */}
                <div className="mt-6 h-px bg-neutral-400 dark:bg-neutral-600 w-full animate-line-draw" />
              </div>
            </div>
          </div>
        </section>

        {/* Spacer between header and grid - DriveCapital style */}
        <div style={{ height: "clamp(2rem, 4vw, 4rem)" }} aria-hidden="true" />

        {/* Team Gallery Grid */}
        <section className="py-8 sm:py-12">
          {/* Use page-container for symmetric gutters */}
          <div className="page-container">
            <div className="space-y-10">
              {memberRows.map((row, rowIndex) => (
                <TeamRow
                  key={`row-${rowIndex}`}
                  members={row}
                  rowIndex={rowIndex}
                  baseIndex={rowIndex * 3}
                  totalRows={memberRows.length}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section 1 */}
        <section className="py-16 sm:py-24 border-y border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950">
          <div className="page-container">
            <div ref={quote1Ref} className="max-w-4xl mx-auto">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-center">
                We'll always share our knowledge and insights with you. It's all
                collaborative, open-source minded, and full of support.
              </p>
            </div>
          </div>
        </section>

        {/* Quote Section 2 */}
        <section className="py-16 sm:py-24 bg-[#f5f5f0] dark:bg-black">
          <div className="page-container">
            <div ref={quote2Ref} className="max-w-4xl mx-auto">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-center">
                We'll always tell you the truth about what we see and what we
                think. It's all above-board, no games and no surprises.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 border-t border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950">
          <div className="page-container">
            <div
              ref={ctaRef}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                We're heading up and to the right
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Join us
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
                At GeeksForGeeks GU, we want to work with people who love
                technology and pride themselves on continuous learning.
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors group"
                >
                  <span>Get in Touch</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 7L17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 7L7 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}
