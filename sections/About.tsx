import Lenis from '@studio-freight/lenis';
import React, { useRef, useEffect, useState } from 'react';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from '../constants';

export const AboutSection = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [headerStyle, setHeaderStyle] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const headerRef = useRef(null);

  const aboutContainerRef = useRef<HTMLDivElement | null>(null);
  const aboutContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);

    if (mediaQuery.matches) return; // 🚀 Stop everything if touch device
  }, [])

  useEffect(() => {
    if (!aboutContainerRef.current || !aboutContentRef.current) return;

    const lenis = new Lenis({
      wrapper: aboutContainerRef.current,
      content: aboutContentRef.current,
      duration: 1.2,
      smoothWheel: true,
    });

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ x: (clientX / window.innerWidth) * 100, y: (clientY / window.innerHeight) * 100 });

    // Magnetic 3D Header Logic
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const radius = 600;

      if (distance < radius) {
        const strength = (1 - distance / radius);
        setHeaderStyle({
          x: distanceX * strength * 0.3,
          y: distanceY * strength * 0.3,
          rotateX: (distanceY / radius) * -25,
          rotateY: (distanceX / radius) * 25
        });
      } else {
        setHeaderStyle({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
      }
    }
  };

  const handleEdgeEvent = (e) => {
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--edge-x", `${clientX - rect.left}px`);
    target.style.setProperty("--edge-y", `${clientY - rect.top}px`);
  };

  return (
    <div
      ref={aboutContainerRef}
      onMouseMove={handleMouseMove}
      className={`w-full h-screen bg-black text-white ${!isTouchDevice ? 'overflow-hidden' : ''} no-scrollbar perspective-2000 relative`}
    >
      {/* Background Interactive Spotlight */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(79, 70, 229, 0.15), transparent 80%)`
        }}
      />

      <div ref={aboutContentRef} className="max-w-[1400px] mx-auto px-4 md:px-20 py-40 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row gap-20 mb-40">
          <div className="flex-1 space-y-10 perspective-1000">
            <p className="text-[10px] font-black tracking-[0.8em] uppercase text-indigo-500 animate-pulse">About / Philosophy</p>
            <h2 
              ref={headerRef}
              className="expand-cursor text-8xl md:text-[10rem] font-condensed uppercase leading-[0.8] tracking-tighter transition-transform duration-500 ease-out cursor-default select-none"
              style={{ 
                transform: `translate3d(${headerStyle.x}px, ${headerStyle.y}px, 0) rotateX(${headerStyle.rotateX}deg) rotateY(${headerStyle.rotateY}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              Engineering <br /> <span className="text-zinc-500 group-hover:text-white transition-colors duration-700">with</span> Intent.
            </h2>
          </div>
          <div className="lg:max-w-md flex flex-col justify-end">
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-zinc-500 hover:text-zinc-200 transition-colors duration-500">
              {PERSONAL_INFO.detailedBio}
            </p>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 border-t border-white/10 pt-20">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-20">
            <div className="space-y-6 group">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-zinc-600">The Mission</h3>
              <p className="text-xl text-zinc-300 italic font-serif leading-relaxed group-hover:text-indigo-300 transition-colors duration-500">
                "{PERSONAL_INFO.mission}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 select-none">
              {[
                { val: PERSONAL_INFO.experience+"+", label: "Years Active" },
                { val: PERSONAL_INFO.uptime_mentality, label: "Uptime Mentality" }
              ].map((stat, i) => (
                <div key={i} className="expand-cursor group cursor-default relative py-2">
                  {/* The Number: Slides up and turns Indigo */}
                  <h4 className="text-5xl font-condensed transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 group-hover:text-indigo-500 tracking-tight">
                    {stat.val}
                  </h4>

                  {/* The Label: Shifts right slightly and brightens */}
                  <p className="text-[10px] font-black tracking-widest uppercase opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] mt-1">
                    {stat.label}
                  </p>

                  {/* Subtle accent line that grows from the left */}
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-12 bg-indigo-500 transition-all duration-700 ease-out" />
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: Core Expertise */}
          <div className="lg:col-span-8 space-y-20 select-none">
            <div className="space-y-10">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-zinc-600">Stack & Expertise</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SKILLS.map((skill, i) => (
                  <div
                    key={i}
                    onMouseEnter={handleEdgeEvent}
                    onMouseLeave={handleEdgeEvent}
                    className="hide-cursor group relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between min-h-[140px] bg-white/5 border border-white/10 cursor-default"
                  >
                    {/* The "Button Circle" logic */}
                    <span
                      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-white 
                                scale-0 group-hover:scale-[3] 
                                transition-transform duration-700 ease-[cubic-bezier(0.42, 0.47, 0.23, 0.98)]"
                      style={{
                        left: "var(--edge-x)",
                        top: "var(--edge-y)",
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between h-full transition-colors duration-500 group-hover:text-black ease-out">
                      <i className={`${skill.icon} text-2xl opacity-40 group-hover:opacity-100 transition-all duration-500`}></i>
                      <p className="text-[10px] font-black tracking-widest uppercase">
                        {skill.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Milestones */}
            <div className="space-y-10">
              <h3 className="text-[10px] font-black tracking-widest uppercase text-zinc-600">Select Milestones</h3>
              <div className="space-y-0">
                {EXPERIENCES.map((exp, i) => (
                  <div 
                    key={i} 
                    className="group border-b border-white/5 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] px-4 -mx-4 transition-all duration-500 cursor-pointer"
                  >
                    <div>
                      {/* Staggered Character Animation Container */}
                      <div className="flex flex-col h-[2em] overflow-hidden leading-none mb-1">
                        {/* Top Row (Original) */}
                        <div className="flex">
                          {exp.company.split("").map((char, index) => (
                            <span
                              key={index}
                              className="text-2xl font-bold inline-block group-hover:-translate-y-full transition-transform duration-500 ease-in-out whitespace-pre"
                              style={{ transitionDelay: `${index * 20}ms` }}
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                        {/* Bottom Row (Indigo Duplicate) */}
                        <div className="flex">
                          {exp.company.split("").map((char, index) => (
                            <span
                              key={index}
                              className="text-2xl font-bold inline-block group-hover:-translate-y-full transition-transform duration-500 ease-in-out whitespace-pre"
                              style={{ transitionDelay: `${index * 20}ms` }}
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] font-black tracking-widest uppercase opacity-40">{exp.role}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-200 transition-colors">
                        {exp.period}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        <i className="fa-solid fa-arrow-right -rotate-45 text-[10px]"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center">
          <p className="text-[10px] font-black tracking-[0.5em] uppercase text-zinc-800">{PERSONAL_INFO.name} — {PERSONAL_INFO.shortRole}</p>
        </div>
      </div>
    </div>
  );
};