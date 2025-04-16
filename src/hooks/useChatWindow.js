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
    setTimeout(() => {
      messageWindowRef.current?.scroll({
        top: messageWindowRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  const fetchChats = async ({ initial = false }) => {
    if (!chatRoom) {
      return;
    }

    try {
      const chatRoomData = await onGetChatMessages(chatRoom);

      const { message: allMessages } = chatRoomData?.[0] || {};

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
    let intervalId;

    fetchChats({ initial: true });

    intervalId = setInterval(() => {
      fetchChats();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [chatRoom]);

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
