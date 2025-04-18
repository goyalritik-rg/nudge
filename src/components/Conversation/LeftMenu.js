"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useConversation from "@/hooks/useConversation";
import { Mail } from "lucide-react";
import DomainSelect from "./DomainSelect";
import { CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { useRouter, useSearchParams } from "next/navigation";

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

const LeftMenu = ({ domains = [] }) => {
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
  } = useConversation({
    activeTab,
  });

  const onChangeDomain = (val) => {
    replace(`/conversation?domainId=${val}`);
  };

  useEffect(() => {
    setSelectedDomain(domainId);
  }, [domainId]);

  console.log("hello");

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
                  domains={domains}
                  setValue={onChangeDomain}
                  value={selectedDomain}
                />

                <div className="mt-8 flex flex-col gap-3 overflow-y-auto max-h-[calc(100dvh-250px)] -mr-5 pr-5 chat-window">
                  {chatRooms.length ? (
                    chatRooms.map((room, index) => {
                      const roomData = room.chatRoom?.[0];

                      if (!roomData) {
                        return null;
                      }

                      return (
                        <ChatCard
                          key={`${roomData.id}_${index}`}
                          roomData={roomData}
                          email={room?.email}
                          onClick={() => setChatRoom(roomData.id)}
                          activeRoom={activeRoom}
                        />
                      );
                    })
                  ) : (
                    <CardDescription>
                      No {activeTab} chats for this domain
                    </CardDescription>
                  )}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default LeftMenu;
