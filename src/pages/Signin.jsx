import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import programmer from "../assets/programmer.png";
import { useState } from "react";

function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      setisLoading(true);
      setError("");

      const { email, password } = user;

      if (!email || !password) {
        setError("Please enter your email or password.");
        return;
      }

      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);

      // Save login status
      localStorage.setItem("isLoggedIn", "true");

      // Clear form
      setUser({
        email: "",
        password: "",
      });

      toast.success("Signin successful");

      // Go to Home
      navigate("/");
    } catch (err) {
      console.error(err.message);

      setError(err.message);

      setUser((user) => ({
        ...user,
        password: "",
      }));
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="auth">

      <div className="left">
        <img src={programmer} alt="Programmer" />
      </div>

      <form className="right" onSubmit={handleSignin}>

        <h3>Sign In</h3>

        <input
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser((user) => ({
              ...user,
              email: e.target.value,
            }))
          }
          placeholder="Enter your Email"
        />

        <input
          value={user.password}
          onChange={(e) =>
            setUser((user) => ({
              ...user,
              password: e.target.value,
            }))
          }
          type="password"
          placeholder="Enter your Password"
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Log In"}
        </button>

        <p className="redirect">
          Don't have an Account? &nbsp;
          <Link to="/signup">Sign Up</Link>
        </p>

        <Link to="/reset">
          Forgot Password?
        </Link>

      </form>

    </div>
  );
}

export default Signin;