
# CAD Arena Documentation

## Overview

CAD Arena is a platform for practicing, competing, and showcasing CAD design skills. The platform serves two main user types:
- **Students/Individuals**: Users who practice CAD challenges and participate in competitions.
- **Organizations**: Educational institutions or companies who create competitions and recruit talent.

## System Architecture

### Frontend
- **Framework**: React with TypeScript
- **UI Components**: Shadcn UI with Tailwind CSS
- **State Management**: React Query for data fetching and caching
- **Routing**: React Router for navigation

### Backend (Planned)
- **Database**: PostgreSQL database for storing user data, challenges, submissions, etc.
- **Authentication**: JWT-based authentication
- **File Storage**: Secure storage for CAD model files
- **API**: RESTful API endpoints for all platform features

## User Journeys

### Student User Journey

1. **Registration & Onboarding**
   - Student signs up with email or social auth
   - Creates profile with CAD experience level
   - Completes introductory CAD challenge

2. **Practice**
   - Browses available challenges by difficulty level
   - Selects challenge and views requirements
   - Downloads reference materials if provided
   - Uploads solution as STL file
   - Receives feedback and points upon successful completion

3. **Competition Participation**
   - Discovers competitions via dashboard/browse page
   - Registers for competition before deadline
   - Receives competition brief and requirements
   - Submits design within specified timeframe
   - Receives results and feedback
   - Views certificate if awarded

### Organization User Journey

1. **Registration & Onboarding**
   - Organization signs up and verifies identity
   - Creates organization profile
   - Sets up payment method (if applicable)

2. **Contest Creation**
   - Creates new contest/competition
   - Sets parameters (title, description, timeline, rules)
   - Uploads reference materials and requirements
   - Configures evaluation criteria
   - Publishes contest or saves as draft

3. **Participant Management**
   - Views list of registered participants
   - Reviews submitted designs
   - Provides feedback and scores
   - Selects winners
   - Issues certificates in bulk

4. **Talent Discovery**
   - Searches for users based on skills and achievements
   - Reviews portfolios and submission history 
   - Contacts promising candidates
   - Tracks performance metrics of talent pool

## Home Page and Dashboard

The home page serves as the dashboard for logged-in users, providing:

1. **For Students**:
   - Overview of current progress and streak
   - Recommended challenges based on skill level
   - Active competitions that match interests
   - Recent achievements and points earned
   - Community leaderboard and top designers

2. **For Organizations**:
   - Overview of created contests and their status
   - Participant metrics and submission statistics
   - Quick access to contest creation tools
   - Talent discovery features
   - Analytics on engagement and performance

## Security Measures

### Protecting CAD Logic
- The core validation logic for CAD models should be implemented server-side
- Client-side code should only handle display and user interaction
- Server-side validation using secure algorithms inaccessible to clients

### Data Protection
- Encrypted storage for all user data
- JWT with limited session duration
- HTTPS for all communications
- Role-based access control
- Regular security audits

## Testing Strategy

1. **Unit Testing**
   - Component-level tests for UI elements
   - Function-level tests for utility functions

2. **Integration Testing**
   - Testing interactions between components
   - API integration tests

3. **End-to-End Testing**
   - Complete user flow testing
   - Cross-browser compatibility

4. **Security Testing**
   - Penetration testing
   - Vulnerability scanning

## Database Implementation

The CAD Arena platform uses PostgreSQL for its database needs. The database schema is designed to support all platform features, including user management, challenge tracking, competitions, and submissions.

### Complete Database Schema (SQL)

```sql
-- Users table - Core user information
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'organization', 'admin')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    avatar_url VARCHAR(255),
    bio TEXT
);

-- Student profiles - Extended information for student users
CREATE TABLE student_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    points INTEGER NOT NULL DEFAULT 0,
    streak INTEGER NOT NULL DEFAULT 0,
    level VARCHAR(20) NOT NULL DEFAULT 'beginner',
    completed_challenges INTEGER NOT NULL DEFAULT 0,
    last_activity_date DATE,
    country VARCHAR(100),
    institution VARCHAR(150),
    experience_level VARCHAR(50)
);

-- Organization profiles - Extended information for organization users
CREATE TABLE organization_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    logo_url VARCHAR(255),
    industry VARCHAR(100),
    verified BOOLEAN DEFAULT FALSE,
    verification_date TIMESTAMP,
    contests_created INTEGER DEFAULT 0,
    subscription_tier VARCHAR(20) DEFAULT 'free',
    subscription_expires TIMESTAMP
);

-- Challenges - Individual CAD practice tasks
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    points INTEGER NOT NULL,
    thumbnail_url VARCHAR(255),
    status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
    creator_id UUID REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'organization')),
    organization_id UUID REFERENCES users(id) NULL,
    category VARCHAR(50),
    tags TEXT[],
    reference_model_url VARCHAR(255),
    time_estimate_minutes INTEGER
);

-- Challenge resources - Files and materials associated with challenges
CREATE TABLE challenge_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    resource_type VARCHAR(50) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    file_url VARCHAR(255) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Challenge questions - Technical questions associated with challenges
CREATE TABLE challenge_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('mcq', 'text', 'numeric')),
    question_text TEXT NOT NULL,
    options JSONB,
    correct_answer TEXT,
    points INTEGER DEFAULT 10,
    order_index INTEGER
);

-- Contests - Design competitions hosted by organizations
CREATE TABLE contests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    organization_id UUID REFERENCES users(id),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    registration_deadline TIMESTAMP,
    status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'upcoming', 'active', 'completed', 'archived')),
    visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'invite')),
    thumbnail_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    prize_description TEXT,
    rules TEXT,
    max_participants INTEGER,
    certificate_template_id UUID
);

-- Contest challenges - Links challenges to contests
CREATE TABLE contest_challenges (
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    order_index INTEGER,
    weight NUMERIC DEFAULT 1.0,
    PRIMARY KEY (contest_id, challenge_id)
);

-- Contest registrations - Users registered for contests
CREATE TABLE contest_registrations (
    contest_id UUID REFERENCES contests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP NOT NULL DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'withdrawn', 'disqualified')),
    notes TEXT,
    PRIMARY KEY (contest_id, user_id)
);

-- Submissions - User solutions for challenges and contests
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    challenge_id UUID REFERENCES challenges(id),
    contest_id UUID REFERENCES contests(id) NULL,
    file_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'correct', 'incorrect', 'disqualified')),
    score NUMERIC NULL,
    time_spent_seconds INTEGER,
    attempt_number INTEGER DEFAULT 1,
    feedback TEXT,
    metadata JSONB
);

-- Submission answers - Responses to technical questions
CREATE TABLE submission_answers (
    submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES challenge_questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN,
    points_earned INTEGER DEFAULT 0,
    PRIMARY KEY (submission_id, question_id)
);

-- Achievements - Available badges and awards
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_url VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    points INTEGER DEFAULT 0,
    criteria JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- User achievements - Tracks earned achievements
CREATE TABLE user_achievements (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, achievement_id)
);

-- Certificates - Awarded certificates for contest participation/victory
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    contest_id UUID REFERENCES contests(id),
    certificate_type VARCHAR(50) NOT NULL CHECK (certificate_type IN ('participation', 'winner', 'runner_up', 'honorable_mention', 'custom')),
    issued_at TIMESTAMP NOT NULL DEFAULT NOW(),
    certificate_url VARCHAR(255) NOT NULL,
    certificate_hash VARCHAR(64) UNIQUE,
    issuer_name VARCHAR(100),
    custom_message TEXT,
    expiry_date TIMESTAMP
);

-- Certificate templates - Templates for generating certificates
CREATE TABLE certificate_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    template_html TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_default BOOLEAN DEFAULT FALSE
);

-- Leaderboards - Various ranking systems
CREATE TABLE leaderboards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    period VARCHAR(20) CHECK (period IN ('all_time', 'yearly', 'monthly', 'weekly')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- Leaderboard entries - Individual user rankings
CREATE TABLE leaderboard_entries (
    leaderboard_id UUID REFERENCES leaderboards(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rank INTEGER NOT NULL,
    score NUMERIC NOT NULL,
    last_updated TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (leaderboard_id, user_id)
);

-- User follows - Social connections between users
CREATE TABLE user_follows (
    follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id UUID REFERENCES users(id) ON DELETE CASCADE,
    followed_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

-- Activity logs - Track user actions and system events
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    activity_type VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    ip_address VARCHAR(45)
);

-- Challenge statistics - Pre-calculated metrics for challenges
CREATE TABLE challenge_statistics (
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE PRIMARY KEY,
    submission_count INTEGER DEFAULT 0,
    success_rate NUMERIC DEFAULT 0,
    average_time_seconds INTEGER DEFAULT 0,
    average_score NUMERIC DEFAULT 0,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Index definitions for optimized queries
CREATE INDEX idx_submissions_challenge_id ON submissions(challenge_id);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_contest_id ON submissions(contest_id);
CREATE INDEX idx_contest_registrations_contest_id ON contest_registrations(contest_id);
CREATE INDEX idx_challenges_level ON challenges(level);
CREATE INDEX idx_challenges_creator_id ON challenges(creator_id);
CREATE INDEX idx_contests_organization_id ON contests(organization_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX idx_challenges_status_level ON challenges(status, level);

-- Views for common queries
CREATE VIEW active_contests AS
SELECT * FROM contests 
WHERE status = 'active' OR (status = 'upcoming' AND start_date <= NOW() + INTERVAL '7 days');

CREATE VIEW top_challenges AS
SELECT c.*, cs.submission_count, cs.success_rate, cs.average_time_seconds
FROM challenges c
JOIN challenge_statistics cs ON c.id = cs.challenge_id
WHERE c.status = 'published'
ORDER BY cs.submission_count DESC;

CREATE VIEW user_rankings AS
SELECT u.id, u.username, u.avatar_url, sp.points, sp.level, sp.completed_challenges,
  RANK() OVER (ORDER BY sp.points DESC) as overall_rank
FROM users u
JOIN student_profiles sp ON u.id = sp.user_id
WHERE u.role = 'student';
```

