
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChallengeLevel, ChallengeStatus } from "@/utils/types";
import { Search, Clock, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Practice = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Practice Challenges</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Build your CAD skills with practice challenges of varying difficulty
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button>
                <Link to="/challenge/1">Try a Random Challenge</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input placeholder="Search challenges..." className="pl-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer bg-green-50 text-green-700 hover:bg-green-100">Beginner</Badge>
                    <Badge variant="outline" className="cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-100">Intermediate</Badge>
                    <Badge variant="outline" className="cursor-pointer bg-orange-50 text-orange-700 hover:bg-orange-100">Advanced</Badge>
                    <Badge variant="outline" className="cursor-pointer bg-red-50 text-red-700 hover:bg-red-100">Expert</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mechanical">Mechanical Design</SelectItem>
                      <SelectItem value="assembly">Assembly Design</SelectItem>
                      <SelectItem value="surface">Surface Modeling</SelectItem>
                      <SelectItem value="organic">Organic Modeling</SelectItem>
                      <SelectItem value="parametric">Parametric Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="col-span-1 md:col-span-3">
              <Tabs defaultValue="all">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="new">Newest</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-0">
                        <img src="/placeholder.svg" alt="Challenge thumbnail" className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Basic Gear Design</h3>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {ChallengeLevel.BEGINNER}
                            </Badge>
                            <span className="text-sm text-gray-500">15 mins</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            Create a standard spur gear with specified parameters and constraints.
                          </p>
                          <Button size="sm" className="w-full">
                            <Link to="/challenge/1">Start Challenge</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-0">
                        <img src="/placeholder.svg" alt="Challenge thumbnail" className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Mechanical Assembly Design</h3>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {ChallengeLevel.INTERMEDIATE}
                            </Badge>
                            <span className="text-sm text-gray-500">45 mins</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            Create a functional mechanical assembly with moving parts and proper constraints.
                          </p>
                          <Button size="sm" className="w-full">
                            <Link to="/challenge/2">Start Challenge</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-0">
                        <img src="/placeholder.svg" alt="Challenge thumbnail" className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Aircraft Wing Profile</h3>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              {ChallengeLevel.ADVANCED}
                            </Badge>
                            <span className="text-sm text-gray-500">60 mins</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            Design an aerodynamic wing profile based on NACA airfoil parameters.
                          </p>
                          <Button size="sm" className="w-full">
                            <Link to="/challenge/3">Start Challenge</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-0">
                        <img src="/placeholder.svg" alt="Challenge thumbnail" className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Ergonomic Handle Design</h3>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {ChallengeLevel.INTERMEDIATE}
                            </Badge>
                            <span className="text-sm text-gray-500">30 mins</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            Create an ergonomic handle for a handheld tool that maximizes comfort and grip.
                          </p>
                          <Button size="sm" className="w-full">
                            <Link to="/challenge/4">Start Challenge</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Additional tabs content would go here */}
                <TabsContent value="trending" className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-2">Trending challenges will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="new" className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-2">Newest challenges will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-2">Your completed challenges will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Practice Module Pathways</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Beginner Pathway</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Master the fundamentals of CAD design with this series of beginner-friendly challenges.
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">8 challenges</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Approx. 4 hours to complete</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Earn "CAD Foundations" badge</span>
                    </div>
                    <Button className="w-full">Start Pathway</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Mechanical Design Mastery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Focus on mechanical components and assemblies with real-world applications.
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">12 challenges</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Approx. 10 hours to complete</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Earn "Mechanical Designer" badge</span>
                    </div>
                    <Button className="w-full">Start Pathway</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Advanced Surface Modeling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Take your skills to the next level with complex surface modeling techniques.
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">10 challenges</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Approx. 15 hours to complete</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span className="text-sm">Earn "Surface Maestro" badge</span>
                    </div>
                    <Button className="w-full">Start Pathway</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
