import React, { useCallback, useEffect, useRef, useState } from "react";
import { NotificationType, useBuddy } from "../../providers/Buddy";

export const Notification = () => {
  const hideTimeout = 4000;
  const notificationStore = useBuddy();
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const [open, setOpen] = useState(false);
  const hideTimer = useRef<any>(null);

  const hideAlert = useCallback(
    (timer: number) => {
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setOpen(false);
        notificationStore?.deleteNotifications();
      }, timer);
    },
    [notificationStore]
  );

  useEffect(() => {
    if (notificationStore!.notifications.length > 0) {
      const alerts = notificationStore!.notifications;
      const lastAlert = alerts[alerts.length - 1];
      setNotification(lastAlert);
      setOpen(true);
      hideAlert(hideTimeout);
    }
  }, [notificationStore, hideAlert]);

  return (
    <>
      {open && (
        <div
          className={`fixed bottom-10 left-[50%] text-xl p-6 transform -translate-x-[50%] font-bold  z-50   alert ${
            notification?.type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          <div className='flex-1'>
            <label>{notification?.message}</label>
          </div>
        </div>
      )}
    </>
  );
};
