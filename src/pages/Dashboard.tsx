
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { UserRole } from "@/utils/types";
import { PlusCircle, Trophy, ChevronRight, Users, Clock, CalendarDays } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  // For demo purposes, let's simulate both user types
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);

  // For demo purposes, allow switching between user roles
  const toggleUserRole = () => {
    setUserRole(userRole === UserRole.STUDENT ? UserRole.ORGANIZATION : UserRole.STUDENT);
  };

  // Render different dashboard based on user role
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          {/* Demo switcher - would be removed in production */}
          <div className="mb-6 flex justify-center">
            <Button onClick={toggleUserRole} variant="outline">
              Switch to {userRole === UserRole.STUDENT ? "Organization" : "Student"} Dashboard
            </Button>
          </div>

          {userRole === UserRole.STUDENT ? (
            <StudentDashboardContent />
          ) : (
            <OrganizationDashboardContent />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const StudentDashboardContent = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, John Smith
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">My Challenges</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">7</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">days</span>
                </div>
                <Progress value={70} className="h-1 mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Challenges Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">24</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">/ 120</span>
                </div>
                <Progress value={20} className="h-1 mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">3,450</span>
                  <span className="ml-2 text-sm text-green-500 dark:text-green-400">+250 last week</span>
                </div>
                <Progress value={35} className="h-1 mt-4" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Completed Challenge: Basic Gear Design",
                      date: "Today, 9:30 AM",
                      points: "+100",
                    },
                    {
                      title: "Registered for Competition: Automotive Parts Design",
                      date: "Yesterday, 2:15 PM",
                    },
                    {
                      title: "Earned Achievement: 7-Day Streak",
                      date: "May 10, 10:45 AM",
                      achievement: true,
                    },
                    {
                      title: "Completed Challenge: Ergonomic Handle",
                      date: "May 8, 4:20 PM",
                      points: "+200",
                    },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cadarena-100 dark:bg-cadarena-900 flex items-center justify-center mr-4">
                        <span className="text-xs font-bold text-cadarena-600 dark:text-cadarena-400">
                          {activity.achievement ? "🏆" : "✓"}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.date}
                        </p>
                      </div>
                      {activity.points && (
                        <div className="flex-shrink-0">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
                            {activity.points}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Competitions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Automotive Parts Design",
                      organizer: "Tesla Motors",
                      date: "Starts in 2 days",
                    },
                    {
                      title: "Sustainable Product Design",
                      organizer: "Green Engineering Institute",
                      date: "Starts in 5 days",
                    },
                  ].map((competition, i) => (
                    <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {competition.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {competition.organizer}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-cadarena-600 dark:text-cadarena-400">
                          {competition.date}
                        </span>
                        <Link to={`/competitions`}>
                          <Button variant="ghost" size="sm" className="h-7">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link to="/competitions">
                    <Button variant="outline" size="sm" className="w-full">
                      Browse All Competitions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Mechanical Assembly Design",
                    level: "Intermediate",
                    points: 150,
                  },
                  {
                    title: "Aircraft Wing Profile",
                    level: "Advanced",
                    points: 300,
                  },
                  {
                    title: "Adjustable Desk Lamp",
                    level: "Intermediate",
                    points: 200,
                  },
                ].map((challenge, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {challenge.title}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className={
                        challenge.level === "Beginner" ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800" :
                        challenge.level === "Intermediate" ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800" :
                        "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800"
                      }>
                        {challenge.level}
                      </Badge>
                      <Badge variant="outline" className="bg-cadarena-50 text-cadarena-700 border-cadarena-200 dark:bg-cadarena-900 dark:text-cadarena-300 dark:border-cadarena-800">
                        {challenge.points} pts
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <Link to={`/practice`}>
                        <Button size="sm" className="w-full">
                          Start Challenge
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/practice">
                  <Button variant="outline" className="w-full">
                    View All Practice Challenges
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="challenges">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Challenges</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Track your progress and continue working on challenges.
          </p>
        </TabsContent>
        
        <TabsContent value="competitions">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Competitions</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            View competitions you've registered for and their status.
          </p>
        </TabsContent>
        
        <TabsContent value="achievements">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            View your earned badges and achievements.
          </p>
        </TabsContent>
      </Tabs>
    </>
  );
};

const OrganizationDashboardContent = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, Acme Inc
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="contests">My Contests</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Active Contests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">2</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">156</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Submissions Received
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">89</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link to="/create-challenge">
                    <Button className="w-full flex items-center justify-start">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Challenge
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full flex items-center justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Manage Practice Modules
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-start">
                    <Trophy className="mr-2 h-4 w-4" />
                    Issue Certificates
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Access Groups
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      challengeTitle: "Mechanical Assembly Design",
                      userName: "Robert Chen",
                      time: "2 hours ago",
                      status: "pending",
                    },
                    {
                      challengeTitle: "Aircraft Wing Profile",
                      userName: "Lisa Johnson",
                      time: "5 hours ago",
                      status: "correct",
                    },
                    {
                      challengeTitle: "Ergonomic Handle",
                      userName: "Michael Smith",
                      time: "Yesterday",
                      status: "incorrect",
                    },
                  ].map((submission, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {submission.challengeTitle}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {submission.userName} • {submission.time}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          submission.status === "correct" ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800" :
                          submission.status === "incorrect" ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800" :
                          "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800"
                        }
                      >
                        {submission.status === "correct" ? "Correct" : 
                         submission.status === "incorrect" ? "Incorrect" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Challenge Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Mechanical Assembly Design",
                    submissions: 48,
                    successRate: 65,
                    avgTime: "22 min",
                  },
                  {
                    title: "Aircraft Wing Profile",
                    submissions: 32,
                    successRate: 42,
                    avgTime: "38 min",
                  },
                  {
                    title: "Ergonomic Handle",
                    submissions: 76,
                    successRate: 81,
                    avgTime: "16 min",
                  },
                ].map((challenge, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {challenge.title}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {challenge.submissions} submissions
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Success Rate</span>
                        <span>{challenge.successRate}%</span>
                      </div>
                      <Progress value={challenge.successRate} className="h-1" />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Avg. completion time: <span className="font-medium">{challenge.avgTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contests">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Challenges</h2>
            <Link to="/create-challenge">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Challenge
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Mechanical Assembly Design</h3>
                <Badge className="mb-2" variant="outline">Intermediate</Badge>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  Design a mechanical assembly with specific constraints and functionality.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    48 submissions
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Aircraft Wing Profile</h3>
                <Badge className="mb-2" variant="outline">Advanced</Badge>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  Create an optimized wing profile according to aerodynamic requirements.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    32 submissions
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Ergonomic Handle</h3>
                <Badge className="mb-2" variant="outline">Intermediate</Badge>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  Design an ergonomic handle for a kitchen utensil that fits comfortably in the hand.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    76 submissions
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="participants">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Participants</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Monitor participant performance and engagement
          </p>
        </TabsContent>
        
        <TabsContent value="certificates">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Certificates</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Manage certificates and awards for participants
          </p>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Dashboard;
