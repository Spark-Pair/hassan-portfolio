import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { MagneticButton } from '@/components/buttons/MagneticButton';
import { ProjectGallery } from '@/components/ProjectGallery';

export const ProjectOverlay = ({ project, onClose }) => {
  const overlayContainerRef = useRef(null);
  const targetRef = useRef(null);
  const lenisRef = useRef(null);

  const limitedScreenshots = (project.screenshots || []).slice(0, 3);

  // 1. Initialize Lenis for this specific container
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: overlayContainerRef.current, // The outer fixed div
      content: overlayContainerRef.current.firstChild, // The content inside
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to Framer Motion's ticker
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Setup Scroll Tracking (Watching the Lenis-controlled container)
  const { scrollYProgress } = useScroll({
    container: overlayContainerRef,
    target: targetRef,
    offset: ["start 30%", "end 30%"]
  });

  // 3. Map Vertical Scroll to Horizontal X
  // Adjust "-80%" based on total width of your screenshot track
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const viewGallery = () => {
    setIsGalleryOpen(true);
  }

  return (
    <>
      <motion.div 
        ref={overlayContainerRef}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] bg-zinc-950 overflow-y-auto overflow-x-hidden no-scrollbar"
      >
        {/* WRAPPER FOR LENIS CONTENT - This div is crucial for Lenis to calculate height */}
        <div>
          {/* Vertical "Scroll" Text Decor */}
          <div className="fixed z-[20] right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-20 pointer-events-none">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Scroll</span>
            <div className="w-[1px] h-20 bg-white" />
          </div>

          <div className="fixed top-0 left-0 w-full p-10 flex justify-between items-center z-50">
            {/* Back Button */}
            <MagneticButton onClick={onClose}>
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform" />
              <span>Exit Case</span>
            </MagneticButton>

            {/* View Gallery Button */}
            <MagneticButton onClick={viewGallery}>
              <span>View Gallery</span>
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </MagneticButton>
          </div>

          {/* 1. HERO (Kept your logic, added slight parallax) */}
          <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
            <motion.img 
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src={project.image} 
              className="w-full h-full object-cover opacity-60 grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-zinc-950" />
    
            <div className="absolute bottom-10 left-10 md:left-20 max-w-4xl">
              <motion.div
                initial={{ y: 110, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden md:block text-xs font-black uppercase tracking-[0.5em] mb-3 text-indigo-700 ms-2"
              >
                Case Study // {project.id}
              </motion.div>
              <motion.h2 
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-7xl md:text-[12rem] font-condensed uppercase leading-[0.8] mb-6 expand-cursor"
              >
                {project.title}
              </motion.h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech, i) => (
                  <span key={i} className="px-4 py-2 rounded-full border border-white/10 text-[10px] uppercase font-bold backdrop-blur-md bg-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* 2. SPECS GRID */}
          <div className="max-w-[1400px] mx-auto px-10 py-24 grid grid-cols-1 md:grid-cols-12 gap-16 border-b border-white/5">
            <div className="md:col-span-4 space-y-12">
                <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <h4 className="text-indigo-500 text-[10px] font-black uppercase tracking-widest mb-4 italic">// The Objective</h4>
                    <p className="text-zinc-400 leading-relaxed text-sm tracking-wider">{project.description}</p>
                </motion.section>
                <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <h4 className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-4 italic">// Deliverables</h4>
                    <ul className="text-white space-y-2 text-sm font-bold uppercase">
                        {project.deliverables.map(item => (
                            <li key={item} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> {item}
                            </li>
                        ))}
                    </ul>
                </motion.section>
            </div>
    
            <div className="md:col-span-8">
                <h3 className="text-3xl md:text-5xl font-light leading-tight mb-10 text-zinc-200">
                    {project.caseStudyDetail || "Crafting a digital experience that balances high-performance logic with fluid aesthetic transitions."}
                </h3>
            </div>
          </div>

          {/* 3. THE MINIMALIST EDITORIAL STACK */}
          <section ref={targetRef} className="relative h-[800vh] bg-zinc-950">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
              {/* Dynamic Background Title (Parallaxed) */}
              <motion.h2 
                style={{ 
                  x: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]),
                  opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.05, 0.05, 0])
                }}
                className="absolute top-0 text-[35vmin] font-black uppercase pointer-events-none whitespace-nowrap"
              >
                {project.title}
              </motion.h2>
              <motion.h2 
                style={{ 
                  x: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]),
                  opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.05, 0.05, 0])
                }}
                className="absolute bottom-0 text-[35vmin] font-black uppercase pointer-events-none whitespace-nowrap"
              >
                {project.title}
              </motion.h2>
              
              <div className="relative w-[90vw] h-[75vh] md:w-[80vw] md:h-[80vh]">
                {limitedScreenshots.map((screenshot, idx) => {
                  const step = 1 / limitedScreenshots.length;
                  const start = idx * step;
                  const end = (idx + 1) * step;

                  // ClipPath for the "Unroll"
                  const clipPath = useTransform(
                    scrollYProgress,
                    [start, start + step * 0.6, end - step * 0.2, end],
                    [
                      "inset(100% 0% 0% 0% round 2rem)", 
                      "inset(0% 0% 0% 0% round 2rem)",   
                      "inset(0% 0% 0% 0% round 2rem)",   
                      "inset(0% 0% 100% 0% round 2rem)"  
                    ]
                  );

                  // Internal Parallax for the image itself
                  const imgY = useTransform(scrollYProgress, [start, end], ["-5%", "5%"]);

                  return (
                    <motion.div
                      key={idx}
                      style={{ clipPath, zIndex: idx }}
                      className="absolute inset-0 will-change-[clip-path] bg-zinc-900 expand-cursor"
                    >
                      <div className="w-full h-full relative group">
                        {/* The Image */}
                        <motion.img 
                          style={{ y: imgY, scale: 1.1 }}
                          src={screenshot.url} 
                          className="w-full h-full object-cover opacity-80" 
                          alt="" 
                        />
                        
                        {/* MINIMALIST METADATA LAYER */}
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
                          
                          {/* Top Label */}
                          <div className="flex justify-between items-start overflow-hidden">
                            <motion.div 
                              style={{ y: useTransform(scrollYProgress, [start, start + step * 0.2], [20, 0]) }}
                              className="flex gap-4 items-center"
                            >
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                <span className="text-white font-mono text-[10px] uppercase tracking-[0.4em]">Live_View_0{idx + 1}</span>
                            </motion.div>
                            <div className="text-white/20 font-mono text-[10px] tracking-widest">
                              {project.title.replace(/\s+/g, '_').toUpperCase()}
                            </div>
                          </div>

                          {/* Bottom Label (Replaces the big box) */}
                          <div className="flex justify-between items-end">
                            <div className="overflow-hidden">
                                <motion.h3 
                                  style={{ y: useTransform(scrollYProgress, [start + step * 0.1, start + step * 0.3], [100, 0]) }}
                                  className="text-4xl md:text-6xl font-condensed uppercase text-white tracking-tighter"
                                >
                                  {screenshot.title}
                                </motion.h3>
                            </div>
                            
                            {/* Minimal Page Indicator */}
                            <div className="flex gap-2 mb-2">
                              {(project.screenshots || [1,2,3]).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`h-[2px] w-8 transition-colors duration-500 ${idx === i ? 'bg-indigo-500' : 'bg-white/10'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Aesthetic Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
                        <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 4. FINAL MEDIA (Video or Live Demo) */}
          <section className="relative py-60 bg-zinc-950 overflow-hidden">
            {/* Section Heading with more "Grit" */}
            <div className="max-w-[1400px] mx-auto px-10 mb-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="flex-1">
                  <span className="text-indigo-500 font-mono text-[10px] tracking-[0.8em] uppercase block mb-6">// Deploy_Final</span>
                  <h2 className="text-6xl md:text-9xl font-condensed uppercase leading-[0.8] tracking-tighter">
                    <span className="expand-cursor">Live</span> <br /> <span className="expand-cursor">Execution</span>
                  </h2>
                </div>
                <div className="flex-1 max-w-sm">
                  <p className="text-zinc-500 text-xs uppercase leading-relaxed tracking-widest border-l border-white/10 pl-8">
                    The culmination of visual logic and technical performance, rendered in real-time.
                  </p>
                </div>
              </div>
            </div>

            {/* THE "PORTAL" MEDIA CONTAINER */}
            <div className="max-w-[1400px] mx-auto">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="relative aspect-video w-full rounded-2xl md:rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 expand-cursor"
              >
                {project.video ? (
                  <div className="w-full h-full relative group">
                    <video
                      ref={videoRef}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover brightness-50 group-hover:brightness-100 transition-all duration-1000"
                      onMouseEnter={() => videoRef.current?.play()}
                      onMouseLeave={() => videoRef.current?.pause()}
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>

                    {/* Overlay Play Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-150 group-hover:opacity-0 transition-all duration-700">
                        <i className="fa-solid fa-play text-white text-xs"></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full h-full relative group"
                    onMouseMove={(e) => {
                      // Logic for a magnetic cursor could go here
                    }}
                  >
                    <img 
                      src={project.image} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-out" 
                      alt="Live Site" 
                    />
                    
                    {/* Minimal Floating Label */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
                    
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] rounded-full flex items-center gap-4"
                      >
                        Open Project <i className="fa-solid fa-arrow-right"></i>
                      </motion.div>
                    </div>
                  </a>
                )}

                {/* Media Metadata Bar */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <div className="flex gap-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500 text-[8px] uppercase tracking-widest">Status</span>
                      <span className="text-green-500 text-[10px] font-mono tracking-tighter animate-pulse">● PRODUCTION_READY</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-white/20 text-[10px] font-mono tracking-widest uppercase">
                      Encrypted_Stream_v.02
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 5. FOOTER EXIT */}
          <section className="w-full py-40 border-t border-white/5 flex flex-col items-center justify-center relative overflow-hidden select-none">
            <motion.h2 
                whileHover={{ skewX: -10, scale: 1.05 }}
                className="text-6xl md:text-[14rem] font-condensed uppercase leading-none cursor-pointer z-10 expand-cursor"
                onClick={onClose}
            >
                Close Case
            </motion.h2>
            <div className="absolute opacity-5 text-[20vw] font-black select-none pointer-events-none">EXIT</div>
          </section>
        </div>
      </motion.div>

      <AnimatePresence>
        {isGalleryOpen && (
          <ProjectGallery 
            screenshots={project.screenshots || []} 
            onClose={() => setIsGalleryOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};