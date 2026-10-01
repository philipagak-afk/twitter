import { useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa";
import { PiChartBarHorizontalBold } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";

import { RiFileGifLine } from "react-icons/ri";
import { FiLoader } from "react-icons/fi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import programmer from "../assets/programmer.png";
import { useParams } from "react-router";
import { useUser } from "../hooks/useUser";
function PostForm({ label }) {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const postId = params.postid;
  // const user = auth.currentUser;
  const { user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.trim()) return;

    // if (!user) {
    //   toast.error("You must be signed in to post.");
    //   return;
    // }
    try {
      setLoading(true);
      await addDoc(collection(db, "posts"), {
        text: post.trim(),
        userid: user.userId,
        name: user.name,
        // username: user.displayName || "username",
        email: user.email,
        avatar: "",
        createdAt: serverTimestamp(),
        updatedOn: serverTimestamp(),
        postId: label === "tweet" ? null : postId,
      });
      setPost("");
      toast.success(`${label} sent successfully`);
    } catch (error) {
      console.error(`Error creating ${label}`, error);
      toast.error(`Failed to publish ${label}`);
    } finally {
      setLoading(false);
    }
  };
  // const user = auth.currentUser;
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="post-avatar">
        <img src={programmer} alt="Profile" />
      </div>
      <div className="post-content">
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="What's happening?"
          rows="1"
          disabled={loading}
        />
        <div className="post-actions">
          <div className="post-icons">
            <button type="button" aria-label="Add image">
              <FaImage />
            </button>
            <button type="button" aria-label="Add GIF">
              <RiFileGifLine />
            </button>
            <button type="button" aria-label="Add poll">
              <PiChartBarHorizontalBold />
            </button>
            <button type="button" aria-label="Add emoji">
              <SlEmotsmile />
            </button>
          </div>
          <div className="post-submit">
            {loading && <FiLoader className="post-loader" />}
            <button type="button" className="add-button" aria-label="Add">
              <FaPlus />
            </button>
            <button
              type="submit"
              className="post-button"
              disabled={!post.trim() || loading}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default PostForm;