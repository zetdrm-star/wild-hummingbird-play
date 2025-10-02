import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Stethoscope, ArrowLeft, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { showError, showSuccess } from '@/utils/toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');

  useEffect(() => {
    // Pre-fill email based on role parameter
    if (roleParam === 'parent') {
      setEmail('sarah@example.com');
      setPassword('password');
    } else if (roleParam === 'therapist') {
      setEmail('dr.martinez@example.com');
      setPassword('password');
    }
  }, [roleParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        showSuccess('Welcome to Milo! 🌟');
        // Navigate to appropriate dashboard based on email
        if (email.toLowerCase() === 'sarah@example.com') {
          navigate('/parent-dashboard');
        } else if (email.toLowerCase() === 'dr.martinez@example.com') {
          navigate('/therapist-dashboard');
        } else {
          navigate('/'); // fallback
        }
      } else {
        showError('Invalid credentials. Try the demo accounts below.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleQuickLogin = async (userEmail: string, roleName: string, dashboardRoute: string) => {
    setIsLoading(true);
    
    try {
      console.log(`Attempting quick login for ${userEmail}`);
      const success = await login(userEmail, 'password');
      
      if (success) {
        showSuccess(`Welcome to Milo! Logging in as ${roleName}... 🌟`);
        navigate(dashboardRoute);
      } else {
        showError(`Failed to login as ${roleName}. Please try again.`);
      }
    } catch (error) {
      console.error('Quick login error:', error);
      showError('Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Milo</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="rounded-full border-gray-200 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome to Milo
            </CardTitle>
            <CardDescription className="text-gray-600">
              {roleParam === 'parent' && "Sign in to start your family's therapy journey"}
              {roleParam === 'therapist' && "Sign in to enhance your practice"}
              {!roleParam && "Your AI companion for bringing therapy home"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <Button 
                type="submit" 
                className={`w-full rounded-xl text-white font-medium py-2.5 ${
                  roleParam === 'therapist' 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="space-y-3 pt-4 border-t border-gray-100 mt-6">
              <p className="text-sm text-gray-500 text-center">Quick demo access:</p>
              
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-blue-200 hover:bg-blue-50 text-blue-700"
                  onClick={() => handleQuickLogin('sarah@example.com', 'Parent', '/parent-dashboard')}
                  disabled={isLoading}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  {isLoading ? 'Signing in...' : 'Parent Dashboard (Sarah)'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl border-purple-200 hover:bg-purple-50 text-purple-700"
                  onClick={() => handleQuickLogin('dr.martinez@example.com', 'Therapist', '/therapist-dashboard')}
                  disabled={isLoading}
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  {isLoading ? 'Signing in...' : 'Therapist Dashboard (Ana)'}
                </Button>
              </div>
              
              <div className="text-xs text-gray-400 text-center mt-2">
                Demo accounts - no real authentication required
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;