import { useState, useEffect } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { NavigationBar } from './components/NavigationBar';
import { mockMicroLessons, mockSpecializations, mockUserProgress } from './data/mockData';
import { MicroLesson, Specialization, UserProgress } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'feed' | 'search' | 'library' | 'profile'>('feed');
  const [currentSpecialization, setCurrentSpecialization] = useState(mockUserProgress.currentSpecialization);
  const [userProgress, setUserProgress] = useState<UserProgress>(mockUserProgress);
  const [lessons] = useState<MicroLesson[]>(mockMicroLessons);
  const [specializations] = useState<Specialization[]>(mockSpecializations);

  // Filter lessons based on current specialization
  const currentLessons = lessons.filter(lesson => {
    // For demo purposes, we'll show all lessons
    // In a real app, you'd filter by specialization
    return true;
  });

  const handleLessonComplete = (lessonId: string) => {
    setUserProgress(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons.filter(id => id !== lessonId), lessonId],
      totalMinutesWatched: prev.totalMinutesWatched + 1
    }));
  };

  const handleSelectSpecialization = (specializationId: string) => {
    setCurrentSpecialization(specializationId);
    setUserProgress(prev => ({
      ...prev,
      currentSpecialization: specializationId
    }));
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'feed':
        return (
          <VideoFeed
            lessons={currentLessons}
            onLessonComplete={handleLessonComplete}
          />
        );
      
      case 'search':
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0 px-4 min-h-screen bg-background">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl mb-6">Buscar contenido</h2>
              <div className="text-center py-12">
                <p className="text-muted-foreground">Funcionalidad de búsqueda próximamente</p>
              </div>
            </div>
          </div>
        );
      
      case 'library':
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0 px-4 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl mb-6">Mi biblioteca</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specializations.map((spec) => (
                  <div key={spec.id} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${spec.color}20`, color: spec.color }}
                      >
                        {spec.icon}
                      </div>
                      <h3 className="font-medium">{spec.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{spec.description}</p>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Progreso: </span>
                      <span>{spec.completedLessons}/{spec.totalLessons} lecciones</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0 px-4 min-h-screen bg-background">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl mb-6">Mi perfil</h2>
              
              <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                  <h3 className="font-medium mb-4">Estadísticas de aprendizaje</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-medium text-primary">{userProgress.completedLessons.length}</div>
                      <div className="text-sm text-muted-foreground">Lecciones completadas</div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium text-green-600">{userProgress.streakDays}</div>
                      <div className="text-sm text-muted-foreground">Días de racha</div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium text-orange-600">{userProgress.totalMinutesWatched}</div>
                      <div className="text-sm text-muted-foreground">Minutos aprendidos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-medium text-purple-600">{specializations.length}</div>
                      <div className="text-sm text-muted-foreground">Especializaciones</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="font-medium mb-4">Especialización actual</h3>
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const currentSpec = specializations.find(s => s.id === currentSpecialization);
                      return currentSpec ? (
                        <>
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${currentSpec.color}20`, color: currentSpec.color }}
                          >
                            {currentSpec.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{currentSpec.title}</h4>
                            <p className="text-sm text-muted-foreground">{currentSpec.description}</p>
                          </div>
                        </>
                      ) : (
                        <p className="text-muted-foreground">No hay especialización seleccionada</p>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="size-full bg-background">
      {renderMainContent()}
      
      <NavigationBar
        specializations={specializations}
        currentSpecialization={currentSpecialization}
        onSelectSpecialization={handleSelectSpecialization}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
    </div>
  );
}