export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'therapist' | 'community';
  createdDate: string;
  lastModifiedDate: string;
  childrenProfiles?: ChildProfile[];
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  therapyDomains: string[];
  currentTheme: 'flowers' | 'cars' | 'dinosaurs';
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string;
  therapyDomain: 'mobility' | 'balance' | 'fine-motor' | 'gross-motor' | 'cognitive';
  exerciseType: 'Stretching/Flexibility' | 'Strengthening/Resistance' | 'Core Stability/Posture' | 'Balance & Coordination' | 'Fine Motor/Hand Control' | 'Aerobic/Endurance' | 'Functional Movements';
  bodyRegion: 'Arms/Upper limbs' | 'Legs/Lower limbs' | 'Core/Trunk' | 'Full-body coordination';
  estimatedDuration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  howToPlay?: string[];
  parentTips?: string[];
  videoUrl?: string;
}

export interface WeeklyPlan {
  id: string;
  childId: string;
  weekStartDate: string;
  exercises: WeeklyExercise[];
  therapistId: string;
  status: 'active' | 'completed' | 'archived';
}

export interface WeeklyExercise {
  id: string;
  exercise: Exercise;
  targetRepetitions: number;
  notes: string;
  status: 'pending' | 'done' | 'skipped' | 'struggled' | 'in-progress';
  completedDate?: string;
  parentNotes?: string;
  videoUrl?: string;
  completedReps?: number;
  uploadedVideoUrl?: string;
  aiAnalysis?: string;
}

export interface ProgressData {
  childId: string;
  month: string;
  therapyDomainProgress: {
    domain: string;
    completionRate: number;
    improvementTrend: 'up' | 'down' | 'stable';
  }[];
  exerciseTypeProgress: {
    type: string;
    completionRate: number;
    exercisesCompleted: number;
    exercisesTotal: number;
  }[];
  bodyRegionProgress: {
    region: string;
    completionRate: number;
    exercisesCompleted: number;
    exercisesTotal: number;
  }[];
  totalExercisesCompleted: number;
  totalExercisesAssigned: number;
}

export interface Reward {
  id: string;
  name: string;
  theme: 'flowers' | 'cars' | 'dinosaurs';
  type: string;
  unlocked: boolean;
  unlockedDate?: string;
  requiredExercises: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdDate: string;
  replies: CommunityReply[];
  likes: number;
  tags: string[];
}

export interface CommunityReply {
  id: string;
  content: string;
  author: string;
  createdDate: string;
  likes: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'milo';
  timestamp: string;
  type: 'text' | 'exercise-feedback' | 'progress-review' | 'motivation';
}

export interface TherapistAnalytics {
  familyId: string;
  familyName: string;
  childName: string;
  completionRate: number;
  strugglingExercises: string[];
  progressTrend: 'improving' | 'stable' | 'declining';
  lastActivity: string;
  aiRecommendations: string[];
}