import { useState, useEffect } from "react";
import { VideoFeed } from "./components/VideoFeed";
import { NavigationBar } from "./components/NavigationBar";
import {
  mockMicroLessons,
  mockSpecializations,
  mockUserProgress,
} from "./data/mockData";
import { MicroLesson, Specialization, UserProgress } from "./types";
import { supabase } from "./supabaseClient";
import AuthPage from "./pages/Auth/AuthPage";
import { ProfileView } from "./components/ProfileView";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "feed" | "search" | "library" | "profile"
  >("feed");
  const [currentSpecialization, setCurrentSpecialization] = useState(
    mockUserProgress.currentSpecialization
  );
  const [userProgress, setUserProgress] =
    useState<UserProgress>(mockUserProgress);
  const [lessons] = useState<MicroLesson[]>(mockMicroLessons);
  const [specializations] = useState<Specialization[]>(mockSpecializations);

  // Estado de autenticación
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Obtener sesión inicial y escuchar cambios
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Funciones de auth
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return alert(error.message);
    setUser(data.user);
    setEmail("");
    setPassword("");
  };

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    setUser(data.user);
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Filtrar lecciones según la especialización
  const currentLessons = lessons.filter((lesson) => true);

  const handleLessonComplete = (lessonId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      completedLessons: [
        ...prev.completedLessons.filter((id) => id !== lessonId),
        lessonId,
      ],
      totalMinutesWatched: prev.totalMinutesWatched + 1,
    }));
  };

  const handleSelectSpecialization = (specializationId: string) => {
    setCurrentSpecialization(specializationId);
    setUserProgress((prev) => ({
      ...prev,
      currentSpecialization: specializationId,
    }));
  };

  const renderMainContent = () => {
    switch (currentView) {
      case "feed":
        return (
          <VideoFeed
            lessons={currentLessons}
            onLessonComplete={handleLessonComplete}
          />
        );

      case "search":
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0 px-4 min-h-screen bg-background">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl mb-6">Buscar contenido</h2>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Funcionalidad de búsqueda próximamente
                </p>
              </div>
            </div>
          </div>
        );

      case "library":
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
                        style={{
                          backgroundColor: `${spec.color}20`,
                          color: spec.color,
                        }}
                      >
                        {spec.icon}
                      </div>
                      <h3 className="font-medium">{spec.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {spec.description}
                    </p>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Progreso: </span>
                      <span>
                        {spec.completedLessons}/{spec.totalLessons} lecciones
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="pt-16 md:pt-20 pb-16 md:pb-0 px-4 min-h-screen bg-background">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl mb-6">Mi perfil</h2>

              {!user ? (
                <AuthPage />
              ) : (
                <ProfileView
                  user={user}
                  userProgress={userProgress}
                  specializations={specializations}
                  handleLogout={handleLogout}
                />
              )}
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
