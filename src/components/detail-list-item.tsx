import { classFilter } from "@/util/tailwind";
import { Label, Copy } from "./copy";

export type DetailListItemProps = {
  label: string;
  item: React.ReactNode;
  className?: string;
};

export const DetailListItem: React.FC<DetailListItemProps> = ({ label, item, className }) => (
  <div className={classFilter("grid grid-cols-[8rem,1fr] border-b border-outline-soft last-of-type:border-none", className)}>
    <Label className="my-4">{label}:</Label>
    <div className="flex h-full w-full flex-row items-center">{typeof item === "string" ? <Copy className="my-4">{item}</Copy> : item}</div>
  </div>
);
