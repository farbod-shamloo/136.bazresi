import DashboardLayout from "@/layout/DashboardLayout";
import React from "react";
import CardList from "./common/CardList";
import ProfilePage from "@/app/dashboard/user/profile/page";

function HomePage({ activePage }) {
  return (
    <div>
      <DashboardLayout>
        {activePage === "home" && <CardList />}
        {activePage === "profile" && <ProfilePage />}
      </DashboardLayout>
     
    </div>
  );
}

export default HomePage;
