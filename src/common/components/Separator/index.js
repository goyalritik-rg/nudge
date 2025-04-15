import { cn } from "@/lib/utils";

const Separator = ({ orientation = "horizontal", className }) => {
  return (
    <div
      className={cn(
        "bg-neutral-300 dark:bg-neutral-400",
        orientation === "horizontal" && "w-full h-[1px]",
        orientation === "vertical" && "h-full w-[1px]",
        className
      )}
    />
  );
};

export default Separator;
