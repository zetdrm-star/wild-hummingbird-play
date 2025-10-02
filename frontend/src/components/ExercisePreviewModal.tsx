import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw } from 'lucide-react';
import { WeeklyExercise } from '@/types';

interface ExercisePreviewModalProps {
  exercise: WeeklyExercise | null;
  isOpen: boolean;
  onClose: () => void;
  onStartExercise: (exerciseId: string) => void;
}

const ExercisePreviewModal: React.FC<ExercisePreviewModalProps> = ({
  exercise,
  isOpen,
  onClose,
  onStartExercise
}) => {
  if (!exercise) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{exercise.exercise.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Preview */}
          <div className="relative bg-blue-50 rounded-xl p-8 text-center border border-blue-100">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <p className="text-blue-700 font-medium">Video Preview</p>
          </div>

          {/* Exercise Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className={getDifficultyColor(exercise.exercise.difficulty)}>
                {exercise.exercise.difficulty}
              </Badge>
              <div className="flex items-center space-x-1 text-gray-600">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">{exercise.targetRepetitions} reps</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700">{exercise.exercise.description}</p>

          {/* Instructions */}
          {exercise.exercise.howToPlay && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Instructions:</h3>
              <div className="space-y-2">
                {exercise.exercise.howToPlay.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Therapist Notes */}
          {exercise.notes && (
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-900 mb-2">Therapist Notes:</h4>
              <p className="text-purple-800 text-sm">{exercise.notes}</p>
            </div>
          )}

          {/* Start Button */}
          <Button
            onClick={() => onStartExercise(exercise.id)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg font-medium"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExercisePreviewModal;