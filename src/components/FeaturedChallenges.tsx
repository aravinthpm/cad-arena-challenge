
import { Button } from "@/components/ui/button";
import ChallengeCard from "./ChallengeCard";
import { Challenge, ChallengeLevel, ChallengeStatus } from "@/utils/types";
import { Link } from "react-router-dom";

// Mock data for featured challenges
const featuredChallenges: Challenge[] = [
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
];

const FeaturedChallenges = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Featured Challenges
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Test your CAD skills with our most popular design challenges
            </p>
          </div>
          <Link to="/practice">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Challenges
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChallenges;
