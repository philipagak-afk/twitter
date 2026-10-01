import { useEffect, useState } from "react";
import { Link } from "react-router";
import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { MdPersonOutline } from "react-icons/md";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { RiTwitterXLine } from "react-icons/ri";
import programmer from "../assets/programmer.png";

function Sidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const links = [
    {
      title: "Home",
      path: "/",
      icon: <MdHomeFilled />,
    },
    {
      title: "Explore",
      path: "explore",
      icon: <IoIosSearch />,
    },
    {
      title: "Notifications",
      path: "notifications",
      icon: <IoMdNotificationsOutline />,
    },
    {
      title: "Messages",
      path: "messages",
      icon: <MdOutlineMail />,
    },
    {
      title: "Profile",
      path: "profile",
      icon: <MdPersonOutline />,
    },
  ];

  const handleSignout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  const username = user?.displayName
    ? user.displayName.toLowerCase().replace(/\s+/g, "")
    : "username";

  return (
    <aside className=" h-screen  grid bg-black text-white py-3.75 px-5 sticky top-0 flex-col ">
      <div className="py-2.5  px-3.75">
        <h3>
          <RiTwitterXLine />
        </h3>
      </div>

      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.title}>
              <Link to={link.path}>
                <span className="sidebar-icon">{link.icon}</span>
                <span>{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button className="signout-button" onClick={handleSignout}>
        Log Out
      </button>

      <div className="profile">
        <img
          className="profile-image"
          src={user?.photoURL || programmer}
          alt="profile image"
        />

        <div className="profile-text">
          <strong>{user?.displayName || "User Name"}</strong>
          <span>@{username}</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;