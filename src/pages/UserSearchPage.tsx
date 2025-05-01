
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserSearch from "@/components/UserSearch";

const UserSearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Find Users</h1>
          <UserSearch />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserSearchPage;
