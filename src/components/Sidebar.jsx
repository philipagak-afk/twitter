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
      path: "/explore",
      icon: <IoIosSearch />,
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: <IoMdNotificationsOutline />,
    },
    {
      title: "Messages",
      path: "/messages",
      icon: <MdOutlineMail />,
    },
    {
      title: "Profile",
      path: "/profile",
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
    <aside className="sticky top-0 flex h-screen w-full flex-col bg-black px-5 py-3 text-white">
      
      {/* X LOGO */}
      <div className="px-3 py-2">
        <RiTwitterXLine className="text-3xl" />
      </div>

      {/* NAVIGATION */}
      <nav className="mt-4">
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.title}>
              <Link
                to={link.path}
                className="flex w-fit items-center gap-5 rounded-full px-3 py-3 text-xl transition hover:bg-gray-900"
              >
                <span className="text-2xl">
                  {link.icon}
                </span>

                <span className="text-lg">
                  {link.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* LOG OUT BUTTON */}
      <button
        onClick={handleSignout}
        className="mt-6 w-full rounded-full bg-sky-500 px-5 py-3 text-lg font-bold text-white transition hover:bg-sky-600"
      >
        Log Out
      </button>

      {/* USER PROFILE */}
      <div className="mt-auto flex items-center gap-3 rounded-full px-3 py-3 hover:bg-gray-900">
        
        <img
          src={user?.photoURL || programmer}
          alt="profile image"
          className="h-11 w-11 rounded-full object-cover"
        />

        <div className="flex min-w-0 flex-col">
          <strong className="truncate text-sm">
            {user?.displayName || "User Name"}
          </strong>

          <span className="truncate text-sm text-gray-500">
            @{username}
          </span>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;