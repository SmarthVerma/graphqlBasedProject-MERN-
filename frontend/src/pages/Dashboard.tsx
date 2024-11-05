import AuthNavbar from "@/components/AuthNavBar";
import { AvatarProfile } from "@/components/AvatarProfile";
import React from "react";

function Dashboard() {
  return (
    <div className="w-full min-h-screen">
      <AuthNavbar />
      <div className="m-20">
        <AvatarProfile />
      </div>
      
    </div>
  );
}

export default Dashboard;
