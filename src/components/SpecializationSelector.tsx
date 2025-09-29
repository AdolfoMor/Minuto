import { motion } from 'motion/react';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { Specialization } from '../types';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface SpecializationSelectorProps {
  specializations: Specialization[];
  currentSpecialization: string;
  onSelectSpecialization: (id: string) => void;
}

export function SpecializationSelector({ 
  specializations, 
  currentSpecialization, 
  onSelectSpecialization 
}: SpecializationSelectorProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <GraduationCap className="w-6 h-6 text-primary" />
        <h2 className="text-xl">Especializaciones</h2>
      </div>

      <div className="grid gap-4">
        {specializations.map((spec, index) => {
          const progress = (spec.completedLessons / spec.totalLessons) * 100;
          const isActive = spec.id === currentSpecialization;
          
          return (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => onSelectSpecialization(spec.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                          style={{ backgroundColor: `${spec.color}20`, color: spec.color }}
                        >
                          {spec.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{spec.title}</h3>
                          <p className="text-sm text-muted-foreground">{spec.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progreso</span>
                          <span>{spec.completedLessons}/{spec.totalLessons} lecciones</span>
                        </div>
                        
                        <Progress value={progress} className="h-2" />
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={progress > 0 ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {progress === 0 ? 'No iniciado' :
                             progress < 50 ? 'En progreso' :
                             progress < 100 ? 'Avanzado' : 'Completado'}
                          </Badge>
                          
                          <span className="text-xs text-muted-foreground">
                            {Math.round(progress)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <ChevronRight 
                      className={`w-5 h-5 text-muted-foreground transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} 
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
          <CardContent className="p-4">
            <div className="text-center">
              <h4 className="font-medium mb-2">Tu progreso general</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-medium text-primary">
                    {specializations.reduce((total, spec) => total + spec.completedLessons, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Lecciones completadas</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-green-600">7</div>
                  <div className="text-xs text-muted-foreground">Días de racha</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-orange-600">342</div>
                  <div className="text-xs text-muted-foreground">Minutos aprendidos</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}