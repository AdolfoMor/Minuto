import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, BookOpen, Share2, Heart, MoreVertical } from 'lucide-react';
import { MicroLesson } from '../types';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoPlayerProps {
  lesson: MicroLesson;
  isActive: boolean;
  onComplete: () => void;
  onShowMaterials: () => void;
}

export function VideoPlayer({ lesson, isActive, onComplete, onShowMaterials }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive && videoRef.current) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Video Background - Using image as placeholder */}
      <div className="relative w-full h-full">
        <ImageWithFallback 
          src={lesson.videoUrl}
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
        
        {/* Play/Pause Overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="lg"
            variant="ghost"
            className="w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </Button>
        </motion.div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
        {/* Like Button */}
        <Button
          size="lg"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        
        {/* Share Button */}
        <Button
          size="lg"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <Share2 className="w-6 h-6" />
        </Button>

        {/* Materials Button */}
        <Button
          size="lg"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={onShowMaterials}
        >
          <BookOpen className="w-6 h-6" />
        </Button>

        {/* More Options */}
        <Button
          size="lg"
          variant="ghost"
          className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <MoreVertical className="w-6 h-6" />
        </Button>
      </div>

      {/* Left Side Controls */}
      <div className="absolute left-4 bottom-20 flex flex-col items-start space-y-2">
        {/* Mute Button */}
        <Button
          size="sm"
          variant="ghost"
          className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
        
        {/* Time Display */}
        <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
          {formatTime(lesson.duration)}
        </div>
      </div>

      {/* Lesson Info Overlay */}
      <div className="absolute bottom-4 left-4 right-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg mb-1">{lesson.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2">{lesson.description}</p>
          
          {/* Module Badge */}
          <div className="mt-2">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              Módulo {lesson.moduleId.split('-')[1]}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}