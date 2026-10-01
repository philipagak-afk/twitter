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
        orderBy("createdAt", "desc"),
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
            error.message,
          );
        },
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribePosts) {
        unsubscribePosts();
      }
    };
  }, []);

  return (
    <div className="profile-page">
      {/* Profile header */}
      <div className="profile-header">
        <button
          type="button"
          className="profile-back-button"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <IoArrowBack />
        </button>

        <div className="profile-header-info">
          <h2>{user?.displayName || "User Name"}</h2>
          <span>{posts.length} posts</span>
        </div>
      </div>

      {/* Cover */}
      <div className="profile-cover">
        <img className="profile-banner-image" src={banner} alt="" />
      </div>

      {/* Profile information */}
      <div className="profile-info">
        <img
          className="profile-page-image"
          src={user?.photoURL || programmer}
          alt="Profile"
        />

        <button className="edit-profile-button">Edit profile</button>

        <div className="profile-details">
          <h2>{user?.displayName || "User Name"}</h2>

          <p className="profile-username">
            @{user?.email?.split("@")[0] || "username"}
          </p>

          <p className="profile-bio">Frontend Developer · React · JavaScript</p>

          <p className="profile-joined">Joined September 2026</p>
        </div>
      </div>

      {/* Profile navigation */}
      <nav className="profile-nav">
        <button className="active">Posts</button>
        <button>Replies</button>
        <button>Media</button>
        <button>Likes</button>
      </nav>

      {/* User posts */}
      <PostList posts={posts} />
    </div>
  );
}

export default Profile;