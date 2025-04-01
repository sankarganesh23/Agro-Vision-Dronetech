
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("riceGuardianUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock authentication functions (would connect to a backend in production)
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock successful login
      const mockUser = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email: email,
      };
      
      // Save to local storage
      localStorage.setItem("riceGuardianUser", JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Mock successful signup
      const mockUser = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email: email,
        name: name,
      };
      
      // Save to local storage
      localStorage.setItem("riceGuardianUser", JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("riceGuardianUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
