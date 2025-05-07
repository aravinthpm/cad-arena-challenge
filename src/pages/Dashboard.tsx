
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import { Link } from "react-router-dom";
import { Book, Code, Trophy, Users } from "lucide-react";
import RecommendedUsers from "@/components/RecommendedUsers";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-6 md:py-12">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 sm:mb-0">Dashboard</h1>
            <div className="space-x-2">
              <Button variant="outline" asChild>
                <Link to="/practice"><Code className="mr-2 h-4 w-4" /> Practice</Link>
              </Button>
              <Button asChild>
                <Link to="/competitions"><Trophy className="mr-2 h-4 w-4" /> Competitions</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completed</dt>
                      <dd className="text-3xl font-bold">12</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Level</dt>
                      <dd className="text-3xl font-bold">4</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Streak</dt>
                      <dd className="text-3xl font-bold">7</dd>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Points</dt>
                      <dd className="text-3xl font-bold">1,250</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <RecommendedUsers />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <FeaturedChallenges maxItems={3} />
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Connect with other designers and organizations to grow your network.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button asChild>
                      <Link to="/search">Find Users</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/leaderboard">View Leaderboard</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Learning Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">CAD Basics</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Learn the fundamentals of 3D modeling.</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/documentation#basics">Learn More</Link>
                      </Button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Advanced Techniques</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Master complex modeling workflows.</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/documentation#advanced">Learn More</Link>
                      </Button>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Design Principles</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Apply visual design theory to 3D models.</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/documentation#principles">Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
