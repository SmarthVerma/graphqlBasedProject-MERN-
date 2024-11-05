import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

function LogoutButton() {
  return (
    <div className="flex mt-5 overflow-clip h-max rounded-xl bg-white space-x-4">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Logout"
        className="text-black bg-orange-100 hover:bg-orange-300 hover:text-green"
      >
        <LogOut className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default LogoutButton;
