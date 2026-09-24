import { useState } from "react";

function Home() {
  const [tweet, setTweet] = useState("");

  const handlePost = () => {
    if (!tweet.trim()) return;

    console.log("New post:", tweet);

    setTweet("");
  };

  return (
    <div className="home-page">

      {/* TOP COMPOSER */}
      <div className="composer">

        <div className="avatar">
          👤
        </div>

        <div className="composer-content">

          <textarea
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />

          <div className="composer-bottom">

            <div className="composer-icons">
              <button>🖼</button>
              <button>GIF</button>
              <button>☷</button>
              <button>☺</button>
            </div>

            <button
              className="post-button"
              onClick={handlePost}
            >
              Post
            </button>

          </div>

        </div>

      </div>

      {/* FEED */}
      <div className="feed">

        <div className="feed-message">
          Error fetching Tweets
        </div>

      </div>

    </div>
  );
}

export default Home;