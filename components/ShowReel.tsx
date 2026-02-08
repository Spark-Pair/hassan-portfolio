import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShowReel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-pause video if modal closes via ESC or background click
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-3xl"
          onClick={onClose}
        >
          {/* Close Button - Now Top Right of Screen */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-10 right-10 w-14 h-14 hide-cursor flex group items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:text-black transition-all duration-500 text-white"
          >
            <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            {/* <i className="fa-solid fa-bolt text-lg relative z-10 group-hover:text-black"></i> */}
            <i className="fa-solid fa-xmark text-xl relative z-10 group-hover:text-black transition duration-500 group-hover:rotate-180"></i>
          </button>

          {/* Main Viewport */}
          <motion.div 
            initial={{ y: 80, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.95, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 250,
              mass: 0.8
            }}
            whileTap={{ scale: 0.98 }}
            onClick={togglePlay}
            className="relative w-[90vw] max-w-[1200px] aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-[0_60px_120px_rgba(0,0,0,1)] border border-white/5 group cursor-pointer expand-cursor"
          >
            <video 
              ref={videoRef}
              autoPlay 
              loop
              playsInline
              className="w-full h-full object-cover"
              src="https://66d826c261a09e6dd86411f9--voluble-concha-c3ad1a.netlify.app/mtc-showreel.mp4" 
            />

            {/* Play Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
                >
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                    <i className="fa-solid fa-play text-white text-3xl translate-x-1"></i>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Progress Bar at bottom of video */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5">
              <motion.div 
                className="h-full bg-white/20 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Bottom Hint */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 text-center text-[10px] font-black tracking-[0.5em] uppercase text-white pointer-events-none"
          >
            Click video to {isPlaying ? 'pause' : 'resume'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};