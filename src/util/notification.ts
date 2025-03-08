import { NotificationStatus, Notification } from "@/types/notification";

type InformationNotify = (props: Omit<Notification, "status">) => void;
type ErrorNotify = (props: Omit<Notification, "status">) => void;

const NotificationEventKey = "loma-notification-event";

export const listenToNotificationEvent = (callback: (notification: Notification) => void) => {
  const handleNotificationEvent: EventListener = (event: Event) => {
    const notification = (event as CustomEvent).detail;

    if (notification && notification.status) {
      callback(notification as Notification);
    }
  };

  window.addEventListener(NotificationEventKey, handleNotificationEvent);

  return () => {
    window.removeEventListener(NotificationEventKey, handleNotificationEvent);
  };
};

export const useNotification = () => {
  const createNotificationLifecycle = (notification: Notification) => {
    return dispatchEvent(
      new CustomEvent(NotificationEventKey, {
        detail: notification,
        bubbles: true,
        composed: true,
      }),
    );
  };

  const info: InformationNotify = ({ ...notification }) => {
    createNotificationLifecycle({ ...notification, status: NotificationStatus.Information });
  };

  const success: InformationNotify = ({ ...notification }) => {
    createNotificationLifecycle({ ...notification, status: NotificationStatus.Success });
  };

  const warn: ErrorNotify = ({ ...notification }) => {
    createNotificationLifecycle({ ...notification, status: NotificationStatus.Warning });
  };

  const error: ErrorNotify = ({ ...notification }) => {
    createNotificationLifecycle({ ...notification, status: NotificationStatus.Error });
  };

  return { info, success, warn, error };
};
