"use client";

import ChatBot from "@/common/components/ChatBot";
import useChatBot from "@/hooks/useChatbot";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

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
  } = useChatBot();

  useEffect(() => {
    const target = document.getElementById("chat-bot-container");

    if (target) {
      target.style.setProperty("background-color", "transparent", "important");
    }
  }, []);

  console.log("botOpened", botOpened);

  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4">
      {botOpened && (
        <div
          id="chat-bot-container"
          className="w-[400px] h-[500px] bg-white rounded-xl shadow-xl p-4"
        >
          Hello! I’m a bot.
        </div>
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
