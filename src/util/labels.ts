import { SimpleTimestamp } from "@/types/database/firestore";
import { cleanPhoneNumber, formatPhoneNumber } from "./helpers";

export const phoneNumberLabel = (phoneNumber: string | undefined): string => {
  if (!phoneNumber) return "";
  return formatPhoneNumber(cleanPhoneNumber(phoneNumber));
};

export const userNameLabel = (firstName: string | undefined, lastName: string | undefined, shortened: boolean = false) => {
  if (!firstName && !lastName) return "Anonymous";
  if (!firstName) return lastName as string;
  if (!lastName) return firstName as string;

  return shortened ? firstName : `${firstName} ${lastName}`;
};

export const expandedDateString = (timestamp: SimpleTimestamp) => {
  const date = new Date(timestamp._seconds * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleDateString("en-US", options);
};

export const durationLabel = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const hoursLabel = hours + (hours === 1 ? " hour" : " hours");
  const minutesLabel = minutes + (minutes === 1 ? " minute" : " minutes");

  if (hours === 0) return minutesLabel;
  if (minutes === 0) return hoursLabel;

  return `${hoursLabel} and ${minutesLabel}`;
};
