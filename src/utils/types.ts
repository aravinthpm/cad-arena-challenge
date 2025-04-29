
export enum UserRole {
  STUDENT = "student",
  ORGANIZATION = "organization"
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Student extends User {
  streak: number;
  points: number;
  completedChallenges: number;
  level: number;
  achievements: Achievement[];
}

export interface Organization extends User {
  name: string;
  description: string;
  website?: string;
  logoUrl?: string;
  contestsCreated: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  earnedAt: Date;
}

export enum ChallengeLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert"
}

export enum ChallengeStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived"
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  instructions: string;
  level: ChallengeLevel;
  points: number;
  thumbnailUrl: string;
  status: ChallengeStatus;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  submissionCount: number;
  successRate: number;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  startDate: Date;
  endDate: Date;
  challenges: Challenge[];
  registeredUsers: number;
  status: "upcoming" | "active" | "completed";
  prizes?: string[];
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  submittedAt: Date;
  status: "correct" | "incorrect" | "pending";
  fileUrl: string;
  score?: number;
}
