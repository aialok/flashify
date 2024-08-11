import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="font-Roboto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
