import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { IoArrowBack } from "react-icons/io5";
import { auth, db } from "../firebase";

import banner from "../assets/banner.jpg";
import programmer from "../assets/programmer.png";

import PostList from "../components/PostList";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let unsubscribePosts;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setPosts([]);
        return;
      }

      const postsQuery = query(
        collection(db, "posts"),
        where("uid", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      unsubscribePosts = onSnapshot(
        postsQuery,
        (snapshot) => {
          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPosts(postsData);
        },
        (error) => {
          console.error(
            "Profile posts listener error:",
            error.code,
            error.message
          );
        }
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribePosts) {
        unsubscribePosts();
      }
    };
  }, []);

  const username = user?.displayName
    ? user.displayName.toLowerCase().replace(/\s+/g, "")
    : "username";

  return (
    <div className="min-h-screen w-full bg-black text-white">

      {/* PROFILE HEADER */}
      <div className="sticky top-0 z-20 flex items-center gap-5 border-b border-gray-800 bg-black/80 px-4 py-3 backdrop-blur-md">

        <button
          type="button"
          aria-label="Go back"
          onClick={() => window.history.back()}
          className="rounded-full p-2 text-2xl transition hover:bg-gray-900"
        >
          <IoArrowBack />
        </button>

        <div>
          <h2 className="text-xl font-bold">
            {user?.displayName || "User Name"}
          </h2>

          <span className="text-sm text-gray-500">
            {posts.length} posts
          </span>
        </div>
      </div>

      {/* COVER IMAGE */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={banner}
          alt="Profile banner"
          className="h-full w-full object-cover"
        />
      </div>

      {/* PROFILE INFORMATION */}
      <div className="relative px-4 pb-4">

        {/* PROFILE IMAGE */}
        <img
          src={user?.photoURL || programmer}
          alt="Profile"
          className="-mt-16 h-32 w-32 rounded-full border-4 border-black object-cover"
        />

        {/* EDIT BUTTON */}
        <div className="flex justify-end">
          <button className="rounded-full border border-gray-600 px-5 py-2 font-bold transition hover:bg-gray-900">
            Edit profile
          </button>
        </div>

        {/* PROFILE DETAILS */}
        <div className="mt-3">

          <h2 className="text-xl font-bold">
            {user?.displayName || "User Name"}
          </h2>

          <p className="text-gray-500">
            @{username}
          </p>

          <p className="mt-3 text-gray-200">
            Frontend Developer · React · JavaScript
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Joined September 2026
          </p>

        </div>
      </div>

      {/* PROFILE NAVIGATION */}
      <nav className="flex border-b border-gray-800">
        <button className="relative flex-1 py-4 font-bold hover:bg-gray-900">
          Posts
          <span className="absolute bottom-0 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-sky-500" />
        </button>

        <button className="flex-1 py-4 text-gray-500 hover:bg-gray-900">
          Replies
        </button>

        <button className="flex-1 py-4 text-gray-500 hover:bg-gray-900">
          Media
        </button>

        <button className="flex-1 py-4 text-gray-500 hover:bg-gray-900">
          Likes
        </button>
      </nav>

      {/* USER POSTS */}
      <PostList posts={posts} />

    </div>
  );
}

export default Profile;