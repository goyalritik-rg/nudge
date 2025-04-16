"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import useChatbox from "@/hooks/useChatbox";
import { ShieldAlert, User } from "lucide-react";

const ChatCard = ({ roomData = {}, email = "", onClick = () => {} }) => {
  const { id, message = [] } = roomData || {};

  const { createdAt, seen, message: description } = message?.[0] || {};

  const { messageSentAt, urgent } = useChatbox(createdAt, id);

  return (
    <Card
      onClick={onClick}
      className="rounded-none border-r-0 hover:bg-muted cursor-pointer transition duration-150 ease-in-out"
    >
      <CardContent className="py-4 flex gap-3">
        <Avatar>
          <AvatarFallback className="bg-muted">
            <User />
          </AvatarFallback>
        </Avatar>

        <div className="flex justify-between w-full">
          <div>
            <div className="flex gap-5 items-center">
              <CardDescription className="font-bold leading-none text-gray-600">
                {email}
              </CardDescription>

              {urgent && !seen && <ShieldAlert className="text-yellow-600" />}
            </div>

            <CardDescription>
              {description
                ? description.substring(0, 40) + "..."
                : "This chatroom is empty"}
            </CardDescription>
          </div>

          <div className="w-[100px] flex justify-end">
            <CardDescription className="text-xs">
              {createdAt ? messageSentAt : ""}
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
