import { NavLink, Outlet } from "react-router";
import { FaXTwitter } from "react-icons/fa6";

function Layout() {
  return (
    <div className="app-layout">

      {/* LEFT SIDEBAR */}
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
            <span className="nav-icon">⌂</span>
            <span>Home</span>
          </NavLink>

          {/* EXPLORE */}
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">⌕</span>
            <span>Explore</span>
          </NavLink>

          {/* NOTIFICATIONS */}
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">♡</span>
            <span>Notifications</span>
          </NavLink>

          {/* MESSAGES */}
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">✉</span>
            <span>Messages</span>
          </NavLink>

          {/* PROFILE */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">♙</span>
            <span>Profile</span>
          </NavLink>

          {/* LOG OUT — NO ICON */}
          <NavLink
            to="/signout"
            className="logout-link"
          >
            Log Out
          </NavLink>

        </nav>

        {/* USER INFORMATION */}
        <div className="sidebar-user">

          <div className="avatar">
            👤
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