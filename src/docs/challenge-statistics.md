# Challenge Statistics

## Overview

Challenge statistics in CAD Arena provide crucial metrics about performance, engagement, and difficulty levels. These statistics are calculated dynamically based on user interactions and help both students and organizations understand progress and identify areas for improvement.

## Key Statistics

### Success Rate

Success rate represents the percentage of successful submissions out of all submissions for a particular challenge.

#### Calculation
```
Success Rate = (Number of Correct Submissions / Total Submissions) × 100%
```

#### Implementation
- Calculated real-time upon every submission
- Updates challenge record in the database
- Displayed on challenge cards and detail pages
- Used for difficulty sorting and filtering

#### Database Integration
The success rate is stored in the `challenge_stats` table and updated via a trigger:

```sql
CREATE OR REPLACE FUNCTION update_challenge_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate success rate
    INSERT INTO challenge_stats (
        challenge_id, 
        submission_count, 
        success_count, 
        success_rate
    )
    SELECT 
        NEW.challenge_id, 
        COUNT(*), 
        SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END),
        (SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)) * 100
    FROM 
        submissions
    WHERE 
        challenge_id = NEW.challenge_id
    ON CONFLICT (challenge_id) 
    DO UPDATE SET
        submission_count = EXCLUDED.submission_count,
        success_count = EXCLUDED.success_count,
        success_rate = EXCLUDED.success_rate,
        last_updated = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stats_after_submission
AFTER INSERT OR UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_challenge_stats();
```

### Submission Count

Submission count tracks the total number of attempts made for a challenge, indicating its popularity and engagement level.

#### Tracking
- Incremented with each submission (correct or incorrect)
- Aggregated for analytics across time periods
- Used to identify popular and trending challenges
- Factored into recommendation algorithms

#### Visualization
Submission counts are displayed:
- On challenge cards as a basic metric
- In admin dashboards with trend analysis
- On leaderboards to highlight popular challenges
- In user profile statistics

### Average Completion Time

Average completion time measures how long users typically take to successfully complete a challenge.

#### Calculation
```
Average Completion Time = Sum of Completion Times / Number of Successful Submissions
```

#### Implementation
- Timer starts when a user begins a challenge
- Timer stops when submission is completed
- Only successful submissions are included in the average
- Outliers (extremely long or short times) may be filtered

#### Database Integration
The average completion time is stored and updated via the same trigger:

```sql
-- In the update_challenge_stats() function:
    SELECT 
        NEW.challenge_id, 
        COUNT(*), 
        SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END),
        (SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)) * 100,
        AVG(CASE WHEN status = 'correct' THEN completion_time ELSE NULL END)
    FROM 
        submissions
    WHERE 
        challenge_id = NEW.challenge_id
    -- Rest of function...
```

## Challenge Timer

The challenge timer is a critical component for tracking user performance:

### Timer Implementation

When a user starts a challenge, the timer begins:

```typescript
// In the ChallengeView component
const [startTime, setStartTime] = useState<Date | null>(null);
const [elapsedTime, setElapsedTime] = useState<number>(0);
const [timerRunning, setTimerRunning] = useState<boolean>(false);

// Start the timer when component mounts or challenge begins
useEffect(() => {
  if (!startTime) {
    setStartTime(new Date());
    setTimerRunning(true);
  }
  
  let intervalId: number;
  
  if (timerRunning) {
    intervalId = window.setInterval(() => {
      const currentTime = new Date();
      const elapsed = startTime ? Math.floor((currentTime.getTime() - startTime.getTime()) / 1000) : 0;
      setElapsedTime(elapsed);
    }, 1000);
  }
  
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [startTime, timerRunning]);
```

### Timer Display

The timer is displayed prominently during the challenge:

```tsx
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// In the render function
<div className="fixed top-4 right-4 bg-white dark:bg-gray-800 shadow-md rounded-md px-3 py-2 border border-gray-200 dark:border-gray-700">
  <div className="text-sm text-gray-500 dark:text-gray-400">Time Elapsed</div>
  <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
</div>
```

### Saving Completion Time

When a submission is made, the completion time is recorded:

```typescript
const handleSubmit = async () => {
  setTimerRunning(false);
  const completionTime = elapsedTime;
  
  // Include completion time in submission data
  const submissionData = {
    // Other submission data
    completionTime: completionTime,
    // ...
  };
  
  // Send submission to API
};
```

