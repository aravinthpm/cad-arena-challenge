
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserSearch from "@/components/UserSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";

const UserSearchPage = () => {
  // For demo purposes, we'll use a hardcoded userId
  // In a real app, this would come from authentication
  const currentUserId = "s1";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">User Network</h1>
          
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="search">Find Users</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search">
              <UserSearch mode="search" />
            </TabsContent>
            
            <TabsContent value="followers">
              <UserSearch mode="followers" userId={currentUserId} />
            </TabsContent>
            
            <TabsContent value="following">
              <UserSearch mode="following" userId={currentUserId} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserSearchPage;
