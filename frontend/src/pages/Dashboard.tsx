import AuthNavbar from "@/components/AuthNavBar";
import { AvatarProfile } from "@/components/AvatarProfile";
import { Cards } from "@/components/Cards";
import PieChart from "@/components/PieChart";
import TransactionForm from "@/components/TransactionForm";
import { GET_ALL_TRANSACTION } from "@/graphql/queries/transactions.query";
import { Transaction } from "@/graphql/types";
import { useQuery } from "@apollo/client";
import { Loader } from "lucide-react";

function Dashboard() {
  const {
    data: cardData,
    loading,
    error,
  } = useQuery<{ transactions: Transaction[] }>(GET_ALL_TRANSACTION);
  console.log("this is ur card", cardData);
  if (loading) return <div></div>;
  if (error) return null;
  return (
    <div className="w-full min-h-screen border">
      <AuthNavbar />
      <AvatarProfile />
      <div className="flex  flex-col w-full justify-around  border px-4 py-3 ">
        <TransactionForm />
        <div className="flex flex-col items-center justify-center">
          <PieChart transactionData={cardData} />
        </div>
      </div>
      <div className="bg-black">
        <Cards cardData={cardData} />
      </div>
    </div>
  );
}

export default Dashboard;
