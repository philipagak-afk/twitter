import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("postId", "==", null)
    );

    const unsubscribe = onSnapshot(
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
          "Home posts listener error:",
          error.code,
          error.message
        );
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* HOME HEADER */}
      <div className="sticky top-0 z-10 border-b border-gray-800 bg-black/80 px-4 py-3 backdrop-blur-md">
        <h1 className="text-xl font-bold">Home</h1>
      </div>

      {/* POST COMPOSER */}
      <PostForm label="tweet" />

      {/* POSTS */}
      <PostList posts={posts} />
    </div>
  );
}

export default Home;