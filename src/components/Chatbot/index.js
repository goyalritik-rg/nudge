"use client";

import ChatBot from "@/common/components/ChatBot";
import useChatBot from "@/hooks/useChatbot";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import BotWindow from "./Window";

const Chatbot = () => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
    control,
    values = {},
    submitLoading = false,
    dimensions = {},
  } = useChatBot();

  useEffect(() => {
    const target = document.getElementById("chat-bot-container");

    if (target) {
      target.style.setProperty("background-color", "transparent", "important");
    }
  }, []);

  if (!currentBot) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4">
      {botOpened && (
        <BotWindow
          errors={errors}
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpdesk={currentBot?.helpdesk}
          domainName={currentBot?.name}
          ref={messageWindowRef}
          help={currentBot?.chatBot?.helpdesk}
          theme={currentBot?.chatBot?.background}
          textColor={currentBot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
          control={control}
          values={values}
          submitLoading={submitLoading}
          dimensions={dimensions}
        />
      )}

      <div
        onClick={onOpenChatBot}
        className={cn(
          "rounded-full cursor-pointer",
          loading ? "hidden" : "flex"
        )}
      >
        <ChatBot
          imageUrl={
            currentBot?.chatBot?.icon
              ? `https://ucarecdn.com/${currentBot.chatBot.icon}/`
              : ""
          }
        />
      </div>
    </div>
  );
};

export default Chatbot;
