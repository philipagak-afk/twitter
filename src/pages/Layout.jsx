import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Layout() {
  return (
    <div className="app-layout">

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">

        <div className="x-logo">𝕏</div>

        <nav className="sidebar-nav">

          {/* HOME */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">
              <FaHome />
            </span>
            <span>Home</span>
          </NavLink>

          {/* EXPLORE */}
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">
              <FaSearch />
            </span>
            <span>Explore</span>
          </NavLink>

          {/* NOTIFICATIONS */}
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">
              <FaBell />
            </span>
            <span>Notifications</span>
          </NavLink>

          {/* MESSAGES */}
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">
              <FaEnvelope />
            </span>
            <span>Messages</span>
          </NavLink>

          {/* PROFILE */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">
              <FaUser />
            </span>
            <span>Profile</span>
          </NavLink>

          {/* LOG OUT */}
          <NavLink
            to="/signout"
            className="logout-button"
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </NavLink>

        </nav>

        {/* USER INFORMATION */}
        <div className="sidebar-user">

          <div className="avatar">
            <FaUser />
          </div>

          <div>
            <h4>test one</h4>
            <p>@test_one</p>
          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;

