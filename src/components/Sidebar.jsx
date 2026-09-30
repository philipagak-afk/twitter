import { NavLink } from "react-router";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="x-logo">𝕏</div>

      <nav className="sidebar-nav">

        <NavLink to="/" className="sidebar-link">
          <FaHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/explore" className="sidebar-link">
          <FaSearch />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/notifications" className="sidebar-link">
          <FaBell />
          <span>Notifications</span>
        </NavLink>

        <NavLink to="/messages" className="sidebar-link">
          <FaEnvelope />
          <span>Messages</span>
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          <FaUser />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/signout" className="sidebar-link logout-link">
          <span>Logout</span>
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;