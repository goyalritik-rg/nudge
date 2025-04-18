"use client";

import { InputController } from "@/common/form/Controllers";
import Bubble from "@/components/Chatbot/Bubble";
import useChatWindow from "@/hooks/useChatWindow";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";

const Messenger = () => {
  const {
    messageWindowRef,
    chats,
    chatRoom,
    onHandleSentMessage,
    control,
    realtime: isRealTime = false,
  } = useChatWindow();

  const disabled = !chatRoom || !isRealTime;

  let placeholder = "Type your message...";

  if (!isRealTime) {
    placeholder = "Enable Realtime Mode to start sending messages";
  }

  if (!chatRoom) {
    placeholder = "Select any chat to send message";
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onHandleSentMessage();
    }
  };

  return (
    <div className="flex flex-col relative w-full h-full -mt-5">
      <div className="flex flex-col">
        <div
          ref={messageWindowRef}
          className="w-full h-[65dvh] flex flex-col gap-3 p-5 chat-window overflow-y-auto"
        >
          {chats.length ? (
            chats.map((chat) => (
              <Bubble
                key={chat.id}
                message={{
                  role: chat.role,
                  content: chat.message,
                }}
                createdAt={chat.createdAt}
                reverseView
              />
            ))
          ) : (
            <div>No Messages Found</div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between backdrop-blur-sm bg-muted absolute -bottom-16 w-full pr-10">
        <InputController
          onKeyDown={handleKeyPress}
          control={control}
          name="content"
          disabled={disabled}
          placeholder={placeholder}
          className="focus-visible:ring-0 py-4 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none h-20 w-[95%] pl-4"
        />

        <SendHorizonal
          onClick={() => {
            if (disabled) {
              return;
            }
            onHandleSentMessage();
          }}
          className={cn(
            "cursor-pointer text-accent-foreground",
            disabled && "cursor-not-allowed text-muted-foreground"
          )}
        />
      </div>
    </div>
  );
};

export default Messenger;
