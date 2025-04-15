"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Banner from "../Banner";
import Button from "../Button";

const navLinks = [
  { label: "Home", id: "" },
  { label: "Pricing", id: "projects" },
  { label: "News Room", id: "skills" },
  { label: "Features", id: "contact" },
  { label: "Contact Us", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-[95%] mx-auto py-2 border-b border-b-neutral-950/5">
      <div className="flex items-center justify-between p-2 px-4 md:pr-2">
        <Banner />

        <nav className="lg:flex gap-6 font-normal hidden">
          {navLinks.map((e) => {
            return (
              <div
                role="presentation"
                onClick={() => handleScroll(e.id)}
                key={e.label}
                className="cursor-pointer text-orange"
              >
                {e.label}
              </div>
            );
          })}
        </nav>

        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu md:hidden cursor-pointer"
            onClick={() => setIsOpen((p) => !p)}
          >
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              className={cn(
                "origin-left transition",
                isOpen && "rotate-45 -translate-y-1"
              )}
            />
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              className={cn("transition", isOpen && "opacity-0")}
            />
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              className={cn(
                "origin-left transition",
                isOpen && "-rotate-45 translate-y-1"
              )}
            />
          </svg>

          <div className="flex items-center gap-2">
            <Button type="primary">Free Trail</Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: "auto" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col items-center py-4 gap-4">
              {navLinks.map((e) => {
                return (
                  <div
                    role="presentation"
                    onClick={() => handleScroll(e.id)}
                    key={e.label}
                    className="cursor-pointer"
                  >
                    {e.label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
