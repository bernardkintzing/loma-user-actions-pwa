import { NumberRegEx, E164TelRegEx, EmailRegEx, URLRegEx } from "./regex";

export const isRealString = (s: unknown): boolean => typeof s === "string" && s !== "";

export const areRealStrings = (ss: unknown[]): boolean => ss.reduce<boolean>((p, s) => p && isRealString(s), true);

export const isNumericString = (s: string): boolean => NumberRegEx.test(s);

export const isTelString = (s: string): boolean => E164TelRegEx.test(s);

export const isEmailString = (s: string): boolean => EmailRegEx.test(s);

export const isUrlString = (s: string): boolean => URLRegEx.test(s);
