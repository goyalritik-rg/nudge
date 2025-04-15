"use client";

import Section from "@/common/components/Section";
import { DarkMode, LightMode, SystemMode } from "@/components/Themes";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Theme = () => {
  const { setTheme, theme } = useTheme();

  const [activeTheme, setActiveTheme] = useState("");

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <Section
        label="Interface Theme"
        message="Select or customize your UI theme"
        className="lg:col-span-1"
      />

      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4",
            activeTheme == "system" ? "border-orange-400" : "border-transparent"
          )}
          onClick={() => setTheme("system")}
        >
          <SystemMode />
        </div>

        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            activeTheme == "light" ? "border-orange-400" : "border-transparent"
          )}
          onClick={() => setTheme("light")}
        >
          <LightMode />
        </div>

        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            activeTheme == "dark" ? "border-orange-400" : "border-transparent"
          )}
          onClick={() => setTheme("dark")}
        >
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Theme;
