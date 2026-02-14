import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { BackgroundCanvas } from '../components/BackgroundCanvas';
import { LinkButton } from '@/components/buttons/LinkButton.';

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nameStyle, setNameStyle] = useState({ 
    rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xPct = clientX / innerWidth - 0.5;
    const yPct = clientY / innerHeight - 0.5;

    setMousePos({ x: xPct, y: yPct });
    
    setNameStyle({
      rotateY: xPct * 30, 
      rotateX: yPct * -35,
      translateX: xPct * 40,
      translateY: yPct * 45
    });
  };

  const handleMouseLeave = () => {
    setNameStyle({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden bg-black text-white perspective-1000 pb-14 md:pb-0"
    >
      <BackgroundCanvas />

      {/* 1. LAYER: Background Grid - Increased opacity and slightly lighter dot */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      
      {/* 2. LAYER: Floating Decorative Elements (Interactive) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Left: Location/Status - Brightened border and pill background */}
        <div 
          className="absolute top-20 left-20 transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)` }}
        >
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span className="text-[10px] text-white/90 uppercase tracking-widest font-bold">Available for Projects</span>
          </div>
        </div>

        {/* Bottom Right: Coordinates/Tech - Brightened Zinc shades */}
        <div 
          className="absolute bottom-20 right-20 text-right transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * 100}px, ${mousePos.y * 100}px)` }}
        >
          <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-[0.3em] mb-2">System.Status // Active</p>
          <div className="h-px w-32 bg-gradient-to-l from-white/40 to-transparent ml-auto mb-2" />
          <p className="text-[9px] text-zinc-500 font-mono">LAT: 24.8607° N / LONG: 67.0011° E</p>
        </div>

        {/* Scattered "Motes" - Made circles more distinct with white/10 */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
              left: '50%',
              top: '50%',
              marginLeft: `-${(i + 1) * 50}px`,
              marginTop: `-${(i + 1) * 50}px`,
              transform: `translate(${mousePos.x * (i * 20)}px, ${mousePos.y * (i * 20)}px)`,
              transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />
        ))}
      </div>

      {/* 3. LAYER: Cinematic Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,black_95%)]" />

      {/* 4. LAYER: Subtitle - Changed text-zinc-500 to 400 for better contrast */}
      <p className="relative z-20 font-black tracking-[0.5em] uppercase text-zinc-400 mb-6 select-none text-center">
        <span className="max-md:hidden text-[11px]">{PERSONAL_INFO.role}</span>
        <span className="md:hidden text-[0.6rem]">{PERSONAL_INFO.shortRole}</span>
      </p>

      {/* 5. LAYER: THE MAGNETIC NAME */}
      <h1 
        className="expand-cursor relative z-30 text-[24vw] md:text-[13rem] font-condensed uppercase leading-[0.85] mb-[3vw] md:mb-14 select-none tracking-tighter text-white transition-transform duration-500 ease-out text-center"
        style={{ 
          transform: `
            translateX(${nameStyle.translateX}px) 
            translateY(${nameStyle.translateY}px) 
            rotateX(${nameStyle.rotateX}deg) 
            rotateY(${nameStyle.rotateY}deg)
            translateZ(80px)
          `,
          transformStyle: 'preserve-3d',
          textShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}
      >
        <div className="-mt-4">
          <span className="block animate-in slide-in-from-bottom-full duration-1000 ease-out">
            {PERSONAL_INFO.firstName}
          </span>
        </div>
        <div className="">
          <span className="block animate-in slide-in-from-bottom-full duration-1000 delay-150 ease-out">
            {PERSONAL_INFO.lastName}
          </span>
        </div>
      </h1>
      
      {/* 6. LAYER: Socials - Increased default border visibility */}
      <div className="relative z-20 flex items-center justify-center gap-6 pointer-events-auto">
        {[
          { icon: 'fa-brands fa-linkedin-in', link: PERSONAL_INFO.linkedin },
          { icon: 'fa-brands fa-github', link: PERSONAL_INFO.github },
          { icon: 'fa-brands fa-instagram', link: PERSONAL_INFO.instagram }
        ].map((item, i) => (
          <LinkButton
            key={i}
            size="md"
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            icon={item.icon}
          />
        ))}
      </div>

      {/* Decorative Accents - Increased opacity to white/10 */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/10 -z-10"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-white/10 -z-10"></div>

      {/* <div className="w-24 py-8 bg-red-500 absolute top-1/2 left-1/2 z-[999] flex flex-col items-center justify-center">
        <div className="hidden xl:block">xl</div>
        <div className="hidden lg:block">lg</div>
        <div className="hidden md:block">md</div>
        <div className="hidden sm:block">sm</div>
        <div className="hidden xs:block">xs</div>
      </div> */}
    </div>
  );
};