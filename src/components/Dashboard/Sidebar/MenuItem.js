import { cn } from "@/lib/utils";
import Link from "next/link";

const MenuItem = ({ size, path, icon: Icon, label, current, onSignOut }) => {
  if (size === "max") {
    return (
      <Link
        onClick={onSignOut}
        className={cn(
          "flex items-center gap-2 px-1 py-2 rounded-lg my-1",
          !current
            ? "text-gray-500"
            : current == path
            ? "bg-background font-bold text-foreground"
            : "text-gray-500"
        )}
        href={path ? `/${path}` : "#"}
      >
        <Icon />
        <span className="text-sm hover:text-foreground">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      onClick={onSignOut}
      className={cn(
        !current
          ? "text-gray-500"
          : current == path
          ? "bg-white font-bold text-black"
          : "text-gray-500",
        "rounded-lg py-2 my-1"
      )}
      href={path ? `/${path}` : "#"}
    >
      <Icon />
    </Link>
  );
};

export default MenuItem;
