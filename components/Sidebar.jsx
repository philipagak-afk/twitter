import { NavLink } from "react-router";

import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* X LOGO */}
      <div className="x-logo">
        <FaXTwitter />
      </div>

      {/* NAVIGATION */}
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
  );
}

export default Sidebar;