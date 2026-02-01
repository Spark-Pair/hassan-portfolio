import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  // Store previous Y positions to create smooth velocity-based movement
  const pointsRef = useRef<{ y: number; vy: number }[][]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    const threadCount = 6;
    const segmentCount = 40; // More segments = smoother curves

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize points with physics properties
      pointsRef.current = Array.from({ length: threadCount }, () =>
        Array.from({ length: segmentCount + 1 }, () => ({
          y: canvas.height / 2,
          vy: 0
        }))
      );
    };

    const draw = () => {
      // cinematic fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const widthStep = canvas.width / segmentCount;

      for (let j = 0; j < threadCount; j++) {
        ctx.beginPath();
        
        // Studio Look: Variable stroke and slight color drift
        ctx.lineWidth = j === 0 ? 1.5 : 0.8;
        const opacity = 0.08 + (j * 0.04);
        
        // Add a very subtle "Chromatic" hint (Indigo for some threads, White for others)
        ctx.strokeStyle = j % 2 === 0 
          ? `rgba(255, 255, 255, ${opacity})` 
          : `rgba(165, 180, 252, ${opacity * 0.8})`;

        const points = pointsRef.current[j];

        for (let i = 0; i <= segmentCount; i++) {
          const x = i * widthStep;
          const p = points[i];

          // 1. Target calculation (Natural Wave)
          const targetY = canvas.height / 2 + 
            Math.sin(i * 0.15 + time + (j * 1.2)) * (60 + j * 20) * Math.cos(time * 0.5 + i * 0.05);

          // 2. Physics: Spring towards target
          const ay = (targetY - p.y) * 0.02; // Spring stiffness
          p.vy += ay;
          
          // 3. Mouse Interaction (The "Magnetic Distortion")
          if (mouse.current.active) {
            const dx = x - mouse.current.x;
            const dy = p.y - mouse.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 350;

            if (dist < maxDist) {
              const push = (maxDist - dist) / maxDist;
              // Add "Turbulence" near mouse
              p.vy += (mouse.current.y - p.y) * push * 0.08;
            }
          }

          p.vy *= 0.92; // Friction/Damping
          p.y += p.vy;

          // Drawing Logic
          if (i === 0) {
            ctx.moveTo(x, p.y);
          } else {
            const prevX = (i - 1) * widthStep;
            const prevP = points[i - 1];
            // Smooth curve between points
            const xc = (prevX + x) / 2;
            const yc = (prevP.y + p.y) / 2;
            ctx.quadraticCurveTo(prevX, prevP.y, xc, yc);
          }
        }
        ctx.stroke();
      }

      time += 0.008;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    init();
    draw();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};