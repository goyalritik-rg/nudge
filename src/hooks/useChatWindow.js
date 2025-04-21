import {
  onGetChatMessages,
  onOwnerSendMessage,
  onToggleRealtime,
} from "@/actions/conversation";
import { ChatBotMessageSchema } from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChatWindow = ({ chatRoom = "" }) => {
  const [chats, setChats] = useState([]);
  const [isRealtime, setIsRealtime] = useState(false);

  const messageWindowRef = useRef(null);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(ChatBotMessageSchema),
    mode: "onChange",
  });

  const onScrollToBottom = () => {
    setTimeout(() => {
      messageWindowRef.current?.scroll({
        top: messageWindowRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  const fetchChats = async ({ initial = false } = {}) => {
    if (!chatRoom) {
      return;
    }

    try {
      const chatRoomData = await onGetChatMessages(chatRoom);

      const { message: allMessages, live = false } = chatRoomData?.[0] || {};

      setIsRealtime(live);

      if (allMessages) {
        setChats(allMessages);

        if (initial) {
          onScrollToBottom();
        }
      } else {
        toast.error("Something went wrong!");
        setChats([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleSentMessage = handleSubmit(async (values) => {
    try {
      const message = await onOwnerSendMessage(
        chatRoom,
        values.content,
        "assistant"
      );

      if (message) {
        await fetchChats();
        onScrollToBottom();
      }

      reset();
    } catch (error) {
      console.log(error);
    }
  });

  const handleToggleRealtime = async (status) => {
    try {
      const room = await onToggleRealtime(chatRoom, status);

      if (room) {
        setIsRealtime(status);
        toast.success(room.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let intervalId;

    fetchChats({ initial: true });

    intervalId = setInterval(() => {
      fetchChats();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [chatRoom]);

  return {
    messageWindowRef,
    control,
    onHandleSentMessage,
    chats,
    chatRoom,
    isRealtime,
    handleToggleRealtime,
  };
};

export default useChatWindow;
