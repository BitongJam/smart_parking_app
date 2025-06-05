import axios from "axios";
import { useEffect, useState } from "react";

interface BasicUserNotificationProps {
  id: number;
  message: string;
  is_read: boolean;
  alert_type: string;
}

function BasicUserNotification() {
  const [notifications, setNotifications] = useState<
    BasicUserNotificationProps[]
  >([]);

  const token = localStorage.getItem("token");
  const auth_header = { Authorization: `Bearer ${token}` };

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/api/notification/notification/user_notification_list/`,
        {
          headers: auth_header,
        }
      )
      .then((res) => {
        setNotifications(res.data);
      });
  },[]);
  return (
    <>
      <div className="container">
        {notifications.map((notif) => (
          <div
            className={`alert alert-${notif.alert_type}`}
            role="alert"
            key={notif.id}
          >
            {notif.message}
          </div>
        ))}
      </div>
    </>
  );
}

export default BasicUserNotification;
