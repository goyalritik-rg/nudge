import { forwardRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { getDomainName } from "@/lib/utils";
import RealTimeMode from "./RealTimeMode";
import { MessageSquare } from "lucide-react";
import HelpDeskIcon from "@/common/components/Icons/HelpDesk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import HelpDesk from "./HelpDesk";
import ChatBox from "./ChatBox";

const BOT_TABS = [
  {
    label: "Chat",
    value: "chat",
    icon: <MessageSquare />,
    component: ChatBox,
  },
  {
    label: "Helpdesk",
    value: "helpdesk",
    icon: <HelpDeskIcon />,
    component: HelpDesk,
  },
];

const BotWindow = forwardRef(
  (
    {
      control,
      chats,
      onChat,
      onResponding,
      domainName,
      helpdesk,
      realtimeMode,
      setChat,
      textColor,
      theme,
      help,
      values = {},
      submitLoading = false,
    },
    ref
  ) => {
    return (
      <div className="h-[640px] w-[420px] flex flex-col bg-white rounded-xl border-[1px] overflow-hidden relative p-4">
        <div className="flex gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex items-start flex-col ml-2">
            <h3 className="text-lg font-bold leading-none">
              Sales Rep - {getDomainName(domainName)}
            </h3>

            <p className="text-sm">{domainName}</p>

            {realtimeMode?.mode && <RealTimeMode />}
          </div>
        </div>

        <Tabs
          defaultValue="chat"
          className="mt-4 border-t border-t-muted pt-3 w-full"
        >
          <TabsList className="gap-2">
            {BOT_TABS.map(({ label, value, icon }) => {
              return (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex items-center gap-2"
                >
                  {icon}
                  {label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {BOT_TABS.map(({ component: Component, value }) => {
            return (
              <TabsContent key={value} value={value}>
                <div className="mt-3">
                  <Component
                    helpdesk={helpdesk}
                    chats={chats}
                    theme={theme}
                    textColor={textColor}
                    onResponding={onResponding}
                    onChat={onChat}
                    control={control}
                    values={values}
                    realtimeMode={realtimeMode}
                    ref={ref}
                    submitLoading={submitLoading}
                  />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="flex justify-center absolute bottom-0 pb-2 left-0 right-0 -mx-4 bg-white pt-1">
          <p className="text-gray-400 text-xs">Powered By Nudge</p>
        </div>
      </div>
    );
  }
);

export default BotWindow;

BotWindow.displayName = "BotWindow";
