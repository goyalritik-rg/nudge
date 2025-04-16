import { onGetChatMessages, onOwnerSendMessage } from "@/actions/conversation";
import { useChatContext } from "@/context/user-chat-context";
import { ChatBotMessageSchema } from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useChatWindow = () => {
  const { chats, loading, setChats, chatRoom } = useChatContext();

  const messageWindowRef = useRef(null);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(ChatBotMessageSchema),
    mode: "onChange",
  });

  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const fetchChats = async () => {
    try {
      const allMessages = onGetChatMessages(chatRoom);

      if (allMessages) {
        setChats(allMessages);
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
        fetchChats();
      }

      //   if (message) {
      //     await onRealTimeChat(
      //       chatRoom,
      //       message.message[0].message,
      //       message.message[0].id,
      //       "assistant"
      //     );
      //   }
      reset();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    onScrollToBottom();
  }, [chats, messageWindowRef]);

  useEffect(() => {
    if (!chatRoom) {
      return;
    }

    let intervalId;

    fetchChats();

    intervalId = setInterval(() => {
      fetchRooms();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   if (chatRoom) {
  //     pusherClient.subscribe(chatRoom)
  //     pusherClient.bind('realtime-mode', (data) => {
  //       setChats((prev) => [...prev, data.chat])
  //     })

  //     return () => {
  //       pusherClient.unbind('realtime-mode')
  //       pusherClient.unsubscribe(chatRoom)
  //     }
  //   }
  // }, [chatRoom])

  return {
    messageWindowRef,
    control,
    onHandleSentMessage,
    chats,
    loading,
    chatRoom,
  };
};

export default useChatWindow;
