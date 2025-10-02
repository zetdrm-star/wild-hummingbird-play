import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, 
  Plus, 
  Minus, 
  RotateCcw, 
  Camera, 
  Music, 
  CheckCircle,
  Upload,
  Heart
} from 'lucide-react';
import { WeeklyExercise } from '@/types';
import { showSuccess, showError } from '@/utils/toast';

interface ExerciseExecutionModalProps {
  exercise: WeeklyExercise | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (exerciseId: string, completedReps: number, notes: string, videoFile?: File) => void;
}

const ExerciseExecutionModal: React.FC<ExerciseExecutionModalProps> = ({
  exercise,
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentReps, setCurrentReps] = useState(0);
  const [parentNotes, setParentNotes] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);

  if (!exercise) return null;

  const handleRepComplete = () => {
    if (currentReps < exercise.targetRepetitions) {
      setCurrentReps(prev => prev + 1);
      showSuccess('Great job! 🎉');
    }
  };

  const handleUndo = () => {
    if (currentReps > 0) {
      setCurrentReps(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentReps(0);
    showSuccess('Counter reset!');
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        showError('Video file too large. Please choose a file under 50MB.');
        return;
      }
      setUploadedVideo(file);
      showSuccess('Video selected! It will be analyzed by AI when you finish.');
    }
  };

  const handleFinish = () => {
    onComplete(exercise.id, currentReps, parentNotes, uploadedVideo || undefined);
    setCurrentReps(0);
    setParentNotes('');
    setUploadedVideo(null);
    onClose();
  };

  const handleSkip = () => {
    onClose();
    showSuccess('Exercise skipped. You can try again later!');
  };

  const progressPercentage = (currentReps / exercise.targetRepetitions) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{exercise.exercise.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Instructions */}
          <div className="space-y-6">
            {/* How to Play */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                How to Play
              </h3>
              <div className="space-y-3">
                {exercise.exercise.howToPlay?.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips for Parents */}
            {exercise.exercise.parentTips && (
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
                <h4 className="font-medium text-pink-900 mb-3 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Tips for Parents
                </h4>
                <div className="space-y-2">
                  {exercise.exercise.parentTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-pink-800 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reward Motivation */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">🌸</span>
                <span className="font-medium text-green-800">Finish all {exercise.targetRepetitions} reps to earn a flower!</span>
              </div>
              <p className="text-green-700 text-sm">Take your time - quality over speed!</p>
            </div>
          </div>

          {/* Right Column - Progress & Actions */}
          <div className="space-y-6">
            {/* Progress Circle */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - progressPercentage / 100)}`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{currentReps} / {exercise.targetRepetitions}</span>
                  <span className="text-sm text-gray-600">reps</span>
                </div>
              </div>
            </div>

            {/* Rep Controls */}
            <div className="space-y-3">
              <Button
                onClick={handleRepComplete}
                disabled={currentReps >= exercise.targetRepetitions}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Done!
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleUndo}
                  disabled={currentReps === 0}
                  className="rounded-xl"
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Undo
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">
                      {uploadedVideo ? 'Video Selected ✓' : 'Upload Video/Photo'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <Upload className="w-4 h-4 text-gray-400" />
                </label>
                
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-lg"
                  onClick={() => showSuccess('🎵 Playing motivational music!')}
                >
                  <Music className="w-5 h-5 mr-3 text-gray-600" />
                  Play Music
                </Button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <Textarea
                value={parentNotes}
                onChange={(e) => setParentNotes(e.target.value)}
                placeholder="How did it go? Any observations..."
                rows={3}
                className="rounded-xl"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="rounded-xl"
              >
                Skip
              </Button>
              <Button
                onClick={handleFinish}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Finish
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseExecutionModal;