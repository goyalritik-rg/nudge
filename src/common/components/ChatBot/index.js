import { BotMessageSquare } from "lucide-react";
import Image from "next/image";

const ChatBot = ({ imageUrl = "" }) => {
  return (
    <div className="rounded-full shadow-lg w-20 h-20 flex items-center justify-center bg-orange-200 dark:bg-orange-400">
      {imageUrl ? (
        <Image src={imageUrl} alt="bot" fill />
      ) : (
        <BotMessageSquare className="size-8" />
      )}
    </div>
  );
};

export default ChatBot;
