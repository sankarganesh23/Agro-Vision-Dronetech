import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Leaf } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="bg-rice-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Protect Your Rice Plants with AI</h1>
              <p className="text-lg mb-8">
                Upload drone images of your rice crops for instant disease detection and treatment recommendations. Increase yield through early detection.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-white text-rice-700 hover:bg-rice-100">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button size="lg" className="bg-white text-rice-700 hover:bg-rice-100">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-rice-600">
                        Create Account
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-rice-600 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                <Leaf className="w-32 h-32 text-white mb-4" />
                <h2 className="text-2xl font-bold text-white">Agrovision</h2>
                <p className="text-white/80 text-center mt-2">AI-Powered Rice Crop Disease Detection</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Upload",
                description: "Upload drone images of your rice fields using our simple interface.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rice-600">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                )
              },
              {
                title: "Analyze",
                description: "Our AI model analyzes the images to detect common rice plant diseases with high accuracy.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rice-600">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                )
              },
              {
                title: "Treatment",
                description: "Get immediate treatment recommendations and solutions for detected diseases.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rice-600">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                )
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Disease types */}
      <section className="py-16 bg-rice-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Common Rice Diseases We Detect</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our system is trained to recognize the most common rice plant diseases with high accuracy.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Rice Blast", confidence: "96%" },
              { name: "Bacterial Leaf Blight", confidence: "94%" },
              { name: "Brown Spot", confidence: "92%" },
              { name: "Leaf Smut", confidence: "91%" },
              { name: "Tungro", confidence: "89%" },
              { name: "Sheath Blight", confidence: "90%" }
            ].map((disease, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className="w-12 h-12 rounded-full bg-rice-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rice-600">
                    <path d="M17.5 8.5c1.5 1.26 2 5 2 5s-3.74.5-5-1c-1.5-1.26-2-5-2-5s3.74-.5 5 1z"></path>
                    <path d="M14 14c-1.5-1.26-2-5-2-5s-3.74.5-5 1c-1.5 1.26-2 5-2 5s3.74-.5 5-1"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">{disease.name}</h3>
                  <p className="text-sm text-gray-500">Detection accuracy: {disease.confidence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-rice-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to protect your crops?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are using our AI system to detect rice plant diseases early and increase their yields.
          </p>
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-rice-700 hover:bg-rice-100">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-rice-700 hover:bg-rice-100">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-rice-600">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-lg mb-2">Rice Disease Guardian</h3>
              <p className="text-gray-400 max-w-xs">
                Protecting your rice crops through advanced AI disease detection technology.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Rice Disease Guardian. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
