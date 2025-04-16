import { cn } from "@/lib/utils";
import Image from "next/image";

const Chips = ({ value = "", setValue = () => {}, items = [] }) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map(({ label, value: itemValue, icon }) => {
        const isSelected = value === itemValue;

        return (
          <button
            key={itemValue}
            type="button"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer flex gap-2",
              "border border-muted-foreground text-foreground hover:bg-muted-foreground/10",
              isSelected &&
                "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
            )}
            onClick={() => setValue(itemValue)}
          >
            <Image src={icon} alt="" className="" height={16} width={16} />
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default Chips;
