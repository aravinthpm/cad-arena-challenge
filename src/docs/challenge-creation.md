
# Challenge Creation and Contest Management

## Overview

Organizations can create CAD challenges for students to practice their skills or as part of competitions. The system supports both public challenges (visible in practice section) and private contests (accessible only via invitation links).

## Challenge Types

### 1. Race Against Time
- Participants compete by submitting accurate models quickly
- Automatic scoring based on accuracy and completion time
- STL file verification against reference model
- Real-time leaderboard during active periods

### 2. Creative Contest
- Participants submit creative models for manual evaluation
- Organization judges review each submission individually
- Flexible scoring criteria defined by organizers
- 3D model viewer for review process

## Visibility Options

### Public Challenges
- Visible to all users in the practice section
- Open registration
- Automatic discovery through platform browsing

### Private Contests
- Accessible only via unique invitation links
- Link-based registration system
- Appears in student dashboard as "Upcoming Challenges" after registration
- Secure token-based access control

## Contest Creation Process

### User Interface Flow

1. Organizations access the challenge creation form
2. Select challenge type (Race Against Time vs Creative)
3. Choose visibility (Public vs Private)
4. Fill in challenge details:
   - Title, description, and instructions
   - Difficulty level and point values
   - Start and end dates
   - Maximum participants (optional)
   - Reference materials and STL files
5. For private contests: provide contest name for participant display
6. Preview challenge instructions
7. Create challenge and receive invitation link (for private contests)

### Database Structure

#### Core Tables

**challenges**
```sql
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL,
    level challenge_level NOT NULL,
    type challenge_type NOT NULL,
    visibility challenge_visibility NOT NULL,
    points INTEGER NOT NULL CHECK (points >= 50 AND points <= 1000),
    thumbnail_url TEXT,
    status challenge_status DEFAULT 'draft',
    creator_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    max_participants INTEGER,
    contest_name VARCHAR(255),
    invite_token VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE challenge_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE challenge_type AS ENUM ('race-against-time', 'creative');
CREATE TYPE challenge_visibility AS ENUM ('public', 'private');
CREATE TYPE challenge_status AS ENUM ('draft', 'published', 'archived');
```

**contest_participants**
```sql
CREATE TABLE contest_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    invite_token VARCHAR(255),
    status participant_status DEFAULT 'registered',
    UNIQUE(contest_id, user_id)
);

CREATE TYPE participant_status AS ENUM ('registered', 'active', 'completed', 'disqualified');
```

**submissions**
```sql
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    contest_id UUID REFERENCES challenges(id) ON DELETE SET NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    status submission_status DEFAULT 'pending',
    file_url TEXT NOT NULL,
    score DECIMAL(5,2),
    completion_time INTEGER, -- in seconds
    quiz_answers JSONB,
    feedback TEXT,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ
);

CREATE TYPE submission_status AS ENUM ('pending', 'correct', 'incorrect', 'reviewing');
```

**contest_invite_links**
```sql
CREATE TABLE contest_invite_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contest_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    usage_count INTEGER DEFAULT 0,
    max_usage INTEGER,
    is_active BOOLEAN DEFAULT true
);
```

#### Reference Materials and Assets

**reference_materials**
```sql
CREATE TABLE reference_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    type material_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE material_type AS ENUM ('image', 'document', 'video', 'link', 'stl_file');
```

### API Endpoints

#### Challenge Management

**Create Challenge**
```
POST /api/challenges
Authorization: Bearer <org_token>
Content-Type: multipart/form-data

{
  "title": "string",
  "description": "string",
  "challengeType": "race-against-time" | "creative",
  "visibility": "public" | "private",
  "difficulty": "beginner" | "intermediate" | "advanced" | "expert",
  "points": number,
  "startDate": "ISO_DATE",
  "endDate": "ISO_DATE",
  "maxParticipants": number,
  "contestName": "string", // required for private contests
  "thumbnailImage": File,
  "technicalDiagram": File,
  "stlFile": File,
  "otherDetails": "string"
}

Response: {
  "challengeId": "uuid",
  "inviteLink": "string" // only for private contests
}
```

**Contest Registration**
```
POST /api/contests/join/:challengeId
Authorization: Bearer <student_token>

{
  "inviteToken": "string" // required for private contests
}

Response: {
  "success": boolean,
  "message": "string"
}
```

**Get Contest Management Data**
```
GET /api/organizations/:orgId/contests
Authorization: Bearer <org_token>

Response: {
  "contests": [
    {
      "id": "uuid",
      "title": "string",
      "type": "string",
      "visibility": "string",
      "status": "string",
      "participants": number,
      "startDate": "ISO_DATE",
      "endDate": "ISO_DATE",
      "inviteLink": "string"
    }
  ],
  "stats": {
    "totalContests": number,
    "activeContests": number,
    "totalParticipants": number,
    "privateContests": number
  }
}
```

#### Submission Management

**Submit Solution**
```
POST /api/submissions
Authorization: Bearer <student_token>
Content-Type: multipart/form-data

{
  "challengeId": "uuid",
  "stlFile": File,
  "completionTime": number // in seconds
}
```

**Review Creative Submission**
```
PUT /api/submissions/:submissionId/review
Authorization: Bearer <org_token>

{
  "score": number,
  "feedback": "string"
}
```

### Contest Management Features

#### Organization Dashboard
- View all created contests with statistics
- Filter by status, type, and visibility
- Quick actions: View, Edit, Delete, Copy invite link
- Real-time participant count updates
- Performance analytics per contest

#### Student Dashboard Integration
- Private contests appear in "Upcoming Challenges" after registration
- Registration status tracking
- Progress indicators for active contests
- Results and feedback display

#### Link Management
- Unique token generation for each private contest
- Link expiration and usage limits (optional)
- Usage analytics and tracking
- Secure token validation

### Security Considerations

1. **Access Control**
   - Private contest access strictly controlled by invitation tokens
   - Organization ownership verification for contest management
   - Student authentication required for participation

2. **Token Security**
   - Cryptographically secure token generation
   - Token validation on every access attempt
   - Optional expiration dates for time-limited access

3. **File Upload Security**
   - STL file validation and virus scanning
   - File size limits and type restrictions
   - Secure file storage with organization isolation

### Performance Optimizations

1. **Database Indexing**
   - Composite indexes on (creator_id, status, created_at)
   - Unique index on invite_token for fast lookups
   - Foreign key indexes for efficient joins

2. **Caching Strategy**
   - Contest metadata cached for public listings
   - Participant counts cached and updated via triggers
   - Static assets served via CDN

3. **Real-time Updates**
   - WebSocket connections for live leaderboards
   - Event-driven notifications for contest status changes
   - Optimistic UI updates for better user experience

### Integration Points

#### File Storage
- STL files stored in secure object storage
- Thumbnail generation for 3D models
- Automatic backup and versioning

#### Notification System
- Email notifications for contest invitations
- In-app notifications for contest status changes
- Reminder notifications before contest deadlines

#### Analytics and Reporting
- Participation statistics and trends
- Success rate analysis by difficulty level
- Export capabilities for contest results
