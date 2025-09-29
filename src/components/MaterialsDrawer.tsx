import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, PenTool, HelpCircle, ExternalLink, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { LearningMaterial } from '../types';

interface MaterialsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  materials: LearningMaterial[];
  lessonTitle: string;
}

const materialIcons = {
  reading: BookOpen,
  exercise: PenTool,
  quiz: HelpCircle,
  reference: ExternalLink
};

const materialColors = {
  reading: 'bg-blue-500/10 text-blue-600 border-blue-200',
  exercise: 'bg-green-500/10 text-green-600 border-green-200',
  quiz: 'bg-purple-500/10 text-purple-600 border-purple-200',
  reference: 'bg-orange-500/10 text-orange-600 border-orange-200'
};

export function MaterialsDrawer({ isOpen, onClose, materials, lessonTitle }: MaterialsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <h2 className="font-medium">Materiales adicionales</h2>
                  <p className="text-sm text-muted-foreground">{lessonTitle}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {materials.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No hay materiales adicionales para esta lección.</p>
                    </div>
                  ) : (
                    materials.map((material) => {
                      const Icon = materialIcons[material.type];
                      return (
                        <motion.div
                          key={material.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="group cursor-pointer"
                        >
                          <div className="p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${materialColors[material.type]}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium group-hover:text-primary transition-colors">
                                    {material.title}
                                  </h4>
                                  <Badge variant="outline" className="ml-2 shrink-0">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {material.estimatedTime}min
                                  </Badge>
                                </div>
                                
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                  {material.content}
                                </p>
                                
                                <div className="flex items-center space-x-2">
                                  <Badge variant="secondary" className="capitalize">
                                    {material.type === 'reading' ? 'Lectura' :
                                     material.type === 'exercise' ? 'Ejercicio' :
                                     material.type === 'quiz' ? 'Quiz' : 'Referencia'}
                                  </Badge>
                                  
                                  {material.url && (
                                    <Badge variant="outline">
                                      <ExternalLink className="w-3 h-3 mr-1" />
                                      Enlace externo
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>

                {materials.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">
                        Tiempo estimado total: {materials.reduce((total, material) => total + material.estimatedTime, 0)} minutos
                      </p>
                      
                      <Button className="w-full">
                        Comenzar materiales adicionales
                      </Button>
                    </div>
                  </>
                )}
              </ScrollArea>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}