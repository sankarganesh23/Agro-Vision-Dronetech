
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rice-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-rice-700">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for isn't here.</p>
        
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-rice-400">
            <path d="M17.5 8.5c1.5 1.26 2 5 2 5s-3.74.5-5-1c-1.5-1.26-2-5-2-5s3.74-.5 5 1z"></path>
            <path d="M14.5 13.5c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1c1.5-1.26 2-5 2-5"></path>
            <path d="M8.5 15.5c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1z"></path>
          </svg>
        </div>
        
        <p className="my-8 text-gray-600 max-w-md mx-auto">
          The page you're looking for may have been moved, deleted, or it might never have existed.
        </p>
        
        <Link to="/">
          <Button className="bg-rice-600 hover:bg-rice-700">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
