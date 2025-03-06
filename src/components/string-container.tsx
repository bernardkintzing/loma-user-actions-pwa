import React, { Children } from "react";
import { classFilter } from "@/util/tailwind";
import { CopyProps, Copy } from "./copy";

export const StringContainer: React.FC<CopyProps> = ({ children, className, ...props }) => {
  return Children.map(children, (child) =>
    typeof child === "string" ? (
      <Copy className={classFilter("leading-none text-inherit", className)} {...props}>
        {child}
      </Copy>
    ) : (
      child
    ),
  );
};
