import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Heart, 
  Sparkles, 
  TrendingUp,
  HelpCircle,
  Star
} from 'lucide-react';
import { ChatMessage } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { mockWeeklyPlan, mockProgressData } from '@/data/mockData';

const MiloChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: user?.role === 'therapist' 
        ? `Hi Dr. ${user?.name}! I'm Milo, your AI therapy assistant. I can help you analyze patient progress, suggest treatment modifications, and provide clinical insights. How can I assist you today? 🩺`
        : `Hi ${user?.name}! I'm Milo, your AI therapy companion. I'm here to help you and ${user?.childrenProfiles?.[0]?.name} on your therapy journey. How can I support you today? 🌟`,
      sender: 'milo',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const generateMiloResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const isTherapist = user?.role === 'therapist';
    
    if (isTherapist) {
      // Therapist-specific responses
      if (message.includes('family') || message.includes('patient') || message.includes('struggling')) {
        return `Based on clinical patterns I observe, here are strategies for families struggling with therapy compliance:

🎯 **Assessment Approach:**
• Review completion rates and identify specific exercise types causing difficulty
• Analyze video submissions for form and engagement patterns
• Check for environmental or motivational barriers

📋 **Intervention Strategies:**
• Break complex exercises into smaller, achievable steps
• Modify difficulty levels based on current performance data
• Implement positive reinforcement schedules
• Consider family dynamics and caregiver capacity

📊 **Monitoring:**
• Track weekly completion trends
• Monitor parent feedback and notes
• Adjust frequency and intensity based on progress data

Would you like me to analyze specific family data or suggest modifications for particular exercise types?`;
      }

      if (message.includes('progress') || message.includes('analyze') || message.includes('data')) {
        return `I can help you analyze patient progress patterns across multiple dimensions:

📈 **Progress Analysis Tools:**
• **Completion Rate Trends** - Weekly/monthly patterns and consistency
• **Exercise Type Performance** - Which domains show improvement vs. challenges
• **Body Region Development** - Targeted area progress tracking
• **Engagement Indicators** - Video uploads, parent notes, consistency

🔍 **Clinical Insights:**
• Identify patients who may need intervention adjustments
• Spot early warning signs of declining engagement
• Recognize readiness for progression to more challenging exercises
• Detect patterns that suggest need for different therapeutic approaches

📋 **Actionable Recommendations:**
• Micro-adjustments for individual exercise plans
• Family communication strategies
• Motivation enhancement techniques
• Timeline adjustments based on progress velocity

Which specific aspect of progress analysis would be most helpful for your current caseload?`;
      }

      if (message.includes('exercise') || message.includes('modify') || message.includes('plan')) {
        return `Here's how I can assist with exercise planning and modifications:

🎯 **Exercise Modification Principles:**
• **Progression**: Gradually increase difficulty, duration, or complexity
• **Regression**: Simplify when patients struggle or show frustration
• **Adaptation**: Modify for individual limitations or preferences
• **Motivation**: Incorporate themes and interests to enhance engagement

📋 **Clinical Decision Support:**
• Suggest appropriate exercise progressions based on current performance
• Recommend alternative exercises for similar therapeutic goals
• Identify when to advance or modify difficulty levels
• Provide evidence-based rationale for exercise selection

🔧 **Practical Modifications:**
• Reduce repetitions while maintaining frequency
• Break exercises into shorter sessions
• Add visual or auditory cues for better understanding
• Incorporate play-based elements for pediatric engagement

What specific exercise challenges are you seeing with your patients that I can help address?`;
      }

      if (message.includes('communication') || message.includes('parent') || message.includes('family')) {
        return `Effective therapist-family communication is crucial for therapy success:

💬 **Communication Strategies:**
• **Regular Check-ins**: Weekly progress discussions and concern addressing
• **Clear Expectations**: Set realistic goals and timelines
• **Positive Reinforcement**: Celebrate small wins and progress milestones
• **Problem-Solving**: Collaborative approach to overcoming barriers

📱 **Digital Communication Best Practices:**
• Respond to parent messages within 24-48 hours when possible
• Provide specific, actionable feedback on uploaded videos
• Use encouraging language while being clinically accurate
• Share progress data in understandable, visual formats

🎯 **Difficult Conversations:**
• Address compliance issues with empathy and problem-solving focus
• Discuss plateau periods and adjustment strategies
• Navigate family stress and expectations management
• Provide resources for additional support when needed

Would you like specific templates for common communication scenarios or help with a particular family situation?`;
      }

      // Default therapist response
      return `As your clinical AI assistant, I can help you with:

🩺 **Clinical Support:**
• Patient progress analysis and trend identification
• Exercise plan modifications and progressions
• Evidence-based treatment recommendations
• Outcome measurement and goal setting

📊 **Data Analysis:**
• Completion rate patterns and compliance factors
• Performance trends across different exercise types
• Family engagement indicators and risk factors
• Comparative analysis across your caseload

💬 **Communication Support:**
• Parent communication strategies and templates
• Difficult conversation guidance
• Progress reporting and family education
• Motivational interviewing techniques

🎯 **Treatment Planning:**
• Goal setting and modification strategies
• Exercise selection and progression planning
• Intervention timing and intensity adjustments
• Discharge planning and transition support

What specific clinical challenge can I help you address today?`;
    } else {
      // Parent-specific responses (existing logic)
      const childName = user?.childrenProfiles?.[0]?.name || 'your child';
      
      // Exercise motivation responses
      if (message.includes('resist') || message.includes('doesn\'t want') || message.includes('boring') || message.includes('motivation')) {
        return `I understand how challenging it can be when ${childName} resists exercises! Here are some strategies that work well:

🦸‍♂️ **Make it a game**: Turn balance exercises into "superhero poses" or "statue challenges"
🎵 **Add music**: Play their favorite songs and make it a dance party
🏆 **Reward system**: Remind them about unlocking new flowers in their garden
⏰ **Keep it short**: Break exercises into smaller, manageable chunks

Which approach sounds like something ${childName} might enjoy? I can give you specific ideas for any of their current exercises!`;
      }

      // Exercise help responses
      if (message.includes('exercise') || message.includes('balance') || message.includes('motor') || message.includes('help')) {
        const currentExercises = mockWeeklyPlan.exercises.filter(ex => ex.status === 'pending');
        if (currentExercises.length > 0) {
          const exercise = currentExercises[0];
          return `I see ${childName} has "${exercise.exercise.name}" coming up! Here's how to make it engaging:

📋 **Exercise**: ${exercise.exercise.name}
⏱️ **Duration**: ${exercise.exercise.estimatedDuration} minutes
🎯 **Goal**: ${exercise.targetRepetitions} sets

**Fun variations:**
• Turn it into a story or adventure
• Use props like stuffed animals or colorful objects
• Count together or sing while doing it
• Celebrate each successful attempt

${exercise.notes ? `**Therapist note**: ${exercise.notes}` : ''}

Would you like specific tips for making this exercise more fun?`;
        }
        return `I'd love to help with exercises! Could you tell me which specific exercise ${childName} is working on, or what type of movement they're finding challenging?`;
      }

      // Progress review responses
      if (message.includes('progress') || message.includes('how') && message.includes('doing')) {
        const completedCount = mockWeeklyPlan.exercises.filter(ex => ex.status === 'done').length;
        const totalCount = mockWeeklyPlan.exercises.length;
        const completionRate = Math.round((completedCount / totalCount) * 100);
        
        return `${childName} is doing wonderfully! Here's their progress summary:

📊 **This Week**: ${completedCount}/${totalCount} exercises completed (${completionRate}%)
📈 **Overall Trend**: ${mockProgressData.therapyDomainProgress.filter(d => d.improvementTrend === 'up').length} domains showing improvement
🌟 **Strongest Area**: ${mockProgressData.therapyDomainProgress.reduce((prev, current) => (prev.completionRate > current.completionRate) ? prev : current).domain}

**Recent wins:**
${mockWeeklyPlan.exercises.filter(ex => ex.status === 'done' && ex.parentNotes).map(ex => `• ${ex.exercise.name}: ${ex.parentNotes}`).join('\n') || '• Great consistency with daily exercises!'}

${completionRate >= 80 ? 'Amazing work! 🎉' : completionRate >= 60 ? 'Good progress! Keep it up! 💪' : 'Every step counts - you\'re doing great! 🌱'}`;
      }

      // Struggling responses
      if (message.includes('struggle') || message.includes('difficult') || message.includes('hard')) {
        return `It's completely normal for children to have challenging days with therapy exercises. Here's what I recommend:

💙 **Remember**: Every child progresses at their own pace
🔄 **Adjust expectations**: Some days will be better than others
🎯 **Focus on effort**: Celebrate trying, not just completing
🛠️ **Modify if needed**: Make exercises easier or shorter when needed

**Quick strategies:**
• Break the exercise into smaller steps
• Use visual cues or demonstrations
• Offer choices ("Do you want to try 3 times or 5 times?")
• Take breaks when frustrated

Would you like me to suggest specific modifications for any particular exercise ${childName} is finding challenging?`;
      }

      // Celebration responses
      if (message.includes('completed') || message.includes('finished') || message.includes('did it') || message.includes('success')) {
        return `That's absolutely wonderful! 🎉✨ 

I'm so proud of both you and ${childName}! These moments of success are exactly what therapy is all about. Each completed exercise is building strength, confidence, and new neural pathways.

🌟 **Celebration ideas:**
• Do a happy dance together
• Check if any new rewards unlocked in the garden
• Share the win with your therapist
• Take a moment to acknowledge your hard work as a parent too!

Keep up this amazing momentum! What's next on ${childName}'s exercise list?`;
      }

      // Default supportive response
      return `I'm here to support you and ${childName} in any way I can! Whether you need:

🎯 **Exercise guidance** - Tips for specific movements or activities
💪 **Motivation strategies** - When ${childName} needs encouragement  
📊 **Progress insights** - Understanding how they're developing
❤️ **Emotional support** - Because parenting a child with special needs takes incredible strength

What would be most helpful for you right now?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const miloResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateMiloResponse(inputMessage),
        sender: 'milo',
        timestamp: new Date().toISOString(),
        type: 'text'
      };

      setMessages(prev => [...prev, miloResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = user?.role === 'therapist' ? [
    "Analyze family progress patterns",
    "Help with struggling patients",
    "Suggest exercise modifications",
    "Communication strategies"
  ] : [
    "How can I motivate my child?",
    "Show me our progress",
    "My child is struggling",
    "We completed an exercise!"
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.sender === 'milo' && (
                    <div className="flex items-center space-x-1 mb-2">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span className="text-xs font-medium text-purple-600">
                        {user?.role === 'therapist' ? 'Milo Clinical AI' : 'Milo AI'}
                      </span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex items-center space-x-1 mb-2">
                    <Sparkles className="w-3 h-3 text-purple-500" />
                    <span className="text-xs font-medium text-purple-600">
                      {user?.role === 'therapist' ? 'Milo Clinical AI' : 'Milo AI'}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="flex-shrink-0 px-4 py-2">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs rounded-full border-purple-200 text-purple-700 hover:bg-purple-50 px-2 py-1 h-6"
                onClick={() => setInputMessage(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-100 p-4">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={user?.role === 'therapist' 
              ? "Ask about patient progress, treatment strategies, or clinical insights..."
              : "Ask Milo anything about therapy, exercises, or motivation..."
            }
            className="flex-1 rounded-xl border-gray-200 focus:border-purple-400"
            disabled={isTyping}
            autoFocus
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiloChat;