
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, Upload, BarChart, User, LogOut, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      duration: 2000,
    });
  };

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Farmer Details', path: '/farmer-details', icon: Users },
    { name: 'Upload', path: '/upload', icon: Upload },
    { name: 'Results', path: '/results/latest', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-rice-700 text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rice-700">
                <path d="M17.5 8.5c1.5 1.26 2 5 2 5s-3.74.5-5-1c-1.5-1.26-2-5-2-5s3.74-.5 5 1z" />
                <path d="M14.5 13.5c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1c1.5-1.26 2-5 2-5" />
                <path d="M8.5 15.5c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1z" />
              </svg>
            </div>
            <span className="text-lg font-medium">Agrovision</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user && navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-1 text-white/80 hover:text-white transition-colors",
                  location.pathname === item.path && "text-white font-medium"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            {user ? (
              <Button 
                variant="ghost" 
                onClick={handleLogout} 
                className="text-white/80 hover:text-white hover:bg-rice-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className="text-white/80 hover:text-white hover:bg-rice-600"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden bg-rice-700 pb-3 px-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          {user && navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-2 py-2 text-white/80 hover:text-white",
                location.pathname === item.path && "text-white font-medium"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
          {user ? (
            <button 
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex w-full items-center space-x-2 py-2 text-white/80 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          ) : (
            <Link 
              to="/login"
              className="flex items-center space-x-2 py-2 text-white/80 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {title && (
          <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-rice-50 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Agrovision. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
