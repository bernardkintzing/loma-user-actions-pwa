import React from "react";

export type PageProgressIndicatorProps = {
  source: string;
  active?: boolean;
};

export const PageProgressIndicator: React.FC<PageProgressIndicatorProps> = ({ source, active = true }) => {
  return active ? (
    <div className="fixed left-0 right-0 top-0 z-alert h-1" data-source={source}>
      <div className="animate-progress h-full bg-primary/80" />
    </div>
  ) : null;
};
