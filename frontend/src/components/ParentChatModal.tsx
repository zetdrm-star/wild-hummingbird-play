import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  ArrowLeft,
  User,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { showSuccess } from '@/utils/toast';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'therapist' | 'parent';
  timestamp: string;
  senderName: string;
}

interface Family {
  familyId: string;
  familyName: string;
  childName: string;
  lastActivity: string;
  completionRate: number;
}

interface ParentChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  families: Family[];
}

const ParentChatModal: React.FC<ParentChatModalProps> = ({ isOpen, onClose, families }) => {
  const { user } = useAuth();
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mock chat data for each family
  const [familyChats, setFamilyChats] = useState<Record<string, ChatMessage[]>>({
    '1': [
      {
        id: '1',
        content: `Hi Dr. ${user?.name?.split(' ')[1] || 'Martinez'}! Emma did great with her balance exercises today. She held the superhero pose for 10 seconds! 🎉`,
        sender: 'parent',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        senderName: 'Sarah Johnson'
      },
      {
        id: '2',
        content: `That's wonderful progress, Sarah! 10 seconds is excellent improvement. I can see from the app data that Emma is really responding well to the superhero-themed exercises. How is she feeling about the fine motor activities?`,
        sender: 'therapist',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        senderName: user?.name || 'Dr. Martinez'
      },
      {
        id: '3',
        content: `She's enjoying the magic finger painting exercises! Though she still finds the pincer grasp activities challenging. Should we continue with the same approach?`,
        sender: 'parent',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        senderName: 'Sarah Johnson'
      }
    ],
    '3': [
      {
        id: '1',
        content: `Hello! Alex completed all his exercises this week. His core strength seems to be improving a lot. Thank you for the great program!`,
        sender: 'parent',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        senderName: 'Mike Thompson'
      },
      {
        id: '2',
        content: `Excellent work, Mike! Alex's 92% completion rate this month is outstanding. His core stability has definitely improved. I'm planning to introduce some more challenging coordination exercises next week. How does Alex feel about trying new activities?`,
        sender: 'therapist',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        senderName: user?.name || 'Dr. Martinez'
      }
    ],
    '4': [
      {
        id: '1',
        content: `Hi Dr. Martinez, Sophia has been struggling with some of the fine motor exercises this week. She gets frustrated easily. Any suggestions?`,
        sender: 'parent',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        senderName: 'Lisa Chen'
      },
      {
        id: '2',
        content: `I understand, Lisa. Frustration is common with fine motor challenges. Let's try breaking the exercises into smaller 3-minute sessions and use more colorful, engaging objects. I'll also add some sensory integration activities to help with focus. Would that work better for Sophia?`,
        sender: 'therapist',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        senderName: user?.name || 'Dr. Martinez'
      },
      {
        id: '3',
        content: `That sounds perfect! She does much better with shorter sessions. Thank you for understanding and adjusting the approach.`,
        sender: 'parent',
        timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(),
        senderName: 'Lisa Chen'
      }
    ]
  });

  const generateParentResponse = (message: string, familyId: string): string => {
    const family = families.find(f => f.familyId === familyId);
    const childName = family?.childName || 'my child';
    const parentName = family?.familyName.split(' ')[0] || 'Parent';
    
    const responses = [
      `Thank you for the guidance! ${childName} is responding well to the changes.`,
      `That makes sense. I'll try that approach with ${childName} and let you know how it goes.`,
      `Great suggestion! ${childName} seems more motivated when we do shorter sessions.`,
      `I appreciate your support. ${childName} is making progress thanks to your help.`,
      `Perfect! I'll implement those changes in ${childName}'s routine right away.`,
      `Thank you for being so understanding. ${childName} and I both feel supported.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedFamily) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'therapist',
      timestamp: new Date().toISOString(),
      senderName: user?.name || 'Dr. Martinez'
    };

    // Add therapist message
    setFamilyChats(prev => ({
      ...prev,
      [selectedFamily.familyId]: [...(prev[selectedFamily.familyId] || []), newMessage]
    }));

    setInputMessage('');
    setIsTyping(true);

    // Simulate parent response after delay
    setTimeout(() => {
      const parentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateParentResponse(inputMessage, selectedFamily.familyId),
        sender: 'parent',
        timestamp: new Date().toISOString(),
        senderName: selectedFamily.familyName.split(' ')[0]
      };

      setFamilyChats(prev => ({
        ...prev,
        [selectedFamily.familyId]: [...(prev[selectedFamily.familyId] || []), parentResponse]
      }));

      setIsTyping(false);
      showSuccess(`Message sent to ${selectedFamily.familyName}! 📨`);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getLastMessageTime = (familyId: string) => {
    const messages = familyChats[familyId] || [];
    if (messages.length === 0) return 'No messages';
    
    const lastMessage = messages[messages.length - 1];
    const date = new Date(lastMessage.timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getLastMessagePreview = (familyId: string) => {
    const messages = familyChats[familyId] || [];
    if (messages.length === 0) return 'Start a conversation...';
    
    const lastMessage = messages[messages.length - 1];
    return lastMessage.content.length > 50 
      ? lastMessage.content.substring(0, 50) + '...'
      : lastMessage.content;
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[700px] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Family List Sidebar */}
          <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
            <DialogHeader className="p-4 border-b border-gray-200 bg-white">
              <DialogTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span>Chat with Parents</span>
              </DialogTitle>
            </DialogHeader>
            
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-2">
                {families.map((family) => (
                  <div
                    key={family.familyId}
                    onClick={() => setSelectedFamily(family)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedFamily?.familyId === family.familyId
                        ? 'bg-blue-100 border-2 border-blue-300 shadow-sm'
                        : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {family.familyName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm truncate">
                            {family.familyName}
                          </h4>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {getLastMessageTime(family.familyId)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-gray-600 font-medium">{family.childName}</span>
                          <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getCompletionColor(family.completionRate)}`}>
                            {family.completionRate}%
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {getLastMessagePreview(family.familyId)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedFamily ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFamily(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {selectedFamily.familyName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{selectedFamily.familyName}</h3>
                      <p className="text-sm text-gray-600">{selectedFamily.childName}'s parent</p>
                    </div>

                    <Badge variant="outline" className={`${getCompletionColor(selectedFamily.completionRate)}`}>
                      {selectedFamily.completionRate}% completion
                    </Badge>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4 bg-gray-50">
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {(familyChats[selectedFamily.familyId] || []).map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'therapist' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                            message.sender === 'therapist'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          {message.sender === 'parent' && (
                            <div className="flex items-center space-x-1 mb-2">
                              <User className="w-3 h-3 text-gray-500" />
                              <span className="text-xs font-medium text-gray-600">{message.senderName}</span>
                            </div>
                          )}
                          <div className="text-sm leading-relaxed">
                            {message.content}
                          </div>
                          <div className={`text-xs mt-2 ${
                            message.sender === 'therapist' ? 'text-blue-100' : 'text-gray-500'
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
                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-[75%] shadow-sm">
                          <div className="flex items-center space-x-1 mb-2">
                            <User className="w-3 h-3 text-gray-500" />
                            <span className="text-xs font-medium text-gray-600">{selectedFamily.familyName.split(' ')[0]}</span>
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

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex space-x-3 max-w-4xl mx-auto">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Message ${selectedFamily.familyName}...`}
                      className="flex-1 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* No Family Selected */
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Family</h3>
                  <p className="text-gray-600 max-w-sm">Choose a family from the list to start or continue a conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParentChatModal;