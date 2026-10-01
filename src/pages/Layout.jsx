import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="min-h-screen w-full flex bg-black">

      <Sidebar />

      <main className="w-213.25 mim-h-screen ml-102.5">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;