import { useState, useEffect, use } from 'react';
import NotificationCard from './NotificationCard';

export default function Notifications() {
  type Notification = {
    notificationID: string,
    fromUser: any;
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const fetchNotifications = async () => {
    const res = await fetch('/api/notifications');
    const data = await res.json();
    console.log(data);
    if (data.status === 200) setNotifications(data.notifications);
    else alert('Something went wrong while fetching notifications');
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div className='flex flex-col space-y-5 '>
      {notifications.map((notification) => (
        <div>
          <NotificationCard
            notificationID = {notification.notificationID}
            from={notification.fromUser}
            content={notification.content}
            timestamp={new Date(notification.timestamp).toDateString()}
            isRead={notification.isRead}
          />
        </div>
      ))}
    </div>
  );
}
