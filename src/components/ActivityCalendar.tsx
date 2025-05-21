
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      // Generate random activity counts
      const random = Math.random();
      let count = 0;
      let level: ActivityLevel = 0;
      
      if (random > 0.9) {
        count = Math.floor(Math.random() * 10) + 8;
        level = 4;
      } else if (random > 0.75) {
        count = Math.floor(Math.random() * 5) + 5;
        level = 3;
      } else if (random > 0.5) {
        count = Math.floor(Math.random() * 3) + 2;
        level = 2;
      } else if (random > 0.25) {
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

  // Helper function to get month names
  const getMonthName = (date: Date): string => {
    return date.toLocaleString('default', { month: 'short' });
  };

  // Calculate weeks and months for the grid
  const calendarWeeks = useMemo(() => {
    // Find all unique months
    const months = Array.from(new Set(activityData.map(d => 
      getMonthName(d.date)
    )));
    
    // Group by week
    const weeks: ActivityDay[][] = [];
    let currentWeek: ActivityDay[] = [];
    
    // Current day of week (0 = Sunday, 6 = Saturday)
    let currentDayOfWeek = 0;
    
    // Fill in missing days at the start
    const firstDay = activityData[0].date;
    const firstDayOfWeek = firstDay.getDay();
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: new Date(), count: 0, level: 0 });
      currentDayOfWeek++;
    }
    
    // Add actual days
    for (const day of activityData) {
      if (currentDayOfWeek === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
        currentDayOfWeek = 0;
      }
      
      currentWeek.push(day);
      currentDayOfWeek++;
    }
    
    // Add the last week if it's not complete
    if (currentWeek.length > 0) {
      // Fill in missing days at the end
      while (currentDayOfWeek < 7) {
        currentWeek.push({ date: new Date(), count: 0, level: 0 });
        currentDayOfWeek++;
      }
      weeks.push(currentWeek);
    }
    
    return { weeks, months };
  }, [activityData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xs text-muted-foreground mb-2">
          {calendarWeeks.months.map((month, i) => (
            <span 
              key={month} 
              className="inline-block"
              style={{ 
                width: `${100 / calendarWeeks.months.length}%`, 
                textAlign: i === 0 ? 'left' : i === calendarWeeks.months.length - 1 ? 'right' : 'center'
              }}
            >
              {month}
            </span>
          ))}
        </div>
        
        <div className="flex text-xs text-muted-foreground">
          <div className="grid grid-flow-col gap-1 w-full">
            {calendarWeeks.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-flow-row gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${
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
                    title={day.count > 0 ? `${day.count} contributions on ${day.date.toDateString()}` : "No contributions"}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-end mt-2 gap-1 text-xs text-muted-foreground">
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
