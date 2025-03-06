import { isRealString } from "./validation";

export const cleanPhoneNumber = (value: string) => value.replace(/\D/g, "");

// include the + symbol required in E.164 format
export const formatE164PhoneNumber = (value: string) => `+${cleanPhoneNumber(value)}`;

export const formatPhoneNumber = (value: string) => {
  const match = value.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (match) {
    const countryCode = isRealString(match[1]) ? `+${match[1]}` : "";
    const part1 = isRealString(match[2]) ? ` (${match[2]}` : "";
    const part2 = isRealString(match[3]) ? (match[2].length === 3 ? `) ${match[3]}` : `${match[3]}`) : "";
    const part3 = isRealString(match[4]) ? `-${match[4]}` : "";
    return `${countryCode}${part1}${part2}${part3}`;
  }
  return "";
};
