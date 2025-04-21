"use client";

import BreadCrumb from "./Breadcrumb";

const Header = () => {
  return (
    <div className="flex w-full justify-between items-center py-1 mb-12">
      <BreadCrumb />
    </div>
  );
};

export default Header;
