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

  const handleNotificationClose = async (id:number)=>{
    await axios.patch(`${BASE_URL}/api/notification/notification/${id}/`,{
      is_read:true
    }).catch((err)=>{
       console.error(err);
    })
  }
  return (
    <>
      <div className="container">
        {notifications.map((notif) => (
          <div
            className={`alert alert-${notif.alert_type} alert-dismissible fade show`}
            role="alert"
            key={notif.id}
          >
            <strong>{notif.message}</strong>
            
              <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>handleNotificationClose(notif.id)} aria-label="Close"></button>

          </div>
          
        ))}
      </div>
    </>
  );
}

export default BasicUserNotification;
