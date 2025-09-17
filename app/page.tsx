"use client";

import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventSection';
import Footer from '@/components/Footer';
import AboutHero from "@/components/AboutHero";
import HomeTeamSection from '@/components/membersMini';

export default function Home() {
  return (
    <>
      <main className="pb-96">
        <HeroSection />
        <EventsSection />
        <AboutHero />
        <HomeTeamSection />
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-[100]">

      </div>
    </>
  );
}
