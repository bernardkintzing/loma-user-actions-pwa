import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center overflow-scroll">
      <div className="w-full max-w-2xl p-4">{children}</div>
    </div>
  );
}
