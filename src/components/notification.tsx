"use client";

import { Notification } from "@/types/notification";
import { Tile } from "./tile";
import { classFilter } from "@/util/tailwind";
import { Copy } from "./copy";
import { useMobileBreakpoint } from "@/hooks/use-breakpoint";
import { useEffect, useState } from "react";
import { listenToNotificationEvent } from "@/util/notification";

type NotificationContainerProps = {
  notification: Notification;
};

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notification }) => (
  <Tile
    className={classFilter(
      "z-alert flex w-full max-w-none flex-col gap-1 sm:max-w-sm",
      {
        information: "border-primary bg-primary",
        success: "border-success bg-success",
        warning: "border-warn bg-warn",
        error: "border-error bg-error",
      }[notification.status],
    )}
  >
    {notification.title && (
      <Copy
        className={classFilter(
          "text-sm font-semibold opacity-100",
          {
            information: "text-primary-contrast",
            success: "text-success-contrast",
            warning: "text-warn-contrast",
            error: "text-error-contrast",
          }[notification.status],
        )}
      >
        {notification.title}
      </Copy>
    )}
    {notification.message && (
      <Copy
        className={classFilter(
          "text-sm",
          {
            information: "text-primary-tone",
            success: "text-success-tone",
            warning: "text-warn-tone",
            error: "text-error-tone",
          }[notification.status],
        )}
      >
        {notification.message}
      </Copy>
    )}
  </Tile>
);

export const NotificationPanel: React.FC = () => {
  const isMobile = useMobileBreakpoint();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsubscribe = listenToNotificationEvent(handleNotification);

    return () => unsubscribe();
  });

  const handleNotification = (notification: Notification) => {
    setNotifications((notifications) => [...notifications, notification]);

    setTimeout(() => {
      setNotifications((notifications) => notifications.slice(1));
    }, 5000);
  };

  return (
    <div
      id="notification-panel"
      className={classFilter(
        "fixed z-alert flex h-fit flex-col gap-2",
        isMobile ? "left-1/2 top-2 box-border w-full -translate-x-1/2 px-2" : "bottom-2 right-2",
      )}
    >
      {notifications.map((notification, i) => (
        <NotificationContainer key={i} notification={notification} />
      ))}
    </div>
  );
};
