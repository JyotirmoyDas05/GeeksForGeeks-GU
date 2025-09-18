"use client";

import TextAnimation from "@/components/text-animation";
import Logo from "@/components/Logo";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function HeroSection() {
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  const getTextSizes = () => {
    if (isMobile) {
      return {
        campusBody: "text-sm",
        university: "text-xs",
        geeks: "text-lg",
        sideNav: "text-xs",
        logo: "w-20 h-20"
      };
    }
    if (isTablet) {
      return {
        campusBody: "text-base",
        university: "text-sm",
        geeks: "text-xl",
        sideNav: "text-sm",
        logo: "w-24 h-24"
      };
    }
    return {
      campusBody: "text-lg",
      university: "text-base",
      geeks: "text-2xl",
      sideNav: "text-base",
      logo: "w-32 h-32"
    };
  };

  const sizes = getTextSizes();

  return (
    <section className="relative h-[55vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
      
      {/* Wavy Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
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
            opacity="0.5"
          />
          <path
            d="M0,300 Q300,250 600,400 T1200,350 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-gray-100 dark:text-gray-800"
            opacity="0.3"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto w-full h-full relative z-10">
        <div className="relative flex items-center justify-center h-full">
          
          {/* Main centered content with more spacing */}
          <div className="flex flex-col items-center justify-center w-full max-w-2xl">
            
            {/* Logo with Soft, Spread Out Green Glow */}
            <div className="flex justify-center mb-8 sm:mb-10">
              <div 
                className={`${sizes.logo} lg:w-36 lg:h-36 xl:w-40 xl:h-40`}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 40px rgba(34, 197, 94, 0.2)) drop-shadow(0 0 60px rgba(34, 197, 94, 0.1))'
                }}
              >
                <Logo className="w-full h-full" />
              </div>
            </div>
            
            <TextAnimation animateOnScroll={true} delay={0.2}>
              {/* GEEKSFORGEEKS text with Soft, Spread Out Glow */}
              <h1 
                className={`text-center font-bold leading-tight tracking-wide mb-4 sm:mb-6 ${sizes.geeks} text-gray-900 dark:text-white`}
                style={{ 
                  fontSize: isMobile ? '20px' : isTablet ? '24px' : '28px',
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  letterSpacing: '0.05em',
                  textShadow: `0 0 15px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.3), 0 0 45px rgba(34, 197, 94, 0.2), 0 0 60px rgba(34, 197, 94, 0.1)`
                }}
              >
                GeeksforGeeks
              </h1>

              {/* Campus Body branding with Subtle Glow */}
              <div className="text-center space-y-2">
                <p 
                  className={`text-green-600 dark:text-green-400 ${sizes.campusBody} font-medium drop-shadow-md`}
                  style={{ 
                    fontSize: isMobile ? '14px' : '16px',
                    letterSpacing: '0.02em',
                    textShadow: '0 0 12px rgba(34, 197, 94, 0.3), 0 0 24px rgba(34, 197, 94, 0.2)'
                  }}
                >
                  Campus Body
                </p>
                <p 
                  className={`text-gray-700 dark:text-white/90 ${sizes.university} drop-shadow-md`}
                  style={{ 
                    fontSize: isMobile ? '12px' : '14px',
                    letterSpacing: '0.01em'
                  }}
                >
                  Gauhati University
                </p>
              </div>
            </TextAnimation>
          </div>

          {/* Right side navigation with Soft Glow and More Spacing */}
          {isDesktop && (
            <div className="absolute right-10 xl:right-16 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6">
              {['Learn', 'Explore', 'Innovate'].map((item) => (
                <div key={item} className="flex items-center space-x-6">
                  <div 
                    className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"
                    style={{
                      boxShadow: '0 0 12px rgba(34, 197, 94, 0.6), 0 0 24px rgba(34, 197, 94, 0.3), 0 0 36px rgba(34, 197, 94, 0.1)'
                    }}
                  ></div>
                  <span className={`${sizes.sideNav} text-gray-900 dark:text-white font-medium drop-shadow-md`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile/Tablet version with Soft Glow and More Spacing */}
          {!isDesktop && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-14">
              <div className={`flex space-x-6 ${sizes.sideNav}`}>
                {['Learn', 'Explore', 'Innovate'].map((item) => (
                  <span key={item} className="text-green-600 dark:text-green-400 flex items-center drop-shadow-md">
                    <div 
                      className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mr-4"
                      style={{
                        boxShadow: '0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.3), 0 0 30px rgba(34, 197, 94, 0.1)'
                      }}
                    ></div>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
