import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router";

import Layout from "./pages/Layout";
import ProtectedLayout from "./pages/ProtectedLayout";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Notification from "./pages/Notifications";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Signout from "./pages/Signout";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/signin"
          element={<Signin />}
        />


        {/* PROTECTED ROUTES */}

        <Route element={<ProtectedLayout />}>

          <Route element={<Layout />}>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* EXPLORE */}
            <Route
              path="/explore"
              element={<Explore />}
            />

            {/* NOTIFICATIONS */}
            <Route
              path="/notifications"
              element={<Notification />}
            />

            {/* MESSAGES */}
            <Route
              path="/messages"
              element={<Messages />}
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* SIGN OUT */}
            <Route
              path="/signout"
              element={<Signout />}
            />

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;