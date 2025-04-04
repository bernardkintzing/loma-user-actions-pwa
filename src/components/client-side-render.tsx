import dynamic from "next/dynamic";
import React from "react";

export type ClientSideRenderProps = {
  children: React.ReactNode;
};

const Wrapper: React.FC<ClientSideRenderProps> = ({ children }) => <>{children}</>;

export const ClientSideRender = dynamic(() => Promise.resolve(Wrapper), { ssr: false });
