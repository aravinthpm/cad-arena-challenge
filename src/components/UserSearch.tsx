
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student, Organization, UserRole } from "@/utils/types";
import { Link } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for users
const mockUsers: (Student | Organization)[] = [
  {
    id: "s1",
    username: "john_designer",
    email: "john@example.com",
    role: UserRole.STUDENT,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2023-01-10"),
    streak: 15,
    points: 2500,
    completedChallenges: 42,
    level: 4,
    achievements: []
  },
  {
    id: "s2",
    username: "sara_cad",
    email: "sara@example.com",
    role: UserRole.STUDENT,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2023-02-15"),
    streak: 30,
    points: 4200,
    completedChallenges: 78,
    level: 6,
    achievements: []
  },
  {
    id: "org1",
    username: "acme_engineering",
    email: "contact@acme.com",
    role: UserRole.ORGANIZATION,
    avatarUrl: "/placeholder.svg",
    createdAt: new Date("2022-12-01"),
    name: "ACME Engineering",
    description: "Leading engineering solutions provider",
    website: "https://acme.example.com",
    logoUrl: "/placeholder.svg",
    contestsCreated: 12,
    verified: true,
    memberSince: new Date("2022-12-01"),
    industry: "Manufacturing",
    location: "Boston, MA",
    employees: "100-500"
  }
];

interface UserSearchProps {
  className?: string;
}

const UserSearch = ({ className }: UserSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<(Student | Organization)[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setSearchPerformed(true);
    
    const results = mockUsers.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const getInitials = (user: Student | Organization) => {
    if (user.role === UserRole.ORGANIZATION) {
      return (user as Organization).name.substring(0, 2).toUpperCase();
    } else {
      return user.username.substring(0, 2).toUpperCase();
    }
  };

  return (
    <div className={className}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Find Users</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Search for students or organizations by username or ID
        </p>

        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter username or ID..."
              className="w-full"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="mt-8">
          {searchPerformed && (
            <>
              <div className="flex items-center mb-4">
                <Users className="mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium">
                  {searchResults.length} user{searchResults.length !== 1 ? 's' : ''} found
                </h3>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map(user => (
                    <Link to={`/profile/${user.id}`} key={user.id}>
                      <Card className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.username} />
                              <AvatarFallback>{getInitials(user)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">
                                  {user.role === UserRole.ORGANIZATION 
                                    ? (user as Organization).name 
                                    : user.username}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {user.role === UserRole.ORGANIZATION ? "Organization" : "Student"}
                                </Badge>
                                {user.role === UserRole.ORGANIZATION && (user as Organization).verified && (
                                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {user.role === UserRole.STUDENT 
                                  ? `Level ${(user as Student).level} • ${(user as Student).points} points` 
                                  : `${(user as Organization).industry} • ${(user as Organization).location}`}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-dashed border-2 border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">No users found</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Try a different username or ID</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
