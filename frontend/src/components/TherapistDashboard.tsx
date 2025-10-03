import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog.tsx';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Brain,
  Calendar,
  Video,
  FileText,
  AlertTriangle,
  CheckCircle,
  Heart,
  LogOut,
  Eye,
  Target,
  Activity,
  Clock,
  PlayCircle,
  Lightbulb,
  ArrowRight,
  X,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  Send,
  User,
  Dumbbell,
  Award,
  Edit,
  Check,
  AlertCircle,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockTherapistAnalytics } from '@/data/mockData';
import { TherapistAnalytics } from '@/types';
import { showSuccess, showError } from '@/utils/toast';
import MiloChat from './MiloChat';
import ParentChatModal from './ParentChatModal';

const TherapistDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedFamily, setSelectedFamily] = useState<TherapistAnalytics | null>(null);
  const [isVideoAnalysisOpen, setIsVideoAnalysisOpen] = useState(false);
  const [isBodyRegionOpen, setIsBodyRegionOpen] = useState(false);
  const [isExerciseTypeOpen, setIsExerciseTypeOpen] = useState(false);
  const [showAcceptConfirmation, setShowAcceptConfirmation] = useState(false);
  const [showModifyGoalsModal, setShowModifyGoalsModal] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [editedGoals, setEditedGoals] = useState<string[]>([]);
  const [editedNextMonthGoal, setEditedNextMonthGoal] = useState('');
  const [editedMicroAdjustments, setEditedMicroAdjustments] = useState<string[]>([]);
  
  // Milo Chat states
  const [isMiloChatOpen, setIsMiloChatOpen] = useState(false);
  const [isMiloChatMinimized, setIsMiloChatMinimized] = useState(false);
  
  // Parent Chat states
  const [isParentChatOpen, setIsParentChatOpen] = useState(false);

  // Function to determine status based on both completion rate and trend
  const getStatusFromData = (completionRate: number, progressTrend: string) => {
    // If completion rate is very low, always needs attention regardless of trend
    if (completionRate < 60) {
      return 'Needs Attention';
    }
    // If completion rate is moderate (60-79%), can only be stable or needs attention
    else if (completionRate < 80) {
      return progressTrend === 'declining' ? 'Needs Attention' : 'Stable';
    }
    // If completion rate is high (80%+), follow the trend
    else {
      return progressTrend === 'improving' ? 'Improving' : 
             progressTrend === 'declining' ? 'Stable' : 'Improving';
    }
  };

  // Enhanced mock data with comprehensive exercise types and body regions
  const enhancedFamilyData = mockTherapistAnalytics.map((family, index) => ({
    ...family,
    // Make the Chen family (index 2) have low completion rate to trigger "Needs Attention"
    completionRate: index === 2 ? 45 : family.completionRate,
    status: getStatusFromData(index === 2 ? 45 : family.completionRate, family.progressTrend),
    mainStruggles: family.strugglingExercises.length > 0 ? 
      family.strugglingExercises.slice(0, 2).map(exercise => {
        if (exercise.includes('Theraband') || exercise.includes('Resistance')) return 'Strengthening: upper body';
        if (exercise.includes('Balance')) return 'Balance: dynamic stability';
        if (exercise.includes('Fine Motor')) return 'Fine Motor: pincer grasp';
        if (exercise.includes('Core')) return 'Core: stability holds';
        return 'Motor Skills: coordination';
      }) : ['On track with all exercises'],
    videoCount: Math.floor(Math.random() * 8) + 2,
    weeklyGoals: [
      'Balance: 3x/week',
      'Fine Motor: daily practice',
      'Strengthening: 2x/week'
    ],
    monthlyProgress: {
      balance: 85,
      fineMotor: 72,
      grossMotor: 90,
      overall: index === 2 ? 45 : family.completionRate
    },
    // Comprehensive exercise types progress
    exerciseTypeProgress: [
      {
        type: 'Balance & Coordination',
        completionRate: 88,
        exercisesCompleted: 15,
        exercisesTotal: 17,
        target: 85,
        description: 'Dynamic balance and coordination skills'
      },
      {
        type: 'Fine Motor/Hand Control',
        completionRate: 72,
        exercisesCompleted: 13,
        exercisesTotal: 18,
        target: 80,
        description: 'Precision grip and finger dexterity'
      },
      {
        type: 'Functional Movements',
        completionRate: 80,
        exercisesCompleted: 12,
        exercisesTotal: 15,
        target: 75,
        description: 'Daily living movement patterns'
      },
      {
        type: 'Core Stability/Posture',
        completionRate: 85,
        exercisesCompleted: 11,
        exercisesTotal: 13,
        target: 82,
        description: 'Trunk strength and postural control'
      },
      {
        type: 'Stretching/Flexibility',
        completionRate: 90,
        exercisesCompleted: 9,
        exercisesTotal: 10,
        target: 85,
        description: 'Range of motion and flexibility'
      },
      {
        type: 'Strengthening/Resistance',
        completionRate: 75,
        exercisesCompleted: 9,
        exercisesTotal: 12,
        target: 78,
        description: 'Muscle strength and endurance'
      },
      {
        type: 'Aerobic/Endurance',
        completionRate: 68,
        exercisesCompleted: 7,
        exercisesTotal: 10,
        target: 70,
        description: 'Cardiovascular fitness and stamina'
      }
    ],
    // Body regions progress
    bodyRegionProgress: [
      {
        region: 'Arms/Upper limbs',
        completionRate: 78,
        exercisesCompleted: 14,
        exercisesTotal: 18
      },
      {
        region: 'Legs/Lower limbs',
        completionRate: 85,
        exercisesCompleted: 17,
        exercisesTotal: 20
      },
      {
        region: 'Core/Trunk',
        completionRate: 82,
        exercisesCompleted: 9,
        exercisesTotal: 11
      },
      {
        region: 'Full-body coordination',
        completionRate: 88,
        exercisesCompleted: 15,
        exercisesTotal: 17
      }
    ],
    aiHighlight: family.progressTrend === 'improving' ? 
      'Balance improved significantly, fine motor skills progressing well — ready for advanced coordination challenges.' :
      family.progressTrend === 'declining' ?
      'Engagement dropping in fine motor tasks, balance stable — focus on shorter, more frequent sessions.' :
      'Steady progress across all domains, fine motor slightly below target — maintain current approach.',
    nextMonthRecommendation: family.progressTrend === 'improving' ?
      'Focus: Advanced bilateral coordination and dynamic balance challenges' :
      'Focus: Fine motor precision tasks with increased motivation strategies',
    microAdjustments: family.progressTrend === 'improving' ? [
      'Increase balance challenge duration by 2-3 seconds',
      'Introduce bilateral coordination tasks',
      'Add dynamic movement to fine motor exercises'
    ] : [
      'Reduce fine motor session length to 5-7 minutes',
      'Use more colorful/engaging objects for motivation',
      'Break strengthening into 2-minute intervals'
    ],
    planUpdated: false, // Track if plan was recently updated
    lastPushedDate: null // Track when plan was last pushed
  }));

  const familiesNeedingAttention = enhancedFamilyData.filter(f => f.status === 'Needs Attention').length;
  const totalFamilies = enhancedFamilyData.length;

  const handleAcceptAndPush = () => {
    setShowAcceptConfirmation(true);
  };

  const confirmAcceptAndPush = async () => {
    setIsAccepting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAccepting(false);
      setShowAcceptConfirmation(false);
      showSuccess(`✅ Plan successfully sent to ${selectedFamily?.familyName}! They'll receive a notification about their updated therapy goals.`);
      
      // Update family data after successful push
      if (selectedFamily) {
        const today = new Date().toISOString().split('T')[0];
        selectedFamily.lastActivity = today;
        selectedFamily.planUpdated = true;
        selectedFamily.lastPushedDate = today;
        
        // Clear micro-adjustments since they've been incorporated into the plan
        selectedFamily.microAdjustments = [];
        
        // If there were micro-adjustments, incorporate them into the weekly goals
        // This simulates the micro-adjustments being applied to create an updated plan
      }
    }, 2000);
  };

  const handleModifyGoals = () => {
    if (selectedFamily) {
      setEditedGoals([...selectedFamily.weeklyGoals || []]);
      setEditedNextMonthGoal(selectedFamily.nextMonthRecommendation || '');
      setEditedMicroAdjustments([...selectedFamily.microAdjustments || []]);
      setShowModifyGoalsModal(true);
    }
  };

  const handleSaveModifiedGoals = () => {
    if (selectedFamily) {
      // Update the selected family data
      selectedFamily.weeklyGoals = [...editedGoals];
      selectedFamily.nextMonthRecommendation = editedNextMonthGoal;
      selectedFamily.microAdjustments = [...editedMicroAdjustments];
      
      setShowModifyGoalsModal(false);
      showSuccess(`📝 Goals updated for ${selectedFamily.childName}! Changes have been saved to their therapy plan.`);
    }
  };

  const addNewGoal = () => {
    setEditedGoals([...editedGoals, '']);
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...editedGoals];
    newGoals[index] = value;
    setEditedGoals(newGoals);
  };

  const removeGoal = (index: number) => {
    const newGoals = editedGoals.filter((_, i) => i !== index);
    setEditedGoals(newGoals);
  };

  const addNewAdjustment = () => {
    setEditedMicroAdjustments([...editedMicroAdjustments, '']);
  };

  const updateAdjustment = (index: number, value: string) => {
    const newAdjustments = [...editedMicroAdjustments];
    newAdjustments[index] = value;
    setEditedMicroAdjustments(newAdjustments);
  };

  const removeAdjustment = (index: number) => {
    const newAdjustments = editedMicroAdjustments.filter((_, i) => i !== index);
    setEditedMicroAdjustments(newAdjustments);
  };

  // Fixed: Get status icon based on STATUS, not trend
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Improving':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'Needs Attention':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: // Stable
        return <Minus className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Improving':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Needs Attention':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-100 text-green-700 border-green-200';
    if (rate >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

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
                <h1 className="text-xl font-bold text-gray-900">Welcome back, {user?.name} 👩‍⚕️</h1>
                <p className="text-sm text-gray-600">Your therapy dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsParentChatOpen(true)}
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-xs px-3 py-1"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                Chat with Parents
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="bg-white/90 backdrop-blur-sm rounded-xl border-gray-200 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Top Overview - Actionable Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Families Tracked</p>
                    <p className="text-3xl font-bold text-blue-600">{totalFamilies}</p>
                    <p className="text-sm text-gray-500 mt-1">Active in your caseload</p>
                  </div>
                  <Users className="w-10 h-10 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Families Needing Attention</p>
                    <p className="text-3xl font-bold text-red-600">{familiesNeedingAttention}</p>
                    <p className="text-sm text-gray-500 mt-1">Flagged by AI analysis</p>
                  </div>
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Family List - Enhanced Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Families</h3>
            {enhancedFamilyData.map((family) => (
              <Card key={family.familyId} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg">{family.childName}</h3>
                        <Badge variant="outline" className={getStatusColor(family.status)}>
                          {getStatusIcon(family.status)}
                          {family.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Family</p>
                          <p className="font-medium text-gray-900">{family.familyName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Activity</p>
                          <p className="font-medium text-gray-900">{family.lastActivity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Completion Rate</p>
                          <p className={`font-bold text-lg ${getCompletionColor(family.completionRate)}`}>
                            {family.completionRate}%
                          </p>
                        </div>
                      </div>

                      {family.mainStruggles.length > 0 && family.mainStruggles[0] !== 'On track with all exercises' && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Main Struggles (AI-tagged):</p>
                          <div className="flex flex-wrap gap-2">
                            {family.mainStruggles.map((struggle, index) => (
                              <Badge key={index} variant="outline" className="text-orange-700 bg-orange-50 border-orange-200">
                                <Target className="w-3 h-3 mr-1" />
                                {struggle}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Video className="w-4 h-4" />
                          <span>{family.videoCount} videos uploaded</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Updated {family.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
                        onClick={() => setSelectedFamily(family)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Family Details Modal */}
      {selectedFamily && (
        <Dialog open={!!selectedFamily} onOpenChange={() => setSelectedFamily(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">{selectedFamily.childName} - Detailed View</DialogTitle>
                <Badge variant="outline" className={getStatusColor(selectedFamily.status)}>
                  {selectedFamily.status}
                </Badge>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* 1. Monthly Progress Overview (Top Priority) */}
              <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span>Monthly Progress Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Overall Progress - Large Number */}
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getCompletionColor(selectedFamily.completionRate)}`}>
                        {selectedFamily.completionRate}%
                      </div>
                      <p className="text-gray-600 mt-2">Overall Progress This Month</p>
                    </div>

                    {/* 3 Key Goals with Progress Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">Balance</span>
                          <span className="text-sm text-blue-600">{selectedFamily.monthlyProgress?.balance}%</span>
                        </div>
                        <Progress value={selectedFamily.monthlyProgress?.balance} className="h-3" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">Fine Motor</span>
                          <span className="text-sm text-purple-600">{selectedFamily.monthlyProgress?.fineMotor}%</span>
                        </div>
                        <Progress value={selectedFamily.monthlyProgress?.fineMotor} className="h-3" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">Gross Motor</span>
                          <span className="text-sm text-green-600">{selectedFamily.monthlyProgress?.grossMotor}%</span>
                        </div>
                        <Progress value={selectedFamily.monthlyProgress?.grossMotor} className="h-3" />
                      </div>
                    </div>

                    {/* Exercise Type Progress - Collapsible with Color Coding */}
                    <Collapsible open={isExerciseTypeOpen} onOpenChange={setIsExerciseTypeOpen}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                          <div className="flex items-center space-x-2">
                            <Dumbbell className="w-4 h-4 text-blue-500" />
                            <span className="font-medium text-gray-900">Exercise Type Progress</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                              Detailed Breakdown
                            </Badge>
                          </div>
                          {isExerciseTypeOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 mt-4">
                        <div className="pl-6 border-l-2 border-blue-100">
                          <div className="space-y-4">
                            {selectedFamily.exerciseTypeProgress?.map((exerciseType) => (
                              <div key={exerciseType.type} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-gray-900 text-sm">{exerciseType.type}</span>
                                      <Badge variant="outline" className={getProgressColor(exerciseType.completionRate)}>
                                        {exerciseType.completionRate}%
                                      </Badge>
                                      {exerciseType.completionRate >= exerciseType.target && (
                                        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                                          <Award className="w-3 h-3 mr-1" />
                                          Target Achieved!
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 mb-1">{exerciseType.description}</p>
                                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                                      <span>{exerciseType.exercisesCompleted}/{exerciseType.exercisesTotal} exercises</span>
                                      <span>•</span>
                                      <span>Target: {exerciseType.target}%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="relative">
                                  <Progress value={exerciseType.completionRate} className="h-2" />
                                  <div 
                                    className="absolute top-0 h-2 w-0.5 bg-blue-400 rounded-full"
                                    style={{ left: `${exerciseType.target}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Body Region Insights - Collapsible */}
                    <Collapsible open={isBodyRegionOpen} onOpenChange={setIsBodyRegionOpen}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
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
                            Progress breakdown by body regions being targeted in therapy.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedFamily.bodyRegionProgress?.map((region) => (
                              <div key={region.region} className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-teal-900 text-sm">{region.region}</span>
                                  <span className="text-sm font-semibold text-teal-700">{region.completionRate}%</span>
                                </div>
                                <Progress value={region.completionRate} className="h-2 mb-2" />
                                <div className="text-xs text-teal-600">
                                  {region.exercisesCompleted} of {region.exercisesTotal} exercises completed
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* AI Highlight - One Sentence */}
                    <div className="p-4 bg-blue-100 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">AI Highlight:</p>
                          <p className="text-sm text-blue-800">{selectedFamily.aiHighlight}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Current Weekly Plan + AI Recommendations (Action Section) */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span>Current Plan & AI Recommendations</span>
                    {selectedFamily.planUpdated && (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Updated
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Plan - Compact Checklist */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Current Weekly Plan:</h4>
                      {selectedFamily.weeklyGoals && selectedFamily.weeklyGoals.length > 0 ? (
                        <ul className="space-y-2">
                          {selectedFamily.weeklyGoals.map((goal, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No current goals set</p>
                      )}
                    </div>

                    {/* AI Recommendations - Inline - Only show if there are micro-adjustments */}
                    {selectedFamily.microAdjustments && selectedFamily.microAdjustments.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Micro-adjustments suggested:</h4>
                        <ul className="space-y-2">
                          {selectedFamily.microAdjustments.map((adjustment, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{adjustment}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Draft Next Month Goal */}
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start space-x-2 mb-3">
                      <ArrowRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-900">Draft Next Month Goal:</p>
                        <p className="text-sm text-green-800">{selectedFamily.nextMonthRecommendation}</p>
                      </div>
                    </div>
                    
                    {/* Action Buttons - Only show if plan hasn't been updated or there are micro-adjustments */}
                    {(!selectedFamily.planUpdated || (selectedFamily.microAdjustments && selectedFamily.microAdjustments.length > 0)) && (
                      <div className="flex space-x-3 mt-4">
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={handleAcceptAndPush}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Accept & Push to Parent
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-green-300 text-green-700 hover:bg-green-50"
                          onClick={handleModifyGoals}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Modify Goals
                        </Button>
                      </div>
                    )}

                    {/* Show status when plan has been updated */}
                    {selectedFamily.planUpdated && (!selectedFamily.microAdjustments || selectedFamily.microAdjustments.length === 0) && (
                      <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Plan updated and sent to family on {selectedFamily.lastPushedDate}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 3. Video Analysis (Collapsed by Default) */}
              <Card>
                <CardContent className="p-6">
                  <Collapsible open={isVideoAnalysisOpen} onOpenChange={setIsVideoAnalysisOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
                        <div className="flex items-center space-x-2">
                          <Video className="w-5 h-5 text-red-500" />
                          <span className="font-medium text-gray-900">
                            {selectedFamily.videoCount} videos uploaded this month
                          </span>
                          <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200">
                            Expand to View AI Analysis
                          </Badge>
                        </div>
                        {isVideoAnalysisOpen ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 mt-4">
                      <div className="pl-6 border-l-2 border-red-100">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-sm font-medium text-red-900 mb-2">AI Video Analysis Summary:</p>
                          <ul className="text-sm text-red-800 space-y-1">
                            <li>• Balance exercises: Improved stability, longer hold times visible</li>
                            <li>• Fine motor tasks: Pincer grasp still developing, recommend smaller objects</li>
                            <li>• Core exercises: Good form maintained in 4/5 recent clips</li>
                            <li>• Range of motion: Slight improvement in shoulder flexibility</li>
                          </ul>
                        </div>
                        
                        <div className="mt-4">
                          <Button variant="outline" size="sm" className="border-red-200 text-red-700 hover:bg-red-50">
                            <PlayCircle className="w-4 h-4 mr-2" />
                            View All Videos
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Accept & Push Confirmation Dialog */}
      <Dialog open={showAcceptConfirmation} onOpenChange={setShowAcceptConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Send className="w-5 h-5 text-green-600" />
              <span>Confirm Plan Update</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to send this updated therapy plan to {selectedFamily?.familyName}?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-900 mb-2">This will send:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Updated weekly goals</li>
                <li>• AI-recommended micro-adjustments</li>
                <li>• Next month's therapy focus</li>
                <li>• Push notification to parent app</li>
              </ul>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={confirmAcceptAndPush}
                disabled={isAccepting}
              >
                {isAccepting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Yes, Send Plan
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowAcceptConfirmation(false)}
                disabled={isAccepting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modify Goals Modal */}
      <Dialog open={showModifyGoalsModal} onOpenChange={setShowModifyGoalsModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5 text-blue-600" />
              <span>Modify Therapy Goals - {selectedFamily?.childName}</span>
            </DialogTitle>
            <DialogDescription>
              Edit the weekly goals, micro-adjustments, and next month's focus for this family.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Weekly Goals Section */}
            <div>
              <Label className="text-sm font-medium text-gray-900 mb-3 block">Weekly Goals</Label>
              <div className="space-y-2">
                {editedGoals.map((goal, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={goal}
                      onChange={(e) => updateGoal(index, e.target.value)}
                      placeholder="Enter weekly goal..."
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeGoal(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNewGoal}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  + Add Goal
                </Button>
              </div>
            </div>

            {/* Micro-adjustments Section */}
            <div>
              <Label className="text-sm font-medium text-gray-900 mb-3 block">Micro-adjustments</Label>
              <div className="space-y-2">
                {editedMicroAdjustments.map((adjustment, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={adjustment}
                      onChange={(e) => updateAdjustment(index, e.target.value)}
                      placeholder="Enter micro-adjustment..."
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeAdjustment(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNewAdjustment}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  + Add Adjustment
                </Button>
              </div>
            </div>

            {/* Next Month Goal Section */}
            <div>
              <Label htmlFor="nextMonthGoal" className="text-sm font-medium text-gray-900 mb-3 block">
                Next Month Focus
              </Label>
              <Textarea
                id="nextMonthGoal"
                value={editedNextMonthGoal}
                onChange={(e) => setEditedNextMonthGoal(e.target.value)}
                placeholder="Describe the focus for next month's therapy..."
                rows={3}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-100">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleSaveModifiedGoals}
              >
                <Check className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowModifyGoalsModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Parent Chat Modal */}
      <ParentChatModal 
        isOpen={isParentChatOpen}
        onClose={() => setIsParentChatOpen(false)}
        families={enhancedFamilyData}
      />

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
                    className="w-6 h-6 p-0 hover:bg-gray-100"
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
    </div>
  );
};

export default TherapistDashboard;