import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Database, Shield, Code, FileText, Users, Target } from "lucide-react";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("system-architecture");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Documentation</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive documentation for CAD Arena platform
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <nav className="space-y-1">
                  {[
                    { id: "system-architecture", label: "System Architecture", icon: <Code className="h-4 w-4" /> },
                    { id: "database", label: "Database Schema", icon: <Database className="h-4 w-4" /> },
                    { id: "authentication", label: "Authentication", icon: <Shield className="h-4 w-4" /> },
                    { id: "user-journeys", label: "User Journeys", icon: <Users className="h-4 w-4" /> },
                    { id: "implementation", label: "Implementation Guide", icon: <FileText className="h-4 w-4" /> },
                    { id: "testing", label: "Testing Strategy", icon: <Target className="h-4 w-4" /> },
                    { id: "security", label: "Security Measures", icon: <Shield className="h-4 w-4" /> },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                        activeTab === item.id
                          ? "bg-cadarena-100 text-cadarena-900 dark:bg-cadarena-900 dark:text-cadarena-100 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <Card>
                <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                  <CardTitle className="flex items-center text-xl">
                    <BookOpen className="h-5 w-5 mr-2" />
                    {activeTab === "system-architecture" && "System Architecture"}
                    {activeTab === "database" && "Database Schema"}
                    {activeTab === "authentication" && "Authentication & Authorization"}
                    {activeTab === "user-journeys" && "User Journeys"}
                    {activeTab === "implementation" && "Implementation Guidelines"}
                    {activeTab === "testing" && "Testing Strategy"}
                    {activeTab === "security" && "Security Measures"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="h-[600px] pr-4">
                    {activeTab === "system-architecture" && (
                      <div className="prose dark:prose-invert max-w-none">
                        <h2>Overview</h2>
                        <p>
                          CAD Arena is built as a modern web application with a clear separation between frontend and backend components.
                          The system is designed to handle CAD file processing, user management, competition hosting, and secure evaluation
                          of CAD designs.
                        </p>

                        <h3>Frontend Architecture</h3>
                        <ul>
                          <li><strong>Framework</strong>: React with TypeScript</li>
                          <li><strong>UI Components</strong>: Shadcn UI with Tailwind CSS</li>
                          <li><strong>State Management</strong>: React Query for data fetching and caching</li>
                          <li><strong>Routing</strong>: React Router for navigation</li>
                        </ul>

                        <h3>Backend Architecture</h3>
                        <ul>
                          <li><strong>API Server</strong>: Node.js with Express</li>
                          <li><strong>Database</strong>: PostgreSQL for relational data</li>
                          <li><strong>Authentication</strong>: JWT-based authentication system</li>
                          <li><strong>File Storage</strong>: S3-compatible storage for CAD models</li>
                          <li><strong>CAD Processing</strong>: Dedicated service for STL validation and comparison</li>
                        </ul>

                        <h3>System Components</h3>
                        <ol>
                          <li>
                            <strong>User Management System</strong>
                            <p>Handles user registration, authentication, authorization, and profile management.</p>
                          </li>
                          <li>
                            <strong>Challenge System</strong>
                            <p>Manages practice challenges, including creation, browsing, and submissions.</p>
                          </li>
                          <li>
                            <strong>Competition System</strong>
                            <p>Handles competitions, registrations, submissions, and results.</p>
                          </li>
                          <li>
                            <strong>CAD Processing Engine</strong>
                            <p>Processes and validates STL files, performs comparisons, and evaluates submissions.</p>
                          </li>
                          <li>
                            <strong>Organization Portal</strong>
                            <p>Provides tools for organizations to create and manage competitions, view participants, and issue certificates.</p>
                          </li>
                        </ol>

                        <h3>System Diagram</h3>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                          <p className="text-center italic text-sm text-gray-500">
                            [System architecture diagram would be displayed here]
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "database" && (
                      <div className="prose dark:prose-invert max-w-none">
                        <h2>Database Schema</h2>
                        <p>
                          The CAD Arena platform uses a relational database with the following table structure. This schema
                          is designed to efficiently store user data, challenges, competitions, and submissions.
                        </p>

                        <h3>Core Tables</h3>

                        <h4>Users Table</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  profile_image VARCHAR(255),
  bio TEXT
);`}
                        </pre>

                        <h4>Student Profiles</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE student_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  points INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  level VARCHAR(20) NOT NULL DEFAULT 'beginner',
  completed_challenges INTEGER NOT NULL DEFAULT 0
);`}
                        </pre>

                        <h4>Organization Profiles</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE organization_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  logo VARCHAR(255)
);`}
                        </pre>

                        <h4>Challenges</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE challenges (
  id UUID PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  level VARCHAR(20) NOT NULL,
  points INTEGER NOT NULL,
  thumbnail VARCHAR(255),
  status VARCHAR(20) NOT NULL,
  creator_id UUID REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);`}
                        </pre>

                        <h4>Contests</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE contests (
  id UUID PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  organization_id UUID REFERENCES users(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);`}
                        </pre>

                        <h4>Contest Challenges</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE contest_challenges (
  contest_id UUID REFERENCES contests(id),
  challenge_id UUID REFERENCES challenges(id),
  PRIMARY KEY (contest_id, challenge_id)
);`}
                        </pre>

                        <h4>Contest Registrations</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE contest_registrations (
  contest_id UUID REFERENCES contests(id),
  user_id UUID REFERENCES users(id),
  registration_date TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (contest_id, user_id)
);`}
                        </pre>

                        <h4>Submissions</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  challenge_id UUID REFERENCES challenges(id),
  contest_id UUID REFERENCES contests(id) NULL,
  file_path VARCHAR(255) NOT NULL,
  submitted_at TIMESTAMP NOT NULL DEFAULT NOW(),
  status VARCHAR(20) NOT NULL,
  score NUMERIC NULL
);`}
                        </pre>

                        <h4>Entity Relationship Diagram</h4>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                          <p className="text-center italic text-sm text-gray-500">
                            [Entity Relationship Diagram would be displayed here]
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "authentication" && (
                      <div className="prose dark:prose-invert max-w-none">
                        <h2>Authentication & Authorization</h2>
                        <p>
                          CAD Arena implements a secure JWT-based authentication system that manages users with different roles and permissions.
                        </p>

                        <h3>Authentication System</h3>
                        <ol>
                          <li>
                            <strong>Registration Process</strong>
                            <ul>
                              <li>Users register with email, username, password, and role selection</li>
                              <li>Email verification is required to activate accounts</li>
                              <li>Passwords are hashed using bcrypt before storage</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Login Process</strong>
                            <ul>
                              <li>Users log in with email/username and password</li>
                              <li>Upon successful authentication, a JWT token is issued</li>
                              <li>Token includes user ID, role, and permissions</li>
                              <li>Token expires after a configurable period</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Token Management</strong>
                            <ul>
                              <li>Tokens are stored in localStorage (client-side)</li>
                              <li>Refresh tokens are used to obtain new access tokens</li>
                              <li>Tokens are verified on each protected API request</li>
                            </ul>
                          </li>
                        </ol>

                        <h3>JWT Implementation</h3>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example JWT generation
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Example JWT verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};`}
                        </pre>

                        <h3>Authorization System</h3>
                        <p>
                          The platform implements role-based access control (RBAC) with two primary roles:
                        </p>
                        <ul>
                          <li>
                            <strong>Student Role</strong>: Can participate in challenges and competitions, submit designs, view leaderboards, etc.
                          </li>
                          <li>
                            <strong>Organization Role</strong>: Can create and manage competitions, view participants, issue certificates, etc.
                          </li>
                        </ul>

                        <h4>Permission Check Example</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Role-based authorization middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};

// Usage example
router.post('/contests', 
  verifyToken, 
  requireRole(['organization']), 
  createContestController
);`}
                        </pre>

                        <h3>Security Considerations</h3>
                        <ul>
                          <li>Implement HTTPS for all API communications</li>
                          <li>Use secure HTTP-only cookies for sensitive tokens</li>
                          <li>Implement rate limiting to prevent brute force attacks</li>
                          <li>Add CSRF protection for sensitive operations</li>
                          <li>Regularly rotate and refresh JWT secrets</li>
                        </ul>
                      </div>
                    )}

                    {activeTab === "user-journeys" && (
                      <div className="prose dark:prose-invert max-w-none">
                        <h2>User Journeys</h2>
                        <p>
                          Understanding the different user journeys is crucial for developing a user-friendly platform.
                          Below are the main user journeys for both student users and organization users.
                        </p>

                        <h3>Student User Journey</h3>
                        
                        <h4>1. Registration & Onboarding</h4>
                        <ol>
                          <li>Student signs up with email or social auth</li>
                          <li>Creates profile with CAD experience level</li>
                          <li>Completes introductory CAD challenge</li>
                          <li>Receives welcome tour of the platform</li>
                        </ol>

                        <h4>2. Practice</h4>
                        <ol>
                          <li>Browses available challenges by difficulty level</li>
                          <li>Selects challenge and views requirements</li>
                          <li>Downloads reference materials if provided</li>
                          <li>Works on CAD design locally</li>
                          <li>Uploads solution as STL file</li>
                          <li>Receives feedback and points upon successful completion</li>
                          <li>Views solution and alternative approaches</li>
                        </ol>

                        <h4>3. Competition Participation</h4>
                        <ol>
                          <li>Discovers competitions via dashboard/browse page</li>
                          <li>Registers for competition before deadline</li>
                          <li>Receives competition brief and requirements</li>
                          <li>Submits design within specified timeframe</li>
                          <li>Receives results and feedback</li>
                          <li>Views certificate if awarded</li>
                        </ol>

                        <h4>4. Community Engagement</h4>
                        <ol>
                          <li>Follows other users and views their public submissions</li>
                          <li>Views leaderboard and top designers</li>
                          <li>Shares achievements on social media</li>
                          <li>Receives notifications about new challenges and competitions</li>
                        </ol>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                          <p className="text-center italic text-sm text-gray-500">
                            [Student user journey flow diagram would be displayed here]
                          </p>
                        </div>

                        <h3>Organization User Journey</h3>
                        
                        <h4>1. Registration & Onboarding</h4>
                        <ol>
                          <li>Organization signs up and verifies identity</li>
                          <li>Creates organization profile</li>
                          <li>Sets up payment method (if applicable)</li>
                          <li>Receives guided tour of organization features</li>
                        </ol>

                        <h4>2. Contest Creation</h4>
                        <ol>
                          <li>Creates new contest/competition</li>
                          <li>Sets parameters (title, description, timeline, rules)</li>
                          <li>Uploads reference materials and requirements</li>
                          <li>Configures evaluation criteria</li>
                          <li>Publishes contest or saves as draft</li>
                        </ol>

                        <h4>3. Participant Management</h4>
                        <ol>
                          <li>Views list of registered participants</li>
                          <li>Reviews submitted designs</li>
                          <li>Provides feedback and scores</li>
                          <li>Selects winners</li>
                          <li>Issues certificates in bulk</li>
                        </ol>

                        <h4>4. Talent Acquisition</h4>
                        <ol>
                          <li>Browses user profiles based on skills and achievements</li>
                          <li>Contacts promising candidates</li>
                          <li>Views analytics on competition participation</li>
                        </ol>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                          <p className="text-center italic text-sm text-gray-500">
                            [Organization user journey flow diagram would be displayed here]
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "implementation" && (
                      <div className="prose dark:prose-invert max-w-none">
                        <h2>Implementation Guidelines</h2>
                        <p>
                          This section provides guidelines for implementing the CAD Arena platform, including
                          frontend, backend, and integration aspects.
                        </p>

                        <h3>1. Frontend Development</h3>
                        <ol>
                          <li>
                            <strong>Component Structure</strong>
                            <p>Build reusable UI components using React and Shadcn UI:</p>
                            <ul>
                              <li>Shared components (buttons, forms, cards)</li>
                              <li>Page-specific components</li>
                              <li>Layout components</li>
                            </ul>
                          </li>
                          <li>
                            <strong>State Management</strong>
                            <p>Use React Query for data fetching, caching, and state management:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example React Query implementation
const { data, isLoading, error } = useQuery({
  queryKey: ['challenges'],
  queryFn: fetchChallenges,
});`}
                            </pre>
                          </li>
                          <li>
                            <strong>Responsive Design</strong>
                            <p>Ensure all pages are responsive and work well on mobile devices using Tailwind CSS:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example responsive component
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {challenges.map(challenge => (
    <ChallengeCard key={challenge.id} challenge={challenge} />
  ))}
</div>`}
                            </pre>
                          </li>
                        </ol>

                        <h3>2. Backend API Development</h3>
                        <ol>
                          <li>
                            <strong>RESTful API Structure</strong>
                            <p>Organize API endpoints following RESTful principles:</p>
                            <ul>
                              <li>GET /api/challenges - Get list of challenges</li>
                              <li>GET /api/challenges/:id - Get specific challenge</li>
                              <li>POST /api/challenges - Create new challenge</li>
                              <li>PUT /api/challenges/:id - Update challenge</li>
                              <li>DELETE /api/challenges/:id - Delete challenge</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Authentication Middleware</strong>
                            <p>Implement JWT verification middleware for protected routes:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Apply authentication middleware to protected routes
app.use('/api/challenges/create', verifyToken, challengeController.create);
app.use('/api/submissions', verifyToken, submissionsRouter);`}
                            </pre>
                          </li>
                          <li>
                            <strong>Error Handling</strong>
                            <p>Implement consistent error handling across all API endpoints:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
});`}
                            </pre>
                          </li>
                        </ol>

                        <h3>3. CAD Processing Implementation</h3>
                        <ol>
                          <li>
                            <strong>STL File Handling</strong>
                            <p>Implement secure STL file upload and processing:</p>
                            <ul>
                              <li>Validate file size and format</li>
                              <li>Parse STL files to extract 3D model data</li>
                              <li>Generate thumbnail previews</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Model Comparison</strong>
                            <p>Implement algorithms for comparing submitted models with reference models:</p>
                            <ul>
                              <li>Geometric comparison for shape matching</li>
                              <li>Volume and mass property analysis</li>
                              <li>Feature recognition and matching</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Evaluation Pipeline</strong>
                            <p>Set up secure processing pipeline for model evaluation:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Pseudocode for CAD evaluation pipeline
function evaluateSubmission(submission, referenceModel) {
  // 1. Load and parse STL files
  const submittedModel = parseSTL(submission.filePath);
  const reference = parseSTL(referenceModel.filePath);
  
  // 2. Perform geometric comparison
  const geometryScore = compareGeometry(submittedModel, reference);
  
  // 3. Check parameters and constraints
  const constraintScore = checkConstraints(submittedModel, referenceModel.constraints);
  
  // 4. Calculate final score
  const finalScore = calculateScore(geometryScore, constraintScore);
  
  // 5. Return evaluation result
  return {
    score: finalScore,
    feedback: generateFeedback(geometryScore, constraintScore),
    passed: finalScore >= referenceModel.passingThreshold
  };
}`}
                            </pre>
                          </li>
                        </ol>

                        <h3>4. Deployment Strategy</h3>
                        <ol>
                          <li>
                            <strong>Frontend Deployment</strong>
                            <ul>
                              <li>Build and deploy React application to CDN</li>
                              <li>Implement caching for static assets</li>
                              <li>Configure HTTPS and security headers</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Backend Deployment</strong>
                            <ul>
                              <li>Deploy API server to cloud provider</li>
                              <li>Set up auto-scaling based on demand</li>
                              <li>Configure database connection pooling</li>
                            </ul>
                          </li>
                          <li>
                            <strong>CAD Processing Service</strong>
                            <ul>
                              <li>Deploy CAD processing service to separate environment</li>
                              <li>Configure high-performance computing resources</li>
                              <li>Set up job queue for handling processing requests</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    )}

                    {activeTab === "testing" && (
                      <div className="prose dark:prose-invert max-w-none">
                        <h2>Testing Strategy</h2>
                        <p>
                          A comprehensive testing strategy ensures the reliability and quality of the CAD Arena platform.
                          This strategy includes different levels of testing to cover all aspects of the system.
                        </p>

                        <h3>1. Unit Testing</h3>
                        <ul>
                          <li>
                            <strong>Frontend Unit Tests</strong>
                            <p>Test individual React components using Jest and React Testing Library:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example component test
test('ChallengeCard displays title and difficulty level', () => {
  const challenge = {
    id: '1',
    title: 'Test Challenge',
    level: 'INTERMEDIATE',
    // other properties...
  };
  
  render(<ChallengeCard challenge={challenge} />);
  
  expect(screen.getByText('Test Challenge')).toBeInTheDocument();
  expect(screen.getByText('Intermediate')).toBeInTheDocument();
});`}
                            </pre>
                          </li>
                          <li>
                            <strong>Backend Unit Tests</strong>
                            <p>Test individual functions and utilities:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example utility test
