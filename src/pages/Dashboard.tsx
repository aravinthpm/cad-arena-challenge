import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { UserRole, ChallengeLevel, ChallengeStatus } from "@/utils/types";
import { useState } from "react";
import { 
  Search, 
  Award, 
  Users, 
  Certificate, 
  PenTool, 
  Briefcase, 
  GraduationCap 
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState(UserRole.ORGANIZATION); // For development; in production this would come from auth
  
  // Toggle role for demo purposes
  const toggleRole = () => {
    setUserRole(userRole === UserRole.STUDENT ? UserRole.ORGANIZATION : UserRole.STUDENT);
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
            // Student dashboard content
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="challenges">My Challenges</TabsTrigger>
                <TabsTrigger value="competitions">Competitions</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                {/* Student dashboard overview content */}
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
            // Organization dashboard content - completely redesigned
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contests">Competitions</TabsTrigger>
                <TabsTrigger value="practice">Practice Modules</TabsTrigger>
                <TabsTrigger value="talent">Talent Pool</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="groups">Access Groups</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Active Competitions
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
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          {
                            title: "New submission: Automotive Parts Design",
                            date: "Today, 9:30 AM",
                            user: "John Smith"
                          },
                          {
                            title: "Certificate issued to 12 participants",
                            date: "Yesterday, 2:15 PM",
                            badge: "certificates"
                          },
                          {
                            title: "New competition published: Sustainable Product Design",
                            date: "May 10, 10:45 AM"
                          },
                          {
                            title: "5 new users joined your practice module",
                            date: "May 8, 4:20 PM",
                            module: "Basic CAD Techniques"
                          },
                        ].map((activity, i) => (
                          <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cadarena-100 dark:bg-cadarena-900 flex items-center justify-center mr-4">
                              <span className="text-xs font-bold text-cadarena-600 dark:text-cadarena-400">
                                {activity.badge === "certificates" ? "📜" : "✓"}
                              </span>
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {activity.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {activity.date}
                              </p>
                              {activity.user && (
                                <p className="text-xs text-cadarena-600 dark:text-cadarena-400 mt-1">
                                  User: {activity.user}
                                </p>
                              )}
                              {activity.module && (
                                <p className="text-xs text-cadarena-600 dark:text-cadarena-400 mt-1">
                                  Module: {activity.module}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            username: "sara_cad",
                            name: "Sara Johnson",
                            points: 4200,
                            completedChallenges: 78
                          },
                          {
                            username: "john_designer",
                            name: "John Smith",
                            points: 3800,
                            completedChallenges: 65
                          },
                          {
                            username: "mike_3d",
                            name: "Mike Williams",
                            points: 3500,
                            completedChallenges: 58
                          },
                        ].map((student, i) => (
                          <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {student.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              @{student.username}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs bg-cadarena-50 text-cadarena-700 dark:bg-cadarena-900 dark:text-cadarena-300 px-2 py-1 rounded-md">
                                {student.points} pts
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-md">
                                {student.completedChallenges} challenges
                              </span>
                            </div>
                            <div className="mt-2">
                              <Link to={`/profile/${student.username}`}>
                                <Button variant="ghost" size="sm" className="h-7 w-full">
                                  View Profile
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link to="/search">
                          <Button variant="outline" size="sm" className="w-full">
                            <Search className="h-4 w-4 mr-2" />
                            Find More Talent
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <Link to="/competitions/create">
                        <Button variant="outline" className="w-full h-32 flex flex-col items-center justify-center">
                          <Briefcase className="h-8 w-8 mb-2" />
                          <span>Host Competition</span>
                        </Button>
                      </Link>
                      <Link to="/practice/create">
                        <Button variant="outline" className="w-full h-32 flex flex-col items-center justify-center">
                          <PenTool className="h-8 w-8 mb-2" />
                          <span>Create Practice Module</span>
                        </Button>
                      </Link>
                      <Link to="/certificates/generate">
                        <Button variant="outline" className="w-full h-32 flex flex-col items-center justify-center">
                          <Certificate className="h-8 w-8 mb-2" />
                          <span>Issue Certificates</span>
                        </Button>
                      </Link>
                      <Link to="/groups/create">
                        <Button variant="outline" className="w-full h-32 flex flex-col items-center justify-center">
                          <Users className="h-8 w-8 mb-2" />
                          <span>Create Access Group</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contests">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Competitions</h2>
                  <Link to="/competitions/create">
                    <Button>
                      Host New Competition
                    </Button>
                  </Link>
                </div>
                
                <Tabs defaultValue="active">
                  <TabsList className="mb-6">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          id: "1",
                          title: "Automotive Parts Design Challenge",
                          description: "Design innovative automotive components with focus on sustainability and performance",
                          participants: 48,
                          submissions: 32,
                          endDate: "May 30, 2025",
                          status: "active"
                        },
                        {
                          id: "2",
                          title: "Sustainable Product Design Contest",
                          description: "Create eco-friendly product designs that solve everyday problems",
                          participants: 72,
                          submissions: 57,
                          endDate: "June 15, 2025",
                          status: "active"
                        }
                      ].map(contest => (
                        <Card key={contest.id}>
                          <CardHeader>
                            <CardTitle>{contest.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{contest.description}</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Participants</span>
                              <span className="font-medium">{contest.participants}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Submissions</span>
                              <span className="font-medium">{contest.submissions}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Ends on</span>
                              <span className="font-medium">{contest.endDate}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <Link to={`/competitions/${contest.id}`}>
                                <Button variant="outline" className="w-full">Manage</Button>
                              </Link>
                              <Link to={`/competitions/${contest.id}/submissions`}>
                                <Button className="w-full">Review Submissions</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upcoming">
                    <div className="text-center py-12 border-dashed border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400 mb-2">No upcoming competitions</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Create a new competition to get started</p>
                      <Button variant="outline" className="mt-4">
                        <Link to="/competitions/create">Create Competition</Link>
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="past">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          id: "3",
                          title: "Architectural Visualization Challenge",
                          description: "Create photorealistic architectural visualizations",
                          participants: 56,
                          submissions: 42,
                          endDate: "April 5, 2025",
                          status: "completed"
                        }
                      ].map(contest => (
                        <Card key={contest.id}>
                          <CardHeader>
                            <CardTitle>{contest.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{contest.description}</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Participants</span>
                              <span className="font-medium">{contest.participants}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Submissions</span>
                              <span className="font-medium">{contest.submissions}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Ended on</span>
                              <span className="font-medium">{contest.endDate}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <Link to={`/competitions/${contest.id}`}>
                                <Button variant="outline" className="w-full">View Details</Button>
                              </Link>
                              <Link to={`/certificates/generate/${contest.id}`}>
                                <Button className="w-full">Issue Certificates</Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="draft">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          id: "4",
                          title: "Medical Device Innovation",
                          description: "Draft competition for medical device designs",
                          status: "draft"
                        }
                      ].map(contest => (
                        <Card key={contest.id}>
                          <CardHeader>
                            <CardTitle>{contest.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{contest.description}</p>
                            <Badge variant="outline" className="mb-4">Draft</Badge>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                              <Link to={`/competitions/edit/${contest.id}`}>
                                <Button variant="outline" className="w-full">Edit</Button>
                              </Link>
                              <Button className="w-full" onClick={() => toast({
                                title: "Competition Published",
                                description: "Your competition is now live",
                              })}>Publish</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="practice">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Modules</h2>
                  <Link to="/practice/create">
                    <Button>
                      Create Practice Module
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      id: "1",
                      title: "Basic CAD Techniques",
                      description: "Introduction to fundamental CAD operations and tools",
                      challenges: 12,
                      participants: 35,
                      accessType: "public"
                    },
                    {
                      id: "2",
                      title: "Advanced Surface Modeling",
                      description: "Complex surface creation techniques for product design",
                      challenges: 8,
                      participants: 18,
                      accessType: "private"
                    },
                    {
                      id: "3",
                      title: "Assembly Optimization",
                      description: "Techniques for optimizing complex assemblies",
                      challenges: 6,
                      participants: 24,
                      accessType: "organization"
                    }
                  ].map(module => (
                    <Card key={module.id}>
                      <CardHeader>
                        <CardTitle>{module.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Challenges</span>
                          <span className="font-medium">{module.challenges}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Participants</span>
                          <span className="font-medium">{module.participants}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Access Type</span>
                          <Badge variant={
                            module.accessType === "public" ? "secondary" :
                            module.accessType === "private" ? "outline" :
                            "default"
                          }>
                            {module.accessType.charAt(0).toUpperCase() + module.accessType.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <Link to={`/practice/edit/${module.id}`}>
                            <Button variant="outline" className="w-full">Edit</Button>
                          </Link>
                          <Link to={`/practice/access/${module.id}`}>
                            <Button className="w-full">Manage Access</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="flex flex-col items-center justify-center h-96">
                    <CardContent className="flex flex-col items-center justify-center h-full">
                      <PenTool className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Create New Module</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-center mb-4">Build a customized practice module for your audience</p>
                      <Link to="/practice/create">
                        <Button>Create Module</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="talent">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Talent Pool</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Find and save talented designers for future opportunities
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/search">
                      <Button variant="outline">
                        <Search className="h-4 w-4 mr-2" />
                        Search Users
                      </Button>
                    </Link>
                    <Link to="/talent/create">
                      <Button>
                        Create Talent Pool
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Saved Pools</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { id: "1", name: "Top Performers", count: 15 },
                          { id: "2", name: "Previous Winners", count: 8 },
                          { id: "3", name: "Potential Recruits", count: 23 }
                        ].map(pool => (
                          <Button 
                            key={pool.id} 
                            variant="ghost" 
                            className="w-full justify-between"
                            onClick={() => toast({
                              title: "Talent Pool Selected",
                              description: `Viewing ${pool.name}`,
                            })}
                          >
                            {pool.name}
                            <Badge variant="outline">{pool.count}</Badge>
                          </Button>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        <Link to="/talent/create">Create New Pool</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            id: "1",
                            name: "Sara Johnson",
                            username: "sara_cad",
                            level: 6,
                            points: 4200,
                            completedChallenges: 78,
                            specialties: ["Product Design", "Surface Modeling", "Rendering"]
                          },
                          {
                            id: "2",
                            name: "John Smith",
                            username: "john_designer",
                            level: 4,
                            points: 2500,
                            completedChallenges: 42,
                            specialties: ["Mechanical Parts", "Technical Drawing", "Assembly"]
                          },
                          {
                            id: "3",
                            name: "Mike Williams",
                            username: "mike_3d",
                            level: 5,
                            points: 3500,
                            completedChallenges: 58,
                            specialties: ["Architectural Design", "Organic Modeling", "Visualization"]
                          }
                        ].map(user => (
                          <div key={user.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex-shrink-0 h-16 w-16 rounded-full bg-cadarena-50 dark:bg-cadarena-900 flex items-center justify-center mr-4">
                              <span className="text-xl font-bold text-cadarena-600 dark:text-cadarena-400">
                                {user.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">@{user.username}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.specialties.map((specialty, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex-shrink-0 text-right">
                              <div className="bg-cadarena-50 text-cadarena-700 dark:bg-cadarena-900 dark:text-cadarena-300 px-2 py-1 rounded-md mb-1">
                                Level {user.level}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {user.points} points • {user.completedChallenges} challenges
                              </p>
                            </div>
                            <div className="flex-shrink-0 ml-4">
                              <div className="flex flex-col gap-2">
                                <Link to={`/profile/${user.id}`}>
                                  <Button variant="outline" size="sm" className="w-full">
                                    Profile
                                  </Button>
                                </Link>
                                <Button size="sm" className="w-full">
                                  Contact
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="certificates">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Create and issue certificates for competition participants
                    </p>
                  </div>
                  <Link to="/certificates/generate">
                    <Button>
                      <Certificate className="h-4 w-4 mr-2" />
                      Issue Certificates
                    </Button>
                  </Link>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Certificate Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          id: "1",
                          name: "Competition Winner",
                          description: "For first place winners",
                          imageUrl: "/placeholder.svg"
                        },
                        {
                          id: "2",
                          name: "Runner-Up",
                          description: "For second and third place",
                          imageUrl: "/placeholder.svg"
                        },
                        {
                          id: "3",
                          name: "Participation",
                          description: "For all participants",
                          imageUrl: "/placeholder.svg"
                        }
                      ].map(template => (
                        <Card key={template.id}>
                          <CardContent className="p-4">
                            <img 
                              src={template.imageUrl} 
                              alt={template.name}
                              className="w-full h-40 object-cover mb-4 rounded-md"
                            />
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{template.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                            <div className="flex justify-between">
                              <Button variant="outline" size="sm" onClick={() => toast({
                                title: "Template Selected",
                                description: `${template.name} template is now active`,
                              })}>
                                Select
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => toast({
                                title: "Edit Mode",
                                description: "Customize your certificate template",
                              })}>
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <Card className="flex flex-col items-center justify-center">
                        <CardContent className="flex flex-col items-center justify-center h-full p-4">
                          <Certificate className="h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="font-medium text-center mb-2">Create New Template</h3>
                          <Button variant="outline" onClick={() => toast({
                            title: "Certificate Creator",
                            description: "Design your custom certificate template",
                          })}>
                            Create Template
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Certificate Issuances</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "1",
                          competition: "Automotive Parts Design",
                          type: "Winner",
                          recipients: 1,
                          date: "May 10, 2025"
                        },
                        {
                          id: "2",
                          competition: "Automotive Parts Design",
                          type: "Runner-Up",
                          recipients: 2,
                          date: "May 10, 2025"
                        },
                        {
                          id: "3",
                          competition: "Automotive Parts Design",
                          type: "Participation",
                          recipients: 45,
                          date: "May 10, 2025"
                        },
                      ].map(issuance => (
                        <div key={issuance.id} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cadarena-50 dark:bg-cadarena-900 flex items-center justify-center mr-4">
                            <Certificate className="h-5 w-5 text-cadarena-600 dark:text-cadarena-400" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{issuance.competition}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {issuance.type} certificates • {issuance.recipients} recipient{issuance.recipients > 1 ? 's' : ''}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <p className="text-sm text-gray-500 dark:text-gray-400">{issuance.date}</p>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <Button variant="outline" size="sm" onClick={() => toast({
                              title: "Certificate Details",
                              description: "Viewing certificate issuance details",
                            })}>
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="groups">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Groups</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Manage user groups for controlled access to your content
                    </p>
                  </div>
                  <Link to="/groups/create">
                    <Button>
                      <Users className="h-4 w-4 mr-2" />
                      Create Group
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      id: "1",
                      name: "Engineering Team",
                      description: "Internal engineering department",
                      memberCount: 12,
                      modules: 3
                    },
                    {
                      id: "2",
                      name: "University Partners",
                      description: "Educational institutions we collaborate with",
                      memberCount: 8,
                      modules: 4
                    },
                    {
                      id: "3",
                      name: "Design Challenge Finalists",
                      description: "Top performers from previous competitions",
                      memberCount: 15,
                      modules: 2
                    }
                  ].map(group => (
                    <Card key={group.id}>
                      <CardHeader>
                        <CardTitle>{group.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{group.description}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Members</span>
                          <span className="font-medium">{group.memberCount}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Modules Access</span>
                          <span className="font-medium">{group.modules}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <Link to={`/groups/${group.id}/members`}>
                            <Button variant="outline" className="w-full">Members</Button>
                          </Link>
                          <Link to={`/groups/${group.id}/edit`}>
                            <Button className="w-full">Manage</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Card className="flex flex-col items-center justify-center">
                    <CardContent className="flex flex-col items-center justify-center h-full">
                      <Users className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="font-medium text-center mb-2">Create Access Group</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                        Organize users into groups for controlled access
                      </p>
                      <Link to="/groups/create">
                        <Button variant="outline">Create Group</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
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
