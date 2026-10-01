import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { auth, db } from "../firebase";
import toast from "react-hot-toast";
import programmer from "../assets/programmer.png";
import { doc, setDoc } from "firebase/firestore";

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

      // Create the Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (userCredential.user) {
        // console.log(userCredential);
        const newUSer = {
          name,
          email,
          createdOn: userCredential.user.metadata.creationTime,
          userId: userCredential.user.uid,
        };
        const docRef = doc(db, "users", userCredential.user.uid);

        await setDoc(docRef, newUSer);

        setUser({
          name: "",
          email: "",
          password: "",
        });
        navigate("/");
        toast.success("Account created successfully");
      }
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
    <div className="auth signup">
      <div className="left">
        <img src={programmer} alt="" />
      </div>

      <form className="right" onSubmit={handleSignup}>
        <h3>Create Account</h3>

        <input
          value={user.name}
          onChange={(e) =>
            setUser((user) => ({
              ...user,
              name: e.target.value,
            }))
          }
          type="text"
          placeholder="Enter your Name"
        />

        <input
          value={user.email}
          onChange={(e) =>
            setUser((user) => ({
              ...user,
              email: e.target.value,
            }))
          }
          type="email"
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