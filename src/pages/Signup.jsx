import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import programmer from "../assets/programmer.png";
function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setisLoading(true);
      setError("");
      const { name, email, password } = user;

      if (!name || !email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log(userCredential.user);
      toast.success("Account created successfully!");

      setUser({
        name: "",
        email: "",
        password: "",
      });

      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setUser((user) => ({ ...user, password: "" }));
    } finally {
      setisLoading(false);
    }
  };
  return (
    <div className="auth signup">
      <div className="left">
        <img src={programmer} alt="" />
      </div>
      <form className="right" onSubmit={handleSignup}>
        <h3>Create Account</h3>
        <input
          value={user.name}
          onChange={(e) =>
            setUser((user) => ({ ...user, name: e.target.value }))
          }
          type="text"
          placeholder="Enter your Name"
        />
        <input
          value={user.email}
          onChange={(e) =>
            setUser((user) => ({ ...user, email: e.target.value }))
          }
          type="email"
          placeholder="Enter your Email"
        />
        <input
          value={user.password}
          onChange={(e) =>
            setUser((user) => ({ ...user, password: e.target.value }))
          }
          type="password"
          placeholder="Enter your Password"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up.." : "Create Account"}
        </button>
        <p className="redirect">
          Already have an Account? &nbsp;
          <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;