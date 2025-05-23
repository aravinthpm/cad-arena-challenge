
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatePracticeForm from "@/components/CreatePracticeForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wrench, Users, Eye, Edit, Trash2 } from "lucide-react";

const ManagePracticePage = () => {
  const [practices] = useState([
    {
      id: 1,
      title: "Mechanical Gear Design",
      difficulty: "Intermediate",
      points: 250,
      participants: 45,
      status: "Active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Bearing Housing Assembly",
      difficulty: "Advanced",
      points: 400,
      participants: 23,
      status: "Active",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      title: "Simple Bracket Design",
      difficulty: "Beginner",
      points: 150,
      participants: 67,
      status: "Draft",
      createdAt: "2024-01-08"
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-orange-100 text-orange-800";
      case "expert":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "archived":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Manage Practice Challenges</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage practice challenges for your organization
            </p>
          </div>

          <Tabs defaultValue="create" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Create Practice
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Manage Existing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <CreatePracticeForm />
            </TabsContent>

            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <CardTitle>Your Practice Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Difficulty</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {practices.map((practice) => (
                          <TableRow key={practice.id}>
                            <TableCell className="font-medium">
                              {practice.title}
                            </TableCell>
                            <TableCell>
                              <Badge className={getDifficultyColor(practice.difficulty)}>
                                {practice.difficulty}
                              </Badge>
                            </TableCell>
                            <TableCell>{practice.points}</TableCell>
                            <TableCell>{practice.participants}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(practice.status)}>
                                {practice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{practice.createdAt}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManagePracticePage;
