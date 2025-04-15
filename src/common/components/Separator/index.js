import { cn } from "@/lib/utils";

const Separator = ({ orientation = "horizontal" }) => {
  return (
    <div
      className={cn(
        "bg-neutral-950/15",
        orientation === "horizontal" && "w-full h-[1px]",
        orientation === "vertical" && "h-full w-[1px]"
      )}
    />
  );
};

export default Separator;
