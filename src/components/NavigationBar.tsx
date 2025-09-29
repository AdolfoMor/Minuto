import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, Home, User, Search, Library, X } from 'lucide-react';
import { Button } from './ui/button';
import { SpecializationSelector } from './SpecializationSelector';
import { Specialization } from '../types';

interface NavigationBarProps {
  specializations: Specialization[];
  currentSpecialization: string;
  onSelectSpecialization: (id: string) => void;
  onNavigate: (view: 'feed' | 'search' | 'library' | 'profile') => void;
  currentView: string;
}

export function NavigationBar({ 
  specializations, 
  currentSpecialization, 
  onSelectSpecialization,
  onNavigate,
  currentView
}: NavigationBarProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  const navigationItems = [
    { id: 'feed', label: 'Inicio', icon: Home },
    { id: 'search', label: 'Buscar', icon: Search },
    { id: 'library', label: 'Biblioteca', icon: Library },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-40">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center space-y-1 h-auto py-2 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => onNavigate(item.id as any)}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
          
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2 text-muted-foreground"
            onClick={() => setShowSidebar(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">Más</span>
          </Button>
        </div>
      </div>

      {/* Desktop Top Navigation */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-40">
        <div className="flex items-center justify-between w-full px-6 py-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-medium">Sabiduría</h1>
            
            <nav className="flex items-center space-x-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => onNavigate(item.id as any)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </nav>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSidebar(true)}
          >
            <Menu className="w-4 h-4 mr-2" />
            Especializaciones
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowSidebar(false)}
          />
          
          {/* Sidebar Content */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-full max-w-sm bg-background border-r shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium">Especializaciones</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <SpecializationSelector
              specializations={specializations}
              currentSpecialization={currentSpecialization}
              onSelectSpecialization={(id) => {
                onSelectSpecialization(id);
                setShowSidebar(false);
              }}
            />
          </motion.div>
        </>
      )}
    </>
  );
}