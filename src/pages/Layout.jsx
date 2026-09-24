import { NavLink, Outlet } from "react-router";

function Layout() {
  return (
    <div className="app-layout">

      {/* LEFT SIDEBAR */}
      <aside className="sidebar">

        <div className="x-logo">𝕏</div>

        <nav className="sidebar-nav">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">⌂</span>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">✉</span>
            <span>Messages</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">♙</span>
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/signout"
            className="logout-button"
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