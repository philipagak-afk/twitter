function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-header">
        <h2>Profile</h2>
      </div>

      <div className="profile-cover"></div>

      <div className="profile-information">

        <div className="large-avatar">
          👤
        </div>

        <button className="edit-profile">
          Edit profile
        </button>

        <h1>test one</h1>

        <p className="username">
          @test_one
        </p>

        <p className="bio">
          Welcome to my profile.
        </p>

        <div className="profile-stats">
          <span>
            <strong>0</strong> Following
          </span>

          <span>
            <strong>0</strong> Followers
          </span>
        </div>

      </div>

    </div>
  );
}

export default Profile;