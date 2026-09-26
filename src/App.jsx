import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

import Layout from "./pages/Layout";
import ProtectedLayout from "./pages/ProtectedLayout";

import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Signout from "./pages/Signout";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import Notification from "./pages/Notification";
import Explore from "./pages/Explore";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected pages */}
        <Route element={<ProtectedLayout />}>
          <Route element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signout" element={<Signout />} />
            <Route path="/explore" element={<Explore />} />

<Route
  path="/notifications"
  element={<Notification />}
/>

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;