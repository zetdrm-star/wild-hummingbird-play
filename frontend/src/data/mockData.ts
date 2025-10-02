import { Exercise, WeeklyPlan, WeeklyExercise, ProgressData, Reward, CommunityPost, TherapistAnalytics } from '@/types';

export const mockExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Superhero Standing Balance',
    description: 'Single-leg balance exercise with superhero poses',
    instructions: 'Stand on one foot like a superhero for 10 seconds, then switch. Use a wall for support if needed.',
    therapyDomain: 'balance',
    exerciseType: 'Balance & Coordination',
    bodyRegion: 'Legs/Lower limbs',
    estimatedDuration: 5,
    difficulty: 'easy',
    howToPlay: [
      'Stand tall like your favorite superhero',
      'Lift one foot off the ground',
      'Hold the pose for 10 seconds',
      'Switch to the other foot',
      'Repeat 10 times total'
    ],
    parentTips: [
      'Go at your own pace',
      'Use a wall for support if needed',
      'Count out loud together',
      'Celebrate each successful hold'
    ],
    videoUrl: 'superhero-standing-demo.mp4'
  },
  {
    id: 'ex2',
    name: 'Treasure Hunt Walking',
    description: 'Functional walking with direction changes and obstacles',
    instructions: 'Walk in different directions following a treasure map pattern.',
    therapyDomain: 'mobility',
    exerciseType: 'Functional Movements',
    bodyRegion: 'Full-body coordination',
    estimatedDuration: 8,
    difficulty: 'medium',
    howToPlay: [
      'Walk forward 5 steps',
      'Turn left and walk 3 steps',
      'Turn right and walk 4 steps',
      'Step over small obstacles',
      'Repeat the treasure hunt 8 times'
    ],
    parentTips: [
      'Go at your own pace',
      'Make sure the path is clear',
      'Count steps out loud',
      'Rest between rounds if needed'
    ],
    videoUrl: 'treasure-hunt-walking-demo.mp4'
  },
  {
    id: 'ex3',
    name: 'Magic Finger Painting',
    description: 'Fine motor control through creative finger movements',
    instructions: 'Use fingers to paint shapes and patterns in the air or on paper.',
    therapyDomain: 'fine-motor',
    exerciseType: 'Fine Motor/Hand Control',
    bodyRegion: 'Arms/Upper limbs',
    estimatedDuration: 10,
    difficulty: 'easy',
    howToPlay: [
      'Use fingers to paint 5 circles',
      'Draw 5 lines from left to right',
      'Make 5 dots with fingertips',
      'Practice pincer grasp with small objects',
      'Complete 15 movements total'
    ],
    parentTips: [
      'Go at your own pace',
      'Use colorful materials if available',
      'Encourage creativity',
      'Focus on finger movements'
    ],
    videoUrl: 'magic-finger-painting-demo.mp4'
  },
  {
    id: 'ex4',
    name: 'Bridge Building',
    description: 'Core strengthening exercise disguised as construction play',
    instructions: 'Lie on back and lift hips to make a bridge, hold for 5 seconds.',
    therapyDomain: 'gross-motor',
    exerciseType: 'Core Stability/Posture',
    bodyRegion: 'Core/Trunk',
    estimatedDuration: 6,
    difficulty: 'medium',
    howToPlay: [
      'Lie on your back with knees bent',
      'Lift your hips up to make a bridge',
      'Hold for 5 seconds like a strong bridge',
      'Lower down slowly',
      'Repeat 12 times'
    ],
    parentTips: [
      'Keep feet flat on the floor',
      'Squeeze bottom muscles',
      'Breathe normally while holding',
      'Rest between repetitions if needed'
    ],
    videoUrl: 'bridge-building-demo.mp4'
  },
  {
    id: 'ex5',
    name: 'Butterfly Stretches',
    description: 'Gentle hip and leg flexibility exercise',
    instructions: 'Sit with feet together and gently flutter knees like butterfly wings.',
    therapyDomain: 'mobility',
    exerciseType: 'Stretching/Flexibility',
    bodyRegion: 'Legs/Lower limbs',
    estimatedDuration: 4,
    difficulty: 'easy',
    howToPlay: [
      'Sit with feet touching each other',
      'Hold your feet with your hands',
      'Gently flutter knees up and down',
      'Count to 20 while fluttering',
      'Hold stretch for 10 seconds'
    ],
    parentTips: [
      'Never force the stretch',
      'Keep movements gentle',
      'Make it fun with butterfly sounds',
      'Stop if there is any pain'
    ],
    videoUrl: 'butterfly-stretches-demo.mp4'
  },
  {
    id: 'ex6',
    name: 'Theraband Arm Pulls',
    description: 'Upper body strengthening with resistance band',
    instructions: 'Use theraband to strengthen arm and shoulder muscles.',
    therapyDomain: 'gross-motor',
    exerciseType: 'Strengthening/Resistance',
    bodyRegion: 'Arms/Upper limbs',
    estimatedDuration: 7,
    difficulty: 'medium',
    howToPlay: [
      'Hold theraband with both hands',
      'Pull arms apart slowly',
      'Hold for 3 seconds',
      'Return to start position',
      'Repeat 15 times'
    ],
    parentTips: [
      'Use appropriate resistance level',
      'Keep movements slow and controlled',
      'Watch for proper form',
      'Rest if arms get tired'
    ],
    videoUrl: 'theraband-pulls-demo.mp4'
  }
];

