import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { LuShare } from "react-icons/lu";

import programmer from "../assets/programmer.png";
import { Link } from "react-router";

function PostList({ posts = [] }) {
  return (
    <div className="w-full">
      {posts.length === 0 ? (
        <p className="border-b border-gray-800 px-4 py-10 text-center text-gray-500">
          No posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            className="flex gap-3 border-b border-gray-800 px-4 py-4 text-white transition hover:bg-white/[0.03]"
          >
            {/* Profile image */}
            <div className="shrink-0">
              <img
                src={post.avatar || programmer}
                alt="Profile"
                className="h-11 w-11 rounded-full object-cover"
              />
            </div>

            {/* Post content */}
            <div className="min-w-0 flex-1">
              {/* Name and username */}
              <div className="flex flex-wrap items-center gap-x-2">
                <strong className="font-bold text-white">
                  {post.name || "User Name"}
                </strong>

                <span className="text-sm text-gray-500">
                  @{post.username || "username"}
                </span>
              </div>

              {/* Post text */}
              <Link
                to={`/comments/${post.id}`}
                className="mt-1 block whitespace-pre-wrap break-words text-[15px] leading-6 text-gray-100 hover:underline"
              >
                {post.text}
              </Link>

              {/* Post actions */}
              <div className="mt-3 flex max-w-md items-center justify-between text-gray-500">
                <button
                  type="button"
                  aria-label="Comment"
                  title="Comment"
                  className="rounded-full p-2 transition hover:bg-sky-500/10 hover:text-sky-400"
                >
                  <FaRegComment size={17} />
                </button>

                <button
                  type="button"
                  aria-label="Repost"
                  title="Repost"
                  className="rounded-full p-2 transition hover:bg-green-500/10 hover:text-green-400"
                >
                  <FaRetweet size={18} />
                </button>

                <button
                  type="button"
                  aria-label="Like"
                  title="Like"
                  className="rounded-full p-2 transition hover:bg-pink-500/10 hover:text-pink-400"
                >
                  <FaRegHeart size={17} />
                </button>

                <button
                  type="button"
                  aria-label="Share"
                  title="Share"
                  className="rounded-full p-2 transition hover:bg-sky-500/10 hover:text-sky-400"
                >
                  <LuShare size={18} />
                </button>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}

export default PostList;

