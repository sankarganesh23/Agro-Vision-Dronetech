
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Check, SendHorizontal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Updated mock data with correct image paths
const mockPredictions = {
  'analysis-001': {
    id: 'analysis-001',
    cropName: 'Rice',
    date: '2023-10-12',
    location: 'Field A',
    disease: 'Leaf Blight',
    confidence: 92,
    severity: 'Medium',
    imageUrl: '/lovable-uploads/9f546f95-1f2c-4623-ab37-6ebaad56cf8e.png',
    solutions: [
      'Apply fungicides containing tricyclazole',
      'Ensure proper drainage around plants',
      'Maintain proper water management',
      'Use balanced fertilization'
    ]
  },
  'analysis-002': {
    id: 'analysis-002',
    cropName: 'Rice',
    date: '2023-10-15',
    location: 'Field B',
    disease: null,
    confidence: 89,
    severity: null,
    imageUrl: '/lovable-uploads/4d05e7a4-06b2-4e87-acf0-28ecea5121a6.png',
    solutions: [
      'Continue current cultivation practices',
      'Regularly monitor for any signs of disease',
      'Maintain good irrigation practices'
    ]
  },
  'analysis-003': {
    id: 'analysis-003',
    cropName: 'Rice',
    date: '2023-10-18',
    location: 'Field C',
    disease: 'Brown Spot',
    confidence: 95,
    severity: 'High',
    imageUrl: '/lovable-uploads/1bd73c41-65f4-4603-823f-c4d9e728a374.png',
    solutions: [
      'Apply recommended fungicides immediately',
      'Improve field drainage to reduce humidity',
      'Consider increasing spacing between plants',
      'Apply balanced NPK fertilizers'
    ]
  },
  'latest': {
    id: 'latest',
    cropName: 'Rice',
    date: '2023-10-18',
    location: 'Field C',
    disease: 'Brown Spot',
    confidence: 95,
    severity: 'High',
    imageUrl: '/lovable-uploads/1bd73c41-65f4-4603-823f-c4d9e728a374.png',
    solutions: [
      'Apply recommended fungicides immediately',
      'Improve field drainage to reduce humidity',
      'Consider increasing spacing between plants',
      'Apply balanced NPK fertilizers'
    ]
  }
};

const Results = () => {
  const { id = 'analysis-001' } = useParams();
  const prediction = mockPredictions[id as keyof typeof mockPredictions] || mockPredictions['analysis-001'];
  const isHealthy = !prediction.disease;
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendSMS = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Report Sent",
        description: `The report has been sent to ${phoneNumber}`,
        variant: "default",
      });
      
      setIsDialogOpen(false);
      setPhoneNumber('');
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "There was an error sending the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <MainLayout title="Prediction Result">
      <div className="bg-rice-700 text-white -mt-6 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Prediction Result</h1>
          <h2 className="text-xl text-center opacity-90 mb-10">
            {isHealthy ? 'Healthy Rice Plant Detected' : `Detected Disease: ${prediction.disease}`}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <img 
                  src={prediction.imageUrl} 
                  alt="Rice plant sample" 
                  className="rounded-md w-full h-64 object-cover" 
                />
                <div className="mt-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M17.5 8.5c1.5 1.26 2 5 2 5s-3.74.5-5-1c-1.5-1.26-2-5-2-5s3.74-.5 5 1z"></path>
                      <path d="M14 14c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1"></path>
                    </svg>
                    <span className="font-medium">Rice Plant Sample</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Analysis Confidence</h3>
                  <div className="flex items-center space-x-2">
                    <Progress value={prediction.confidence} className="h-2" />
                    <span className="text-lg font-bold">{prediction.confidence}%</span>
                  </div>
                </div>
                
                {prediction.severity && (
                  <div className="flex items-center">
                    <AlertTriangle className={`h-5 w-5 ${
                      prediction.severity === 'Low' ? 'text-yellow-300' : 
                      prediction.severity === 'Medium' ? 'text-orange-300' : 
                      'text-red-300'
                    } mr-2`} />
                    <span className={`font-medium ${
                      prediction.severity === 'Low' ? 'text-yellow-300' : 
                      prediction.severity === 'Medium' ? 'text-orange-300' : 
                      'text-red-300'
                    }`}>
                      {prediction.severity} Severity
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="flex items-center mb-4">
                  {isHealthy ? (
                    <>
                      <Check className="h-5 w-5 mr-2 text-green-300" />
                      <span className="font-medium">Recommendations</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" x2="12" y1="8" y2="12"/>
                        <line x1="12" x2="12.01" y1="16" y2="16"/>
                      </svg>
                      <span className="font-medium">Suggested Solution</span>
                    </>
                  )}
                </h3>
                
                <ul className="space-y-3">
                  {prediction.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-300 mt-0.5 flex-shrink-0" />
                      <span>{solution}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 space-y-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Apply Solution
                  </Button>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <SendHorizontal className="h-4 w-4 mr-2" />
                    Send Report via SMS
                  </Button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <h3 className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M3 3v18h18"/>
                    <path d="m19 9-5 5-4-4-3 3"/>
                  </svg>
                  <span className="font-medium">Disease Spread Analysis</span>
                </h3>
                
                <div className="h-40 mt-2 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 120">
                    <line x1="40" y1="100" x2="290" y2="100" stroke="white" strokeWidth="1" opacity="0.5" />
                    <line x1="40" y1="20" x2="40" y2="100" stroke="white" strokeWidth="1" opacity="0.5" />
                    
                    <polyline
                      points="
                        40,100
                        80,90
                        120,80
                        160,60
                        200,70
                        240,75
                        280,80
                      "
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                    />
                    
                    <circle cx="40" cy="100" r="4" fill="#10B981" />
                    <circle cx="80" cy="90" r="4" fill="#10B981" />
                    <circle cx="120" cy="80" r="4" fill="#10B981" />
                    <circle cx="160" cy="60" r="4" fill="#10B981" />
                    <circle cx="200" cy="70" r="4" fill="#10B981" />
                    <circle cx="240" cy="75" r="4" fill="#10B981" />
                    <circle cx="280" cy="80" r="4" fill="#10B981" />
                    
                    <text x="40" y="115" fontSize="10" fill="white" textAnchor="middle">Oct 1</text>
                    <text x="120" y="115" fontSize="10" fill="white" textAnchor="middle">Oct 8</text>
                    <text x="200" y="115" fontSize="10" fill="white" textAnchor="middle">Oct 15</text>
                    <text x="280" y="115" fontSize="10" fill="white" textAnchor="middle">Oct 22</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Crop Information</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Crop Type</dt>
                  <dd>{prediction.cropName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Analysis Date</dt>
                  <dd>{prediction.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Location</dt>
                  <dd>{prediction.location}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Environmental Factors</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Temperature</dt>
                  <dd>28°C</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Humidity</dt>
                  <dd>65%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Soil pH</dt>
                  <dd>6.5</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Prevention Measures</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Regular crop rotation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Proper field sanitation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Use of disease-resistant varieties</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => window.print()}>
            Print Report
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Report via SMS</DialogTitle>
            <DialogDescription>
              Enter a phone number to send this report to the farmer or customer.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input 
                id="phone"
                placeholder="Enter mobile number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
              />
              <p className="text-sm text-muted-foreground">
                Format: Country code + number (e.g., +1234567890)
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSendSMS} 
              disabled={isSending}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  Send Report
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Results;
