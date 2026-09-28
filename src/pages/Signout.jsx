import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router";
import { auth } from "../firebase";

function Signout() {
  useEffect(() => {
    async function logout() {
      try {
        await signOut(auth);
        localStorage.removeItem("isLoggedIn");
      } catch (error) {
        console.error("Logout error:", error);
      }
    }

    logout();
  }, []);

  return <Navigate to="/signin" replace />;
}

export default Signout;