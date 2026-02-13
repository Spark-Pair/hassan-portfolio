
import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../constants';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for fade-out animation
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Background Noise for Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative text-center space-y-8 px-6">
        {/* Initials / Brand */}
        <div className="overflow-hidden">
          <h2 className="text-white text-9xl md:text-[12rem] font-condensed uppercase tracking-tighter leading-none animate-in slide-in-from-bottom-full duration-1000">
            {PERSONAL_INFO.firstName[0] + PERSONAL_INFO.lastName[0]}<span className="text-zinc-800">.</span>
          </h2>
        </div>

        {/* Loading Detail */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-[1px] bg-zinc-900 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between w-48 font-black text-[10px] tracking-[0.3em] uppercase">
            <span className="text-zinc-600">Initializing</span>
            <span className="text-white">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 text-[10px] font-black tracking-widest text-zinc-700 uppercase hidden md:block">
        {PERSONAL_INFO.role}
      </div>
      <div className="absolute bottom-12 right-12 text-[10px] font-black tracking-widest text-zinc-700 uppercase hidden md:block">
        Portfolio v3.0
      </div>
    </div>
  );
};
