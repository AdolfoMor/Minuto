// src/components/ProfileView.tsx
import React from "react";
import { UserProgress, Specialization } from "../types";
import { Button } from "./ui/button";

interface ProfileViewProps {
  user: any;
  userProgress: UserProgress;
  specializations: Specialization[];
  handleLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  userProgress,
  specializations,
  handleLogout,
}) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Sección de bienvenida y logout */}
      <div className="p-6 border rounded-lg">
        <h3 className="font-medium mb-4">Bienvenido, {user.email}</h3>
        <Button variant="destructive" onClick={handleLogout}>
            Cerrar sesión
        </Button>
        <div>
          <h4 className="font-medium mt-4 mb-2">Actualizar Información</h4>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Nuevo email"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Nuevo teléfono"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="w-full p-2 border rounded mb-2"
          />
          <button>Actualizar datos</button>
        </div>
      </div>

      {/* Estadísticas de aprendizaje */}
      <div className="p-6 border rounded-lg">
        <h3 className="font-medium mb-4">Estadísticas de aprendizaje</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-medium text-primary">
              {userProgress.completedLessons.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Lecciones completadas
            </div>
          </div>
          <div>
            <div className="text-2xl font-medium text-green-600">
              {userProgress.streakDays}
            </div>
            <div className="text-sm text-muted-foreground">Días de racha</div>
          </div>
          <div>
            <div className="text-2xl font-medium text-orange-600">
              {userProgress.totalMinutesWatched}
            </div>
            <div className="text-sm text-muted-foreground">
              Minutos aprendidos
            </div>
          </div>
          <div>
            <div className="text-2xl font-medium text-purple-600">
              {specializations.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Especializaciones
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
