import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const MagneticButton = ({ children, onClick, className = "" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={`relative group px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Liquid Fill Background */}
      <div className="absolute inset-0 top-[100%] group-hover:top-0 bg-white transition-all duration-500 ease-[0.76,0,0.24,1] rounded-full" />
      
      {/* Content Label */}
      <div className="relative flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white group-hover:text-black transition-colors duration-300">
        {children}
      </div>
    </motion.button>
  );
};