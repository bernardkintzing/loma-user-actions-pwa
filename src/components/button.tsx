"use client";

import React from "react";
import { classFilter } from "@/util/tailwind";
import { ActivityIndicator } from "./indicators/activity";
import { Icon, IconProps, RemixIcon } from "./icon";
import { StringContainer } from "./string-container";

export enum ButtonVariant {
  Gray,
  Soft,
  Filled,
  Outlined,
  Plain,
  Warning,
  Contrast,
}

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariant;
  tooltip?: React.ReactNode;
  loading?: boolean;
};

export type ToggleButtonProps = ButtonProps & { selected?: boolean };

export const Button: React.FC<ButtonProps> = ({ className, variant = ButtonVariant.Plain, disabled, children, loading, ...props }) => (
  <button
    className={classFilter(
      "min-h-8 w-fit min-w-8 rounded-full px-6 py-2 text-center outline-none transition-all",
      {
        [ButtonVariant.Gray]: "border border-solid border-outline-soft bg-grey hover:border-outline hover:bg-hover",
        [ButtonVariant.Soft]: "border border-solid border-outline-soft bg-contrast-primary/5 hover:border-outline hover:bg-hover",
        [ButtonVariant.Filled]: "border border-solid border-outline-soft bg-primary text-primary-contrast hover:border-outline hover:bg-primary/90",
        [ButtonVariant.Outlined]: "border border-solid border-outline-soft hover:border-outline hover:bg-hover-soft",
        [ButtonVariant.Plain]: "",
        [ButtonVariant.Contrast]: "border border-solid border-outline-soft bg-base-tone text-base-color hover:border-outline hover:bg-base-tone/90",
        [ButtonVariant.Warning]: "border border-solid border-outline-soft bg-error text-error-tone hover:border-outline hover:bg-error/90",
      }[variant],
      disabled && "pointer-events-none opacity-60",
      loading && "pointer-events-none",
      className,
    )}
    disabled={disabled || loading}
    {...props}
  >
    <ActivityIndicator
      active={loading}
      className={classFilter(
        {
          [ButtonVariant.Gray]: "fill-grey-contrast text-grey-contrast/20",
          [ButtonVariant.Soft]: "fill-contrast-primary text-contrast-primary/20",
          [ButtonVariant.Filled]: "fill-primary-contrast text-primary-contrast/20",
          [ButtonVariant.Outlined]: "fill-contrast-primary text-contrast-primary/20",
          [ButtonVariant.Plain]: "fill-contrast-primary text-contrast-primary/20",
          [ButtonVariant.Warning]: "fill-error-contrast text-error-contrast/20",
          [ButtonVariant.Contrast]: "fill-base text-base-color/20",
        }[variant],
      )}
      preserve
    >
      <StringContainer>{children}</StringContainer>
    </ActivityIndicator>
  </button>
);

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  className,
  variant = ButtonVariant.Plain,
  selected,
  disabled,
  children,
  loading,
  ...props
}) => (
  <button
    className={classFilter(
      "flex aspect-square min-h-8 min-w-8 items-center justify-center rounded-md p-2 text-center transition-all",
      {
        [ButtonVariant.Gray]: "border border-solid border-outline-soft bg-grey hover:border-outline hover:bg-hover",
        [ButtonVariant.Soft]: "border border-solid border-outline-soft bg-contrast-primary/5 hover:border-outline hover:bg-hover",
        [ButtonVariant.Filled]: "border border-solid border-outline-soft bg-primary text-primary-tone hover:border-outline hover:bg-primary/90",
        [ButtonVariant.Outlined]: "border border-solid border-outline-soft hover:border-outline hover:bg-hover-soft",
        [ButtonVariant.Plain]: "",
        [ButtonVariant.Contrast]: "border border-solid border-outline-soft bg-base-tone text-base-color hover:border-outline hover:bg-base-tone/90",
        [ButtonVariant.Warning]: "border border-solid border-outline-soft bg-error text-error-tone hover:border-outline hover:bg-error/90",
      }[variant],
      selected && "bg-primary text-primary-contrast",
      disabled && "pointer-events-none opacity-60",
      loading && "pointer-events-none",
      className,
    )}
    disabled={disabled || loading}
    type="button"
    {...props}
  >
    <ActivityIndicator active={loading} preserve>
      <StringContainer>{children}</StringContainer>
    </ActivityIndicator>
  </button>
);

export const IconButton: React.FC<ButtonProps & { icon?: RemixIcon; _icon?: Omit<IconProps, "icon"> }> = ({ className, icon, _icon, ...props }) => (
  <Button className={classFilter("group flex items-center justify-center p-0", className)} {...props}>
    {icon && (
      <Icon
        {..._icon}
        icon={icon}
        className={classFilter("text-sm text-contrast-secondary transition-all group-hover:text-contrast-primary", _icon?.className)}
      />
    )}
  </Button>
);
