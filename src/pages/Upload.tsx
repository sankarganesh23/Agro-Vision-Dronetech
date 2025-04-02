
import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Image, X, Loader2, MapPin, Locate } from 'lucide-react';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [fieldId, setFieldId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Detecting location",
        description: "Please allow location access if prompted",
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would convert coordinates to an address
          // using a geocoding service
          const mockLocations = [
            "North Rice Field", 
            "Eastern Plantation", 
            "Western Farm Area", 
            "Southern Cropland"
          ];
          const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
          
          setLocation(randomLocation);
          
          toast({
            title: "Location detected",
            description: `Your location: ${randomLocation}`,
          });
        },
        () => {
          toast({
            title: "Location detection failed",
            description: "Please enter your location manually",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No image selected",
        description: "Please upload an image to analyze",
        variant: "destructive"
      });
      return;
    }
    
    if (!location || !fieldId) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Mock progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);
      
      // Mock API call for image upload and analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast({
        title: "Analysis complete",
        description: "Your rice crop has been successfully analyzed",
      });
      
      // Mock result ID
      const resultId = 'analysis-' + Math.random().toString(36).substring(2, 9);
      navigate(`/results/${resultId}`);
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Something went wrong while analyzing your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <MainLayout title="Upload Rice Crop Image">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in">
            <h2 className="text-lg font-medium mb-4">Upload Drone Image</h2>
            <p className="text-gray-600 mb-6">
              Upload a high-quality drone image of your rice field for disease detection.
              For best results, capture the image during daylight hours.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!previewUrl ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-gray-500 animate-fade-in transition-all hover:border-rice-300 duration-300">
                  <Image className="h-12 w-12 mb-4 text-gray-400" />
                  <p className="mb-2 text-sm">Drag and drop an image, or click to browse</p>
                  <p className="text-xs text-gray-400">PNG, JPG or JPEG (max 10MB)</p>
                  <Input 
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label htmlFor="file-upload" className="mt-4">
                    <div className="bg-rice-50 hover:bg-rice-100 text-rice-700 font-medium py-2 px-4 rounded-md cursor-pointer transition-colors transform hover:scale-[1.02] duration-300">
                      Select Image
                    </div>
                  </Label>
                </div>
              ) : (
                <div className="relative animate-fade-in">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={clearFile}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors transform hover:scale-110 duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in [animation-delay:100ms]">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex">
                    <Input 
                      id="location" 
                      placeholder="e.g., North Field, Block A" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      onClick={handleDetectLocation} 
                      className="rounded-l-none bg-rice-600 hover:bg-rice-700"
                    >
                      <Locate className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field-id">Field ID</Label>
                  <Input 
                    id="field-id" 
                    placeholder="e.g., F-123" 
                    value={fieldId}
                    onChange={(e) => setFieldId(e.target.value)}
                  />
                </div>
              </div>
              
              {isUploading && (
                <div className="animate-fade-in">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-rice-600 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {uploadProgress < 100 
                      ? `Analyzing image... ${Math.round(uploadProgress)}%` 
                      : "Analysis complete! Redirecting..."}
                  </p>
                </div>
              )}
              
              <div className="flex justify-end animate-fade-in [animation-delay:200ms]">
                <Button 
                  type="submit" 
                  className="bg-rice-600 hover:bg-rice-700 transition-all transform hover:scale-[1.02] duration-300" 
                  disabled={!file || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload & Analyze
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="bg-rice-50 p-6 rounded-lg border animate-fade-in [animation-delay:300ms]">
            <h3 className="font-medium mb-2">Tips for Better Results</h3>
            <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
              <li>Capture images during daylight with good lighting conditions</li>
              <li>Ensure the drone is flying at a stable height (recommended: 2-3 meters above crop)</li>
              <li>Include multiple plants in the frame for better contextual analysis</li>
              <li>Avoid strong shadows or overexposed areas in the image</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UploadPage;