describe('JWT Utilities', () => {
  test('generateToken returns valid JWT with user data', () => {
    const user = { id: '123', email: 'test@example.com', role: 'student' };
    const token = generateToken(user);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(user.id);
    expect(decoded.email).toBe(user.email);
    expect(decoded.role).toBe(user.role);
  });
});`}
                            </pre>
                          </li>
                        </ul>

                        <h3>2. Integration Testing</h3>
                        <ul>
                          <li>
                            <strong>API Integration Tests</strong>
                            <p>Test API endpoints and database interactions:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example API test
describe('Challenge API', () => {
  test('GET /api/challenges returns list of challenges', async () => {
    const response = await request(app)
      .get('/api/challenges')
      .set('Authorization', \`Bearer \${token}\`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});`}
                            </pre>
                          </li>
                          <li>
                            <strong>Frontend Integration Tests</strong>
                            <p>Test component interactions and state management:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example integration test for challenge submission
test('Challenge submission flow', async () => {
  // Mock API responses
  mockApi.onPost('/api/submissions').reply(200, { id: '123', status: 'success' });
  
  // Render the submission component
  render(<ChallengeSubmission challengeId="1" />);
  
  // Simulate file upload
  const fileInput = screen.getByLabelText(/upload your stl file/i);
  fireEvent.change(fileInput, { target: { files: [new File(['dummy'], 'test.stl')] } });
  
  // Submit form
  const submitButton = screen.getByText(/submit solution/i);
  fireEvent.click(submitButton);
  
  // Wait for success message
  await waitFor(() => {
    expect(screen.getByText(/submission successful/i)).toBeInTheDocument();
  });
});`}
                            </pre>
                          </li>
                        </ul>

                        <h3>3. End-to-End Testing</h3>
                        <ul>
                          <li>
                            <strong>User Journey Tests</strong>
                            <p>Test complete user flows using Cypress:</p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example Cypress test
describe('Student Registration Flow', () => {
  it('allows new student to register and complete profile', () => {
    cy.visit('/signup');
    
    // Fill registration form
    cy.get('[data-test-id="email-input"]').type('new-user@example.com');
    cy.get('[data-test-id="password-input"]').type('securepassword');
    cy.get('[data-test-id="confirm-password-input"]').type('securepassword');
    cy.get('[data-test-id="role-student"]').click();
    cy.get('[data-test-id="submit-button"]').click();
    
    // Verify redirect to profile completion
    cy.url().should('include', '/onboarding');
    
    // Complete profile
    cy.get('[data-test-id="username-input"]').type('newstudent');
    cy.get('[data-test-id="experience-select"]').select('intermediate');
    cy.get('[data-test-id="submit-button"]').click();
    
    // Verify redirect to dashboard
    cy.url().should('include', '/dashboard');
    cy.get('[data-test-id="welcome-message"]').should('contain', 'newstudent');
  });
});`}
                            </pre>
                          </li>
                        </ul>

                        <h3>4. Performance Testing</h3>
                        <ul>
                          <li>
                            <strong>Load Testing</strong>
                            <p>Test system performance under expected load:</p>
                            <ul>
                              <li>Simulate multiple concurrent users</li>
                              <li>Measure response times for critical operations</li>
                              <li>Identify performance bottlenecks</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Stress Testing</strong>
                            <p>Test system behavior under extreme conditions:</p>
                            <ul>
                              <li>Simulate peak traffic scenarios</li>
                              <li>Test with large STL files</li>
                              <li>Verify system recovery after failures</li>
                            </ul>
                          </li>
                        </ul>

                        <h3>5. Security Testing</h3>
                        <ul>
                          <li>
                            <strong>Penetration Testing</strong>
                            <p>Identify security vulnerabilities:</p>
                            <ul>
                              <li>Test for common web vulnerabilities (OWASP Top 10)</li>
                              <li>Attempt authentication bypass</li>
                              <li>Test authorization boundaries</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Code Security Analysis</strong>
                            <p>Analyze code for security issues:</p>
                            <ul>
                              <li>Use static analysis tools</li>
                              <li>Check for dependency vulnerabilities</li>
                              <li>Review security-critical components</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    )}

                    {activeTab === "security" && (
                      <div className="prose dark:prose-invert max-w-none">
                        <h2>Security Measures</h2>
                        <p>
                          Security is a critical aspect of the CAD Arena platform, especially when handling user data, CAD models,
                          and competitive submissions. This section outlines the security measures implemented throughout the system.
                        </p>

                        <h3>1. Protecting CAD Logic and Intellectual Property</h3>
                        <ul>
                          <li>
                            <strong>Server-Side Processing</strong>
                            <p>
                              The core validation logic for CAD models is implemented on the server side to prevent exposure of comparison algorithms.
                              The client-side code only handles display and user interaction, while all processing happens securely on the server.
                            </p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Client-side model submission
async function submitModel(file) {
  const formData = new FormData();
  formData.append('model', file);
  
  // Send to server for processing
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${userToken}\`
    },
    body: formData
  });
  
  return response.json();
}

// Server-side processing (not accessible to client)
// This includes proprietary algorithms for model validation`}
                            </pre>
                          </li>
                          <li>
                            <strong>Obfuscation and Minification</strong>
                            <p>
                              All client-side JavaScript is minified and obfuscated to make reverse engineering more difficult.
                              Critical business logic is kept server-side to prevent exposure.
                            </p>
                          </li>
                        </ul>

                        <h3>2. Data Protection</h3>
                        <ul>
                          <li>
                            <strong>Encrypted Storage</strong>
                            <p>
                              All user data and CAD models are stored using strong encryption. 
                              File storage uses server-side encryption for STL files and other assets.
                            </p>
                          </li>
                          <li>
                            <strong>Secure Transmission</strong>
                            <p>
                              All communications use HTTPS with TLS 1.3 to ensure data is encrypted in transit.
                              API endpoints enforce HTTPS and implement HSTS headers.
                            </p>
                          </li>
                          <li>
                            <strong>Access Control</strong>
                            <p>
                              Role-based access control (RBAC) restricts access to resources based on user roles.
                              Organizations can only access their own competitions and submissions.
                            </p>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Example of role-based access control
router.get('/api/competitions/:id/submissions', async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  
  // Verify user has permission to access this competition's submissions
  const competition = await Competition.findById(id);
  
  if (!competition) {
    return res.status(404).json({ error: 'Competition not found' });
  }
  
  // Check if user is the organization that created the competition
  // or an admin
  if (competition.organizationId !== user.id && user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const submissions = await Submission.find({ competitionId: id });
  return res.json(submissions);
});`}
                            </pre>
                          </li>
                        </ul>

                        <h3>3. Authentication Security</h3>
                        <ul>
                          <li>
                            <strong>Password
