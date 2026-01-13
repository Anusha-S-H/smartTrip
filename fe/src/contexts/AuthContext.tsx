import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo
const mockUsers: { [email: string]: { id: string; name: string; email: string; password: string } } = {};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('tripbudget_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingUser = mockUsers[email];
    if (existingUser && existingUser.password === password) {
      const userData = { id: existingUser.id, name: existingUser.name, email: existingUser.email };
      setUser(userData);
      localStorage.setItem('tripbudget_user', JSON.stringify(userData));
      return { success: true };
    }

    // For demo: auto-create user if not exists
    if (!existingUser) {
      return { success: false, error: 'No account found with this email. Please sign up first.' };
    }

    return { success: false, error: 'Invalid email or password.' };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mockUsers[email]) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
    };

    mockUsers[email] = newUser;
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userData);
    localStorage.setItem('tripbudget_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tripbudget_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
