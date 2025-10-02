import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Homepage from '@/components/Homepage';
import ParentDashboard from '@/components/ParentDashboard';
import TherapistDashboard from '@/components/TherapistDashboard';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw } from 'lucide-react';

const Index = () => {
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    // Debug logging
    console.log('Index component - User state:', user);
    console.log('Index component - Is loading:', isLoading);
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading Milo...</p>
        </div>
      </div>
    );
  }

  // Show homepage if user is not logged in
  if (!user) {
    console.log('No user found, showing homepage');
    return <Homepage />;
  }

  console.log('User found, showing dashboard for role:', user.role);

  // Show appropriate dashboard if user is logged in
  return (
    <div className="relative">
      {/* Logout Button */}
      <div className="fixed top-4 right-4 z-50">
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

      {/* Render appropriate dashboard based on user role */}
      {user.role === 'parent' ? <ParentDashboard /> : <TherapistDashboard />}
    </div>
  );
};

export default Index;