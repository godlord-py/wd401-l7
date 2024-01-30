import React, { useEffect } from "react";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";
import HomePages from "../pages/home/Dashboard";
const AccountLayout = () => {
  return (
    <>
      <Navbar/>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <HomePages />
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;

