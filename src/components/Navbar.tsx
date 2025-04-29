
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn] = useState(false); // Will be replaced with real auth state

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Practice", path: "/practice" },
    { name: "Competitions", path: "/competitions" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex h-16 items-center">
        <div className="flex w-full justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cadarena-400 to-cadarena-600">
                <div className="absolute inset-1 rounded-md bg-white dark:bg-gray-900 flex items-center justify-center text-xl font-bold text-cadarena-600 dark:text-cadarena-400">
                  C
                </div>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xl font-bold text-gray-900 dark:text-white">
              CAD Arena
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium text-gray-700 hover:text-cadarena-600 dark:text-gray-200 dark:hover:text-cadarena-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                  <span className="sr-only">Dashboard</span>
                  <div className="h-8 w-8 rounded-full bg-cadarena-100 text-cadarena-600 flex items-center justify-center">
                    U
                  </div>
                </Button>
              </Link>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 text-base font-medium text-gray-700 hover:text-cadarena-600 dark:text-gray-200 dark:hover:text-cadarena-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <div className="flex flex-col space-y-2 pt-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="block py-2 text-base font-medium text-gray-700 hover:text-cadarena-600 dark:text-gray-200 dark:hover:text-cadarena-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
