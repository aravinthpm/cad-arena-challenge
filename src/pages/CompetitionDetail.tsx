import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ChallengeLevel, ChallengeStatus } from '@/utils/types';
import { Calendar, Trophy, Users, Clock, CheckCircle } from 'lucide-react';

const CompetitionDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock competition data
  const competition = {
    id: id || '1',
    title: 'Automotive Parts Design Challenge',
    description: 'Design innovative automotive components with focus on sustainability and performance',
    organizationName: 'Tesla Motors',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-06-15'),
    registeredUsers: 48,
    status: 'active' as 'upcoming' | 'active' | 'completed',
    prizes: ['$5,000 First Prize', '$2,500 Second Prize', '$1,000 Third Prize', 'Internship Opportunity for Top 5'],
    isPublic: true,
    registrationType: 'open' as 'open' | 'invitation' | 'approval',
    challenges: [
      {
        id: '101',
        title: 'Lightweight Suspension Component',
        description: 'Design a lightweight suspension component that maintains structural integrity',
        level: ChallengeLevel.INTERMEDIATE,
        points: 300,
        thumbnailUrl: '/placeholder.svg',
        status: ChallengeStatus.PUBLISHED,
        submissionCount: 18,
        successRate: 72,
      },
      {
        id: '102',
        title: 'Aerodynamic Side Mirror Design',
        description: 'Design an aerodynamic side mirror that reduces drag',
        level: ChallengeLevel.ADVANCED,
        points: 450,
        thumbnailUrl: '/placeholder.svg',
        status: ChallengeStatus.PUBLISHED,
        submissionCount: 12,
        successRate: 58,
      }
    ]
  };

  const calculateDaysRemaining = (endDate: Date): number => {
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  const daysRemaining = calculateDaysRemaining(competition.endDate);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto">
          {/* Competition Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{competition.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Hosted by {competition.organizationName}</p>
              </div>
              <div>
                <Badge className={
                  competition.status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                  competition.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }>
                  {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            {/* Competition details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {competition.startDate.toLocaleDateString()} - {competition.endDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Participants</p>
                  <p className="font-medium text-gray-900 dark:text-white">{competition.registeredUsers}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Prizes</p>
                  <p className="font-medium text-gray-900 dark:text-white">{competition.prizes.length} prizes</p>
                </div>
              </div>
            </div>
            
            {competition.status === 'active' && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Competition progress</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{daysRemaining} days left</p>
                </div>
                <Progress value={66} className="h-2" />
              </div>
            )}
            
            <div className="flex flex-wrap gap-3 mt-6">
              <Button size="lg">Register Now</Button>
              <Button variant="outline" size="lg">View Challenges</Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Competition Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{competition.description}</p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About This Competition</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This competition challenges designers to create innovative automotive components that combine sustainability with high performance. Participants will tackle real-world design problems facing the automotive industry today.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Dates</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Registration Opens</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">May 1, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Competition Begins</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">May 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-red-600 dark:text-red-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Submission Deadline</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">June 15, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Winners Announced</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">June 30, 2025</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="challenges" className="space-y-6">
              {competition.challenges.map(challenge => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <CardTitle>{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{challenge.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className={
                        challenge.level === ChallengeLevel.BEGINNER ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800" :
                        challenge.level === ChallengeLevel.INTERMEDIATE ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800" :
                        "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800"
                      }>
                        {challenge.level}
                      </Badge>
                      <Badge variant="outline" className="bg-cadarena-50 text-cadarena-700 border-cadarena-200 dark:bg-cadarena-900 dark:text-cadarena-300 dark:border-cadarena-800">
                        {challenge.points} pts
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Submissions</span>
                      <span className="font-medium">{challenge.submissionCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-4">
                      <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                      <span className="font-medium">{challenge.successRate}%</span>
                    </div>
                    <Button className="w-full">Begin Challenge</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="participants" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Registered Participants</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {competition.registeredUsers} designers have registered for this competition.
              </p>
              {/* Participant list would go here */}
            </TabsContent>
            
            <TabsContent value="prizes" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Prizes & Recognition</h2>
              <div className="space-y-6">
                {competition.prizes.map((prize, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 dark:bg-yellow-900' :
                      index === 1 ? 'bg-gray-200 dark:bg-gray-700' :
                      index === 2 ? 'bg-amber-100 dark:bg-amber-900' :
                      'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      <Trophy className={`h-6 w-6 ${
                        index === 0 ? 'text-yellow-600 dark:text-yellow-400' :
                        index === 1 ? 'text-gray-600 dark:text-gray-400' :
                        index === 2 ? 'text-amber-600 dark:text-amber-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {index === 0 ? 'First Place' :
                         index === 1 ? 'Second Place' :
                         index === 2 ? 'Third Place' :
                         `Additional Prize ${index - 2}`}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{prize}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rules" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Competition Rules</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Eligibility</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    This competition is open to all registered users of CAD Arena with active accounts.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Submission Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>All designs must be original and created by the submitting participant</li>
                    <li>Submissions must include both CAD files and STL exports</li>
                    <li>Designs must meet all specified dimensional and functional requirements</li>
                    <li>Each participant may submit up to 3 different design approaches</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Judging Criteria</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Innovation and creativity (30%)</li>
                    <li>Functionality and practicality (25%)</li>
                    <li>Technical execution and complexity (25%)</li>
                    <li>Sustainability considerations (20%)</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Intellectual Property</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Participants retain ownership of their submissions, but grant Tesla Motors a non-exclusive license to review and potentially utilize winning designs with appropriate compensation to be negotiated separately.
                  </p>
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

export default CompetitionDetail;
