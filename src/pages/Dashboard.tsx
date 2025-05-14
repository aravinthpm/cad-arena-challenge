import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Clock, Trophy, Users } from "lucide-react";
import FeaturedChallenges from "@/components/FeaturedChallenges";
import NavbarUserSearch from "@/components/NavbarUserSearch";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, User!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's a summary of your CAD journey.
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Streak</CardTitle>
                    <CardDescription>Keep your skills sharp!</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                    <Clock className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-2xl font-semibold">7 days</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Current streak
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress value={70} />
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Points Earned</CardTitle>
                    <CardDescription>Your total score</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-semibold">1,450</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total points
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Keep solving challenges to earn more points!
                    </p>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Ranking</CardTitle>
                    <CardDescription>How you stack up</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                    <Users className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="text-2xl font-semibold">Top 15%</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Based on total points
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/leaderboard">
                      <Button variant="outline">View Leaderboard</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Featured Challenges
                </h2>
                <FeaturedChallenges />
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="mt-4">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Challenges
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your progress and explore new challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Gear Design</CardTitle>
                    <CardDescription>
                      Create a simple spur gear with specific dimensions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status: In Progress
                    </p>
                    <Progress value={50} />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Continue Challenge</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ergonomic Handle</CardTitle>
                    <CardDescription>
                      Design an ergonomic handle for a kitchen utensil.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status: Completed
                    </p>
                    <Badge variant="secondary">100 points</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">View Solution</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Parametric Bracket</CardTitle>
                    <CardDescription>
                      Create a fully parameterized corner bracket.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status: Not Started
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button>Start Challenge</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-6 flex justify-center">
                <Link to="/practice">
                  <Button variant="outline">Explore More Challenges</Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-4">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Your Achievements
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Celebrate your accomplishments!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>First Challenge</CardTitle>
                    <CardDescription>Completed your first challenge</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Check className="w-6 h-6 text-green-500" />
                  </CardContent>
                  <CardFooter>
                    <Badge variant="outline">Unlocked</Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Streak Starter</CardTitle>
                    <CardDescription>Completed 3 challenges in a row</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Check className="w-6 h-6 text-green-500" />
                  </CardContent>
                  <CardFooter>
                    <Badge variant="outline">Unlocked</Badge>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>CAD Apprentice</CardTitle>
                    <CardDescription>Earned 500 points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Check className="w-6 h-6 text-green-500" />
                  </CardContent>
                  <CardFooter>
                    <Badge variant="outline">Unlocked</Badge>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
