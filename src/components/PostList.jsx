import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import { LuShare } from "react-icons/lu";

import programmer from "../assets/programmer.png";
import { Link } from "react-router";

function PostList({ posts = [] }) {
  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p className="empty-profile">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div className="tweet" key={post.id}>
            <div className="tweet-avatar">
              <img src={post.avatar || programmer} alt="Profile" />
            </div>

            <div className="tweet-content">
              <div className="tweet-user">
                <strong>{post.name || "User Name"}</strong>

                <span>@{post.username || "username"}</span>
              </div>

              <Link to={`/comments/${post.id}`}>{post.text}</Link>

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
        ))
      )}
    </div>
  );
}

export default PostList;