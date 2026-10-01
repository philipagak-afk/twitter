import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedLayout from "./pages/ProtectedLayout";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Layout />
            </ProtectedLayout>
          }
        >
          <Route index element={<Home />} />
          <Route path="comments/:postid" element={<Comments />} />
          <Route path="explore" element={<Explore />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;