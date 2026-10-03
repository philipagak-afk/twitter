
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { auth, db } from "../firebase";
import toast from "react-hot-toast";
import programmer from "../assets/programmer.png";
import { doc, setDoc } from "firebase/firestore";
import { RiTwitterXLine } from "react-icons/ri";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const { name, email, password } = user;

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, {
        displayName: name.trim(),
      });

      const newUser = {
        name: name.trim(),
        email: firebaseUser.email,
        createdOn: firebaseUser.metadata.creationTime,
        userId: firebaseUser.uid,
      };

      await setDoc(doc(db, "users", firebaseUser.uid), newUser);

      setUser({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.code, err.message);

      if (err.code === "auth/email-already-in-use") {
        setError("This email already has an account. Please sign in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4 py-8 text-white">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-800 bg-black shadow-2xl md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="relative hidden min-h-[600px] items-center justify-center bg-gray-950 md:flex">
          <img
            src={programmer}
            alt="Developer illustration"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-8">
            <RiTwitterXLine className="mb-4 text-5xl" />

            <h2 className="text-3xl font-bold">
              Join the conversation.
            </h2>

            <p className="mt-2 text-gray-300">
              Create an account and start sharing your thoughts.
            </p>
          </div>
        </div>

        {/* SIGNUP FORM */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-12"
        >
          <RiTwitterXLine className="mb-8 text-4xl" />

          <h1 className="text-3xl font-bold sm:text-4xl">
            Create account
          </h1>

          <p className="mb-8 mt-2 text-gray-400">
            Join today and get started.
          </p>

          {/* NAME */}
          <label htmlFor="name" className="mb-2 text-sm font-medium">
            Full name
          </label>

          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={user.name}
            onChange={(e) =>
              setUser((previous) => ({
                ...previous,
                name: e.target.value,
              }))
            }
            placeholder="Enter your name"
            className="mb-5 w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />

          {/* EMAIL */}
          <label htmlFor="email" className="mb-2 text-sm font-medium">
            Email address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={user.email}
            onChange={(e) =>
              setUser((previous) => ({
                ...previous,
                email: e.target.value,
              }))
            }
            placeholder="Enter your email"
            className="mb-5 w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />

          {/* PASSWORD */}
          <label htmlFor="password" className="mb-2 text-sm font-medium">
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={user.password}
            onChange={(e) =>
              setUser((previous) => ({
                ...previous,
                password: e.target.value,
              }))
            }
            placeholder="Create a password"
            className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />

          {/* ERROR MESSAGE */}
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-full bg-sky-500 py-3 font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          {/* SIGN IN LINK */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-sky-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;