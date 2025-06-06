import { LOGOUT } from "@/graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "@/graphql/queries/user.query";
import { useApolloClient, useMutation } from "@apollo/client";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

function LogoutButton() {
  const client = useApolloClient();
  const [logout, { loading }] = useMutation(LOGOUT);
  const handleLogout = async () => {
    try {
      await logout();
      await client.clearStore();
      await client.refetchQueries({ include: [GET_AUTHENTICATED_USER] });
      toast.success("Logout successfully");
    } catch (error) {
      console.log(`Error in logout`, error);
    }
  };

  return (
    <div className="flex mt-5 overflow-clip h-max rounded-xl bg-white space-x-4">
      <Button
        disabled={loading}
        onClick={() => handleLogout()}
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
