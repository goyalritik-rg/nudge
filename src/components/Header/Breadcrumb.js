"use client";

import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();

  const page = pathname.split("/").pop();

  return (
    <div className="flex flex-col ">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">{page}</h2>
      </div>

      <p className="text-gray-500 text-sm mt-1">
        {page == "settings"
          ? "Manage your account settings, preferences and integrations"
          : page == "dashboard"
          ? "A detailed overview of your metrics, usage, customers and more"
          : page == "appointments"
          ? "View and edit all your appointments"
          : page == "email-marketing"
          ? "Send bulk emails to your customers"
          : page == "integration"
          ? "Connect third-party applications into Corinna-AI"
          : "Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to."}
      </p>
    </div>
  );
};

export default BreadCrumb;
