
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleDemoSignup = (userType: "student" | "organization") => {
    setIsSigningUp(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Store user type in session storage (this would be a JWT token in a real app)
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("isLoggedIn", "true");
      
      setIsSigningUp(false);
      
      toast({
        title: "Account created successfully",
        description: `You've signed up with a demo ${userType} account.`,
      });
      
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <AuthForm mode="signup" />
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                  Quick Demo Signup
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoSignup("student")}
                disabled={isSigningUp}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {isSigningUp ? "Creating..." : "Student Demo"}
              </button>
              <button
                onClick={() => handleDemoSignup("organization")}
                disabled={isSigningUp}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {isSigningUp ? "Creating..." : "Organization Demo"}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
