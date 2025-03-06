import { ClassNameValue, twMerge } from "tailwind-merge";

export function classFilter(...classes: ClassNameValue[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}
