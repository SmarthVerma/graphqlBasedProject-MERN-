import AuthNavbar from "@/components/AuthNavBar";
import { AvatarProfile } from "@/components/AvatarProfile";
import Test from "@/components/Test";
import TransactionForm from "@/components/TransactionForm";
import { useApolloClient, gql } from "@apollo/client";

function Dashboard() {
  return (
    <div className="w-full min-h-screen border">
      <AuthNavbar />
      <AvatarProfile />
      <TransactionForm />
      {/* <Test /> */}
    </div>
  );
}

export default Dashboard;
