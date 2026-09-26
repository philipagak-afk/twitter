    import { useState } from "react";

function Notification() {
  const [notifications] = useState([
    {
      id: 1,
      type: "like",
      user: "John Doe",
      username: "@johndoe",
      message: "liked your post",
      time: "2m",
      avatar: "👤",
    },
    {
      id: 2,
      type: "follow",
      user: "Jane Smith",
      username: "@janesmith",
      message: "followed you",
      time: "15m",
      avatar: "👩",
    },
    {
      id: 3,
      type: "reply",
      user: "Mike",
      username: "@mike",
      message: "replied to your post",
      time: "1h",
      avatar: "👨",
    },
  ]);

  return (
    <div className="page-container notification-page">

      {/* HEADER */}
      <div className="page-header">
        <h2>Notifications</h2>
      </div>

      {/* NOTIFICATIONS */}
      <div className="notification-list">

        {notifications.map((notification) => (
          <div
            className="notification-item"
            key={notification.id}
          >

            <div className="notification-avatar">
              {notification.avatar}
            </div>

            <div className="notification-content">

              <div className="notification-user">
                <strong>{notification.user}</strong>

                <span>
                  {notification.username}
                </span>

                <small>
                  · {notification.time}
                </small>
              </div>

              <p>{notification.message}</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Notification;