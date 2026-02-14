import { motion } from 'framer-motion';

export const ExpandingButton = ({ label, icon, onclick={}, className = "", ...props }) => (
  <motion.div
    initial="initial"
    whileHover="hover"
    whileTap={{ scale: 0.96 }}
    onclick={onclick}
    className="relative gap-4 group cursor-pointer pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 p-[1.1em] pl-[1.4em] pr-[3.8em] rounded-full shadow-2xl overflow-hidden flex items-center hide-cursor"
    {...props}
  >
    <motion.div 
      variants={{
        initial: { width: "40px", height: "40px", backgroundColor: "rgba(255, 255, 255, 0.1)" },
        hover: { 
          width: "100%", 
          height: "100%",
          right: 0,
          backgroundColor: "rgba(255, 255, 255, 1)",
          transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
        }
      }}
      className="absolute right-[6px] rounded-full z-0 flex items-center justify-center"
    >
      <motion.i 
        variants={{
          initial: { color: "#71717a", scale: 1 }, // zinc-500
          hover: { color: "#000000", scale: 1.5 }
        }}
        className={`${icon} text-[10px] relative z-20`}
      />
    </motion.div>

    <motion.span 
      variants={{
        initial: { opacity: 1},
        hover: { 
          opacity: 0, 
          x: -60,
          transition: { duration: 0.3 } 
        }
      }}
      className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500 pointer-events-none"
    >
      {label}
    </motion.span>
  </motion.div>
);