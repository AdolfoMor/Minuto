import { Specialization, MicroLesson, Module, UserProgress } from '../types';

export const mockMicroLessons: MicroLesson[] = [
  {
    id: 'lesson-1',
    title: 'La Alegoría de la Caverna',
    description: 'Platón explica su famosa alegoría sobre la realidad y el conocimiento',
    videoUrl: 'https://images.unsplash.com/photo-1714393674893-b89e436cc6c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGhpbG9zb3BoeSUyMGFydCUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTkxODE2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1714393674893-b89e436cc6c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcGhpbG9zb3BoeSUyMGFydCUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTkxODE2NzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: 55,
    moduleId: 'module-1',
    order: 1,
    completed: false,
    materials: [
      {
        id: 'material-1',
        type: 'reading',
        title: 'Texto completo: República, Libro VII',
        content: 'Lee el texto original de Platón sobre la Alegoría de la Caverna...',
        estimatedTime: 15
      },
      {
        id: 'material-2',
        type: 'exercise',
        title: 'Reflexión: Tu propia caverna',
        content: 'Escribe sobre una situación en tu vida donde hayas cambiado tu perspectiva...',
        estimatedTime: 10
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'El Renacimiento: Nuevas Formas de Ver',
    description: 'Cómo el arte renacentista revolucionó la perspectiva y el humanismo',
    videoUrl: 'https://images.unsplash.com/photo-1748075823969-0f3b0870912a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljYWwlMjBwYWludGluZyUyMHJlbmFpc3NhbmNlfGVufDF8fHx8MTc1OTE4MTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1748075823969-0f3b0870912a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljYWwlMjBwYWludGluZyUyMHJlbmFpc3NhbmNlfGVufDF8fHx8MTc1OTE4MTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: 48,
    moduleId: 'module-2',
    order: 1,
    completed: false,
    materials: [
      {
        id: 'material-3',
        type: 'reading',
        title: 'La técnica de la perspectiva lineal',
        content: 'Aprende sobre las innovaciones técnicas del Renacimiento...',
        estimatedTime: 12
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Arte Contemporáneo: Cuestionando Límites',
    description: 'Explora cómo el arte contemporáneo desafía nuestras percepciones',
    videoUrl: 'https://images.unsplash.com/photo-1605905898247-bb1fe36b587e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc1OTEwNjQ3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605905898247-bb1fe36b587e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc1OTEwNjQ3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: 52,
    moduleId: 'module-3',
    order: 1,
    completed: false,
    materials: [
      {
        id: 'material-4',
        type: 'quiz',
        title: 'Quiz: Movimientos artísticos contemporáneos',
        content: 'Pon a prueba tu conocimiento sobre arte moderno...',
        estimatedTime: 8
      }
    ]
  }
];

export const mockSpecializations: Specialization[] = [
  {
    id: 'spec-1',
    title: 'Filosofía Antigua',
    description: 'Explora el pensamiento de los grandes filósofos griegos y romanos',
    color: '#8B5CF6',
    icon: '🏛️',
    modules: [],
    totalLessons: 24,
    completedLessons: 3
  },
  {
    id: 'spec-2',
    title: 'Historia del Arte',
    description: 'Un viaje visual por las grandes obras y movimientos artísticos',
    color: '#F59E0B',
    icon: '🎨',
    modules: [],
    totalLessons: 32,
    completedLessons: 8
  },
  {
    id: 'spec-3',
    title: 'Arte Contemporáneo',
    description: 'Comprende las expresiones artísticas del siglo XXI',
    color: '#EF4444',
    icon: '����',
    modules: [],
    totalLessons: 18,
    completedLessons: 2
  },
  {
    id: 'spec-4',
    title: 'Filosofía Moderna',
    description: 'De Descartes a Nietzsche: el pensamiento que cambió el mundo',
    color: '#10B981',
    icon: '💭',
    modules: [],
    totalLessons: 28,
    completedLessons: 0
  }
];

export const mockUserProgress: UserProgress = {
  currentLesson: 'lesson-1',
  currentSpecialization: 'spec-1',
  completedLessons: ['lesson-2', 'lesson-5', 'lesson-8'],
  streakDays: 7,
  totalMinutesWatched: 342
};