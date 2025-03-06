import { Metadata, Viewport } from "next";
import { ReactNode, Suspense } from "react";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Loma",
  manifest: "/manifest.json",
  // icons: {
  //   apple: "/icons/512x512.png",
  // },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
