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
  console.log("Firebase user:", auth.currentUser);
  const [tweet, setTweet] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  // Check Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Get posts from Firestore
  useEffect(() => {
    const postsQuery = query(
      collection(db, "post"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postData);
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

      await addDoc(collection(db, "post"), {
        text: tweet.trim(),
        userId: currentUser.uid,
        email: currentUser.email,
        createdAt: serverTimestamp(),
      });

      setTweet("");
    } catch (error) {
      console.error("Error posting:", error);
      alert("Failed to post.");
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

            {/* POST BUTTON */}
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

      {/* POSTS */}
      <div className="tweets-list">

        {posts.map((item) => (
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

