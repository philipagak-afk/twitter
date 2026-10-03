import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import programmer from "../assets/programmer.png";
import { useState } from "react";
import { RiTwitterXLine } from "react-icons/ri";

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

    if (isLoading) return;

    try {
      setIsLoading(true);
      setError("");

      const { email, password } = user;

      if (!email.trim() || !password) {
        setError("Please enter your email and password.");
        return;
      }

      await signInWithEmailAndPassword(auth, email.trim(), password);

      setUser({ email: "", password: "" });

      toast.success("Sign in successful!");
      navigate("/");
    } catch (err) {
      console.error("Sign-in error:", err.code, err.message);

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Unable to sign in. Please try again.");
      }

      setUser((previous) => ({ ...previous, password: "" }));
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
            className="h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-8">
            <RiTwitterXLine className="mb-4 text-5xl" />
            <h2 className="text-3xl font-bold">
              Welcome back.
            </h2>
            <p className="mt-2 text-gray-300">
              Sign in to continue to your account.
            </p>
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <form
          onSubmit={handleSignin}
          className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-12"
        >
          <RiTwitterXLine className="mb-8 text-4xl" />

          <h1 className="text-3xl font-bold sm:text-4xl">
            Sign in
          </h1>

          <p className="mt-2 mb-8 text-gray-400">
            Welcome back! Enter your details below.
          </p>

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
            autoComplete="current-password"
            required
            value={user.password}
            onChange={(e) =>
              setUser((previous) => ({
                ...previous,
                password: e.target.value,
              }))
            }
            placeholder="Enter your password"
            className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />

          {/* FORGOT PASSWORD */}
          <div className="mt-3 flex justify-end">
            <Link
              to="/reset"
              className="text-sm text-sky-500 transition hover:text-sky-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-3 text-sm text-red-400"
            >
              {error}
            </p>
          )}

          {/* SIGN IN BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-full bg-sky-500 py-3 font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Log in"}
          </button>

          {/* SIGN UP LINK */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-sky-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;