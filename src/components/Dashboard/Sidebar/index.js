"use client";

import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import Banner from "@/common/components/Banner";
import { LogOut, Menu, MonitorSmartphone } from "lucide-react";
import MenuItem from "./MenuItem";
import Domains from "./Domains";
import { sidebarMenuItems } from "@/config/menu";

const Sidebar = ({ domains = [] }) => {
  const { expand, onExpand, page, onSignOut } = useSidebar();

  const size = expand ? "max" : "min";

  return (
    <div
      className={cn(
        "bg-orange-100/40 dark:bg-neutral-950 h-full w-[70px] fill-mode-forwards fixed md:relative p-3 flex flex-col items-center justify-center",
        expand && "w-[300px]"
        // expand == true
        //   ? "animate-open-sidebar"
        //   : expand == false && "animate-close-sidebar"
      )}
    >
      <div
        className={cn(
          "flex justify-center items-center w-full",
          expand && "justify-between"
        )}
      >
        {expand ? <Banner /> : null}

        <Menu
          className="cursor-pointer animate-fade-in delay-300 fill-mode-forwards"
          onClick={onExpand}
        />
      </div>

      <div className="animate-fade-in delay-300 fill-mode-forwards flex flex-col justify-between items-center h-full pt-10 w-full">
        <div className="flex flex-col w-full">
          <p
            className={cn(
              "text-xs text-gray-500 mb-3 font-semibold",
              !expand && "text-center"
            )}
          >
            MENU
          </p>

          {sidebarMenuItems.map((menu, key) => (
            <MenuItem size={size} {...menu} key={key} current={page} />
          ))}

          <Domains domains={domains} size={size} />
        </div>

        <div className="flex flex-col w-full">
          {expand ? (
            <p
              className={cn(
                "text-xs text-gray-500 mb-3 font-semibold",
                !expand && "text-center"
              )}
            >
              OPTIONS
            </p>
          ) : null}

          <MenuItem
            size={size}
            label="Sign out"
            icon={LogOut}
            onSignOut={onSignOut}
          />

          <MenuItem size={size} label="Mobile App" icon={MonitorSmartphone} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
