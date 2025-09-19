"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import TextAnimation from "@/components/text-animation";
import { teamData, TeamGroup, Position, TeamMember } from "@/lib/teamData";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TeamCardProps {
  position: Position;
  groupColor: string;
  index: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ position, groupColor, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const details = detailsRef.current;

    if (!card || !details) return;

    // Set initial state for details
    gsap.set(details, {
      opacity: 0,
      y: 20,
      scale: 0.95,
    });

    // Hover animations
    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(card, {
        y: -12,
        scale: 1.03,
        boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.3)",
        duration: 0.4,
        ease: "power2.out",
      });

      if (showDetails) {
        gsap.to(details, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 16px rgba(0,0,0,0.2)",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(details, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleClick = () => {
      setShowDetails(!showDetails);

      if (!showDetails) {
        gsap.to(details, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(details, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("click", handleClick);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("click", handleClick);
    };
  }, [showDetails]);

  return (
    <div
      ref={cardRef}
      className="team-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-500 hover:border-white/20 hover:bg-white/10 group min-h-[280px] sm:min-h-[320px] lg:min-h-[350px] flex flex-col"
      style={{
        borderTop: `4px solid ${groupColor}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 2px 16px rgba(0,0,0,0.2)",
      }}
    >
      {/* Card Header */}
      <div className="flex flex-col items-center text-center flex-grow">
        {/* Member Photo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden mb-3 sm:mb-4 ring-4 ring-white/20 group-hover:ring-white/30 transition-all duration-300 relative">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              position.member.name
            )}&background=random&color=fff&size=96&bold=true`}
            alt={`${position.member.name} - ${position.title}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Position Title */}
        <h3
          className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300 text-center leading-tight px-2"
          style={{ color: groupColor }}
        >
          {position.title}
        </h3>

        {/* Member Name */}
        <p className="text-white text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 group-hover:text-gray-100 transition-colors duration-300">
          {position.member.name}
        </p>

        {/* Brief Bio */}
        {position.member.bio && (
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow text-center px-2">
            {position.member.bio}
          </p>
        )}
      </div>

      {/* Expandable Details */}
      <div
        ref={detailsRef}
        className="mt-auto pt-3 sm:pt-4 border-t border-white/10"
      >
        {/* Tech Stack */}
        {position.member.techStack && position.member.techStack.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider text-center">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1 sm:gap-1.5 justify-center">
              {position.member.techStack.slice(0, 4).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-white/10 text-gray-200 text-xs rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-200"
                  style={{ borderColor: `${groupColor}40` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {position.member.social && (
          <div>
            <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider text-center">
              Connect
            </h4>
            <div className="flex gap-3 justify-center">
              {position.member.social.linkedin && (
                <a
                  href={position.member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-xs"
                >
                  LinkedIn
                </a>
              )}
              {position.member.social.github && (
                <a
                  href={position.member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-xs"
                >
                  GitHub
                </a>
              )}
              {position.member.social.twitter && (
                <a
                  href={position.member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-xs"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TeamGroupComponentProps {
  group: TeamGroup;
  index: number;
}

const TeamGroupComponent: React.FC<TeamGroupComponentProps> = ({
  group,
  index,
}) => {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = groupRef.current;
    if (!element) return;

    // ScrollTrigger animation for group entrance
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stagger animation for cards within the group
    const cards = element.querySelectorAll(".team-card");
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div ref={groupRef} className="team-group mb-16 sm:mb-24">
      {/* Group Header */}
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
          style={{ color: group.color }}
        >
          {group.group}
        </h2>
        <div
          className="w-20 sm:w-32 h-1 sm:h-1.5 mx-auto rounded-full mb-3 sm:mb-4"
          style={{ backgroundColor: group.color }}
        />
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {group.group === "Leadership" &&
            "Guiding our chapter with vision and strategic direction"}
          {group.group === "PR Team" &&
            "Managing our public relations and external communications"}
          {group.group === "Event Team" &&
            "Organizing engaging technical events and workshops"}
          {group.group === "Sponsorship & Acquisition" &&
            "Building partnerships and securing resources"}
          {group.group === "Graphics & Design Team" &&
            "Creating visual identity and design assets"}
          {group.group === "Social Media Team" &&
            "Managing our digital presence and community engagement"}
          {group.group === "DSA" &&
            "Teaching data structures and algorithms fundamentals"}
          {group.group === "DevOps Team" &&
            "Managing infrastructure and deployment workflows"}
          {group.group === "Web Dev Team" &&
            "Building web applications and digital solutions"}
          {group.group === "IoT Team" &&
            "Exploring Internet of Things and embedded systems"}
          {group.group === "AI/ML Team" &&
            "Advancing artificial intelligence and machine learning"}
          {group.group === "Game Dev Team" &&
            "Creating interactive games and entertainment"}
          {group.group === "Creative & Reel Team" &&
            "Producing creative content and video materials"}
        </p>
      </div>

      {/* Team Cards Grid */}
      <div
        className={`grid gap-4 sm:gap-6 lg:gap-8 px-4 ${
          group.positions.length === 1
            ? "grid-cols-1 max-w-md mx-auto"
            : group.positions.length === 2
            ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        }`}
      >
        {group.positions.map((position, positionIndex) => (
          <TeamCard
            key={positionIndex}
            position={position}
            groupColor={group.color || "#6366f1"}
            index={positionIndex}
          />
        ))}
      </div>
    </div>
  );
};

const AboutUsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Hero section entrance animation
    gsap.fromTo(
      hero.children,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.3,
        delay: 0.5,
      }
    );
  }, []);

  const sortedTeams = teamData.sort((a, b) => a.priority - b.priority);

  return (
    <ReactLenis root>
      {/* Use the container class to work with the glyph background */}
      <div className="container">
        {/* Hero Section using page-header for proper navbar spacing */}
        <div className="page-header" ref={heroRef}>
          <div className="text-center">
            <TextAnimation>
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 sm:mb-12 text-white leading-none"
                style={{ fontFamily: "Broadway-font" }}
              >
                About Us
              </h1>
            </TextAnimation>

            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 leading-relaxed font-light px-4">
                Welcome to the GeeksForGeeks - GU chapter. We are a passionate
                community of developers, designers, and tech enthusiasts working
                together to learn, build, and innovate.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto px-4">
                Our diverse team of leaders and contributors spans multiple
                domains - from web development and AI/ML to IoT and game
                development. Each member brings unique skills and perspectives
                that help drive our mission of knowledge sharing and technical
                excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Content wrapper for team sections */}
        <div
          ref={containerRef}
          className="relative z-10 pb-16 px-4 sm:px-6 lg:px-8"
        >
          {/* Container for centered content */}
          <div className="max-w-7xl mx-auto">
            {/* Team Hierarchy Section */}
            <div className="team-hierarchy text-center">
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4 mx-auto">
                  Meet Our Team
                </h2>
                <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6 sm:mb-8"></div>
                <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                  Our organizational structure reflects our commitment to
                  collaborative leadership and specialized expertise across
                  various technological domains. Get to know the talented
                  individuals who make our community thrive.
                </p>
              </div>

              {/* Team Groups */}
              <div className="space-y-16 sm:space-y-24">
                {sortedTeams.map((group, index) => (
                  <TeamGroupComponent
                    key={group.group}
                    group={group}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-24 sm:mt-32 pt-16 sm:pt-20 border-t border-white/10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 px-4">
                Join Our Community
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Interested in being part of our growing tech community? We're
                always looking for passionate individuals to contribute and
                learn with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                <button className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Get Involved
                </button>
                <button className="px-8 sm:px-10 py-3 sm:py-4 border-2 border-white/20 hover:border-white/40 text-gray-200 hover:text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm hover:bg-white/5">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};

export default AboutUsPage;
