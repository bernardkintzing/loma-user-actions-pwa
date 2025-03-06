import React, { HTMLAttributes } from "react";
import Image from "next/image";
import PlaceholderProfile from "@/assets/placeholder-profile.png";
import { classFilter } from "@/util/tailwind";

export type ProfileImageProps = HTMLAttributes<HTMLDivElement> & { src?: string; alt: string; _image?: { priority?: boolean; sizes?: string } };

export const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, className, _image, ...props }) => (
  <div className={classFilter("relative h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props}>
    <Image
      {..._image}
      src={src ?? PlaceholderProfile}
      alt={alt}
      className="absolute bottom-0 left-0 right-0 top-0 h-full w-full object-cover object-center"
      sizes={`${_image?.sizes} 2.5rem`}
      fill
    />
  </div>
);
