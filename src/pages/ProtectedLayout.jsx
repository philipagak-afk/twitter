import { Navigate, Outlet } from "react-router";

function ProtectedLayout() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;