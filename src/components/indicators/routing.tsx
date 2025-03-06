"use client";

import { useAppRouter } from "@/hooks/use-app-router";
import { PageProgressIndicator } from "./page-progress";

export const RoutingIndicator: React.FC = () => {
  const { routing } = useAppRouter();

  return <PageProgressIndicator active={routing} source={`RoutingIndicator`} />;
};
