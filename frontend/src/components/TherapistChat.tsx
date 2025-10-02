import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Stethoscope, 
  Calendar,
  FileText,
  Video,
  Clock
} from 'lucide-react';
import { ChatMessage } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { showSuccess } from '@/utils/toast';

const TherapistChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `Hi ${user?.name}! This is Ana, your therapist. I hope ${user?.childrenProfiles?.[0]?.name} is doing well with this week's exercises. How are things going at home?`,
      sender: 'milo', // Using 'milo' as therapist for styling consistency
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      type: 'text'
    },
    {
      id: '2',
      content: `Hi Ana! ${user?.childrenProfiles?.[0]?.name} is doing great with the balance exercises. She managed to hold the superhero pose for 8 seconds yesterday! 🎉`,
      sender: 'user',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      type: 'text'
    },
    {
      id: '3',
      content: `That's wonderful progress! 8 seconds is excellent for her age. I can see from the app that she completed the balance exercise successfully. For next week, I'm thinking we can introduce some dynamic balance challenges. How does ${user?.childrenProfiles?.[0]?.name} feel about trying exercises while music is playing?`,
      sender: 'milo',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
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

  const generateTherapistResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const childName = user?.childrenProfiles?.[0]?.name || 'your child';
    
    // Exercise progress responses
    if (message.includes('completed') || message.includes('finished') || message.includes('did') || message.includes('exercise')) {
      return `Excellent work! I can see ${childName}'s progress in the app. The consistency you're showing at home is making a real difference. 

Based on what I'm seeing, ${childName} is ready for the next level of challenges. I'll update next week's plan accordingly.

How is ${childName} feeling about the exercises? Any particular ones that seem to be favorites?`;
    }

    // Difficulty or struggle responses
    if (message.includes('difficult') || message.includes('hard') || message.includes('struggle') || message.includes('challenging')) {
      return `I understand that some exercises can be challenging. This is completely normal in the therapy process.

Let me suggest a few modifications:
• Break the exercise into smaller steps
• Reduce the number of repetitions initially
• Use more visual or auditory cues
• Take more frequent breaks

Would you like me to schedule a video call this week to demonstrate some alternative approaches? I can also adjust ${childName}'s plan to focus on building confidence with easier variations first.`;
    }

    // Questions about progress
    if (message.includes('progress') || message.includes('improvement') || message.includes('better')) {
      return `${childName} is making steady progress! From the data I'm seeing:

📊 **This week's highlights:**
• Balance exercises: 85% completion rate
• Fine motor skills: Showing consistent improvement
• Overall engagement: Very positive

The key indicators I'm tracking show ${childName} is developing strength and coordination well. The most important thing is that you're both staying consistent and positive.

Are there any specific areas you'd like me to focus on more in the coming weeks?`;
    }

    // Scheduling or appointment requests
    if (message.includes('appointment') || message.includes('meeting') || message.includes('call') || message.includes('visit')) {
      return `I'd be happy to schedule some time to discuss ${childName}'s progress in detail.

📅 **Available options:**
• Video consultation (30 minutes)
• In-person session review
• Phone check-in (15 minutes)

My availability this week:
• Tuesday 2-4 PM
• Thursday 10 AM-12 PM
• Friday 1-3 PM

Which would work best for your schedule? I can also provide written updates if that's more convenient.`;
    }

    // General questions or concerns
    if (message.includes('question') || message.includes('concern') || message.includes('worried') || message.includes('help')) {
      return `I'm here to support both you and ${childName} through this journey. Your questions and concerns are always welcome.

As ${childName}'s therapist, I want to ensure you feel confident and supported. Whether it's about exercise techniques, progress expectations, or just general guidance - please don't hesitate to reach out.

What specific aspect would you like to discuss? I can provide detailed explanations, demonstrate techniques, or adjust our approach as needed.`;
    }

    // Default professional response
    return `Thank you for the update about ${childName}. I appreciate you keeping me informed about how things are going at home.

Your involvement and consistency are crucial to ${childName}'s progress. The home exercises are designed to reinforce what we work on during our sessions, and it sounds like you're doing an excellent job.

Is there anything specific about ${childName}'s therapy plan that you'd like to discuss or adjust? I'm always here to help optimize the approach for your family's needs.`;
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

    // Simulate therapist thinking time (longer than Milo since it's a human)
    setTimeout(() => {
      const therapistResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateTherapistResponse(inputMessage),
        sender: 'milo', // Using 'milo' for styling consistency
        timestamp: new Date().toISOString(),
        type: 'text'
      };

      setMessages(prev => [...prev, therapistResponse]);
      setIsTyping(false);
    }, 2000); // Longer delay for more realistic human response time
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "How is Emma's progress?",
    "She completed all exercises!",
    "Schedule a call?",
    "I have a question"
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-medium text-gray-900">Ana</span>
            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 ml-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Available
            </Badge>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">Pediatric Physical Therapist • {user?.childrenProfiles?.[0]?.name}'s Therapist</p>
      </div>

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
                      : 'bg-purple-50 text-gray-900 border border-purple-100'
                  }`}
                >
                  {message.sender !== 'user' && (
                    <div className="flex items-center space-x-1 mb-2">
                      <Stethoscope className="w-3 h-3 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">Ana</span>
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
                <div className="bg-purple-50 border border-purple-100 rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex items-center space-x-1 mb-2">
                    <Stethoscope className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700">Ana</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Quick Prompts - Made Smaller */}
      {messages.length <= 3 && (
        <div className="flex-shrink-0 px-4 py-2">
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
            placeholder="Message Ana about Emma's progress..."
            className="flex-1 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400"
            disabled={isTyping}
            autoFocus
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TherapistChat;