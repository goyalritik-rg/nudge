"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useConversation from "@/hooks/useConversation";
import { Mail } from "lucide-react";
import DomainSelect from "./DomainSelect";
import { CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { useRouter, useSearchParams } from "next/navigation";
import ListChats from "./ListChats";

const TABS = [
  {
    label: "All Chats",
    value: "all",
    icon: Mail,
  },
  {
    label: "Live Chats",
    value: "live",
    icon: Mail,
  },
];

const LeftMenu = () => {
  const [activeTab, setActiveTab] = useState("all");

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const domainId = searchParams.get("domainId");

  const {
    chatRooms,
    setChatRoom,
    chatRoom: activeRoom,
    selectedDomain,
    setSelectedDomain,
    loading,
  } = useConversation({
    activeTab,
  });

  const onChangeDomain = (val) => {
    replace(`/conversation?domainId=${val}`);
  };

  useEffect(() => {
    setSelectedDomain(domainId);
  }, [domainId]);

  return (
    <div className="w-[45%]">
      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList className="gap-3">
          {TABS.map(({ label, value, icon: Icon }) => {
            return (
              <TabsTrigger key={value} value={value}>
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  {label}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {TABS.map(({ value }) => {
          return (
            <TabsContent key={value} value={value}>
              <div className="mt-6 w-full">
                <DomainSelect
                  setValue={onChangeDomain}
                  value={selectedDomain}
                />

                <ListChats
                  loading={loading}
                  chatRooms={chatRooms}
                  setChatRoom={setChatRoom}
                  activeRoom={activeRoom}
                  activeTab={activeTab}
                />
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default LeftMenu;
