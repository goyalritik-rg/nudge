import { LogOut, Menu, MonitorSmartphone } from "lucide-react";
import { sidebarMenuItems } from "@/config/menu";
import MenuItem from "./MenuItem";
import Domains from "./Domains";

const MinVersion = ({ onShrink, current, onSignOut, domains }) => {
  return (
    <div className="p-3 flex flex-col items-center h-full">
      <span className="animate-fade-in delay-300 fill-mode-forwards cursor-pointer">
        <Menu onClick={onShrink} />
      </span>

      <div className="animate-fade-in delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
        <div className="flex flex-col mt-8">
          {sidebarMenuItems.map((menu, key) => (
            <MenuItem size="min" {...menu} key={key} current={current} />
          ))}

          <Domains min domains={domains} />
        </div>

        <div className="flex flex-col">
          <MenuItem
            size="min"
            label="Sign out"
            icon={LogOut}
            onSignOut={onSignOut}
          />

          <MenuItem size="min" label="Mobile App" icon={MonitorSmartphone} />
        </div>
      </div>
    </div>
  );
};

export default MinVersion;
