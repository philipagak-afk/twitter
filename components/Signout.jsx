import { useEffect } from "react";
import { useNavigate } from "react-router";

function Signout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");

    navigate("/signin", { replace: true });
  }, [navigate]);

  return null;
}

export default Signout;