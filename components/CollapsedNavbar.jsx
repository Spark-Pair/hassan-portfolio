import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';

export const CollapsedNavbar = ({ onNavigate, onToggleShowReel }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const sections = [
    { path: '/', label: 'HOME' },
    { path: '/projects', label: 'WORK' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const onDownload = () => {
    const link = document.createElement("a");
    link.href = `/file/${PERSONAL_INFO.resumeFileName}`;
    link.download = `${PERSONAL_INFO.firstName}-Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const menuVariants = {
    initial: { clipPath: "circle(0% at 0% 100%)" },
    animate: { 
      clipPath: "circle(150% at 0% 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: { 
      clipPath: "circle(0% at 0% 100%)",
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <>
      {/* 1. The Expanding Toggle Button */}
      <div className="fixed bottom-10 left-10 z-[60] md:hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          initial={false}
          animate={isOpen ? "active" : "idle"}
          whileTap={{ scale: 0.96 }}
          className="relative flex items-center justify-start gap-4 group cursor-pointer bg-black/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl h-[56px] overflow-hidden min-w-[7rem]"
        >
          <motion.div 
            variants={{
              idle: { width: "42px", height: "42px", backgroundColor: "rgba(255, 255, 255, 0.1)", left: "6px" },
              active: { 
                width: "100%", height: "100%", left: 0,
                backgroundColor: "rgba(255, 255, 255, 1)",
                transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
              }
            }}
            className="absolute rounded-full z-0 flex items-center justify-center"
          >
            <div className="relative w-4 h-4 flex items-center justify-center">
               <motion.i 
                variants={{ idle: { opacity: 1, scale: 1, color: "#71717a" }, active: { opacity: 0, scale: 0, color: "#000000" } }}
                className="fa-solid fa-bars absolute text-[14px]"
              />
              <motion.i 
                variants={{ idle: { opacity: 0, scale: 0, color: "#71717a" }, active: { opacity: 1, scale: 1.2, color: "#000000" } }}
                className="fa-solid fa-xmark absolute text-[16px]"
              />
            </div>
          </motion.div>

          <motion.span 
            variants={{
              idle: { opacity: 1, x: 55 },
              active: { opacity: 0, x: 20, transition: { duration: 0.3 } }
            }}
            className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500 whitespace-nowrap pr-6"
          >
            Menu
          </motion.span>
        </motion.button>
      </div>

      {/* 2. Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[50] bg-zinc-950 flex flex-col justify-center px-10 md:px-24"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '60px 60px' }} />

            {/* Main Links */}
            <div className="flex flex-col gap-2">
              {sections.map((sec, i) => (
                <div key={sec.path} className="overflow-hidden">
                  <motion.button
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.4 + i * 0.1 } }}
                    exit={{ y: 40, opacity: 0, transition: { delay: i * 0.05 } }}
                    onClick={() => { setIsOpen(false); onNavigate(sec.path); }}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="text-zinc-600 font-mono text-[10px] group-hover:text-white transition-colors">0{i + 1}</span>
                    <h2 className="text-white text-5xl font-condensed uppercase tracking-tighter group-hover:translate-x-3 transition-transform duration-500">
                      {sec.label}
                    </h2>
                  </motion.button>
                </div>
              ))}
            </div>

            {/* Utility Actions (Showreel, Resume, SparkPair) */}
            <div className="mt-12 pt-12 border-t border-white/5 flex flex-col gap-6">
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-mono"
              >
                Quick Actions
              </motion.p>
              
              <div className="flex flex-col gap-5">
                {[
                  { label: "Launch Showreel", icon: "fa-play", action: () => { setIsOpen(false); onToggleShowReel(); } },
                  { label: "Download Resume", icon: "fa-download", action: onDownload },
                  { label: "Sparkpair.dev", icon: "fa-bolt", action: () => window.open("https://sparkpair.dev", "_blank") },
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    onClick={item.action}
                    className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group text-left"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                      <i className={`fa-solid ${item.icon} text-[10px]`}></i>
                    </div>
                    <span className="text-[11px] font-black tracking-[0.2em] uppercase">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile Footer */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="absolute bottom-10 left-10 text-zinc-700 font-mono text-[8px] tracking-[0.3em] uppercase"
            >
              24.86° N, 67.00° E // Karachi
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};