import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { FiImage, FiSmile } from "react-icons/fi";
import { BiPoll } from "react-icons/bi";
import { RiFileGifLine } from "react-icons/ri";

import { auth, db } from "../firebase";

function Home() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  // Check Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

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

    if (!currentUser) {
      alert("You need to sign in before posting.");
      return;
    }

    try {
      setIsPosting(true);

      await addDoc(collection(db, "tweets"), {
        text: tweet.trim(),
        userId: currentUser.uid,
        email: currentUser.email,
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

        <div className="composer-avatar">
          👤
        </div>

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

          <div className="composer-bottom">

            <div className="composer-icons">

              <button type="button">
                <FiImage />
              </button>

              <button type="button">
                <RiFileGifLine />
              </button>

              <button type="button">
                <BiPoll />
              </button>

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
                {item.email || "User"}
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

