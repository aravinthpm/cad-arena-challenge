
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogFooter, DialogTitle, Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Challenge, ChallengeLevel } from "@/utils/types";
import { Timer, Calendar, CheckCircle, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ChallengeView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Mock challenge data
  const challenge: Challenge = {
    id: "1",
    title: "Parametric Gearbox Design",
    description: "Design a fully functional parametric gearbox that can adjust to different gear ratios.",
    instructions: "Create a gearbox with adjustable gear ratios that can be modified parametrically. The gearbox should include at least 3 gears, an input shaft, and an output shaft. All components should be properly constrained and assembled.",
    level: ChallengeLevel.INTERMEDIATE,
    points: 300,
    thumbnailUrl: "/placeholder.svg",
    status: "published",
    creatorId: "org1",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    submissionCount: 156,
    successRate: 68,
  };

  // Mock questions
  const questions = [
    {
      id: "q1",
      type: "mcq",
      question: "What is the primary advantage of using parametric design for mechanical components?",
      options: [
        "It requires less computational power",
        "It allows for easy modification and adaptation to different requirements",
        "It always produces smaller file sizes",
        "It makes rendering faster"
      ],
      correctAnswer: 1
    },
    {
      id: "q2",
      type: "mcq",
      question: "Which parameter most significantly affects the gear ratio?",
      options: [
        "Gear color",
        "Teeth profile shape",
        "Number of teeth",
        "Material selection"
      ],
      correctAnswer: 2
    },
    {
      id: "q3",
      type: "text",
      question: "What is the formula to calculate the gear ratio between two meshing gears? (Use N1 for teeth in first gear, N2 for teeth in second gear)",
      correctAnswer: "N2/N1"
    }
  ];

  // Start/pause timer
  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
    if (!isTimerActive) {
      toast({
        title: "Challenge Started",
        description: "The timer has started. Good luck!"
      });
    } else {
      toast({
        title: "Challenge Paused",
        description: "You've paused the challenge timer."
      });
    }
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // Handle answer changes
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  // Submit the challenge
  const handleSubmit = () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one CAD file before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Check if all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      toast({
        title: "Warning",
        description: `You have ${unansweredQuestions.length} unanswered questions.`,
        variant: "warning"
      });
      return;
    }

    toast({
      title: "Submission Successful!",
      description: "Your solution has been submitted for evaluation.",
    });
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      toast({
        title: "Time's Up!",
        description: "The challenge time has expired.",
        variant: "destructive"
      });
      setIsTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, toast]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          {/* Challenge header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className={
                  challenge.level === ChallengeLevel.BEGINNER ? "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300" :
                  challenge.level === ChallengeLevel.INTERMEDIATE ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300" :
                  challenge.level === ChallengeLevel.ADVANCED ? "bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300" :
                  "bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300"
                }>
                  {challenge.level}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {challenge.updatedAt.toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {challenge.submissionCount} submissions
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 mt-4 md:mt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Timer className="w-5 h-5 mr-2 text-cadarena-600" />
                  <span className="font-mono text-xl font-bold">{formatTime(timeRemaining)}</span>
                </div>
                <Button 
                  onClick={toggleTimer} 
                  variant={isTimerActive ? "destructive" : "default"}
                  size="sm"
                >
                  {isTimerActive ? "Pause" : "Start Challenge"}
                </Button>
              </div>
            </div>
          </div>

          {/* Challenge content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Challenge info */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="references">Reference Materials</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Challenge Description</h2>
                  <p className="mb-4">{challenge.description}</p>
                  <p>{challenge.instructions}</p>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Learning Objectives</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Master parametric design principles</li>
                      <li>Learn gear meshing constraints</li>
                      <li>Practice mechanical assembly design</li>
                      <li>Understand gear ratio calculations</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Technical Requirements</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Design Specifications</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Gearbox must include at least 3 gears</li>
                        <li>Input shaft must rotate at 100 RPM</li>
                        <li>Output shaft must deliver at least 3 different speed options</li>
                        <li>All components must be parametrically linked</li>
                        <li>Total assembly size must be under 200mm x 200mm x 100mm</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Constraints</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Module: 2mm</li>
                        <li>Pressure angle: 20°</li>
                        <li>Minimum number of teeth: 14</li>
                        <li>Maximum gear diameter: 100mm</li>
                        <li>Shaft diameter: 10mm</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Deliverables</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Complete CAD assembly file</li>
                        <li>STL file of the complete assembly</li>
                        <li>Answers to the technical questions</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="references" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-bold mb-4">Reference Materials</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Tutorial Video</h3>
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <p className="text-center text-gray-500">Tutorial Video Placeholder</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Reference Documents</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="flex-shrink-0 mr-3 p-2 bg-cadarena-100 dark:bg-cadarena-900 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cadarena-600 dark:text-cadarena-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium">Gear Design Guidelines.pdf</p>
                              <p className="text-sm text-gray-500">2.4 MB</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="flex-shrink-0 mr-3 p-2 bg-cadarena-100 dark:bg-cadarena-900 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cadarena-600 dark:text-cadarena-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium">Parametric Design Techniques.pdf</p>
                              <p className="text-sm text-gray-500">3.1 MB</p>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="flex-shrink-0 mr-3 p-2 bg-cadarena-100 dark:bg-cadarena-900 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cadarena-600 dark:text-cadarena-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium">Sample Gear Assembly.step</p>
                              <p className="text-sm text-gray-500">1.8 MB</p>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column - Submission */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Challenge Submission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                      <Input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".stl,.step,.stp,.iges,.igs,.obj"
                        multiple
                      />
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center justify-center py-4"
                      >
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          STL, STEP, IGES files (max 50MB)
                        </p>
                      </Label>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Uploaded Files:</p>
                        <ScrollArea className="h-32">
                          <ul className="space-y-2">
                            {files.map((file, index) => (
                              <li key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Technical Questions</h3>

                    <div className="space-y-4">
                      {questions.map((q) => (
                        <div key={q.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="font-medium mb-3">{q.question}</p>
                          
                          {q.type === "mcq" ? (
                            <div className="space-y-2">
                              {q.options?.map((option, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`${q.id}-option-${index}`}
                                    name={q.id}
                                    value={index}
                                    className="mr-2"
                                    onChange={() => handleAnswerChange(q.id, index.toString())}
                                    checked={answers[q.id] === index.toString()}
                                  />
                                  <label htmlFor={`${q.id}-option-${index}`} className="text-sm">{option}</label>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <Textarea
                              placeholder="Your answer..."
                              value={answers[q.id] || ""}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className="w-full"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSubmit} className="w-full mt-6">
                    Submit Challenge
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        Save Progress
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Your Progress</DialogTitle>
                      </DialogHeader>
                      <p>Your progress has been saved. You can return to this challenge later.</p>
                      <DialogFooter>
                        <Button>Close</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Challenge Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Success Rate</span>
                        <span className="text-sm font-medium">{challenge.successRate}%</span>
                      </div>
                      <Progress value={challenge.successRate} />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-500">Point Value</p>
                        <p className="font-semibold">{challenge.points} pts</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500">Submissions</p>
                        <p className="font-semibold">{challenge.submissionCount}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-500">Average Time</p>
                        <p className="font-semibold">37 min</p>
                      </div>
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

export default ChallengeView;
