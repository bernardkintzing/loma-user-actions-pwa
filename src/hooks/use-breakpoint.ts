"use client";

import { useMediaQuery } from "usehooks-ts";

export const useXS = () => useMediaQuery("(max-width: 475px)");
export const useSM = () => useMediaQuery("(max-width: 640px)");
export const useMD = () => useMediaQuery("(max-width: 768px)");
export const useLG = () => useMediaQuery("(max-width: 1024px)");
export const useXL = () => useMediaQuery("(max-width: 1280px)");
export const useXXL = () => useMediaQuery("(max-width: 1536px)");

export const useMobileBreakpoint = () => useSM();

export const useBreakpoints = () => {
  return {
    sm: useXS(),
    md: useMD(),
    lg: useLG(),
    xl: useXL(),
    xxl: useXXL(),
  };
};
