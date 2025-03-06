import { classFilter } from "@/util/tailwind";
import React, { ComponentType, SVGProps } from "react";

type AllSVGProps = SVGProps<SVGSVGElement>;
type ReservedProps = "color" | "size" | "width" | "height" | "fill" | "viewBox";
export interface RemixIconProps extends Pick<AllSVGProps, Exclude<keyof AllSVGProps, ReservedProps>> {
  color?: string;
  size?: number | string;
  children?: never;
}

export type RemixIcon = ComponentType<RemixIconProps>;

export type IconProps = RemixIconProps & { icon: RemixIcon; innerRef?: React.Ref<SVGSVGElement> | undefined };

export const Icon: React.FC<IconProps> = ({ icon, className, innerRef, ...props }) => {
  const Icon = icon;
  return <Icon ref={innerRef} {...props} className={classFilter("h-5 w-5 opacity-80", className)} {...props} />;
};
