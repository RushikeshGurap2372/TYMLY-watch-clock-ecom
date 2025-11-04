import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // or whatever header you're using
import Footer from "../components/Footer"; // optional

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen z-10">
      <Navbar />
      
      
      <main className="grow pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
