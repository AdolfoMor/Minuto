export interface MicroLesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number; // in seconds
  moduleId: string;
  order: number;
  completed: boolean;
  materials: LearningMaterial[];
}

export interface LearningMaterial {
  id: string;
  type: 'reading' | 'exercise' | 'quiz' | 'reference';
  title: string;
  content: string;
  url?: string;
  estimatedTime: number; // in minutes
}

export interface Module {
  id: string;
  title: string;
  description: string;
  specializationId: string;
  microLessons: MicroLesson[];
  progress: number; // 0-100
  estimatedHours: number;
}

export interface Specialization {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  modules: Module[];
  totalLessons: number;
  completedLessons: number;
}

export interface UserProgress {
  currentLesson: string;
  currentSpecialization: string;
  completedLessons: string[];
  streakDays: number;
  totalMinutesWatched: number;
}