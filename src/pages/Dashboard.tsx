
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { UserRole } from "@/utils/types";
import { useState } from "react";
import StudentDashboard from "./dashboards/StudentDashboard";
import OrganizationDashboard from "./dashboards/OrganizationDashboard";

const Dashboard = () => {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState(UserRole.STUDENT); // For development; in production this would come from auth
  
  // Toggle role for demo purposes
  const toggleRole = () => {
    setUserRole(userRole === UserRole.STUDENT ? UserRole.ORGANIZATION : UserRole.STUDENT);
    toast({
      title: `Switched to ${userRole === UserRole.STUDENT ? "Organization" : "Student"} View`,
      description: "This toggle is for demonstration purposes only."
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {userRole === UserRole.STUDENT ? "John Smith" : "Acme Engineering"}
              </p>
            </div>
            <div>
              {/* Toggle button for demo purposes only */}
              <Button variant="outline" onClick={toggleRole} className="text-xs">
                Switch to {userRole === UserRole.STUDENT ? "Organization" : "Student"} View
              </Button>
            </div>
          </div>

          {userRole === UserRole.STUDENT ? (
            <StudentDashboard />
          ) : (
            <OrganizationDashboard />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
