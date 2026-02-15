import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/buttons/MagneticButton';

// 1. Define Overlay Variants for the background slide
const overlayVariants = {
  initial: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  animate: { 
    clipPath: "inset(0% 0% 0% 0%)", 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
  },
  exit: { 
    clipPath: "inset(100% 0% 0% 0%)", 
    opacity: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
  }
};

export const ProjectGallery = ({ screenshots, onClose }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" && index < screenshots.length - 1) setIndex(index + 1);
      if (e.key === "ArrowLeft" && index > 0) setIndex(index - 1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, screenshots.length, onClose]);

  const onDragEnd = (e, { offset }) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold && index < screenshots.length - 1) {
      setIndex(index + 1);
    } else if (offset.x > swipeThreshold && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[200] bg-zinc-950/95 backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top Navigation - Staggered Fade In */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full p-4 md:p-12 flex justify-between items-center z-50"
      >
        <div className="flex flex-col gap-1">
          <span className="text-white/30 font-mono text-[9px] tracking-[0.5em] uppercase">Viewing Asset</span>
          <div className="flex items-baseline gap-3">
            <span className="text-white font-condensed text-3xl tracking-tighter">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-white/20 font-light text-xl">/</span>
            <span className="text-white/20 font-condensed text-xl">{String(screenshots.length).padStart(2, '0')}</span>
          </div>
        </div>
        
        <MagneticButton onClick={onClose}>
            <span>Close Gallery</span>
            <div className="flex gap-1">
                <i className="fa-solid fa-xmark text-sm"></i>
            </div>
        </MagneticButton>
      </motion.div>

      {/* Main Viewport */}
      <div className="relative w-full grow flex items-center justify-center cursor-grab active:cursor-grabbing">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          animate={{ x: `calc(${-index * 100}% - ${index * 80}px)` }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
          className="flex gap-20 items-center w-[90vw] md:w-[80vw] h-full pb-20"
        >
          {screenshots.map((img, idx) => (
            <motion.div
              key={idx}
              className="shrink-0 w-full h-full flex flex-col items-center justify-center"
              animate={{ 
                scale: index === idx ? 1 : 0.85,
                opacity: index === idx ? 1 : 0.2,
                filter: index === idx ? "blur(0px)" : "blur(10px)"
              }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="relative max-w-full max-h-[80vh] object-contain expand-cursor">
                <AnimatePresence mode="wait">
                  {index === idx && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-8 md:-top-12 text-white text-lg md:text-4xl font-condensed uppercase tracking-[0.2em] text-center w-full"
                    >
                      {img.title}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: index === idx ? 1 : 0.85, opacity: index === idx ? 1 : 0.2 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  src={img.url}
                  alt={img.title}
                  className="rounded-xl md:rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] h-full"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer - Staggered Fade In */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-12 flex flex-col items-center gap-6"
      >
        <div className="flex gap-1.5 bobg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-full">
          {/* relative flex items-center justify-start gap-4 group cursor-pointer bg-black/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl h-[56px] overflow-hidden min-w-[7rem] */}
          {screenshots.map((_, i) => (
            <motion.div 
              key={i}
              onClick={() => setIndex(i)}
              animate={{ 
                width: i === index ? 24 : 6,
                backgroundColor: i === index ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.1)" 
              }}
              className="h-1.5 rounded-full cursor-pointer transition-colors"
            />
          ))}
        </div>
        <p className="text-white/20 font-mono text-[9px] tracking-[0.6em] uppercase animate-pulse">Drag to explore</p>
      </motion.div>
    </motion.div>
  );
};