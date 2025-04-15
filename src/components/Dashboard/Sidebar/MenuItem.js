import { cn } from "@/lib/utils";
import Link from "next/link";

const MenuItem = ({ size, path, icon: Icon, label, current, onSignOut }) => {
  return (
    <Link
      onClick={onSignOut}
      className={cn(
        "flex items-center gap-2 py-2 pl-2 rounded-lg my-1",
        size === "min" && "justify-center pl-0",
        !current
          ? "text-muted-foreground"
          : current == path
          ? "bg-background font-bold text-foreground dark:bg-neutral-800"
          : "text-muted-foreground"
      )}
      href={path ? `/${path}` : "#"}
    >
      <Icon />

      {size === "max" ? (
        <span className="text-sm hover:text-foreground">{label}</span>
      ) : null}
    </Link>
  );
};

export default MenuItem;
