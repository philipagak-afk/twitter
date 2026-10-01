import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="w-full h-screen grid grid-cols-[20%_50%_30%] bg-black text-white">
      <Sidebar className="sidebar" />
      <main className="main">
        <div className="outlet-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;