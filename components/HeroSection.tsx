"use client";

import TextAnimation from "@/components/text-animation";
import Logo from "@/components/Logo";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center px-[2vw] sm:px-[4vw] lg:px-[6vw] pt-16 overflow-hidden">
      
      {/* Wavy Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-12"
          viewBox="0 0 1200 800"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 Q300,50 600,200 T1200,150 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-600"
          />
          <path
            d="M0,200 Q300,150 600,300 T1200,250 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-gray-200 dark:text-gray-700"
            opacity="0.6"
          />
          <path
            d="M0,300 Q300,250 600,400 T1200,350 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-gray-100 dark:text-gray-800"
            opacity="0.4"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto w-full h-full relative z-10">
        <div className="relative flex items-center justify-center h-full">
          
          {/* Main centered content with ratio-based sizing */}
          <div className="flex flex-col items-center justify-center w-full max-w-4xl">
            
            {/* Logo with ratio-based size */}
            <div 
              className="flex justify-center mb-[4vh] sm:mb-[5vh]"
              style={{
                 width: 'clamp(180px, 15vw, 320px)',    // Increased all three values
    height: 'clamp(180px, 15vw, 320px)',   // Increased all three values
    filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.4)) drop-shadow(0 0 50px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 70px rgba(34, 197, 94, 0.2)) drop-shadow(0 0 90px rgba(34, 197, 94, 0.1))' }}
            >
              <Logo className="w-full h-full" />
            </div>
            
            <TextAnimation animateOnScroll={true} delay={0.2}>
              {/* GEEKSFORGEEKS text with ratio-based font size */}
              <h1 
                className="text-center font-extrabold leading-tight tracking-wider mb-[3vh] sm:mb-[4vh] text-gray-900 dark:text-white"
                style={{ 
                  fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', // 36px to 56px
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  letterSpacing: '0.08em',
                  textShadow: `0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.2)`
                }}
              >
                GeeksforGeeks
              </h1>

              {/* Campus Body branding with ratio-based sizes */}
              <div className="text-center space-y-[2vh]">
                <p 
                  className="text-green-600 dark:text-green-400 font-bold drop-shadow-md"
                  style={{ 
                    fontSize: 'clamp(1.625rem, 3vw, 2.375rem)', // 26px to 38px
                    letterSpacing: '0.04em',
                    textShadow: '0 0 16px rgba(34, 197, 94, 0.5), 0 0 32px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  Campus Body
                </p>
                <p 
                  className="text-gray-700 dark:text-white/90 font-semibold drop-shadow-md"
                  style={{ 
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)', // 20px to 28px
                    letterSpacing: '0.02em'
                  }}
                >
                  Gauhati University
                </p>
              </div>
            </TextAnimation>
          </div>

          {/* Right side navigation with ratio-based spacing - Desktop only */}
          <div className="absolute right-[3vw] xl:right-[5vw] top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-[4vh]">
            {['Learn', 'Explore', 'Innovate'].map((item) => (
              <div key={item} className="flex items-center space-x-[2vw]">
                <div 
                  className="bg-green-500 dark:bg-green-400 rounded-full"
                  style={{
                    width: 'clamp(12px, 1vw, 16px)',
                    height: 'clamp(12px, 1vw, 16px)',
                    boxShadow: '0 0 16px rgba(34, 197, 94, 0.8), 0 0 32px rgba(34, 197, 94, 0.5), 0 0 48px rgba(34, 197, 94, 0.3)'
                  }}
                ></div>
                <span 
                  className="text-gray-900 dark:text-white font-bold drop-shadow-md"
                  style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet version with ratio-based spacing */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[6vh] lg:hidden">
            <div className="flex space-x-[6vw]">
              {['Learn', 'Explore', 'Innovate'].map((item) => (
                <span key={item} className="text-green-600 dark:text-green-400 flex items-center drop-shadow-md font-semibold">
                  <div 
                    className="bg-green-600 dark:bg-green-400 rounded-full mr-[3vw]"
                    style={{
                      width: 'clamp(8px, 1.5vw, 12px)',
                      height: 'clamp(8px, 1.5vw, 12px)',
                      boxShadow: '0 0 14px rgba(34, 197, 94, 0.8), 0 0 28px rgba(34, 197, 94, 0.5), 0 0 42px rgba(34, 197, 94, 0.3)'
                    }}
                  ></div>
                  <span style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}>
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
