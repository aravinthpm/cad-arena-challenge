
import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NavbarUserSearch = () => {
  return (
    <Link to="/search">
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" title="Find users">
        <Users className="h-4 w-4" />
        <span className="sr-only">User search</span>
      </Button>
    </Link>
  );
};

export default NavbarUserSearch;
