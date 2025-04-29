
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ChallengeCard from "@/components/ChallengeCard";
import { Challenge, ChallengeLevel, ChallengeStatus } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Mock data for challenges
const challenges: Challenge[] = [
  {
    id: "1",
    title: "Basic Gear Design",
    description: "Create a simple spur gear with specific tooth profile and dimensions.",
    instructions: "Design a spur gear with 24 teeth, module 2mm, and pressure angle of 20°.",
    level: ChallengeLevel.BEGINNER,
    points: 100,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org1",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
    submissionCount: 876,
    successRate: 87,
  },
  {
    id: "2",
    title: "Ergonomic Handle",
    description: "Design an ergonomic handle for a kitchen utensil that fits comfortably in the hand.",
    instructions: "Create a handle that fits the human grip with appropriate curves and dimensions.",
    level: ChallengeLevel.INTERMEDIATE,
    points: 200,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org2",
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-02-22"),
    submissionCount: 542,
    successRate: 65,
  },
  {
    id: "3",
    title: "Parametric Bracket Design",
    description: "Create a fully parameterized corner bracket that can adapt to different load requirements.",
    instructions: "Design a bracket that can be adjusted through parameters for different applications.",
    level: ChallengeLevel.ADVANCED,
    points: 300,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org1",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-15"),
    submissionCount: 315,
    successRate: 42,
  },
  {
    id: "4",
    title: "Phone Stand",
    description: "Create a compact and foldable phone stand that can be 3D printed.",
    instructions: "Design a phone stand that can be folded flat and 3D printed without supports.",
    level: ChallengeLevel.BEGINNER,
    points: 100,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org2",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05"),
    submissionCount: 723,
    successRate: 91,
  },
  {
    id: "5",
    title: "Adjustable Desk Lamp",
    description: "Design an adjustable desk lamp with multiple pivot points.",
    instructions: "Create a desk lamp with at least 3 adjustable joints and stable base.",
    level: ChallengeLevel.INTERMEDIATE,
    points: 200,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org1",
    createdAt: new Date("2023-04-01"),
    updatedAt: new Date("2023-04-03"),
    submissionCount: 412,
    successRate: 63,
  },
  {
    id: "6",
    title: "Drone Frame Design",
    description: "Design a lightweight but durable frame for a quadcopter drone.",
    instructions: "Create a drone frame that balances weight, strength, and ease of assembly.",
    level: ChallengeLevel.ADVANCED,
    points: 250,
    thumbnailUrl: "/placeholder.svg",
    status: ChallengeStatus.PUBLISHED,
    creatorId: "org3",
    createdAt: new Date("2023-04-12"),
    updatedAt: new Date("2023-04-15"),
    submissionCount: 278,
    successRate: 51,
  },
];

const Practice = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Practice Challenges</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Improve your CAD skills with our collection of design challenges
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="w-full sm:w-64">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-64">
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="points-high">Highest Points</SelectItem>
                      <SelectItem value="points-low">Lowest Points</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <Input
                type="search"
                placeholder="Search challenges..."
                className="pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="outline">Load More Challenges</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Practice;
