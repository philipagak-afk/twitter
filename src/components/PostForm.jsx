import { useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa";
import { PiChartBarHorizontalBold } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";
import { RiFileGifLine } from "react-icons/ri";
import { FiLoader } from "react-icons/fi";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import { toast } from "react-hot-toast";
import programmer from "../assets/programmer.png";
import { useParams } from "react-router";
import { useUser } from "../hooks/useUser";

function PostForm({ label = "tweet" }) {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const { postid } = useParams();
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.trim()) return;

    if (!user) {
      toast.error("You must be signed in to post.");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "posts"), {
        text: post.trim(),
        uid: user.userId,
        userid: user.userId,
        name: user.name || "User Name",
        username: user.username || "username",
        email: user.email || "",
        avatar: user.avatar || "",
        createdAt: serverTimestamp(),
        updatedOn: serverTimestamp(),
        postId: label === "tweet" ? null : postid || null,
      });

      setPost("");
      toast.success(`${label} sent successfully`);
    } catch (error) {
      console.error(`Error creating ${label}:`, error);
      toast.error(`Failed to publish ${label}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-gray-800 px-4 py-4 text-white"
    >
      {/* Profile image */}
      <div className="shrink-0">
        <img
          src={user?.avatar || programmer}
          alt="Profile"
          className="h-11 w-11 rounded-full object-cover"
        />
      </div>

      {/* Composer */}
      <div className="min-w-0 flex-1">
        <textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="What's happening?"
          rows={2}
          disabled={loading}
          className="w-full resize-none bg-transparent py-2 text-xl text-white outline-none placeholder:text-gray-500 disabled:opacity-60"
        />

        <div className="mt-3 flex items-center justify-between gap-2">
          {/* Composer icons */}
          <div className="flex flex-wrap items-center gap-1 text-sky-500">
            <button
              type="button"
              aria-label="Add image"
              title="Add image"
              className="rounded-full p-2 transition hover:bg-sky-500/10"
            >
              <FaImage size={17} />
            </button>

            <button
              type="button"
              aria-label="Add GIF"
              title="Add GIF"
              className="rounded-full p-2 transition hover:bg-sky-500/10"
            >
              <RiFileGifLine size={19} />
            </button>

            <button
              type="button"
              aria-label="Add poll"
              title="Add poll"
              className="rounded-full p-2 transition hover:bg-sky-500/10"
            >
              <PiChartBarHorizontalBold size={19} />
            </button>

            <button
              type="button"
              aria-label="Add emoji"
              title="Add emoji"
              className="rounded-full p-2 transition hover:bg-sky-500/10"
            >
              <SlEmotsmile size={17} />
            </button>
          </div>

          {/* Submit buttons */}
          <div className="flex shrink-0 items-center gap-2">
            {loading && (
              <FiLoader className="animate-spin text-sky-500" size={18} />
            )}

            <button
              type="button"
              aria-label="Add"
              title="More options"
              className="rounded-full border border-gray-700 p-2 text-sky-500 transition hover:bg-gray-900"
            >
              <FaPlus size={12} />
            </button>

            <button
              type="submit"
              disabled={!post.trim() || loading}
              className="rounded-full bg-sky-500 px-5 py-2 font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
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