## Real-time Statistic Updates

Statistics are updated in real-time through these mechanisms:

### Database Triggers

Triggers automatically update statistics when new submissions are processed:

```sql
CREATE TRIGGER update_stats_after_submission
AFTER INSERT OR UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_challenge_stats();
```

### Scheduled Aggregations

For more complex statistics, scheduled jobs update aggregate values:

```sql
-- Example of a scheduled function to update challenge statistics
CREATE OR REPLACE FUNCTION refresh_challenge_statistics()
RETURNS void AS $$
BEGIN
  -- Update challenge stats table with latest metrics
  UPDATE challenge_stats cs
  SET 
    submission_count = sc.sub_count,
    success_count = sc.success_count,
    success_rate = CASE WHEN sc.sub_count > 0 THEN (sc.success_count::DECIMAL / sc.sub_count) * 100 ELSE 0 END,
    avg_completion_time = sc.avg_time,
    last_updated = NOW()
  FROM (
    SELECT 
      challenge_id,
      COUNT(*) as sub_count,
      SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END) as success_count,
      AVG(CASE WHEN status = 'correct' THEN completion_time ELSE NULL END) as avg_time
    FROM 
      submissions
    GROUP BY 
      challenge_id
  ) sc
  WHERE cs.challenge_id = sc.challenge_id;
END;
$$ LANGUAGE plpgsql;
```

### Front-end Polling

For active users, the front-end may periodically poll for updated statistics:

```typescript
// In a ChallengeStatistics component
useEffect(() => {
  const intervalId = setInterval(async () => {
    const updatedStats = await fetchChallengeStatistics(challengeId);
    setStatistics(updatedStats);
  }, 30000); // Update every 30 seconds
  
  return () => clearInterval(intervalId);
}, [challengeId]);
```

## Visualization and Display

Challenge statistics are visualized in multiple ways:

### Progress Bars

```tsx
<div className="mt-4">
  <div className="flex justify-between mb-1">
    <span className="text-sm font-medium">Success Rate</span>
    <span className="text-sm font-medium">{challenge.successRate}%</span>
  </div>
  <Progress value={challenge.successRate} className="h-2" />
</div>
```

### Comparative Metrics

```tsx
<div className="grid grid-cols-2 gap-4 mt-4">
  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
    <div className="text-sm text-gray-500">Your Time</div>
    <div className="text-xl font-bold">{formatTime(userCompletionTime)}</div>
    <div className="text-xs text-gray-400">
      {userCompletionTime < averageCompletionTime ? 'Faster than average' : 'Slower than average'}
    </div>
  </div>
  
  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
    <div className="text-sm text-gray-500">Average Time</div>
    <div className="text-xl font-bold">{formatTime(averageCompletionTime)}</div>
    <div className="text-xs text-gray-400">
      Based on {submissionCount} submissions
    </div>
  </div>
</div>
```

### Badges and Indicators

Challenge difficulty indicators are dynamically assigned based on success rate:

```tsx
const getDifficultyBadge = (successRate: number) => {
  if (successRate < 25) return { label: "Very Hard", color: "red" };
  if (successRate < 50) return { label: "Hard", color: "orange" };
  if (successRate < 75) return { label: "Moderate", color: "blue" };
  return { label: "Easy", color: "green" };
};

// In the render function
const difficultyInfo = getDifficultyBadge(challenge.successRate);

<Badge 
  style={{ backgroundColor: `var(--${difficultyInfo.color}-50)`, 
          color: `var(--${difficultyInfo.color}-700)` }}
  className="ml-2"
>
  {difficultyInfo.label}
</Badge>
```

## Best Practices

1. **Caching Strategy**: Cache frequently accessed statistics to reduce database load
2. **Clear Explanations**: Provide tooltips or help text explaining how metrics are calculated
3. **Visual Context**: Use colors and visual cues to indicate good/poor performance
4. **Historical Tracking**: Maintain historical statistics for trend analysis
5. **Performance Optimization**: Ensure statistical calculations don't impact user experience

## Implementation Guidelines

When implementing challenge statistics:

1. Always use the same calculation methods across the platform for consistency
2. Apply appropriate rounding for display (e.g., success rates to one decimal place)
3. Include "No Data" states for challenges with insufficient submissions
4. Consider privacy implications when displaying user comparison data
5. Use statistical guards against outliers that could skew averages
