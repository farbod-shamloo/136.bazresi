import DashboardLayout from "@/layout/DashboardLayout";
import React from "react";
import CardList from "./common/CardList";
import ProfilePage from "@/app/dashboard/user/profile/page";
import Footer from "./footer";

function HomePage({ activePage }) {
  return (
    <div>
      <DashboardLayout>
        {activePage === "home" && <CardList />}
        {activePage === "profile" && <ProfilePage />}
      </DashboardLayout>
     {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
