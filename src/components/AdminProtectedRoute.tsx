
import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const adminStatus = sessionStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
    
    if (!adminStatus || adminStatus !== 'true') {
      toast({
        title: "Access Denied",
        description: "You need administrator privileges to access this page",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Show loading or nothing while checking
  if (isAdmin === null) {
    return null;
  }

  return isAdmin ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

export default AdminProtectedRoute;
