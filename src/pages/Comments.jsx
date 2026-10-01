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
import { useParams } from "react-router";
import Post from "../components/Post";

function Comments() {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const postId = params.postid;

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      where("postId", "==", postId),
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
  }, [postId]);

  return (
    <div>
      <Post />
      <PostForm label="comment" />
      <PostList posts={posts} />
    </div>
  );
}

export default Comments;