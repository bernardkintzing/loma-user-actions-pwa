import { classFilter } from "@/util/tailwind";
import React from "react";

export const HR: React.FC<React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }> = ({ orientation, ...props }) =>
  orientation === "vertical" ? <VerticalHR {...props} /> : <HorizontalHR {...props} />;

export const VerticalHR: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={classFilter("mx-2 h-full w-px bg-outline-soft", className)} {...props} />
);

export const HorizontalHR: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={classFilter("my-2 h-px w-full bg-outline-soft", className)} {...props} />
);

export default HR;
