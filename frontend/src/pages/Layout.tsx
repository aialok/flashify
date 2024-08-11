import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="font-Roboto">
      <Navbar />

      {/* An <Outlet> renders whatever child route is currently active,
              so you can think about this <Outlet> as a placeholder for
              the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default Layout;
