import { Copy } from "@/components/copy";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center overflow-scroll">
      <div className="w-full max-w-2xl p-4 pb-24">
        {children}
        <div className="flex w-full flex-col items-center justify-center pt-12">
          <Copy className="text-center text-sm text-contrast-tertiary">0.1.1</Copy>
        </div>
      </div>
    </div>
  );
}
