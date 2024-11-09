import AuthNavbar from "@/components/AuthNavBar";
import { AvatarProfile } from "@/components/AvatarProfile";
import { Cards } from "@/components/Cards";
import PieChart from "@/components/PieChart";
import TransactionForm from "@/components/TransactionForm";

function Dashboard() {
  return (
    <div className="w-full min-h-screen border">
      <AuthNavbar />
      <AvatarProfile />
      <div className="flex lg:flex-row flex-col w-full justify-around border px-4 py-3 ">
        <PieChart />
        <TransactionForm />
      </div>
      <div className="bg-black">
        <Cards />
      </div>
    </div>
  );
}

export default Dashboard;
