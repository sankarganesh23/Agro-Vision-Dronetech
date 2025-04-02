
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationDetectorProps {
  onLocationDetected: (lat: number, lng: number) => void;
}

const LocationDetector = ({ onLocationDetected }: LocationDetectorProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = () => {
    setIsDetecting(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsDetecting(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationDetected(latitude, longitude);
        setIsDetecting(false);
      },
      (err) => {
        console.error("Error getting location", err);
        setError("Unable to retrieve your location. Please allow location access or enter coordinates manually.");
        setIsDetecting(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Button 
          type="button"
          onClick={detectLocation}
          disabled={isDetecting}
          variant="outline"
          className="flex items-center space-x-2"
        >
          {isDetecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Detecting location...</span>
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4" />
              <span>Detect My Location</span>
            </>
          )}
        </Button>
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default LocationDetector;
