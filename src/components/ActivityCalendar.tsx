
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

type ActivityLevel = 0 | 1 | 2 | 3 | 4;

interface ActivityDay {
  date: Date;
  count: number;
  level: ActivityLevel;
}

interface ActivityCalendarProps {
  data?: ActivityDay[];
}

export default function ActivityCalendar({ data }: ActivityCalendarProps) {
  // Generate mock data for the past year if no data is provided
  const activityData = useMemo(() => {
    if (data) return data;
    
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    const mockData: ActivityDay[] = [];
    let currentDate = new Date(oneYearAgo);
    
    while (currentDate <= today) {
      // Generate random activity counts with more intentional patterns
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const monthValue = currentDate.getMonth();
      
      // Create patterns: more activity on weekdays, seasonal variations
      const baseChance = isWeekend ? 0.2 : 0.4;
      // More activity in January (resolutions) and summer months
      const seasonalBoost = (monthValue === 0 || (monthValue >= 5 && monthValue <= 7)) ? 0.2 : 0;
      
      const random = Math.random();
      const activityChance = baseChance + seasonalBoost;
      
      let count = 0;
      let level: ActivityLevel = 0;
      
      if (random > (1 - activityChance * 0.5)) {
        count = Math.floor(Math.random() * 10) + 8;
        level = 4;
      } else if (random > (1 - activityChance * 0.7)) {
        count = Math.floor(Math.random() * 5) + 5;
        level = 3;
      } else if (random > (1 - activityChance * 0.9)) {
        count = Math.floor(Math.random() * 3) + 2;
        level = 2;
      } else if (random > (1 - activityChance)) {
        count = 1;
        level = 1;
      }
      
      mockData.push({
        date: new Date(currentDate),
        count,
        level,
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return mockData;
  }, [data]);

  // Generate months for the header
  const calendarMonths = useMemo(() => {
    if (!activityData.length) return [];
    
    const months: string[] = [];
    let currentMonth = -1;
    
    activityData.forEach(day => {
      const month = day.date.getMonth();
      if (month !== currentMonth) {
        currentMonth = month;
        months.push(day.date.toLocaleString('default', { month: 'short' }));
      }
    });
    
    // Ensure we have a reasonable number of months displayed (around 12)
    if (months.length > 12) {
      const step = Math.ceil(months.length / 12);
      return months.filter((_, i) => i % step === 0);
    }
    
    return months;
  }, [activityData]);

  // Calculate weeks for the grid
  const calendarWeeks = useMemo(() => {
    if (!activityData.length) return [];
    
    const weeks: ActivityDay[][] = [];
    let currentWeek: ActivityDay[] = [];
    let currentDayOfWeek = activityData[0].date.getDay();
    
    // Fill in missing days at the start of the first week
    for (let i = 0; i < currentDayOfWeek; i++) {
      currentWeek.push({
        date: new Date(),
        count: 0,
        level: 0
      });
    }
    
    activityData.forEach(day => {
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
      
      currentWeek.push(day);
    });
    
    // Fill in the last week if needed
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: new Date(),
          count: 0,
          level: 0
        });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  }, [activityData]);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-bold">
          <ChartBar className="mr-2 h-5 w-5 text-primary" />
          Contribution Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground flex justify-between pb-2">
          {calendarMonths.map((month) => (
            <span key={month} className="flex-1 text-center">
              {month}
            </span>
          ))}
        </div>
        
        <div className="grid grid-flow-col gap-1">
          {calendarWeeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-flow-row gap-1">
              {week.map((day, dayIdx) => {
                const dateStr = day.count > 0 ? 
                  `${day.count} contributions on ${day.date.toDateString()}` : 
                  "No contributions";
                
                return (
                  <div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`w-3 h-3 rounded-sm transition-colors hover:ring-2 hover:ring-offset-1 hover:ring-primary ${
                      day.level === 0
                        ? "bg-gray-100 dark:bg-gray-700"
                        : day.level === 1
                        ? "bg-green-100 dark:bg-green-900"
                        : day.level === 2
                        ? "bg-green-300 dark:bg-green-700"
                        : day.level === 3
                        ? "bg-green-500 dark:bg-green-500"
                        : "bg-green-700 dark:bg-green-300"
                    }`}
                    title={dateStr}
                  />
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-end mt-3 gap-1 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-700"></div>
          <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-900"></div>
          <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700"></div>
          <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
          <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-300"></div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
