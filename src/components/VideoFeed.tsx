import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoPlayer } from './VideoPlayer';
import { MaterialsDrawer } from './MaterialsDrawer';
import { MicroLesson } from '../types';

interface VideoFeedProps {
  lessons: MicroLesson[];
  onLessonComplete: (lessonId: string) => void;
}

export function VideoFeed({ lessons, onLessonComplete }: VideoFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMaterials, setShowMaterials] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLesson = lessons[currentIndex];

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance > 50;
    const isUpSwipe = distance < -50;

    if (isDownSwipe && currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    
    if (isUpSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < lessons.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, lessons.length]);

  // Handle wheel events for desktop
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (e.deltaY > 0 && currentIndex < lessons.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [currentIndex, lessons.length]);

  const handleLessonComplete = () => {
    onLessonComplete(currentLesson.id);
    
    // Auto-advance to next lesson
    if (currentIndex < lessons.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1000);
    }
  };

  const handleShowMaterials = () => {
    setShowMaterials(true);
  };

  if (!currentLesson) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">¡Felicidades!</h2>
          <p>Has completado todas las lecciones disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute inset-0"
        >
          <VideoPlayer
            lesson={currentLesson}
            isActive={true}
            onComplete={handleLessonComplete}
            onShowMaterials={handleShowMaterials}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-4 right-4 z-30">
        <div className="flex space-x-1">
          {lessons.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : index < currentIndex 
                    ? 'bg-white/60' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lesson Counter */}
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-black/50 text-white text-sm px-3 py-1 rounded-full">
          {currentIndex + 1} / {lessons.length}
        </div>
      </div>

      {/* Navigation Hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="text-white/60 text-xs text-center">
          <div className="hidden md:block">
            ↑↓ Navegar • Espacio para pausar
          </div>
          <div className="md:hidden">
            Desliza arriba/abajo para navegar
          </div>
        </div>
      </div>

      {/* Materials Drawer */}
      <MaterialsDrawer
        isOpen={showMaterials}
        onClose={() => setShowMaterials(false)}
        materials={currentLesson.materials}
        lessonTitle={currentLesson.title}
      />
    </div>
  );
}