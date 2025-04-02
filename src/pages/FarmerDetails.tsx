
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Loader2 } from 'lucide-react';
import LocationDetector from '@/components/LocationDetector';

const FarmerDetails = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (!coordinates) {
      toast({
        title: "Location required",
        description: "Please detect or enter your location coordinates",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you'd save this to a database
      console.log("Farmer Details:", {
        name,
        phone,
        location,
        coordinates
      });
      
      // Mock success for demo purposes
      setTimeout(() => {
        toast({
          title: "Details saved successfully",
          description: "You can now proceed to upload your crop image",
        });
        navigate('/upload');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Error saving details",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout title="Farmer Details">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-medium mb-4">Enter Your Details</h2>
          <p className="text-gray-600 mb-6">
            Please provide your information before uploading crop images. This helps us track and manage disease detection for your fields.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your contact number" 
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Field Location Name</Label>
              <Input 
                id="location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., North Field, Block A" 
                required
              />
            </div>
            
            <LocationDetector 
              onLocationDetected={(lat, lng) => {
                setCoordinates({ lat, lng });
                toast({
                  title: "Location detected",
                  description: `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`,
                });
              }} 
            />
            
            {coordinates && (
              <div className="bg-rice-50 p-4 rounded-md border border-rice-200">
                <div className="flex items-center text-rice-700">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="font-medium">Coordinates detected:</span>
                </div>
                <p className="mt-1 text-gray-600">
                  Latitude: {coordinates.lat.toFixed(6)}, Longitude: {coordinates.lng.toFixed(6)}
                </p>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <Button 
                type="submit" 
                className="bg-rice-600 hover:bg-rice-700" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save & Continue"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default FarmerDetails;
