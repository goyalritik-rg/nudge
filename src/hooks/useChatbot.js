import { onAiChatBotAssistant, onGetCurrentChatBot } from "@/actions/chatbot";
import { postToParent } from "@/lib/utils";
import { ChatBotMessageSchema } from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

let limitRequest = 0;

const useChatBot = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register,
    watch,
  } = useForm({
    resolver: zodResolver(ChatBotMessageSchema),
  });

  const values = watch();

  const messageWindowRef = useRef(null);

  const [currentBot, setCurrentBot] = useState();
  const [botOpened, setBotOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onChats, setOnChats] = useState([]);
  const [onAiTyping, setOnAiTyping] = useState(false);
  const [currentBotId, setCurrentBotId] = useState();
  const [onRealTime, setOnRealTime] = useState(undefined);

  const onOpenChatBot = () => setBotOpened((prev) => !prev);

  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  const onGetDomainChatBot = async (id) => {
    setCurrentBotId(id);

    const chatbot = await onGetCurrentChatBot(id);

    if (chatbot) {
      setOnChats((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatbot.chatBot?.welcomeMessage,
        },
      ]);

      setCurrentBot(chatbot);
      setLoading(false);
    }
  };

  const onStartChatting = handleSubmit(async (values) => {
    try {
      if (values.content) {
        if (!onRealTime?.mode) {
          setOnChats((prev) => [
            ...prev,
            {
              role: "user",
              content: values.content,
            },
          ]);
        }

        setOnAiTyping(true);

        const response = await onAiChatBotAssistant(
          currentBotId,
          onChats,
          "user",
          values.content
        );

        if (response) {
          setOnAiTyping(false);

          if (response.live) {
            setOnRealTime((prev) => ({
              ...prev,
              chatroom: response.chatRoom,
              mode: response.live,
            }));
          } else {
            setOnChats((prev) => [...prev, response.response]);
          }

          reset();
        } else {
          setOnAiTyping(false);
          toast.error("Something went wrong! Please try again");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOnAiTyping(false);
    }
  });

  useEffect(() => {
    onScrollToBottom();
  }, [onChats, messageWindowRef]);

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: botOpened ? 550 : 80,
        height: botOpened ? 800 : 80,
      })
    );
  }, [botOpened]);

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const botid = e.data;

      if (limitRequest < 1 && typeof botid == "string") {
        onGetDomainChatBot(botid);
        limitRequest++;
      }
    });
  }, []);

  return {
    botOpened,
    onOpenChatBot,
    onStartChatting,
    onChats,
    register,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    setOnChats,
    onRealTime,
    errors,
    control,
    values,
  };
};

export default useChatBot;
