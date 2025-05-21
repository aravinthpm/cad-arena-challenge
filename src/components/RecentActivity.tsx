
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: string;
  title: string;
  type: "challenge" | "competition" | "achievement";
  date: Date;
  points?: number;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities = [] }: RecentActivityProps) {
  // Generate mock data if none is provided
  const activityData = activities.length > 0 ? activities : [
    {
      id: "1",
      title: "Completed Industrial Equipment Design Challenge",
      type: "challenge",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      points: 50,
    },
    {
      id: "2",
      title: "Earned Problem Solver Badge",
      type: "achievement",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: "3",
      title: "Joined Sustainable Packaging Competition",
      type: "competition",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "4",
      title: "Completed Mechanical Parts Modeling Challenge",
      type: "challenge",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      points: 35,
    },
    {
      id: "5",
      title: "Started 7-day streak",
      type: "achievement",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    },
  ];

  // Format relative time
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'just now';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activityData.map((activity) => (
            <div key={activity.id} className="border-b pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {getRelativeTime(activity.date)}
                  </p>
                </div>
                {activity.points && (
                  <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded text-xs font-medium">
                    +{activity.points} pts
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
