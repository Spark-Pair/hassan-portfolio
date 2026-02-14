import React, { useState, useRef, useEffect } from 'react';
import { correctBorderRadius, motion } from 'framer-motion';

interface NavbarProps {
  currentPath: string; // Changed from currentSection
  onNavigate: (path: string) => void; // Changed from setSection
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onToggleShowReel }) => {
  const sections = [
    { path: '/', label: 'HOME' },
    { path: '/projects', label: 'WORK' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' }
  ];

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const updateIndicator = () => {
      // Find the button associated with the current path
      const activeBtn = buttonRefs.current[currentPath];
      if (activeBtn && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        setIndicatorStyle({
          left: btnRect.left - navRect.left,
          width: btnRect.width,
          opacity: 1
        });
      }
    };

    updateIndicator();
    // Add a small delay to ensure the indicator catches up after route changes
    const timer = setTimeout(updateIndicator, 50);

    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [currentPath]);

  return (
    <div className="fixed bottom-10 left-10 right-10 z-50 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        
        {/* SparkPair Link with Tooltip */}
        <div className="relative group/tooltip">
          <a 
            href="https://sparkpair.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hide-cursor flex group items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:text-black transition-all duration-500 text-white"
          >
            <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            <i className="fa-solid fa-bolt text-lg relative z-10 group-hover:text-black"></i>
          </a>
          
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1.5 bg-white text-black text-[9px] font-black tracking-widest uppercase rounded 
                          opacity-0 translate-y-2 scale-95
                          group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 group-hover/tooltip:scale-100 
                          transition-all delay-100 duration-300 ease-out
                          pointer-events-none whitespace-nowrap shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
            Sparkpair.dev
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white"></div>
          </div>
        </div>

        {/* Navigation Pill */}
        <div 
          ref={navRef}
          className="relative flex gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl overflow-hidden"
        >
          {/* Sliding Indicator Background */}
          <div 
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity
            }}
          />

          {sections.map((sec) => (
            <button
              key={sec.path}
              ref={(el) => { buttonRefs.current[sec.path] = el; }}
              onClick={() => onNavigate(sec.path)}
              className={`relative z-10 px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest transition-colors duration-300 flex items-center ${
                currentPath === sec.path 
                  ? 'text-black' 
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Showreel Button */}
      {/* <div className="flex items-center">
        <motion.div 
          onClick={onToggleShowReel} // Use the prop here
          className="flex items-center gap-4 group cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl pl-6 pr-2 hover:border-white/30 transition-all active:scale-95"
        >
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500 group-hover:text-white transition-colors">
            Showreel
          </span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white/10 text-zinc-500 group-hover:bg-white group-hover:text-black">
            <i className="fa-solid fa-play text-[10px]"></i>
          </div>
        </motion.div>
      </div> */}
        <motion.div 
          onClick={onToggleShowReel}
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.96 }}
          className="relative gap-4 group cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 p-[1.1em] pl-[1.4em] pr-[3.8em] rounded-full shadow-2xl overflow-hidden flex items-center hide-cursor"
        >
          <motion.div 
            variants={{
              initial: { width: "40px", height: "40px", backgroundColor: "rgba(255, 255, 255, 0.1)" },
              hover: { 
                width: "100%", 
                height: "100%",
                right: 0,
                backgroundColor: "rgba(255, 255, 255, 1)",
                transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
              }
            }}
            className="absolute right-[6px] rounded-full z-0 flex items-center justify-center"
          >
            <motion.i 
              variants={{
                initial: { color: "#71717a", scale: 1 }, // zinc-500
                hover: { color: "#000000", scale: 1.2 }
              }}
              className="fa-solid fa-play text-[10px] relative z-20"
            />
          </motion.div>

          <motion.span 
            variants={{
              initial: { opacity: 1},
              hover: { 
                opacity: 0, 
                x: -60,
                transition: { duration: 0.3 } 
              }
            }}
            className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500 pointer-events-none"
          >
            Showreel
          </motion.span>
        </motion.div>
    </div>
  );
};