### Key Database Tables & Relationships

The database design revolves around several core entities:

1. **Users & Profiles**
   - `users` table stores authentication data
   - `student_profiles` and `organization_profiles` store role-specific information
   - Split architecture allows for detailed user information without bloating the main user table

2. **Challenges**
   - `challenges` table stores all practice tasks
   - `challenge_resources` contains supplementary files
   - `challenge_questions` stores technical questions
   - `challenge_statistics` maintains pre-calculated metrics

3. **Contests**
   - `contests` table stores competitions created by organizations
   - `contest_challenges` links challenges to contests
   - `contest_registrations` tracks participant sign-ups

4. **Submissions**
   - `submissions` stores user solutions
   - `submission_answers` contains responses to technical questions
   - Linked to both challenges and contests as appropriate

5. **Achievements & Certificates**
   - `achievements` defines available badges
   - `user_achievements` tracks earned achievements
   - `certificates` stores issued certificates
   - `certificate_templates` allows for custom organization branding

### Real-Time Statistics Implementation

Challenge statistics are dynamically updated through database triggers:

```sql
-- Trigger function to update challenge statistics after submission
CREATE OR REPLACE FUNCTION update_challenge_statistics()
RETURNS TRIGGER AS $$
BEGIN
  -- Update submission count and recalculate metrics
  WITH stats AS (
    SELECT 
      COUNT(*) as total_submissions,
      AVG(CASE WHEN status = 'correct' THEN 1.0 ELSE 0.0 END) * 100 as success_percent,
      AVG(CASE WHEN status = 'correct' THEN time_spent_seconds ELSE NULL END) as avg_time,
      AVG(CASE WHEN score IS NOT NULL THEN score ELSE NULL END) as avg_score
    FROM submissions
    WHERE challenge_id = NEW.challenge_id
  )
  INSERT INTO challenge_statistics 
    (challenge_id, submission_count, success_rate, average_time_seconds, average_score, last_updated)
  SELECT 
    NEW.challenge_id, 
    stats.total_submissions, 
    stats.success_percent,
    stats.avg_time,
    stats.avg_score,
    NOW()
  FROM stats
  ON CONFLICT (challenge_id) DO UPDATE SET
    submission_count = EXCLUDED.submission_count,
    success_rate = EXCLUDED.success_rate,
    average_time_seconds = EXCLUDED.average_time_seconds,
    average_score = EXCLUDED.average_score,
    last_updated = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to submissions table
CREATE TRIGGER trigger_update_challenge_statistics
AFTER INSERT OR UPDATE ON submissions
FOR EACH ROW
EXECUTE FUNCTION update_challenge_statistics();
```

## Implementation Guidelines

### 1. Frontend Development
- Create responsive UI components
- Implement client-side validation
- Set up routes and navigation
- Design user dashboards for both roles

### 2. Authentication System
- Implement secure user registration and login
- Set up JWT token handling
- Create role-based permissions

### 3. Challenge System
- Build challenge creation interface
- Implement challenge browse/filter functionality
- Create challenge submission and evaluation workflow

### 4. Competition System
- Develop competition creation and management features
- Implement participant registration
- Design submission review interface

### 5. File Handling
- Set up secure STL file upload and validation
- Implement file storage and retrieval
- Create file comparison logic for evaluation

### 6. Certificate System
- Design certificate templates
- Implement bulk certificate generation
- Set up certificate verification system

## Deployment Strategy

1. Set up CI/CD pipeline
2. Configure database migrations
3. Implement monitoring and logging
4. Create backup strategy
5. Plan for scalability

## Maintenance Plan

1. Regular security updates
2. Performance monitoring
3. User feedback collection
4. Feature roadmap planning
5. Regular code reviews
