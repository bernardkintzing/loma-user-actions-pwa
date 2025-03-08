import { classFilter } from "@/util/tailwind";
import React, { HTMLAttributes } from "react";
import { Subtitle } from "./copy";

export enum TileVariant {
  Filled,
  Outlined,
}

export type TileProps = HTMLAttributes<HTMLDivElement> & {
  variant?: TileVariant;
  innerRef?: React.Ref<HTMLDivElement> | undefined;
};

export type LabeledTileProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  _top?: TileProps;
  _bottom?: TileProps;
};

export const Tile: React.FC<TileProps> = ({ innerRef, variant = TileVariant.Filled, className, ...props }) => (
  <div
    ref={innerRef}
    className={classFilter(
      "w-full rounded-2xl border border-solid border-outline-soft p-4 shadow-sm",
      variant === TileVariant.Filled && "bg-elevated",
      variant === TileVariant.Outlined && "border-outline-soft bg-transparent",
      className,
    )}
    {...props}
  />
);

export const LabeledTile: React.FC<LabeledTileProps> = ({ title, children, _top, _bottom, className, ...props }) => (
  <div className={classFilter("flex flex-col overflow-hidden", className)} {...props}>
    <Tile variant={TileVariant.Filled} {..._top} className={classFilter("rounded-b-none", _top?.className)}>
      <Subtitle>{title}</Subtitle>
    </Tile>
    <Tile variant={TileVariant.Outlined} {..._bottom} className={classFilter("rounded-t-none border-t-0 border-outline-soft", _bottom?.className)}>
      {children}
    </Tile>
  </div>
);
