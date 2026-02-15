import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, PERSONAL_INFO } from '../constants';
import { ProjectOverlay } from '@/components/ProjectOverlay';

export const ProjectsSection = () => {
  const infiniteProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS];
  
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const requestRef = useRef(null);
  const targetX = useRef(0); 
  const currentX = useRef(0);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [headerOffset, setHeaderOffset] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouchDevice(hasTouch);
  }, []);

  // Handle Infinite Scroll & Magnetic Header
  useEffect(() => {
    if (isTouchDevice) return;

    const container = scrollRef.current;
    const header = headerRef.current;
    if (!container || selectedProject) return; // Pause scroll logic if a project is open

    const getSectionWidth = () => container.scrollWidth / 6;
    const initialPos = getSectionWidth() * 2;
    
    if (currentX.current === 0) {
        targetX.current = initialPos;
        currentX.current = initialPos;
    }

    const handleWheel = (e) => {
      if (selectedProject) return;
      e.preventDefault();
      targetX.current += e.deltaY;
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePos({ 
        x: (clientX / window.innerWidth) * 100, 
        y: (clientY / window.innerHeight) * 100 
      });

      if (header) {
        const rect = header.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        const radius = 300;
        const force = 0.6;

        if (distance < radius) {
          const pull = (1 - distance / radius) * force;
          setHeaderOffset({ x: distanceX * pull, y: distanceY * pull });
        } else {
          setHeaderOffset({ x: 0, y: 0 });
        }
      }
    };

    const update = () => {
      const sectionWidth = getSectionWidth();
      currentX.current += (targetX.current - currentX.current) * 0.08;

      if (currentX.current >= sectionWidth * 4) {
        currentX.current = (sectionWidth * 2) + (currentX.current - sectionWidth * 4);
        targetX.current = currentX.current;
      }
      if (currentX.current <= sectionWidth * 2) {
        currentX.current = (sectionWidth * 4) - (sectionWidth * 2 - currentX.current);
        targetX.current = currentX.current;
      }

      container.scrollLeft = currentX.current;
      requestRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [selectedProject, isTouchDevice]);

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden relative flex flex-col justify-center">
      
      {/* Background Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(79, 70, 229, 0.15), transparent 80%)`
        }}
      />

      {/* Main Content Wrapper - Animates out when project is selected */}
      <motion.div 
        animate={{ 
            opacity: selectedProject ? 0.3 : 1,
            scale: selectedProject ? 0.9 : 1,
            filter: selectedProject ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-full flex flex-col justify-center"
      >
        <div className="w-full mt-12 mb-10 px-4 md:px-20 relative z-10">
          <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <p className="text-[10px] font-black tracking-[0.8em] uppercase text-indigo-500">Case Studies</p>
              <h2 
                ref={headerRef}
                className="text-7xl md:text-[10rem] font-condensed uppercase leading-[0.8] tracking-tighter select-none transition-transform duration-700 ease-out"
                style={{ transform: `translate3d(${headerOffset.x}px, ${headerOffset.y}px, 0)` }}
              >
                <span className="expand-cursor">The Work</span> <br /> <span className="expand-cursor">Experience</span>
              </h2>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-6 pb-4">
              <p className="text-zinc-500 text-sm max-w-[280px] md:text-right leading-relaxed">
                A selection of projects where technical complexity meets high-end digital craftsmanship.
              </p>
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                className="hide-cursor group flex items-center gap-4 text-[10px] font-black tracking-widest uppercase cursor-pointer"
              >
                <div className="flex flex-col h-[1.1em] overflow-hidden leading-none">
                  {/* Top Row */}
                  <div className="flex">
                    {"Full Archive".split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block group-hover:-translate-y-full transition-transform duration-500 ease-in-out whitespace-pre"
                        style={{ transitionDelay: `${i * 20}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                  {/* Bottom Row (Animated into view) */}
                  <div className="flex">
                    {"Full Archive".split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block group-hover:-translate-y-full transition-transform duration-500 ease-in-out whitespace-pre"
                        style={{ transitionDelay: `${i * 20}ms` }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-12 h-12 relative rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-white/0 overflow-hidden">
                  {/* Background Fill */}
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  
                  {/* Icon Wrapper */}
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    {/* Original Arrow: Moves Up and Right */}
                    <i className="fa-solid text-[1rem] fa-arrow-right absolute transition-all delay-50 duration-700 ease-in-out 
                                  group-hover:-translate-y-8 group-hover:translate-x-8 -rotate-45
                                  text-white group-hover:text-black"></i>
                    
                    {/* New Arrow: Comes from Bottom and Left */}
                    <i className="fa-solid text-[1rem] fa-arrow-right absolute transition-all delay-50 duration-700 ease-in-out 
                                  translate-y-8 -translate-x-8 -rotate-45
                                  group-hover:translate-y-0 group-hover:translate-x-0
                                  text-white group-hover:text-black"></i>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Scroller */}
        <div 
          ref={scrollRef} 
          className={`
            relative w-full flex select-none z-10
            ${isTouchDevice ? 'overflow-x-auto no-scrollbar' : 'overflow-x-hidden'}
          `}
        >
          <div className="flex items-center gap-8 py-20 px-10"> 
            {infiniteProjects.map((project, idx) => {
              const isStaggered = idx % 2 === 1;
              return (
                <motion.div 
                  key={`${project.id}-${idx}`} 
                  onClick={() => setSelectedProject(project)}
                  className={`
                    relative w-[320px] md:w-[650px] shrink-0 aspect-[16/9] 
                    overflow-hidden rounded-[2rem] border border-white/5 
                    bg-zinc-900/50 group transition-all duration-700
                    ${isStaggered ? 'translate-y-16' : '-translate-y-16'}
                    hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]
                    expand-cursor cursor-pointer
                  `}
                >
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent p-8 md:p-12 flex flex-col justify-end">
                  <div className="flex gap-2 mb-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[8px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md bg-white/5">{tech}</span>
                    ))}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-condensed uppercase tracking-tight group-hover:mb-2 transition-all duration-500">{project.title}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm max-w-md line-clamp-2 h-0 group-hover:h-10 opacity-0 group-hover:opacity-100 transition-all duration-500">{project.description}</p>
                </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* DETAILED CASE STUDY OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

