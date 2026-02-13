import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { AboutSection } from './sections/About';
import { ContactSection } from './sections/Contact';
import { ProjectsSection } from './sections/Projects';
import { SplashScreen } from './components/SplashScreen';
import { CustomCursor } from './components/CustomCursor';
import { ShowReel } from './components/ShowReel';

export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [animationStage, setAnimationStage] = useState<'idle' | 'exit' | 'prep'>('prep');

  const [isShowReelOpen, setIsShowReelOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // The logic for our transition "orchestrator"
  const handleNavigation = (path: string) => {
    if (location.pathname === path || animationStage !== 'idle') return;

    // Phase 1: Exit current page
    setAnimationStage('exit');

    setTimeout(() => {
      // Phase 2: Change the actual route and prep the next page
      navigate(path);
      setAnimationStage('prep');

      requestAnimationFrame(() => {
        setTimeout(() => {
          setAnimationStage('idle');
        }, 50);
      });
    }, 600); 
  };

  const getAnimationClass = () => {
    if (animationStage === 'exit') return 'page-exit';
    if (animationStage === 'prep') return 'page-enter-prep';
    return ''; // idle (at center)
  };

  return (
    <div className="relative w-full bg-black text-white">
      {!isAppLoaded && <SplashScreen onComplete={() => {
        setIsAppLoaded(true);
        setTimeout(() => setAnimationStage('idle'), 100);
      }} />}

      <main className={`w-full relative transition-opacity duration-700 ${isAppLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`w-full page-container ${getAnimationClass()}`}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Hero />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </div>
      </main>

      {isAppLoaded && (
        <>
          <Navbar 
            currentPath={location.pathname} 
            onNavigate={handleNavigation}
            onToggleShowReel={() => setIsShowReelOpen(true)}
          />

          <ShowReel 
            isOpen={isShowReelOpen} 
            onClose={() => setIsShowReelOpen(false)} 
          />

          <CustomCursor />
        </>
      )}
    </div>
  );
}