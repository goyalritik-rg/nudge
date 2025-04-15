"use client";

import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import MaxVersion from "./MaxVersion";
import MinVersion from "./MinVersion";

const Sidebar = ({ domains = [] }) => {
  const { expand, onExpand, page, onSignOut } = useSidebar();

  return (
    <div
      className={cn(
        "bg-orange-100/40 dark:bg-neutral-950 h-full w-[60px] fill-mode-forwards fixed md:relative",
        expand && "w-[300px]"
        // expand == true
        //   ? "animate-open-sidebar"
        //   : expand == false && "animate-close-sidebar"
      )}
    >
      {expand ? (
        <MaxVersion
          domains={domains}
          current={page}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinVersion
          domains={domains}
          onShrink={onExpand}
          current={page}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
};

export default Sidebar;
