import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { LuShare } from "react-icons/lu";

import programmer from "../assets/programmer.png";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";
function Post() {
  const [post, setPost] = useState({});
  const params = useParams();
  const postId = params.postid;

  useEffect(() => {
    const docRef = doc(db, "posts", postId);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const postData = snapshot.data();

        setPost({ ...postData, id: snapshot.id });
      },
      (error) => {
        console.error("Home posts listener error:", error.code, error.message);
      },
    );

    return () => unsubscribe();
  }, [postId]);
  return (
    <div className="tweet" key={post.id}>
      <div className="tweet-avatar">
        <img src={post.avatar || programmer} alt="Profile" />
      </div>

      <div className="tweet-content">
        <div className="tweet-user">
          <strong>{post.name || "User Name"}</strong>

          <span>@{post.username || "username"}</span>
        </div>

        <p>{post.text}</p>

        <div className="tweet-actions">
          <button
            type="button"
            className="tweet-action comment-action"
            aria-label="Comment"
            title="Comment"
          >
            <FaRegComment />
          </button>

          <button
            type="button"
            className="tweet-action repost-action"
            aria-label="Repost"
            title="Repost"
          >
            <FaRetweet />
          </button>

          <button
            type="button"
            className="tweet-action like-action"
            aria-label="Like"
            title="Like"
          >
            <FaRegHeart />
          </button>

          <button
            type="button"
            className="tweet-action share-action"
            aria-label="Share"
            title="Share"
          >
            <LuShare />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;