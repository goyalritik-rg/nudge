"use client";

import { cn } from "@/lib/utils";
import Banner from "@/common/components/Banner";
import { LogOut, Menu } from "lucide-react";
import MenuItem from "./MenuItem";
import Domains from "./Domains";
import { sidebarMenuItems } from "@/config/menu";
import Modal from "@/common/components/Modal";
import Button from "@/common/components/Button";
import { useState } from "react";
import { useDashboardContext } from "@/context/dashboard-context";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [expand, setExpand] = useState(false);

  const { handleLogout } = useDashboardContext();

  const pathname = usePathname();

  const page = pathname.split("/").pop();

  const handleToggle = () => setExpand((p) => !p);

  const size = expand ? "max" : "min";

  return (
    <div
      className={cn(
        "bg-orange-50 dark:bg-black h-full w-[75px] fill-mode-forwards p-3 flex flex-col items-center justify-center rounded-2xl",
        expand && "min-w-[260px]"
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
          onClick={handleToggle}
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

          <Domains size={size} />
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

          <Modal>
            <Modal.Trigger>
              <div
                className={cn(
                  "cursor-pointer flex items-center gap-2 py-2 pl-2 my-1 text-gray-500",
                  size === "min" && "self-center pl-0"
                )}
              >
                <LogOut />

                {size === "max" ? (
                  <span className="text-sm hover:text-foreground">
                    Sign Out
                  </span>
                ) : null}
              </div>
            </Modal.Trigger>

            <Modal.Content>
              <Modal.Header title="Log Out" />

              <Modal.Body className="mt-0 mb-4">
                <p className="text-foreground/80">
                  Are you sure you want to Logout!
                </p>
              </Modal.Body>

              <Modal.Footer className="flex justify-end items-center gap-2">
                <Button onClick={handleLogout} className="font-normal">
                  Proceed
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>

          {/* <MenuItem size={size} label="Mobile App" icon={MonitorSmartphone} /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
