import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users with proper names
const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    role: 'parent',
    createdDate: '2024-01-15',
    lastModifiedDate: '2024-01-15',
    childrenProfiles: [
      {
        id: 'child1',
        name: 'Emma',
        age: 6,
        therapyDomains: ['balance', 'fine-motor', 'mobility'],
        currentTheme: 'flowers'
      }
    ]
  },
  {
    id: '2',
    email: 'dr.martinez@example.com',
    name: 'Ana',
    role: 'therapist',
    createdDate: '2024-01-10',
    lastModifiedDate: '2024-01-10'
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Thompson',
    role: 'parent',
    createdDate: '2024-01-12',
    lastModifiedDate: '2024-01-12',
    childrenProfiles: [
      {
        id: 'child2',
        name: 'Alex',
        age: 8,
        therapyDomains: ['gross-motor', 'balance', 'coordination'],
        currentTheme: 'cars'
      }
    ]
  },
  {
    id: '4',
    email: 'lisa@example.com',
    name: 'Lisa Chen',
    role: 'parent',
    createdDate: '2024-01-08',
    lastModifiedDate: '2024-01-08',
    childrenProfiles: [
      {
        id: 'child3',
        name: 'Sophia',
        age: 5,
        therapyDomains: ['fine-motor', 'cognitive', 'speech'],
        currentTheme: 'dinosaurs'
      }
    ]
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('miloUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('miloUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock authentication - find user by email
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('miloUser', JSON.stringify(foundUser));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('miloUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};