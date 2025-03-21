import { classFilter } from "@/util/tailwind";
import { Label, Copy } from "./copy";

export type DetailListItemProps = {
  label: string;
  item: React.ReactNode;
  className?: string;
};

export const DetailListItem: React.FC<DetailListItemProps> = ({ label, item, className }) => (
  <div className={classFilter("md:grid md:grid-cols-[8rem,1fr] gap-2 flex flex-col border-b border-outline-soft last-of-type:border-none", className)}>
    <Label className="md:my-4">{label}:</Label>
    <div className="flex h-full w-full flex-row items-center">{typeof item === "string" ? <Copy className="md:my-4">{item}</Copy> : item}</div>
  </div>
);
