
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, BarChart, Upload, AlertTriangle, 
  Check, Calendar, Settings, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mock data for admin dashboard
const mockFarmers = [
  { id: 1, name: 'John Smith', location: 'Northern Fields', phone: '+1234567890' },
  { id: 2, name: 'Maria Garcia', location: 'Western Province', phone: '+1987654321' },
  { id: 3, name: 'Rajesh Kumar', location: 'Eastern District', phone: '+9876543210' },
];

const mockAnalyses = [
  { id: 'analysis-001', date: '2023-10-12', status: 'Completed', disease: 'Leaf Blight' },
  { id: 'analysis-002', date: '2023-10-15', status: 'Completed', disease: null },
  { id: 'analysis-003', date: '2023-10-18', status: 'Completed', disease: 'Brown Spot' },
  { id: 'latest', date: '2023-10-20', status: 'Pending', disease: 'Processing...' },
];

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated as admin
    const adminStatus = sessionStorage.getItem('isAdmin');
    
    if (!adminStatus || adminStatus !== 'true') {
      toast({
        title: "Access Denied",
        description: "You must be an administrator to view this page",
        variant: "destructive",
      });
      navigate('/admin-login');
    } else {
      setIsAdmin(true);
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin dashboard",
    });
    navigate('/');
  };

  if (!isAdmin) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <MainLayout title="Admin Dashboard">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Administrator Control Panel</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Farmers
              </CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockFarmers.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Analyses
              </CardTitle>
              <BarChart className="h-5 w-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalyses.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:200ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Detected Diseases
              </CardTitle>
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalyses.filter(a => a.disease && a.disease !== 'Processing...').length}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in [animation-delay:300ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Healthy Results
              </CardTitle>
              <Check className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalyses.filter(a => a.disease === null).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyses.map(analysis => (
                  <div key={analysis.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium">Analysis #{analysis.id}</p>
                      <p className="text-sm text-gray-500">{analysis.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      analysis.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {analysis.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2 animate-fade-in [animation-delay:100ms]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Registered Farmers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2 font-medium">Name</th>
                      <th className="p-2 font-medium">Location</th>
                      <th className="p-2 font-medium">Phone</th>
                      <th className="p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFarmers.map(farmer => (
                      <tr key={farmer.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{farmer.name}</td>
                        <td className="p-2">{farmer.location}</td>
                        <td className="p-2">{farmer.phone}</td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Settings className="h-3 w-3 mr-1" />
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="border rounded-md p-4">
          <h2 className="font-medium mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-rice-600 hover:bg-rice-700 animate-fade-in transition-all duration-300 transform hover:scale-[1.02]">
              <Users className="h-4 w-4 mr-2" />
              Add New Farmer
            </Button>
            <Button variant="outline" className="animate-fade-in [animation-delay:100ms] transition-all duration-300 transform hover:scale-[1.02]">
              <Upload className="h-4 w-4 mr-2" />
              View All Uploads
            </Button>
            <Button variant="outline" className="animate-fade-in [animation-delay:200ms] transition-all duration-300 transform hover:scale-[1.02]">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics Report
            </Button>
            <Button variant="outline" className="animate-fade-in [animation-delay:300ms] transition-all duration-300 transform hover:scale-[1.02]">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
