import React, { useEffect, useRef, useState } from "react";
import { NotificationType, useBuddy } from "../providers/Buddy";

export const Notification = () => {
  const hideTimeout = 5000;
  const notificationStore = useBuddy();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const [open, setOpen] = useState(false);
  const hideTimer = useRef<any>(null);

  const hideAlert = (timer: number) => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setOpen(false);
      notificationStore?.deleteNotifications();
    }, timer);
  };

  useEffect(() => {
    if (notificationStore!.notifications.length > 0) {
      const alerts = notificationStore!.notifications;
      const lastAlert = alerts[alerts.length - 1];
      setNotification(lastAlert);
      setOpen(true);
      hideAlert(hideTimeout);
    }
  }, [notificationStore]);

  return (
    <>
      {open && notification && (
        <div
          className={`fixed top-0 left-[50%] transform -translate-x-[50%] font-extrabold text-xl z-50   alert alert-${notification.type}`}
        >
          <div className='flex-1'>
            <label>{notification?.message}</label>
          </div>
        </div>
      )}
    </>
  );
};
