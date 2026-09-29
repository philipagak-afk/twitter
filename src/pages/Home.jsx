import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { FiImage, FiSmile } from "react-icons/fi";
import { BiPoll } from "react-icons/bi";
import { RiFileGifLine } from "react-icons/ri";

import { auth, db } from "../firebase";

function Home() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  // Get tweets from Firestore
  useEffect(() => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
      const tweetData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTweets(tweetData);
    });

    return () => unsubscribe();
  }, []);

  // Post tweet
  async function handlePost() {
    if (!tweet.trim()) {
      return;
    }

    if (!auth.currentUser) {
      alert("You need to sign in before posting.");
      return;
    }

    try {
      setIsPosting(true);

      await addDoc(collection(db, "tweets"), {
        text: tweet.trim(),
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      setTweet("");
    } catch (error) {
      console.error("Error posting tweet:", error);
      alert("Failed to post tweet.");
    } finally {
      setIsPosting(false);
    }
  }

  return (
    <div className="home-page">

      {/* POST COMPOSER */}
      <div className="tweet-composer">

        {/* AVATAR */}
        <div className="composer-avatar">
          👤
        </div>

        {/* COMPOSER CONTENT */}
        <div className="composer-content">

          <input
            type="text"
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePost();
              }
            }}
          />

          {/* BOTTOM ACTIONS */}
          <div className="composer-bottom">

            <div className="composer-icons">

              {/* GALLERY */}
              <button type="button">
                <FiImage />
              </button>

              {/* GIF */}
              <button type="button">
                <RiFileGifLine />
              </button>

              {/* POLL */}
              <button type="button">
                <BiPoll />
              </button>

              {/* EMOJI */}
              <button type="button">
                <FiSmile />
              </button>

            </div>

            <button
              type="button"
              className="post-button"
              onClick={handlePost}
              disabled={isPosting || !tweet.trim()}
            >
              {isPosting ? "Posting..." : "Post"}
            </button>

          </div>
        </div>
      </div>

      {/* TWEETS */}
      <div className="tweets-list">
        {tweets.map((item) => (
          <div className="tweet" key={item.id}>

            <div className="tweet-avatar">
              👤
            </div>

            <div className="tweet-content">

              <div className="tweet-user">
                User
              </div>

              <p>{item.text}</p>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;