import { classFilter } from "@/util/tailwind";
import React from "react";

export type HeadingProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
export type CopyProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
export type SpanProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
export type LabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
export type ULProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
export type OLProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLOListElement>, HTMLOListElement>;
export type LIProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>;

export const H1: React.FC<HeadingProps & { hero?: boolean }> = ({ hero, className, ...passthrough }) => (
  <h1
    className={classFilter(
      "inline-block leading-tight text-contrast-primary",
      hero ? "text-4xl font-bold sm:text-6xl md:text-8xl" : "text-3xl font-medium sm:text-4xl md:text-5xl",
      className,
    )}
    {...passthrough}
  />
);
export const H2: React.FC<HeadingProps> = ({ className, ...passthrough }) => (
  <h2 className={classFilter("inline-block text-3xl font-medium leading-tight text-contrast-primary sm:text-4xl", className)} {...passthrough} />
);
export const H3: React.FC<HeadingProps> = ({ className, ...passthrough }) => (
  <h3 className={classFilter("inline-block text-3xl font-medium leading-tight text-contrast-primary", className)} {...passthrough} />
);
export const H4: React.FC<HeadingProps> = ({ className, ...passthrough }) => (
  <h4 className={classFilter("inline-block text-2xl font-medium leading-tight text-contrast-primary", className)} {...passthrough} />
);
export const H5: React.FC<HeadingProps> = ({ className, ...passthrough }) => (
  <h5 className={classFilter("inline-block text-xl font-medium leading-tight text-contrast-primary", className)} {...passthrough} />
);
export const H6: React.FC<HeadingProps> = ({ className, ...passthrough }) => (
  <h6 className={classFilter("inline-block text-lg font-medium leading-tight text-contrast-primary", className)} {...passthrough} />
);
export const P: React.FC<CopyProps> = ({ className, ...passthrough }) => (
  <p className={classFilter("inline-block font-light tracking-wider", className)} {...passthrough} />
);
export const Label: React.FC<LabelProps> = ({ className, ...passthrough }) => (
  <label className={classFilter("inline-block font-medium leading-tight text-contrast-primary", className)} {...passthrough} />
);

/**
 * Copy elements to be used on the app
 */
export const Title: React.FC<SpanProps> = ({ className, ...passthrough }) => (
  <span className={classFilter("inline-block text-xl font-medium leading-tight text-contrast-primary", className)} {...passthrough} />
);

export const Subtitle: React.FC<SpanProps> = ({ className, ...passthrough }) => (
  <span className={classFilter("inline-block text-lg font-medium leading-tight text-contrast-primary", className)} {...passthrough} />
);

export const Copy: React.FC<SpanProps> = ({ className, ...passthrough }) => (
  <span className={classFilter("inline-block font-light tracking-wider text-contrast-secondary", className)} {...passthrough} />
);

/**
 * List elements
 */
export const UL: React.FC<ULProps> = ({ className, ...props }) => (
  <ul className={classFilter("m-4 ml-6 flex list-none flex-col gap-2", className)} {...props} />
);

export const OL: React.FC<OLProps> = ({ className, ...props }) => (
  <ol className={classFilter("m-4 ml-6 flex list-none flex-col gap-2", className)} {...props} />
);

export const LI: React.FC<LIProps> = ({ className, ...props }) => (
  <li
    className={classFilter("relative before:absolute before:-ml-4 before:inline-block before:text-contrast-tertiary before:content-['–']", className)}
    {...props}
  />
);
