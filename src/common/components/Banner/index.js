import { cn } from "@/lib/utils";
const sizeClass = {
  sm: "md",
  md: "lg",
  lg: "2xl",
};

const Banner = ({ size = "md" }) => {
  return (
    <div
      className={cn(
        "uppercase text-orange-400 font-bold text-lg",
        sizeClass[size]
      )}
    >
      Nudge
    </div>
  );
};

export default Banner;
