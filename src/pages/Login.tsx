
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rice-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center">
            <div className="bg-rice-700 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M17.5 8.5c1.5 1.26 2 5 2 5s-3.74.5-5-1c-1.5-1.26-2-5-2-5s3.74-.5 5 1z" />
                <path d="M14.5 13.5c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1c1.5-1.26 2-5 2-5" />
                <path d="M8.5 15.5c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1z" />
              </svg>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mt-6">Sign in to Rice Disease Guardian</h1>
          <p className="text-gray-600 mt-2">
            Enter your credentials to access your account
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-rice-600 focus:ring-rice-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-rice-600 hover:text-rice-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-rice-600 hover:bg-rice-700"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-rice-600 hover:text-rice-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
