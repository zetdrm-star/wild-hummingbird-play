import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Heart, 
  Shield, 
  Star, 
  Users, 
  ArrowRight, 
  Play,
  CheckCircle,
  Sparkles,
  Calendar,
  BarChart3,
  MessageCircle,
  Trophy,
  Brain,
  Stethoscope,
  Lock,
  ChevronDown,
  ChevronUp,
  Phone,
  Monitor,
  Target,
  Zap,
  Globe,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  UserPlus,
  LogIn,
  CalendarDays,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { showSuccess } from '@/utils/toast';

const Homepage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState<'parent' | 'therapist' | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    role: '',
    preferredTime: '',
    message: ''
  });

  // Handle scroll for sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = (role: 'parent' | 'therapist') => {
    // Show role-specific modal first
    setShowRoleModal(role);
  };

  const handleRoleSelection = (role: 'parent' | 'therapist', action: 'demo' | 'signup' | 'login') => {
    setShowRoleModal(null);
    
    if (action === 'demo') {
      // Auto-login with demo accounts and navigate to appropriate dashboard
      handleDemoLogin(role);
    } else if (action === 'signup') {
      // Navigate to signup with role parameter
      navigate(`/login?role=${role}&mode=signup`);
    } else {
      // Navigate to login with role parameter
      navigate(`/login?role=${role}`);
    }
  };

  const handleScheduleCall = (role: 'parent' | 'therapist') => {
    setShowRoleModal(null);
    setScheduleForm(prev => ({ ...prev, role }));
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock scheduling - in real app this would integrate with Calendly/similar
    showSuccess(`📅 Call scheduled! We'll send a calendar invite to ${scheduleForm.email} shortly.`);
    
    // Reset form
    setScheduleForm({
      name: '',
      email: '',
      role: '',
      preferredTime: '',
      message: ''
    });
    setShowScheduleModal(false);
  };

  const handleDemoLogin = async (role: 'parent' | 'therapist') => {
    const email = role === 'parent' ? 'sarah@example.com' : 'dr.martinez@example.com';
    const success = await login(email, 'password');
    
    if (success) {
      showSuccess(`Welcome to Milo! 🌟 You're now viewing the ${role} dashboard.`);
      // Navigate directly to the appropriate dashboard
      if (role === 'parent') {
        navigate('/parent-dashboard');
      } else {
        navigate('/therapist-dashboard');
      }
    } else {
      // Fallback to login page if auto-login fails
      navigate(`/login?role=${role}`);
    }
  };

  const valuePillars = [
    {
      id: 'family-first',
      title: 'Family-First',
      description: 'Built around your family\'s unique needs and schedule',
      icon: Heart,
      color: 'from-pink-400 to-rose-500',
      details: [
        'Flexible daily routines that work with your schedule',
        'Personalized for your child\'s specific needs and interests',
        'Family-friendly interface designed for real-life use'
      ]
    },
    {
      id: 'therapist-guided',
      title: 'Therapist-Guided',
      description: 'Professional oversight with personalized care plans',
      icon: Stethoscope,
      color: 'from-blue-400 to-indigo-500',
      details: [
        'Licensed therapists design and oversee all treatment plans',
        'Regular progress reviews and plan adjustments',
        'Professional expertise combined with AI insights'
      ]
    },
    {
      id: 'child-centered',
      title: 'Child-Centered',
      description: 'Engaging activities that make therapy feel like play',
      icon: Star,
      color: 'from-yellow-400 to-orange-500',
      details: [
        'Gamified exercises with themes kids love (flowers, cars, dinosaurs)',
        'Age-appropriate activities that feel like games',
        'Reward systems that motivate and celebrate progress'
      ]
    },
    {
      id: 'community-supported',
      title: 'Community-Supported',
      description: 'Connect with families on similar journeys',
      icon: Users,
      color: 'from-teal-400 to-cyan-500',
      details: [
        'Safe community forums for parents to share experiences',
        'Connect with families facing similar challenges',
        'Peer support and encouragement from those who understand'
      ]
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: 'Personalized Daily Routines',
      description: 'Daily routines, designed by your therapist — easy to follow at home.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Monthly Goals & Progress',
      description: 'Monthly goals with clear progress bars and friendly insights.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Trophy,
      title: 'Gamification for Kids',
      description: 'Kids stay motivated with themed rewards they collect.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: MessageCircle,
      title: 'AI Companion Chat',
      description: 'Ask Milo anything — from "Are we doing this right?" to "What did we practice last week?"',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Join topic groups, preview posts, and learn from other families.',
      color: 'from-teal-400 to-teal-600'
    },
    {
      icon: Brain,
      title: 'Therapist Dashboard',
      description: 'Therapists see trends, AI tips, and can push updated plans.',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  const testimonials = [
    {
      quote: "Milo made at-home therapy part of our everyday rhythm. Emma looks forward to her 'superhero training' every day!",
      author: "Sarah M.",
      role: "Parent of 6-year-old with developmental delays",
      avatar: "S"
    },
    {
      quote: "I finally see what happens at home without extra workload. The AI summaries save me hours while keeping me connected to my families.",
      author: "Ana Rodriguez",
      role: "Pediatric Physical Therapist",
      avatar: "A"
    }
  ];

  const faqs = [
    {
      question: "How is Milo different from a generic health app?",
      answer: "Milo is specifically designed for pediatric therapy with licensed therapist oversight. Unlike generic apps, every exercise plan is created by your child's therapist, and AI provides clinical insights rather than generic advice."
    },
    {
      question: "Do we need to upload videos?",
      answer: "Video uploads are completely optional! Many families find them helpful for getting personalized feedback, but you can track progress and communicate with your therapist without them."
    },
    {
      question: "Can therapists change the plan at any time?",
      answer: "Yes! Therapists can review progress and adjust plans weekly. The AI provides recommendations, but your therapist makes all clinical decisions and can modify exercises, goals, and frequency as needed."
    },
    {
      question: "Is my child's data secure?",
      answer: "Absolutely. All data is encrypted and GDPR compliant. You control what information is shared, and only your child's therapist has access to their progress data. We never sell or share personal information."
    },
    {
      question: "What ages does Milo work for?",
      answer: "Milo is designed for children ages 2-12 with various developmental needs. The interface and activities are customized based on your child's age and specific therapy goals."
    },
    {
      question: "How much does Milo cost?",
      answer: "We offer flexible pricing plans starting with a free pilot program. Contact us for pricing details specific to your family's needs or clinic requirements."
    }
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Milo</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="rounded-full border-purple-200 hover:bg-purple-50 text-purple-700"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Making therapy{' '}
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">continuous</span>,{' '}
            <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">personalized</span>, and{' '}
            <span className="bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">engaging</span> at home
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Milo connects therapists, parents, and children — ensuring every child gets the consistent support 
            they need to thrive, every day, not just in the clinic.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleGetStarted('parent')}
            >
              <Heart className="w-6 h-6 mr-3" />
              I'm a Parent
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-2xl py-4 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleGetStarted('therapist')}
            >
              <Stethoscope className="w-6 h-6 mr-3" />
              I'm a Therapist
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Why families and therapists choose Milo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <Card 
                  key={pillar.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group rounded-2xl overflow-hidden"
                  onClick={() => setSelectedPillar(pillar.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${pillar.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{pillar.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                    <Button variant="ghost" className="mt-4 text-purple-600 hover:text-purple-700 p-0">
                      Learn more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Milo Works */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How Milo Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, effective therapy that fits into your family's daily routine
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Therapist Designs Plan</h3>
              <p className="text-gray-600">Weekly goals and exercises tailored specifically to your child's needs and development stage.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Parents Follow at Home</h3>
              <p className="text-gray-600">Daily routines, simple progress logging, and optional video uploads for personalized feedback.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. AI + Community Support</h3>
              <p className="text-gray-600">AI provides insights for therapists and encouragement for families, plus community support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything you need for successful home therapy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted by families and therapists</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust badges */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">Trusted by clinics and families worldwide</p>
            <div className="flex justify-center space-x-8 opacity-60">
              <Badge variant="outline" className="px-4 py-2">Children's Hospital Network</Badge>
              <Badge variant="outline" className="px-4 py-2">Pediatric Therapy Centers</Badge>
              <Badge variant="outline" className="px-4 py-2">Family Care Clinics</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Trust */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Built with privacy in mind</h2>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <p className="text-lg text-gray-700 mb-8">
              Your family controls sharing. All data is encrypted and compliant with GDPR. 
              AI supports care — therapists stay in charge.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-2">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">GDPR Compliant</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Private by Default</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Stethoscope className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Clinician Oversight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Get Started */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-12">Join thousands of families bringing therapy home with Milo</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-pink-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Families</h3>
                <p className="text-gray-600 mb-6">Start with a free pilot program</p>
                <Button 
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl py-3"
                  onClick={() => handleGetStarted('parent')}
                >
                  Start Free Pilot
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8 text-center">
                <Stethoscope className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Therapists</h3>
                <p className="text-gray-600 mb-6">Request a clinical demonstration</p>
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl py-3"
                  onClick={() => handleGetStarted('therapist')}
                >
                  Request Demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 rounded-2xl transition-colors"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div 
                className="flex items-center space-x-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigate('/')}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Milo</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Bringing therapy home, one family at a time.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">For Parents</a></li>
                <li><a href="#" className="hover:text-white transition-colors">For Therapists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">© 2024 Milo. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Globe className="w-4 h-4 text-gray-400" />
              <select className="bg-transparent text-gray-400 text-sm border-none outline-none">
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-purple-100 p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Ready to bring therapy home?</p>
              <p className="text-sm text-gray-600">Join thousands of families using Milo</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl"
                onClick={() => handleGetStarted('parent')}
              >
                I'm a Parent
              </Button>
              <Button 
                variant="outline"
                className="border-purple-300 text-purple-700 rounded-xl"
                onClick={() => handleGetStarted('therapist')}
              >
                I'm a Therapist
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Role Selection Modals */}
      {showRoleModal && (
        <Dialog open={!!showRoleModal} onOpenChange={() => setShowRoleModal(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className={`w-12 h-12 ${showRoleModal === 'parent' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'} rounded-xl flex items-center justify-center mb-4`}>
                {showRoleModal === 'parent' ? (
                  <Heart className="w-6 h-6 text-white" />
                ) : (
                  <Stethoscope className="w-6 h-6 text-white" />
                )}
              </div>
              <DialogTitle>
                {showRoleModal === 'parent' ? 'Welcome, Parent!' : 'Welcome, Therapist!'}
              </DialogTitle>
              <DialogDescription>
                {showRoleModal === 'parent' 
                  ? 'Choose how you\'d like to explore Milo for your family:'
                  : 'Choose how you\'d like to explore Milo for your practice:'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3">
              <Button
                className={`w-full justify-start ${showRoleModal === 'parent' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'} text-white rounded-xl py-3`}
                onClick={() => handleRoleSelection(showRoleModal, 'demo')}
              >
                <Play className="w-5 h-5 mr-3" />
                {showRoleModal === 'parent' ? 'Try Live Demo (as Sarah)' : 'Try Live Demo (as Ana)'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl py-3"
                onClick={() => handleRoleSelection(showRoleModal, 'signup')}
              >
                <UserPlus className="w-5 h-5 mr-3" />
                Create New Account
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start rounded-xl py-3"
                onClick={() => handleRoleSelection(showRoleModal, 'login')}
              >
                <LogIn className="w-5 h-5 mr-3" />
                Sign In to Existing Account
              </Button>
            </div>

            {/* Schedule Call Button */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => handleScheduleCall(showRoleModal)}
              >
                <CalendarDays className="w-5 h-5 mr-3" />
                Schedule a call to learn more
              </Button>
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600">
                {showRoleModal === 'parent' 
                  ? '💡 Try the demo to see how Milo helps families track therapy progress and stay motivated at home.'
                  : '💡 Try the demo to see how Milo helps therapists monitor patient progress and optimize treatment plans.'
                }
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Schedule Call Modal */}
      {showScheduleModal && (
        <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <DialogTitle>Schedule a Call</DialogTitle>
              <DialogDescription>
                Let's discuss how Milo can help your {scheduleForm.role === 'parent' ? 'family' : 'practice'}. 
                Choose a time that works for you.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={scheduleForm.name}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={scheduleForm.email}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <select
                  id="preferredTime"
                  value={scheduleForm.preferredTime}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Input
                  id="message"
                  value={scheduleForm.message}
                  onChange={(e) => setScheduleForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your needs..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl py-3"
              >
                <Clock className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
            </form>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700">
                📞 We'll send you a calendar invite and call you at the scheduled time. 
                The call typically takes 15-30 minutes.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Value Pillar Modals */}
      {selectedPillar && (
        <Dialog open={!!selectedPillar} onOpenChange={() => setSelectedPillar(null)}>
          <DialogContent className="max-w-md">
            {(() => {
              const pillar = valuePillars.find(p => p.id === selectedPillar);
              if (!pillar) return null;
              const IconComponent = pillar.icon;
              return (
                <>
                  <DialogHeader>
                    <div className={`w-12 h-12 bg-gradient-to-r ${pillar.color} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <DialogTitle>{pillar.title}</DialogTitle>
                    <DialogDescription>{pillar.description}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3">
                    {pillar.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{detail}</p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Homepage;