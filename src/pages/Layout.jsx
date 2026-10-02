
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-black text-white md:grid-cols-[250px_minmax(0,600px)_minmax(0,1fr)]">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="min-h-screen min-w-0 border-x border-gray-800">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      {/* RIGHT SIDEBAR SPACE */}
      <aside className="hidden min-w-0 p-4 lg:block">
        {/* Add trends or recommendations here later */}
      </aside>
    </div>
  );
}

export default Layout;