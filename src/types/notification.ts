export type Notification = { status: NotificationStatus; title?: string; message?: string };

export enum NotificationStatus {
  Information = "information",
  Success = "success",
  Warning = "warning",
  Error = "error",
}
