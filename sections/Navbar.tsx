import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';
import { ExpandingButton } from '@/components/buttons/ExpandingButton';
import { LinkButton } from '@/components/buttons/LinkButton.';

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

  const onDownload = () => {
    const link = document.createElement("a");
    link.href = `/file/${PERSONAL_INFO.resumeFileName}`;
    link.download = "Hassan-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed bottom-10 left-10 right-10 z-50 flex items-center justify-between pointer-events-none max-md:hidden">
      <div className="flex items-center gap-2 pointer-events-auto">
        
        {/* SparkPair Link with Tooltip */}
        <div className="relative group/tooltip">
          <LinkButton
            size="sm"
            href="https://sparkpair.dev" 
            target="_blank"
            rel="noopener noreferrer"
            icon="fa-solid fa-bolt"
            borderVariant="light"
          />
          
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

      {/* Showreel and Resume Buttons */}
      <div className="flex items-center gap-3">
        {[{label: "Resume", icon: "fa-solid fa-download", onclick: onDownload}, {label: "ShowReel", icon: "fa-solid fa-play", onclick: onToggleShowReel}].map((buttonData, index) => (
          <ExpandingButton
            key={index}
            label={buttonData.label}
            icon={buttonData.icon}
            onClick={buttonData.onclick}
          />
        ))}
      </div>
    </div>
  );
};