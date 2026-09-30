import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="app-layout">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;