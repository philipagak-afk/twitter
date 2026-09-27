import {
  FiImage,
  FiSmile,
} from "react-icons/fi";

import { BiPoll } from "react-icons/bi";
import { RiFileGifLine } from "react-icons/ri";

function Home() {
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
            >
              Post
            </button>

          </div>

        </div>

      </div>


    </div>
  );
}

export default Home;