export const mockWeeklyPlan: WeeklyPlan = {
  id: 'plan1',
  childId: 'child1',
  weekStartDate: '2024-01-15',
  therapistId: '2',
  status: 'active',
  exercises: [
    {
      id: 'we1',
      exercise: mockExercises[0], // Superhero Standing Balance
      targetRepetitions: 10,
      notes: 'Focus on maintaining balance without wall support',
      status: 'done',
      completedDate: '2024-01-15',
      parentNotes: 'Emma did great! Managed 8 seconds without support.',
      videoUrl: 'mock-video-1.mp4',
      completedReps: 10
    },
    {
      id: 'we2',
      exercise: mockExercises[1], // Treasure Hunt Walking
      targetRepetitions: 8,
      notes: 'Take your time, accuracy over speed',
      status: 'pending',
      completedReps: 0
    },
    {
      id: 'we3',
      exercise: mockExercises[2], // Magic Finger Painting
      targetRepetitions: 15,
      notes: 'Use colorful objects to make it engaging',
      status: 'pending',
      completedReps: 0
    },
    {
      id: 'we4',
      exercise: mockExercises[3], // Bridge Building
      targetRepetitions: 12,
      notes: 'Focus on core engagement and proper form',
      status: 'pending',
      completedReps: 0
    },
    {
      id: 'we5',
      exercise: mockExercises[4], // Butterfly Stretches
      targetRepetitions: 3,
      notes: 'Gentle stretching, never force the movement',
      status: 'pending',
      completedReps: 0
    }
  ]
};

export const mockProgressData: ProgressData = {
  childId: 'child1',
  month: '2024-01',
  therapyDomainProgress: [
    {
      domain: 'Balance',
      completionRate: 85,
      improvementTrend: 'up'
    },
    {
      domain: 'Fine Motor',
      completionRate: 70,
      improvementTrend: 'stable'
    },
    {
      domain: 'Gross Motor',
      completionRate: 90,
      improvementTrend: 'up'
    },
    {
      domain: 'Mobility',
      completionRate: 75,
      improvementTrend: 'up'
    }
  ],
  exerciseTypeProgress: [
    {
      type: 'Balance & Coordination',
      completionRate: 88,
      exercisesCompleted: 15,
      exercisesTotal: 17
    },
    {
      type: 'Fine Motor/Hand Control',
      completionRate: 72,
      exercisesCompleted: 13,
      exercisesTotal: 18
    },
    {
      type: 'Functional Movements',
      completionRate: 80,
      exercisesCompleted: 12,
      exercisesTotal: 15
    },
    {
      type: 'Core Stability/Posture',
      completionRate: 85,
      exercisesCompleted: 11,
      exercisesTotal: 13
    },
    {
      type: 'Stretching/Flexibility',
      completionRate: 90,
      exercisesCompleted: 9,
      exercisesTotal: 10
    },
    {
      type: 'Strengthening/Resistance',
      completionRate: 75,
      exercisesCompleted: 9,
      exercisesTotal: 12
    }
  ],
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
  totalExercisesCompleted: 55,
  totalExercisesAssigned: 66
};

