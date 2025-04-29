
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, Users, Check, X, FileText, Mail, Share } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const OrganizationDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  // Mock active contests
  const contests = [
    {
      id: "c1",
      title: "Automotive Design Competition 2025",
      registeredUsers: 87,
      totalSubmissions: 64,
      startDate: new Date("2025-03-15"),
      endDate: new Date("2025-04-15"),
      status: "active"
    },
    {
      id: "c2",
      title: "Sustainable Product Design Challenge",
      registeredUsers: 56,
      totalSubmissions: 32,
      startDate: new Date("2025-04-01"),
      endDate: new Date("2025-05-01"),
      status: "active"
    }
  ];

  // Mock participants for participant management
  const participants = [
    {
      id: "p1",
      name: "John Smith",
      email: "john.smith@example.com",
      contestId: "c1",
      submissionStatus: "submitted",
      submissionDate: new Date("2025-03-20"),
      score: 85
    },
    {
      id: "p2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      contestId: "c1",
      submissionStatus: "submitted",
      submissionDate: new Date("2025-03-18"),
      score: 92
    },
    {
      id: "p3",
      name: "Michael Brown",
      email: "mbrown@example.com",
      contestId: "c1",
      submissionStatus: "registered",
      submissionDate: null,
      score: null
    },
    {
      id: "p4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      contestId: "c2",
      submissionStatus: "submitted",
      submissionDate: new Date("2025-04-05"),
      score: 78
    }
  ];

  // Function to handle creating a new contest
  const handleCreateContest = (data: FormData) => {
    toast({
      title: "Contest Created",
      description: "Your new contest has been created successfully."
    });
  };

  // Function to handle certificate generation
  const handleGenerateCertificates = () => {
    toast({
      title: "Certificates Generated",
      description: "Certificates have been generated and are ready to send."
    });
  };

  // Function to handle sharing contest
  const handleShareContest = () => {
    toast({
      title: "Contest Shared",
      description: "Invitations have been sent to the selected participants."
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Organization Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your contests, participants, and certificates
            </p>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Active Contests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{contests.length}</div>
                    <p className="text-sm text-gray-500 mt-1">Last contest ends on {contests[1].endDate.toLocaleDateString()}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Participants
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{participants.length}</div>
                    <p className="text-sm text-gray-500 mt-1">Across all active contests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Submission Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">75%</div>
                    <Progress value={75} className="h-1 mt-4" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Contest Performance</CardTitle>
                    <CardDescription>Participant engagement across your active contests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {contests.map((contest) => (
                        <div key={contest.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{contest.title}</h3>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {contest.startDate.toLocaleDateString()} - {contest.endDate.toLocaleDateString()}
                              </div>
                            </div>
                            <Badge 
                              className="uppercase text-xs"
                              variant="outline"
                            >
                              {contest.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Registrations</p>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold">{contest.registeredUsers}</span>
                                <Progress value={(contest.registeredUsers / 100) * 100} className="w-3/4 h-1" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-1">Submissions</p>
                              <div className="flex justify-between items-center">
                                <span className="font-semibold">{contest.totalSubmissions}</span>
                                <Progress value={(contest.totalSubmissions / contest.registeredUsers) * 100} className="w-3/4 h-1" />
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/contests/${contest.id}`}>View Details</Link>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <Share className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Share Contest</DialogTitle>
                                  <DialogDescription>
                                    Invite participants to join this contest
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div>
                                    <Label htmlFor="emails">Email Addresses</Label>
                                    <Textarea 
                                      id="emails"
                                      placeholder="Enter email addresses separated by commas"
                                      className="mt-1"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                      Or upload CSV file with email addresses
                                    </p>
                                  </div>
                                  <div>
                                    <Label htmlFor="message">Invitation Message</Label>
                                    <Textarea 
                                      id="message"
                                      placeholder="Enter a custom message for your invitation"
                                      className="mt-1"
                                      defaultValue={`Join our "${contest.title}" contest on CAD Arena!`}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit" onClick={handleShareContest}>
                                    Send Invitations
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full flex items-center justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            Create New Contest
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Create New Contest</DialogTitle>
                            <DialogDescription>
                              Fill in the contest details to get started
                            </DialogDescription>
                          </DialogHeader>
                          <form className="space-y-4 py-2">
                            <div>
                              <Label htmlFor="contest-title">Contest Title</Label>
                              <Input id="contest-title" placeholder="Enter contest title" className="mt-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input id="start-date" type="date" className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="end-date">End Date</Label>
                                <Input id="end-date" type="date" className="mt-1" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="contest-desc">Description</Label>
                              <Textarea id="contest-desc" placeholder="Enter contest description" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="contest-type">Contest Type</Label>
                              <Select>
                                <SelectTrigger id="contest-type" className="mt-1">
                                  <SelectValue placeholder="Select contest type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open Contest</SelectItem>
                                  <SelectItem value="invite">Invite Only</SelectItem>
                                  <SelectItem value="internal">Internal (Organization Only)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </form>
                          <DialogFooter>
                            <Button type="button" onClick={() => handleCreateContest(new FormData())}>
                              Create Contest
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full flex items-center justify-start">
                            <Award className="h-4 w-4 mr-2" />
                            Generate Certificates
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Generate Certificates</DialogTitle>
                            <DialogDescription>
                              Create certificates for contest participants
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-2">
                            <div>
                              <Label htmlFor="certificate-contest">Select Contest</Label>
                              <Select>
                                <SelectTrigger id="certificate-contest" className="mt-1">
                                  <SelectValue placeholder="Select contest" />
                                </SelectTrigger>
                                <SelectContent>
                                  {contests.map(contest => (
                                    <SelectItem key={contest.id} value={contest.id}>
                                      {contest.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="certificate-type">Certificate Type</Label>
                              <Select>
                                <SelectTrigger id="certificate-type" className="mt-1">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="participation">Participation</SelectItem>
                                  <SelectItem value="completion">Completion</SelectItem>
                                  <SelectItem value="winner">Winner</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="certificate-template">Certificate Template</Label>
                              <Select>
                                <SelectTrigger id="certificate-template" className="mt-1">
                                  <SelectValue placeholder="Select template" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="standard">Standard</SelectItem>
                                  <SelectItem value="premium">Premium</SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" onClick={handleGenerateCertificates}>
                              Generate
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="w-full flex items-center justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        View Participant Analytics
                      </Button>

                      <Button variant="outline" className="w-full flex items-center justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Bulk Notifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contests Tab */}
            <TabsContent value="contests">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contest Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">Create New Contest</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Create New Contest</DialogTitle>
                            <DialogDescription>
                              Fill in the contest details to get started
                            </DialogDescription>
                          </DialogHeader>
                          <form className="space-y-4 py-2">
                            <div>
                              <Label htmlFor="contest-title">Contest Title</Label>
                              <Input id="contest-title" placeholder="Enter contest title" className="mt-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input id="start-date" type="date" className="mt-1" />
                              </div>
                              <div>
                                <Label htmlFor="end-date">End Date</Label>
                                <Input id="end-date" type="date" className="mt-1" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="contest-desc">Description</Label>
                              <Textarea id="contest-desc" placeholder="Enter contest description" className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="contest-type">Contest Type</Label>
                              <Select>
                                <SelectTrigger id="contest-type" className="mt-1">
                                  <SelectValue placeholder="Select contest type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="open">Open Contest</SelectItem>
                                  <SelectItem value="invite">Invite Only</SelectItem>
                                  <SelectItem value="internal">Internal (Organization Only)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </form>
                          <DialogFooter>
                            <Button type="button" onClick={() => handleCreateContest(new FormData())}>
                              Create Contest
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <div>
                        <Label htmlFor="contest-filter">Filter Contests</Label>
                        <Select>
                          <SelectTrigger id="contest-filter" className="mt-1">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Contests</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Contest Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Total Contests</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Active Contests</p>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Average Participants</p>
                          <p className="text-2xl font-bold">68</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Average Submission Rate</p>
                          <p className="text-2xl font-bold">73%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Contests</CardTitle>
                      <CardDescription>
                        Manage and monitor all your contests
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                          {[
                            ...contests,
                            {
                              id: "c3",
                              title: "Mechanical Engineering Innovation Challenge",
                              registeredUsers: 124,
                              totalSubmissions: 97,
                              startDate: new Date("2025-01-10"),
                              endDate: new Date("2025-02-10"),
                              status: "completed"
                            },
                            {
                              id: "c4",
                              title: "Architectural Design Competition 2024",
                              registeredUsers: 112,
                              totalSubmissions: 93,
                              startDate: new Date("2024-11-01"),
                              endDate: new Date("2024-12-01"),
                              status: "completed"
                            },
                            {
                              id: "c5",
                              title: "Product Design Summer Challenge",
                              registeredUsers: 0,
                              totalSubmissions: 0,
                              startDate: new Date("2025-06-01"),
                              endDate: new Date("2025-07-01"),
                              status: "upcoming"
                            },
                            {
                              id: "c6",
                              title: "Medical Device Design Innovation",
                              registeredUsers: 0,
                              totalSubmissions: 0,
                              startDate: new Date("2025-05-15"),
                              endDate: new Date("2025-06-15"),
                              status: "draft"
                            }
                          ].map((contest) => (
                            <div key={contest.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-semibold text-lg">{contest.title}</h3>
                                  <div className="flex items-center mt-1 text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {contest.startDate.toLocaleDateString()} - {contest.endDate.toLocaleDateString()}
                                  </div>
                                </div>
                                <Badge 
                                  className={`uppercase text-xs ${
                                    contest.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                    contest.status === "completed" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                                    contest.status === "upcoming" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" :
                                    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                  }`}
                                  variant="outline"
                                >
                                  {contest.status}
                                </Badge>
                              </div>

                              {contest.status !== "draft" && contest.status !== "upcoming" && (
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Registered</p>
                                    <p className="font-semibold">{contest.registeredUsers}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Submissions</p>
                                    <p className="font-semibold">{contest.totalSubmissions}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Submission Rate</p>
                                    <p className="font-semibold">
                                      {contest.registeredUsers > 0 
                                        ? `${Math.round((contest.totalSubmissions / contest.registeredUsers) * 100)}%`
                                        : "N/A"}
                                    </p>
                                  </div>
                                  {contest.status === "completed" && (
                                    <div>
                                      <p className="text-sm text-gray-500">Certificates</p>
                                      <p className="font-semibold">{contest.totalSubmissions}</p>
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2">
                                <Button size="sm" variant={contest.status === "draft" ? "default" : "outline"} asChild>
                                  <Link to={`/contests/${contest.id}`}>
                                    {contest.status === "draft" ? "Edit Draft" : "View Details"}
                                  </Link>
                                </Button>
                                
                                {(contest.status === "active" || contest.status === "upcoming") && (
                                  <Button size="sm" variant="outline">
                                    <Share className="h-4 w-4 mr-1" />
                                    Share
                                  </Button>
                                )}
                                
                                {contest.status === "completed" && (
                                  <Button size="sm" variant="outline">
                                    <Award className="h-4 w-4 mr-1" />
                                    Certificates
                                  </Button>
                                )}
                                
                                <Button size="sm" variant="ghost">
                                  <Users className="h-4 w-4 mr-1" />
                                  Participants
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants">
              <Card>
                <CardHeader>
                  <CardTitle>Participant Management</CardTitle>
                  <CardDescription>
                    View and manage all participants across your contests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Select>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Filter by contest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Contests</SelectItem>
                          {contests.map(contest => (
                            <SelectItem key={contest.id} value={contest.id}>
                              {contest.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="submitted">Submitted</SelectItem>
                          <SelectItem value="registered">Registered Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="relative">
                      <Input 
                        placeholder="Search participants..." 
                        className="pl-9 w-full sm:w-64"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Contest</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Submission Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Score</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {participants.map((participant) => {
                            const contest = contests.find(c => c.id === participant.contestId);
                            return (
                              <tr key={participant.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="py-4 px-4">{participant.name}</td>
                                <td className="py-4 px-4">{participant.email}</td>
                                <td className="py-4 px-4">{contest?.title}</td>
                                <td className="py-4 px-4">
                                  <Badge 
                                    className={`${
                                      participant.submissionStatus === "submitted" 
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                    }`}
                                    variant="outline"
                                  >
                                    {participant.submissionStatus}
                                  </Badge>
                                </td>
                                <td className="py-4 px-4">
                                  {participant.submissionDate 
                                    ? participant.submissionDate.toLocaleDateString() 
                                    : "—"}
                                </td>
                                <td className="py-4 px-4">
                                  {participant.score !== null ? participant.score : "—"}
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center space-x-2">
                                    <Button size="sm" variant="ghost" disabled={participant.submissionStatus !== "submitted"}>
                                      View
                                    </Button>
                                    {participant.submissionStatus === "submitted" && (
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button size="sm" variant="ghost">
                                            Score
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Score Submission</DialogTitle>
                                            <DialogDescription>
                                              Review and score {participant.name}'s submission
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="space-y-4 py-2">
                                            <div>
                                              <Label htmlFor="score">Score (0-100)</Label>
                                              <Input
                                                id="score"
                                                type="number"
                                                min="0"
                                                max="100"
                                                defaultValue={participant.score || ""}
                                                className="mt-1"
                                              />
                                            </div>
                                            <div>
                                              <Label htmlFor="feedback">Feedback</Label>
                                              <Textarea
                                                id="feedback"
                                                placeholder="Provide feedback on the submission"
                                                className="mt-1"
                                              />
                                            </div>
                                          </div>
                                          <DialogFooter>
                                            <Button type="button">Save Score</Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificates Tab */}
            <TabsContent value="certificates">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Certificate Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">Generate Certificates</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Generate Certificates</DialogTitle>
                            <DialogDescription>
                              Create certificates for contest participants
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-2">
                            <div>
                              <Label htmlFor="certificate-contest">Select Contest</Label>
                              <Select>
                                <SelectTrigger id="certificate-contest" className="mt-1">
                                  <SelectValue placeholder="Select contest" />
                                </SelectTrigger>
                                <SelectContent>
                                  {contests.map(contest => (
                                    <SelectItem key={contest.id} value={contest.id}>
                                      {contest.title}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="certificate-type">Certificate Type</Label>
                              <Select>
                                <SelectTrigger id="certificate-type" className="mt-1">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="participation">Participation</SelectItem>
                                  <SelectItem value="completion">Completion</SelectItem>
                                  <SelectItem value="winner">Winner</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="certificate-template">Certificate Template</Label>
                              <Select>
                                <SelectTrigger id="certificate-template" className="mt-1">
                                  <SelectValue placeholder="Select template" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="standard">Standard</SelectItem>
                                  <SelectItem value="premium">Premium</SelectItem>
                                  <SelectItem value="custom">Custom</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" onClick={handleGenerateCertificates}>
                              Generate
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="w-full">Manage Templates</Button>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium mb-2">Certificate Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Issued</span>
                            <span>327</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">This Month</span>
                            <span>42</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Templates</span>
                            <span>6</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Email Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">
                          Standard Certificate
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Winner Announcement
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Participation Thank You
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          Custom Template
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-cadarena-600">
                          + Create Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Certificate History</CardTitle>
                      <CardDescription>
                        View all certificates issued to participants
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Select>
                            <SelectTrigger className="w-full sm:w-40">
                              <SelectValue placeholder="Filter by contest" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Contests</SelectItem>
                              <SelectItem value="c3">Mechanical Engineering Innovation</SelectItem>
                              <SelectItem value="c4">Architectural Design 2024</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select>
                            <SelectTrigger className="w-full sm:w-40">
                              <SelectValue placeholder="Certificate type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="participation">Participation</SelectItem>
                              <SelectItem value="completion">Completion</SelectItem>
                              <SelectItem value="winner">Winner</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="relative">
                          <Input 
                            placeholder="Search participants..." 
                            className="pl-9 w-full sm:w-64"
                          />
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </div>
                      </div>

                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Certificate ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Participant</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Contest</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Type</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Issue Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                {
                                  id: "CERT-1234",
                                  participant: "John Smith",
                                  email: "john.smith@example.com",
                                  contest: "Mechanical Engineering Innovation",
                                  type: "Winner",
                                  issueDate: new Date("2025-02-15"),
                                  status: "sent"
                                },
                                {
                                  id: "CERT-1235",
                                  participant: "Sarah Johnson",
                                  email: "sarah.j@example.com",
                                  contest: "Mechanical Engineering Innovation",
                                  type: "Completion",
                                  issueDate: new Date("2025-02-15"),
                                  status: "sent"
                                },
                                {
                                  id: "CERT-1236",
                                  participant: "Emily Davis",
                                  email: "emily.davis@example.com",
                                  contest: "Architectural Design 2024",
                                  type: "Completion",
                                  issueDate: new Date("2024-12-05"),
                                  status: "sent"
                                },
                                {
                                  id: "CERT-1237",
                                  participant: "Michael Brown",
                                  email: "mbrown@example.com",
                                  contest: "Architectural Design 2024",
                                  type: "Participation",
                                  issueDate: new Date("2024-12-05"),
                                  status: "pending"
                                }
                              ].map((cert) => (
                                <tr key={cert.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                  <td className="py-4 px-4">{cert.id}</td>
                                  <td className="py-4 px-4">{cert.participant}</td>
                                  <td className="py-4 px-4">{cert.contest}</td>
                                  <td className="py-4 px-4">
                                    <Badge 
                                      className={
                                        cert.type === "Winner" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" :
                                        cert.type === "Completion" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" :
                                        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                      }
                                      variant="outline"
                                    >
                                      {cert.type}
                                    </Badge>
                                  </td>
                                  <td className="py-4 px-4">{cert.issueDate.toLocaleDateString()}</td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center">
                                      {cert.status === "sent" ? (
                                        <>
                                          <Check className="h-4 w-4 text-green-500 mr-1" />
                                          <span>Sent</span>
                                        </>
                                      ) : (
                                        <>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-1">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                          </svg>
                                          <span>Pending</span>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
                                      <Button size="sm" variant="outline">View</Button>
                                      <Button size="sm" variant="ghost">
                                        <Mail className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrganizationDashboard;
