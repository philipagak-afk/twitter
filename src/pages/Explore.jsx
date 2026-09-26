import { useState } from "react";

function Explore() {
  const [search, setSearch] = useState("");

  const trends = [
    {
      category: "Trending in Kenya",
      title: "#Kenya",
      posts: "12.5K posts",
    },
    {
      category: "Trending",
      title: "#Football",
      posts: "45.8K posts",
    },
    {
      category: "Technology",
      title: "#ReactJS",
      posts: "8,234 posts",
    },
    {
      category: "Trending in Kenya",
      title: "#Nairobi",
      posts: "6,421 posts",
    },
    {
      category: "Technology",
      title: "#JavaScript",
      posts: "15.2K posts",
    },
  ];

  const filteredTrends = trends.filter((trend) =>
    trend.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-container explore-page">

      {/* SEARCH */}
      <div className="explore-search">

        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* EXPLORE HEADER */}
      <div className="page-header">
        <h2>Explore</h2>
      </div>

      {/* TRENDS */}
      <div className="trends-section">

        <h2>What's happening</h2>

        {filteredTrends.length > 0 ? (
          filteredTrends.map((trend, index) => (
            <div
              className="trend-item"
              key={index}
            >

              <div className="trend-information">

                <span className="trend-category">
                  {trend.category}
                </span>

                <h3>{trend.title}</h3>

                <span className="trend-posts">
                  {trend.posts}
                </span>

              </div>

              <button className="trend-more">
                ⋯
              </button>

            </div>
          ))
        ) : (
          <div className="no-results">
            No results found
          </div>
        )}

      </div>

    </div>
  );
}

export default Explore;