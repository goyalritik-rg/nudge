"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function Password({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggle = () => setShowPassword((p) => !p);

  const ActiveIcon = showPassword ? IoMdEyeOff : IoMdEye;

  return (
    <div
      className={cn(
        "flex h-9 items-center justify-between rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-[invalid=true]:ring-destructive/20 dark:aria-[invalid=true]:ring-destructive/40 aria-[invalid=true]:border-destructive",
        className
      )}
    >
      <input
        data-slot="input"
        className="outline-none w-[90%] placeholder:text-sm px-2 py-1 rounded-md"
        {...props}
        type={showPassword ? "text" : "password"}
      />

      <ActiveIcon onClick={toggle} className="size-5 cursor-pointer mr-2" />
    </div>
  );
}

export { Password };
