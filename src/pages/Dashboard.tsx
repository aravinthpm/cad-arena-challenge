
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { UserRole } from "@/utils/types";

const Dashboard = () => {
  const { toast } = useToast();
  const userRole = UserRole.STUDENT; // This will come from authentication

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {userRole === UserRole.STUDENT ? "John Smith" : "Acme Inc"}
            </p>
          </div>

          {userRole === UserRole.STUDENT ? (
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
          ) : (
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
                
                {/* Organization dashboard content would go here */}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
