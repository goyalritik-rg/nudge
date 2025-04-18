"use client";

// import BreadCrumb from './bread-crumb'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Headphones, Star, Trash } from "lucide-react";
import BreadCrumb from "./Breadcrumb";

const Header = () => {
  return (
    <div className="flex w-full justify-between items-center py-1 mb-12">
      <BreadCrumb />

      {/* <div className="flex gap-3 items-center">
        <div>
          <div className="rounded-xl flex gap-3 py-3 px-4 text-ghost">
            <Trash />
            <Star></Star>
          </div>
        </div>
        <Avatar>
          <AvatarFallback className="bg-orange text-white">
            <Headphones />
          </AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div> */}
    </div>
  );
};

export default Header;
