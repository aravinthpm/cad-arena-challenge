import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChallengeLevel, ChallengeStatus } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';
import { Clock, FileUp, Send } from 'lucide-react';

const ChallengeView = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  // Mock challenge data
  const challenge = {
    id: id || '1',
    title: 'Design an Ergonomic Computer Mouse',
    description: 'Create a comfortable, ergonomic computer mouse design that reduces wrist strain during prolonged use.',
    instructions: 'Design should include button placement, scroll wheel, and ergonomic contours. Consider different hand sizes and both left/right-handed users.',
    level: ChallengeLevel.INTERMEDIATE,
    points: 150,
    thumbnailUrl: '/placeholder.svg',
    status: ChallengeStatus.PUBLISHED,
    creatorId: 'org123',
    createdAt: new Date(),
    updatedAt: new Date(),
    submissionCount: 50,
    successRate: 65,
    averageCompletionTime: 2400,
    referenceMaterials: [
      {
        id: 'ref1',
        type: 'link' as 'image' | 'document' | 'video' | 'link',
        title: 'Ergonomics Guide',
        description: 'Comprehensive guide to ergonomic design principles.',
        url: 'https://example.com/ergonomics'
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'What is the primary goal of ergonomic design?',
        options: ['Increase productivity', 'Reduce user discomfort', 'Maximize aesthetics', 'Minimize production costs'],
        correctAnswer: 1
      }
    ]
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast({
      title: "Submission Received",
      description: "Your design has been submitted successfully!",
    });
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    challenge.quizQuestions?.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return (correctAnswers / (challenge.quizQuestions?.length || 1)) * 100;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{challenge.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">{challenge.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{challenge.level}</Badge>
              <Badge variant="outline">{challenge.points} Points</Badge>
            </div>
          </div>

          <Tabs defaultValue="instructions" className="space-y-6">
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
              {challenge.referenceMaterials && challenge.referenceMaterials.length > 0 && (
                <TabsTrigger value="references">References</TabsTrigger>
              )}
              {challenge.quizQuestions && challenge.quizQuestions.length > 0 && (
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="instructions" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Challenge Instructions</h2>
              <p className="text-gray-600 dark:text-gray-300">{challenge.instructions}</p>
              <Alert className="mt-4">
                <Clock className="h-4 w-4" />
                <AlertTitle>Time Remaining</AlertTitle>
                <AlertDescription>
                  You have {formatTime(timeLeft)} to complete this challenge.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="submission" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Submit Your Design</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload your CAD file to submit your design. Supported formats: .STL, .STEP, .IGES
              </p>
              <Separator className="mb-4" />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="designFile">Upload Design File</Label>
                  <Input
                    type="file"
                    id="designFile"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
                  {selectedFile && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Selected file: {selectedFile.name}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedFile}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileUp className="w-4 h-4 mr-2" />
                      Submit Design
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="references" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reference Materials</h2>
              <div className="space-y-4">
                {challenge.referenceMaterials?.map(ref => (
                  <Card key={ref.id}>
                    <CardContent>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{ref.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{ref.description}</p>
                      <Button asChild>
                        <a href={ref.url} target="_blank" rel="noopener noreferrer">
                          View Reference
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quiz</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Test your knowledge before submitting your design.</p>
              <div className="space-y-6">
                {challenge.quizQuestions?.map((question, index) => (
                  <Card key={question.id}>
                    <CardContent>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-2">
                            <Input
                              type="radio"
                              name={`question-${question.id}`}
                              value={String(optionIndex)}
                              checked={quizAnswers[question.id] === optionIndex}
                              onChange={() => handleQuizAnswer(question.id, optionIndex)}
                              className="cursor-pointer"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button onClick={() => {
                const score = calculateScore();
                toast({
                  title: "Quiz Completed",
                  description: `Your score: ${score.toFixed(0)}%`,
                });
              }}
                className="mt-4">
                <Send className="w-4 h-4 mr-2" />
                Submit Quiz
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeView;
