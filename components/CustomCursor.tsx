import React, { useState, useEffect, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [isHide, setIsHide] = useState(false);

  const followerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect touch / no-hover devices
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);

    if (mediaQuery.matches) return; // 🚀 Stop everything if touch device

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;

      if (target.closest(".expand-cursor")) {
        setIsExpand(true);
        setIsHide(false);
      } else if (target.closest(".hide-cursor")) {
        setIsHide(true);
        setIsExpand(false);
      } else {
        setIsHide(false);
        setIsExpand(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!followerRef.current) return;

      current.current.x += (mouse.current.x - current.current.x) * 0.15;
      current.current.y += (mouse.current.y - current.current.y) * 0.15;

      const dx = mouse.current.x - current.current.x;
      const dy = mouse.current.y - current.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const scaleX = Math.min(1 + distance * 0.01, 1.5);
      const scaleY = Math.max(1 - distance * 0.005, 0.7);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      followerRef.current.style.transform = `
        translate3d(${current.current.x}px, ${current.current.y}px, 0)
        rotate(${angle}deg)
        scale(${scaleX}, ${scaleY})
      `;

      requestAnimationFrame(animate);
    };

    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 🚫 Don't render at all on touch devices
  if (isTouchDevice) return null;

  return (
    <div
      ref={followerRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference -ml-2 -mt-2 will-change-transform"
    >
      <div
        className="actual-cursor w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out"
        style={{ scale: isExpand ? 10 : isHide ? 0 : 1 }}
      />
    </div>
  );
};
