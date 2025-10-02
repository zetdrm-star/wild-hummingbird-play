import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  CheckCircle2, 
  Circle, 
  XCircle, 
  AlertCircle, 
  Calendar, 
  Trophy, 
  MessageCircle,
  BarChart3,
  Video,
  Heart,
  Zap,
  Sparkles,
  Play,
  Eye,
  RotateCcw,
  Clock,
  Star,
  Target,
  TrendingUp,
  Award,
  Activity,
  ChevronLeft,
  ChevronRight,
  X,
  Minimize2,
  Maximize2,
  User,
  Dumbbell,
  Crosshair,
  ChevronDown,
  ChevronUp,
  LogOut,
  Stethoscope
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockWeeklyPlan, mockProgressData, mockRewards } from '@/data/mockData';
import { WeeklyExercise } from '@/types';
import { showSuccess } from '@/utils/toast';
import MiloChat from './MiloChat';
import TherapistChat from './TherapistChat';
import CommunityForum from './CommunityForum';
import ExercisePreviewModal from './ExercisePreviewModal';
import ExerciseExecutionModal from './ExerciseExecutionModal';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('exercises');
  const [selectedExerciseForPreview, setSelectedExerciseForPreview] = useState<WeeklyExercise | null>(null);
  const [selectedExerciseForExecution, setSelectedExerciseForExecution] = useState<WeeklyExercise | null>(null);
  const [exercises, setExercises] = useState(mockWeeklyPlan.exercises);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0)); // January 2024
  const [isMiloChatOpen, setIsMiloChatOpen] = useState(false);
  const [isMiloChatMinimized, setIsMiloChatMinimized] = useState(false);
  const [isTherapistChatOpen, setIsTherapistChatOpen] = useState(false);
  const [selectedRewardTheme, setSelectedRewardTheme] = useState<'flowers' | 'cars' | 'dinosaurs'>('flowers');
  const [isBodyRegionOpen, setIsBodyRegionOpen] = useState(false);

  // Extended mock rewards data for different themes
  const allRewards = {
    flowers: [
      { id: 'f1', name: 'Sunflower', theme: 'flowers', type: 'flower', unlocked: true, unlockedDate: '2024-01-15', requiredExercises: 1 },
      { id: 'f2', name: 'Rose', theme: 'flowers', type: 'flower', unlocked: false, requiredExercises: 2 },
      { id: 'f3', name: 'Tulip', theme: 'flowers', type: 'flower', unlocked: false, requiredExercises: 3 },
      { id: 'f4', name: 'Daisy', theme: 'flowers', type: 'flower', unlocked: false, requiredExercises: 4 },
      { id: 'f5', name: 'Lily', theme: 'flowers', type: 'flower', unlocked: false, requiredExercises: 5 },
      { id: 'f6', name: 'Orchid', theme: 'flowers', type: 'flower', unlocked: false, requiredExercises: 6 }
    ],
    cars: [
      { id: 'c1', name: 'Red Racer', theme: 'cars', type: 'car', unlocked: true, unlockedDate: '2024-01-15', requiredExercises: 1 },
      { id: 'c2', name: 'Blue Speedster', theme: 'cars', type: 'car', unlocked: false, requiredExercises: 2 },
      { id: 'c3', name: 'Yellow Thunder', theme: 'cars', type: 'car', unlocked: false, requiredExercises: 3 },
      { id: 'c4', name: 'Green Machine', theme: 'cars', type: 'car', unlocked: false, requiredExercises: 4 },
      { id: 'c5', name: 'Purple Lightning', theme: 'cars', type: 'car', unlocked: false, requiredExercises: 5 },
      { id: 'c6', name: 'Silver Bullet', theme: 'cars', type: 'car', unlocked: false, requiredExercises: 6 }
    ],
    dinosaurs: [
      { id: 'd1', name: 'T-Rex', theme: 'dinosaurs', type: 'dinosaur', unlocked: true, unlockedDate: '2024-01-15', requiredExercises: 1 },
      { id: 'd2', name: 'Triceratops', theme: 'dinosaurs', type: 'dinosaur', unlocked: false, requiredExercises: 2 },
      { id: 'd3', name: 'Stegosaurus', theme: 'dinosaurs', type: 'dinosaur', unlocked: false, requiredExercises: 3 },
      { id: 'd4', name: 'Brontosaurus', theme: 'dinosaurs', type: 'dinosaur', unlocked: false, requiredExercises: 4 },
      { id: 'd5', name: 'Velociraptor', theme: 'dinosaurs', type: 'dinosaur', unlocked: false, requiredExercises: 5 },
      { id: 'd6', name: 'Pterodactyl', theme: 'dinosaurs', type: 'dinosaur', unlocked: false, requiredExercises: 6 }
    ]
  };

  const getThemeEmoji = (theme: string, unlocked: boolean) => {
    if (!unlocked) return '🌱';
    
    switch (theme) {
      case 'flowers': return '🌸';
      case 'cars': return '🚗';
      case 'dinosaurs': return '🦕';
      default: return '🌸';
    }
  };

  const getThemeTitle = (theme: string) => {
    switch (theme) {
      case 'flowers': return `🌸 ${user?.childrenProfiles?.[0]?.name}'s Flower Garden`;
      case 'cars': return `🚗 ${user?.childrenProfiles?.[0]?.name}'s Car Collection`;
      case 'dinosaurs': return `🦕 ${user?.childrenProfiles?.[0]?.name}'s Dinosaur Park`;
      default: return `🌸 ${user?.childrenProfiles?.[0]?.name}'s Collection`;
    }
  };

  const getThemeDescription = (theme: string) => {
    switch (theme) {
      case 'flowers': return 'Finish exercises to grow your beautiful garden!';
      case 'cars': return 'Complete exercises to unlock amazing cars!';
      case 'dinosaurs': return 'Do exercises to discover prehistoric friends!';
      default: return 'Complete exercises to unlock rewards!';
    }
  };

  const getNextRewardMessage = (theme: string) => {
    switch (theme) {
      case 'flowers': return 'Finish 2 more exercises to unlock your Tulip! 🌷';
      case 'cars': return 'Complete 2 more exercises to get your Blue Speedster! 🏎️';
      case 'dinosaurs': return 'Do 2 more exercises to meet your Triceratops! 🦴';
      default: return 'Keep going to unlock your next reward!';
    }
  };

  // Mock data for different months with enhanced exercise types and body regions
  const getMonthData = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const currentDate = new Date();
    const isCurrentMonth = month === currentDate.getMonth() && year === currentDate.getFullYear();
    const isPastMonth = date < currentDate;
    const isFutureMonth = date > currentDate;

    if (month === 11 && year === 2023) { // December 2023
      return {
        highlights: [
          "• Started therapy journey - completed initial assessments! 🎯",
          "• Established daily exercise routine with great family support 👨‍👩‍👧",
          "• First balance exercises completed successfully 🌟",
          "• Built foundation for upcoming motor skill development 💪"
        ],
        stats: { completed: 12, total: 15, percentage: 80, goalsAchieved: 1 },
        exerciseTypes: mockProgressData.exerciseTypeProgress.map(et => ({ 
          ...et, 
          completionRate: et.completionRate - 15,
          exercisesCompleted: Math.max(0, et.exercisesCompleted - 3),
          target: et.completionRate - 10,
          description: `Building foundation in ${et.type.toLowerCase()}`
        })),
        bodyRegions: mockProgressData.bodyRegionProgress.map(br => ({ 
          ...br, 
          completionRate: br.completionRate - 20,
          exercisesCompleted: Math.max(0, br.exercisesCompleted - 4)
        }))
      };
    } else if (month === 0 && year === 2024) { // January 2024 (current)
      return {
        highlights: [
          "• Exceeded gross motor goals by 5% - amazing strength gains! 💪",
          "• Balance exercises showing consistent improvement trend 📈",
          "• Fine motor skills progressing well, focus on pincer grasp next week",
          "• Great consistency with daily exercises this month! 🌟"
        ],
        stats: { completed: 55, total: 66, percentage: 83, goalsAchieved: 3 },
        exerciseTypes: mockProgressData.exerciseTypeProgress.map(et => ({
          ...et,
          target: et.completionRate + 5,
          description: `Strengthening ${et.type.toLowerCase()} skills`
        })),
        bodyRegions: mockProgressData.bodyRegionProgress
      };
    } else if (month === 1 && year === 2024) { // February 2024 (future)
      return {
        highlights: [
          "• Goals for February are being finalized by your therapist 📋",
          "• Focus will likely be on advanced balance and coordination 🎯",
          "• New fine motor challenges planned based on January progress 🔧",
          "• Therapist will update objectives after reviewing current progress 👩‍⚕️"
        ],
        stats: { completed: 0, total: 0, percentage: 0, goalsAchieved: 0 },
        exerciseTypes: [
          { type: 'Advanced Balance & Coordination', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 90, description: 'Advanced balance challenges - to be defined by therapist' },
          { type: 'Complex Fine Motor Tasks', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 85, description: 'Complex finger tasks - awaiting therapist planning' },
          { type: 'Progressive Strengthening', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 88, description: 'Strength building - objectives being finalized' },
          { type: 'Dynamic Functional Movements', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 92, description: 'Advanced movement patterns - under review' }
        ],
        bodyRegions: [
          { region: 'Arms/Upper limbs', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0 },
          { region: 'Legs/Lower limbs', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0 },
          { region: 'Core/Trunk', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0 },
          { region: 'Full-body coordination', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0 }
        ]
      };
    } else {
      // Default future month
      return {
        highlights: [
          "• Monthly objectives are being planned by your therapist 📅",
          "• Goals will be set based on previous month's progress 📊",
          "• New challenges and exercises are being prepared 🎯",
          "• Check back soon for updated therapy plans! ⏰"
        ],
        stats: { completed: 0, total: 0, percentage: 0, goalsAchieved: 0 },
        exerciseTypes: [
          { type: 'To Be Planned', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 0, description: 'Objectives to be defined by therapist' },
          { type: 'Under Review', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 0, description: 'Goals being planned based on progress' },
          { type: 'Being Designed', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 0, description: 'Awaiting therapist assessment' },
          { type: 'Coming Soon', completionRate: 0, exercisesCompleted: 0, exercisesTotal: 0, target: 0, description: 'Future objectives under development' }
        ],
        bodyRegions: []
      };
    }
  };

  const currentMonthData = getMonthData(currentMonth);

  const handleStartExercise = (exerciseId: string) => {
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      setSelectedExerciseForPreview(null);
      setSelectedExerciseForExecution(exercise);
    }
  };

  const handleCompleteExercise = (exerciseId: string, completedReps: number, notes: string, videoFile?: File) => {
    setExercises(prev => prev.map(ex => 
      ex.id === exerciseId 
        ? { 
            ...ex, 
            status: completedReps >= ex.targetRepetitions ? 'done' : 'in-progress',
            completedReps,
            parentNotes: notes,
            completedDate: new Date().toISOString().split('T')[0],
            uploadedVideoUrl: videoFile ? `uploaded-${Date.now()}.mp4` : undefined,
            aiAnalysis: videoFile ? 'AI analysis: Good form demonstrated, consistent movement pattern observed.' : undefined
          }
        : ex
    ));
    
    if (completedReps >= exercises.find(ex => ex.id === exerciseId)?.targetRepetitions!) {
      showSuccess('🎉 Exercise done! Great job!');
      setTimeout(() => showSuccess(`${getThemeEmoji(selectedRewardTheme, true)} New ${selectedRewardTheme.slice(0, -1)} unlocked!`), 1000);
    } else {
      showSuccess(`Progress saved! ${completedReps} reps done.`);
    }
    
    setSelectedExerciseForExecution(null);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

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

  const getExerciseTypeColor = (exerciseType: string) => {
    switch (exerciseType) {
      case 'Balance & Coordination':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Fine Motor/Hand Control':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'Functional Movements':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Core Stability/Posture':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'Stretching/Flexibility':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Strengthening/Resistance':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Aerobic/Endurance':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getBodyRegionColor = (bodyRegion: string) => {
    switch (bodyRegion) {
      case 'Arms/Upper limbs':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Legs/Lower limbs':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Core/Trunk':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Full-body coordination':
        return 'bg-violet-100 text-violet-700 border-violet-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const completedExercises = exercises.filter(ex => ex.status === 'done').length;
  const totalExercises = exercises.length;
  const remainingReps = exercises.reduce((total, ex) => {
    return total + Math.max(0, ex.targetRepetitions - (ex.completedReps || 0));
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hi Sarah! 👋</h1>
                <p className="text-sm text-gray-600">Let's help {user?.childrenProfiles?.[0]?.name} grow stronger today</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTherapistChatOpen(true)}
                className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 rounded-lg text-xs px-3 py-1"
              >
                <Stethoscope className="w-3 h-3 mr-1" />
                Ana
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="bg-white/90 backdrop-blur-sm rounded-lg border-gray-200 hover:bg-gray-50 text-xs px-3 py-1"
              >
                <LogOut className="w-3 h-3 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
            <TabsTrigger value="exercises" className="rounded-xl data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              This Week
            </TabsTrigger>
            <TabsTrigger value="progress" className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="rewards" className="rounded-xl data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Trophy className="w-4 h-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="community" className="rounded-xl data-[state=active]:bg-teal-500 data-[state=active]:text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
          </TabsList>

          {/* Weekly Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            {/* Header with Week Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-900">This Week's Adventures</h2>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  Week of Jan 15
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">{remainingReps} reps remaining</span>
              </div>
            </div>

            {/* Exercise Cards */}
            <div className="space-y-4">
              {exercises.map((weeklyExercise, index) => (
                <Card key={weeklyExercise.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      {/* Left side - Exercise info */}
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Number/Status indicator */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                          weeklyExercise.status === 'done' 
                            ? 'bg-green-500' 
                            : weeklyExercise.status === 'in-progress'
                            ? 'bg-blue-500'
                            : 'bg-blue-400'
                        }`}>
                          {weeklyExercise.status === 'done' ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-bold text-gray-900 text-lg">{weeklyExercise.exercise.name}</h3>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{weeklyExercise.exercise.description}</p>

                          <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <RotateCcw className="w-4 h-4" />
                              <span>{weeklyExercise.completedReps || 0}/{weeklyExercise.targetRepetitions} reps</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{weeklyExercise.exercise.estimatedDuration} min</span>
                            </div>
                            <Badge variant="outline" className={getDifficultyColor(weeklyExercise.exercise.difficulty)}>
                              {weeklyExercise.exercise.difficulty}
                            </Badge>
                          </div>

                          <div className="flex items-center flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className={getExerciseTypeColor(weeklyExercise.exercise.exerciseType)}>
                              <Dumbbell className="w-3 h-3 mr-1" />
                              {weeklyExercise.exercise.exerciseType}
                            </Badge>
                            <Badge variant="outline" className={getBodyRegionColor(weeklyExercise.exercise.bodyRegion)}>
                              <User className="w-3 h-3 mr-1" />
                              {weeklyExercise.exercise.bodyRegion}
                            </Badge>
                          </div>

                          {weeklyExercise.parentNotes && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <p className="text-sm text-blue-800">
                                📝 {weeklyExercise.parentNotes}
                              </p>
                            </div>
                          )}

                          {weeklyExercise.aiAnalysis && (
                            <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                              <p className="text-sm text-purple-800">
                                🤖 AI Analysis: {weeklyExercise.aiAnalysis}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right side - Action buttons */}
                      <div className="flex flex-col space-y-2 ml-4">
                        {weeklyExercise.status === 'done' ? (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 px-4 py-2">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Complete
                          </Badge>
                        ) : (
                          <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6"
                            onClick={() => handleStartExercise(weeklyExercise.id)}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedExerciseForPreview(weeklyExercise)}
                          className="rounded-xl border-gray-200 hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Enhanced Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {/* Header with Month Navigation */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Progress Overview</h2>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousMonth}
                  className="rounded-full w-8 h-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
                  {formatMonth(currentMonth)}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextMonth}
                  className="rounded-full w-8 h-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* This Month's Highlights - Dynamic Content */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">This Month's Highlights</h3>
                    <ul className="space-y-1 text-purple-800">
                      {currentMonthData.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Stats - Dynamic Data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{currentMonthData.stats.completed}</div>
                  <div className="text-sm text-green-700">Exercises Done</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentMonthData.stats.total > 0 ? currentMonthData.stats.percentage : 0}%
                  </div>
                  <div className="text-sm text-blue-700">Overall Progress</div>
                </CardContent>
              </Card>
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentMonthData.stats.goalsAchieved}</div>
                  <div className="text-sm text-purple-700">Goals Achieved</div>
                </CardContent>
              </Card>
            </div>

            {/* Exercise Type Progress - Replacing Monthly Goals */}
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Dumbbell className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-900">Exercise Type Progress</span>
                </CardTitle>
                <CardDescription>
                  {currentMonth.getTime() > new Date().getTime() 
                    ? `Planned exercise types for ${user?.childrenProfiles?.[0]?.name} - awaiting therapist finalization`
                    : `Progress across different types of therapy exercises for ${user?.childrenProfiles?.[0]?.name}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentMonthData.exerciseTypes.map((exerciseType) => (
                  <div key={exerciseType.type} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">{exerciseType.type}</span>
                          {exerciseType.completionRate > 0 && exerciseType.completionRate >= (exerciseType.target || 0) && (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                              <Award className="w-3 h-3 mr-1" />
                              Target Achieved!
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{exerciseType.description}</p>
                        {exerciseType.exercisesTotal > 0 && (
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{exerciseType.exercisesCompleted}/{exerciseType.exercisesTotal} exercises</span>
                            <span>•</span>
                            <span>{exerciseType.completionRate}% of {exerciseType.target || 0}% target</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-gray-900">
                          {exerciseType.exercisesTotal > 0 ? `${exerciseType.completionRate}%` : 'TBD'}
                        </div>
                        {exerciseType.target && exerciseType.target > 0 && (
                          <div className="text-xs text-gray-500">Target: {exerciseType.target}%</div>
                        )}
                      </div>
                    </div>
                    {exerciseType.target && exerciseType.target > 0 && (
                      <div className="relative">
                        <Progress value={exerciseType.completionRate} className="h-3" />
                        <div 
                          className="absolute top-0 h-3 w-0.5 bg-blue-400 rounded-full"
                          style={{ left: `${exerciseType.target}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Body Region Insights - Collapsible Section */}
                {currentMonthData.bodyRegions.length > 0 && (
                  <Collapsible open={isBodyRegionOpen} onOpenChange={setIsBodyRegionOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-teal-500" />
                          <span className="font-medium text-gray-900">Body Region Insights</span>
                          <Badge variant="secondary" className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
                            Detailed View
                          </Badge>
                        </div>
                        {isBodyRegionOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 mt-4">
                      <div className="pl-6 border-l-2 border-teal-100">
                        <p className="text-sm text-gray-600 mb-4">
                          See which parts of {user?.childrenProfiles?.[0]?.name}'s body are being strengthened through therapy exercises.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentMonthData.bodyRegions.map((region) => (
                            <div key={region.region} className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-teal-900 text-sm">{region.region}</span>
                                <span className="text-sm font-semibold text-teal-700">
                                  {region.exercisesTotal > 0 ? `${region.completionRate}%` : 'TBD'}
                                </span>
                              </div>
                              {region.exercisesTotal > 0 ? (
                                <>
                                  <Progress value={region.completionRate} className="h-2 mb-2" />
                                  <div className="text-xs text-teal-600">
                                    {region.exercisesCompleted} of {region.exercisesTotal} exercises completed
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="h-2 bg-teal-200 rounded mb-2"></div>
                                  <div className="text-xs text-teal-500">
                                    Awaiting therapist planning
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customizable Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">{getThemeTitle(selectedRewardTheme)}</CardTitle>
                    <CardDescription>
                      {getThemeDescription(selectedRewardTheme)}
                    </CardDescription>
                  </div>
                  
                  <Select value={selectedRewardTheme} onValueChange={(value: 'flowers' | 'cars' | 'dinosaurs') => setSelectedRewardTheme(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flowers">🌸 Flowers</SelectItem>
                      <SelectItem value="cars">🚗 Cars</SelectItem>
                      <SelectItem value="dinosaurs">🦕 Dinosaurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {allRewards[selectedRewardTheme].map((reward) => (
                    <div
                      key={reward.id}
                      className={`p-4 rounded-xl text-center transition-all duration-200 ${
                        reward.unlocked 
                          ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200' 
                          : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                      }`}
                    >
                      <div className="text-4xl mb-2">
                        {getThemeEmoji(selectedRewardTheme, reward.unlocked)}
                      </div>
                      <div className="font-medium text-gray-900">{reward.name}</div>
                      {reward.unlocked ? (
                        <div className="text-xs text-green-600 mt-1">Unlocked! ✨</div>
                      ) : (
                        <div className="text-xs text-gray-500 mt-1">
                          {reward.requiredExercises} exercises needed
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Next Reward</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    {getNextRewardMessage(selectedRewardTheme)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <CommunityForum />
          </TabsContent>
        </Tabs>
      </div>

      {/* Therapist Chat Modal - Simplified Structure */}
      {isTherapistChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900">Chat with Ana</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsTherapistChatOpen(false)}
                className="w-8 h-8 p-0 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <TherapistChat />
            </div>
          </div>
        </div>
      )}

      {/* Floating Milo Chat */}
      {!isMiloChatMinimized && (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
          isMiloChatOpen ? 'w-96 h-[500px]' : 'w-auto h-auto'
        }`}>
          {isMiloChatOpen ? (
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Milo</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMiloChatMinimized(true)}
                    className="w-6  h-6 p-0 hover:bg-gray-100"
                  >
                    <Minimize2 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMiloChatOpen(false)}
                    className="w-6 h-6 p-0 hover:bg-gray-100"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <MiloChat />
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsMiloChatOpen(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Chat with Milo
            </Button>
          )}
        </div>
      )}

      {/* Minimized Milo Chat */}
      {isMiloChatMinimized && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => {
              setIsMiloChatMinimized(false);
              setIsMiloChatOpen(true);
            }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12 p-0"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Modals */}
      <ExercisePreviewModal
        exercise={selectedExerciseForPreview}
        isOpen={!!selectedExerciseForPreview}
        onClose={() => setSelectedExerciseForPreview(null)}
        onStartExercise={handleStartExercise}
      />

      <ExerciseExecutionModal
        exercise={selectedExerciseForExecution}
        isOpen={!!selectedExerciseForExecution}
        onClose={() => setSelectedExerciseForExecution(null)}
        onComplete={handleCompleteExercise}
      />
    </div>
  );
};

export default ParentDashboard;