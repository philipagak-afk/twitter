import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";

function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const result = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      console.log("Signed in Firebase user:", result.user);

      localStorage.setItem("isLoggedIn", "true");

      toast.success("Signin successful");

      navigate("/");
    } catch (err) {
      console.error("Signin error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth">
      <form className="right" onSubmit={handleSignin}>
        <h3>Sign In</h3>

        <input
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          placeholder="Enter your Email"
        />

        <input
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          placeholder="Enter your Password"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default Signin;