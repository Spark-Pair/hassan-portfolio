import React, { useState, useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [ isExpand, setIsExpand ] = useState(false);
  const [ isHide, setIsHide ] = useState(false);

  const followerRef = useRef<HTMLDivElement>(null);
  
  // Target = actual mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Current = position of the follower (interpolated)
  const current = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target;

      if (target.closest('.expand-cursor')) {
        setIsExpand(true);
        setIsHide(false);
      } else if (target.closest('.hide-cursor')) {
        setIsHide(true);
        setIsExpand(false);
      } else {
        setIsHide(false);
        setIsExpand(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!followerRef.current) return;

      // 1. LERP (Linear Interpolation) 
      // 0.15 creates a "liquid" lag. Increase for faster follow, decrease for more lag.
      current.current.x += (mouse.current.x - current.current.x) * 0.15;
      current.current.y += (mouse.current.y - current.current.y) * 0.15;

      // 2. Calculate Distance/Velocity
      const dx = mouse.current.x - current.current.x;
      const dy = mouse.current.y - current.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 3. Stretch Math
      // Limit the stretch so it doesn't become a thin line (max 1.5)
      const scaleX = Math.min(1 + distance * 0.01, 1.5);
      const scaleY = Math.max(1 - distance * 0.005, 0.7);
      
      // Calculate angle of movement to rotate the stretch
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // 4. Apply Styles
      // We use translate3d for GPU acceleration
      followerRef.current.style.transform = `
        translate3d(${current.current.x}px, ${current.current.y}px, 0) 
        rotate(${angle}deg) 
        scale(${scaleX}, ${scaleY})
      `;

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference -ml-2 -mt-2 will-change-transform"
    >
      <div className="actual-cursor w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out" style={{scale: isExpand ? 10 : isHide ? 0 : 1}}></div>
    </div>
  );
};