export const mockRewards: Reward[] = [
  {
    id: 'r1',
    name: 'Sunflower',
    theme: 'flowers',
    type: 'flower',
    unlocked: true,
    unlockedDate: '2024-01-15',
    requiredExercises: 1
  },
  {
    id: 'r2',
    name: 'Rose',
    theme: 'flowers',
    type: 'flower',
    unlocked: false,
    requiredExercises: 2
  },
  {
    id: 'r3',
    name: 'Tulip',
    theme: 'flowers',
    type: 'flower',
    unlocked: false,
    requiredExercises: 3
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'p1',
    title: 'Tips for making balance exercises fun?',
    content: 'My 5-year-old gets bored with balance exercises. Any creative ideas to make them more engaging?',
    author: 'Sarah Johnson',
    category: 'Balance & Coordination',
    createdDate: '2024-01-14',
    likes: 12,
    tags: ['balance', 'motivation', 'tips'],
    replies: [
      {
        id: 'r1',
        content: 'We turn balance exercises into superhero poses! My son loves pretending to be his favorite hero.',
        author: 'Mike Thompson',
        createdDate: '2024-01-14',
        likes: 8
      },
      {
        id: 'r2',
        content: 'Music helps a lot! We play his favorite songs and make it a dance challenge.',
        author: 'Lisa Chen',
        createdDate: '2024-01-15',
        likes: 5
      }
    ]
  },
  {
    id: 'p2',
    title: 'Celebrating small wins',
    content: 'Emma finally completed her heel-to-toe walking without assistance today! These small victories mean everything. 💪',
    author: 'Sarah Johnson',
    category: 'Celebrations',
    createdDate: '2024-01-16',
    likes: 24,
    tags: ['celebration', 'milestone', 'walking'],
    replies: [
      {
        id: 'r3',
        content: 'That\'s amazing! Every step forward is worth celebrating. Go Emma! 🎉',
        author: 'Jennifer Martinez',
        createdDate: '2024-01-16',
        likes: 6
      }
    ]
  },
  {
    id: 'p3',
    title: 'Core strengthening at home',
    content: 'Looking for creative core stability exercises using household items. What works for your kids?',
    author: 'Mike Thompson',
    category: 'Core Stability/Posture',
    createdDate: '2024-01-13',
    likes: 18,
    tags: ['core', 'diy', 'activities'],
    replies: [
      {
        id: 'r4',
        content: 'We use pillows for bridging exercises - makes it feel like a game!',
        author: 'Amanda Rodriguez',
        createdDate: '2024-01-13',
        likes: 9
      },
      {
        id: 'r5',
        content: 'Balloon games work great for core engagement while having fun!',
        author: 'David Kim',
        createdDate: '2024-01-14',
        likes: 12
      }
    ]
  }
];

export const mockTherapistAnalytics: TherapistAnalytics[] = [
  {
    familyId: '1',
    familyName: 'Johnson Family',
    childName: 'Emma',
    completionRate: 78,
    strugglingExercises: ['Theraband Arm Pulls', 'Advanced Core Stability'],
    progressTrend: 'improving',
    lastActivity: '2024-01-16',
    aiRecommendations: [
      'Consider lighter resistance for theraband exercises initially',
      'Break core exercises into shorter holds with more repetitions',
      'Excellent progress in balance and coordination - ready for advanced challenges'
    ]
  },
  {
    familyId: '3',
    familyName: 'Thompson Family',
    childName: 'Alex',
    completionRate: 92,
    strugglingExercises: [],
    progressTrend: 'stable',
    lastActivity: '2024-01-15',
    aiRecommendations: [
      'Ready for more challenging strengthening exercises',
      'Consider introducing aerobic/endurance activities',
      'Excellent consistency across all body regions'
    ]
  },
  {
    familyId: '4',
    familyName: 'Chen Family',
    childName: 'Sophia',
    completionRate: 65,
    strugglingExercises: ['Fine Motor Precision Tasks', 'Bilateral Coordination'],
    progressTrend: 'improving',
    lastActivity: '2024-01-14',
    aiRecommendations: [
      'Focus on shorter, more frequent fine motor sessions',
      'Incorporate play-based bilateral coordination activities',
      'Consider sensory integration techniques for better engagement'
    ]
  }
];