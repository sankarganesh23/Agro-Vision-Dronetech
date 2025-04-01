
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BarChart, Upload, AlertTriangle, Check } from 'lucide-react';

// Mock data for the demo
const mockAnalysisData = [
  {
    id: 'analysis-001',
    cropName: 'Rice',
    date: '2023-10-12',
    location: 'Field A',
    status: 'Diseased',
    disease: 'Leaf Blight',
    image: '/lovable-uploads/9f546f95-1f2c-4623-ab37-6ebaad56cf8e.png'
  },
  {
    id: 'analysis-002',
    cropName: 'Rice',
    date: '2023-10-15',
    location: 'Field B',
    status: 'Healthy',
    disease: null,
    image: '/lovable-uploads/4d05e7a4-06b2-4e87-acf0-28ecea5121a6.png'
  },
  {
    id: 'analysis-003',
    cropName: 'Rice',
    date: '2023-10-18',
    location: 'Field C',
    status: 'Diseased',
    disease: 'Brown Spot',
    image: '/lovable-uploads/1bd73c41-65f4-4603-823f-c4d9e728a374.png'
  }
];

const Dashboard = () => {
  const totalAnalyses = mockAnalysisData.length;
  const healthyAnalyses = mockAnalysisData.filter(analysis => analysis.status === 'Healthy').length;
  const diseasedAnalyses = totalAnalyses - healthyAnalyses;
  const detectionAccuracy = 96; // Mock accuracy percentage

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Analyses
              </CardTitle>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground">
                <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3C2.44772 3 2 3.44772 2 4V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V4C13 3.44772 12.5523 3 12 3H3ZM3 4H12V12H3V4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAnalyses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Healthy Crops
              </CardTitle>
              <Check className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthyAnalyses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issues Detected
              </CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{diseasedAnalyses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Detection Accuracy
              </CardTitle>
              <BarChart className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{detectionAccuracy}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action */}
        <div className="flex justify-end">
          <Link to="/upload">
            <Button className="bg-rice-600 hover:bg-rice-700">
              <Upload className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </Link>
        </div>

        {/* Recent Analyses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Analyses</h2>
          <p className="text-gray-600 mb-6">View and manage your recent crop analyses</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAnalysisData.map((analysis) => (
              <div 
                key={analysis.id}
                className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={analysis.image} 
                    alt={analysis.cropName} 
                    className="w-full h-48 object-cover"
                  />
                  <span 
                    className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${
                      analysis.status === 'Healthy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {analysis.status}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-lg">{analysis.cropName}</h3>
                  <p className="text-gray-600 text-sm">{analysis.date}</p>
                  
                  {analysis.disease && (
                    <div className="flex items-center mt-3 text-red-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span>{analysis.disease}</span>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Link to={`/results/${analysis.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
