
# Technical Documentation

## Backend Implementation

### Database Schema

- **Users Table**: Stores user information, credentials, and profile data
- **Organizations Table**: Stores organization details and verification status
- **Challenges Table**: Contains all practice challenges with metadata
- **Competitions Table**: Stores competition details and configurations
- **Submissions Table**: Records all challenge and competition submissions
- **Evaluations Table**: Stores evaluation results for submissions
- **Achievements Table**: Tracks user badges and accomplishments

### API Architecture

The CAD Arena API follows RESTful principles with the following main endpoints:
- `/api/auth`: Authentication and user management
- `/api/challenges`: Practice challenge management
- `/api/competitions`: Competition management
- `/api/submissions`: Submission handling and evaluation
- `/api/profiles`: User profile management

### Authentication and Security

- JWT-based authentication system
- Role-based access control
- Rate limiting to prevent abuse
- Encrypted file storage for design submissions
- Regular security audits and updates

## STL Processing System

CAD Arena uses a specialized system for processing and evaluating STL files:

1. **Validation**: Ensuring file integrity and format compliance
2. **Normalization**: Standardizing scale and orientation
3. **Analysis**: Extracting model metrics (volume, surface area, etc.)
4. **Comparison**: Evaluating similarity to reference models
5. **Scoring**: Calculating final scores based on multiple criteria

## Challenge Statistics System

CAD Arena tracks and displays real-time challenge statistics to help users understand difficulty levels and compare performance:

### Dynamic Challenge Stats Implementation

1. **Success Rate Calculation**
   ```javascript
   // Success rate is calculated as a percentage of successful submissions
   const calculateSuccessRate = (challengeId) => {
     const totalSubmissions = getSubmissionCount(challengeId);
     const successfulSubmissions = getSuccessfulSubmissionCount(challengeId);
     return totalSubmissions > 0 ? (successfulSubmissions / totalSubmissions) * 100 : 0;
   };
   ```

2. **Submission Tracking**
   ```javascript
   // Real-time submission count using database aggregation
   const getSubmissionCount = async (challengeId) => {
     const count = await db.submissions.count({ 
       where: { challengeId: challengeId }
     });
     return count;
   };
   ```

3. **Average Time Calculation**
   ```javascript
   // Calculate average time spent on successful submissions
   const calculateAverageTime = async (challengeId) => {
     const submissions = await db.submissions.findMany({
       where: { 
         challengeId: challengeId,
         status: "correct"
       },
       select: { timeSpent: true }
     });
     
     if (submissions.length === 0) return 0;
     
     const totalTime = submissions.reduce((sum, sub) => sum + sub.timeSpent, 0);
     return Math.round(totalTime / submissions.length);
   };
   ```

4. **Challenge Timer Implementation**
   ```javascript
   // Timer starts automatically when a user enters the challenge
   useEffect(() => {
     if (challengeLoaded && !timerStarted) {
       startTimer();
       setTimerStarted(true);
     }
     
     return () => {
       if (timerStarted) {
         pauseTimer();
         saveElapsedTime(challengeId, elapsedTime);
       }
     };
   }, [challengeLoaded]);
   ```

### Statistics Update Triggers

Challenge statistics are updated at the following points:
- When a new submission is received
- When a submission's evaluation is completed
- During daily aggregation jobs for performance metrics
- When requested by an organization hosting a competition

## Secure Code Architecture

To protect proprietary evaluation algorithms:

- Server-side processing of all evaluations
- Obfuscated client-side code
- Secure API endpoints with authentication
- Separation of frontend and backend logic
- Regular code reviews and security testing
