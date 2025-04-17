"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import useChatbox from "@/hooks/useChatbox";
import { cn } from "@/lib/utils";
import { ShieldAlert, User } from "lucide-react";

const ChatCard = ({
  roomData = {},
  email = "",
  onClick = () => {},
  activeRoom = false,
}) => {
  const { id, message = [] } = roomData || {};

  const { createdAt, seen, message: description } = message?.[0] || {};

  const { messageSentAt, urgent } = useChatbox(createdAt, id);

  return (
    <Card
      onClick={onClick}
      className={cn(
        "rounded-lg border hover:bg-muted cursor-pointer transition duration-150 ease-in-out dark:bg-orange-50",
        activeRoom === id && "bg-muted"
      )}
    >
      <CardContent className="py-0 flex gap-3">
        <Avatar>
          <AvatarFallback className="bg-muted">
            <User className="size-8" />
          </AvatarFallback>
        </Avatar>

        <div className="flex justify-between w-full ml-2">
          <div>
            <div className="flex gap-5 items-center">
              <CardDescription className="font-bold leading-none text-gray-600">
                {email || "No Email Given"}
              </CardDescription>

              {urgent && !seen && <ShieldAlert className="text-yellow-600" />}
            </div>

            <CardDescription className="mt-0.5">
              Last Message -{" "}
              {description
                ? `${description.substring(0, 40)}${
                    description?.length < 40 ? "" : "..."
                  }`
                : "This chatroom is empty"}
            </CardDescription>
          </div>

          <div className="w-fit flex justify-end">
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
