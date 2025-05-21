
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStatsProps {
  completedChallenges: number;
  totalPoints: number;
  currentStreak: number;
  rank: number;
}

export default function UserStats({
  completedChallenges = 42,
  totalPoints = 1250,
  currentStreak = 7,
  rank = 124
}: UserStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completed</div>
            <div className="text-3xl font-bold">{completedChallenges}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Points</div>
            <div className="text-3xl font-bold">{totalPoints}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Streak</div>
            <div className="text-3xl font-bold">{currentStreak}</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rank</div>
            <div className="text-3xl font-bold">#{rank}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
