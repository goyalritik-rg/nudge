import { LogOut, Menu, MonitorSmartphone } from "lucide-react";
import Image from "next/image";
import Domains from "./Domains";
import { sidebarMenuItems } from "@/config/menu";
import MenuItem from "./MenuItem";

const MaxVersion = ({ current, domains, onExpand, onSignOut }) => {
  return (
    <div className="py-3 px-4 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          className="animate-fade-in delay-300 fill-mode-forwards"
          style={{
            width: "50%",
            height: "auto",
          }}
          width={0}
          height={0}
        />

        <Menu
          className="cursor-pointer animate-fade-in delay-300 fill-mode-forwards"
          onClick={onExpand}
        />
      </div>

      <div className="animate-fade-in delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3 font-semibold">MENU</p>

          {sidebarMenuItems.map((menu, key) => (
            <MenuItem size="max" {...menu} key={key} current={current} />
          ))}

          <Domains domains={domains} />
        </div>

        <div className="flex flex-col">
          <p className="text-xs text-gray-500 mb-3 font-semibold">OPTIONS</p>

          <MenuItem
            size="max"
            label="Sign out"
            icon={LogOut}
            onSignOut={onSignOut}
          />

          <MenuItem size="max" label="Mobile App" icon={MonitorSmartphone} />
        </div>
      </div>
    </div>
  );
};

export default MaxVersion;
