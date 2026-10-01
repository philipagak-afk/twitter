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
      where("postId", "==", null),
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
        console.error("Home posts listener error:", error.code, error.message);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <PostForm label="tweet" />
      <PostList posts={posts} />
    </div>
  );
}

export default Home;