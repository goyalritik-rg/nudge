import {
  createCustomer,
  getChatGPTMessage,
  getChatRoom,
  getMessagesForChatRoom,
  onGetCurrentChatBot,
  onStoreConversations,
  sendEmail,
} from "@/actions/chatbot";
import { postToParent } from "@/lib/utils";
import { ChatBotMessageSchema } from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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

  const [customerID, setCustomerID] = useState("");
  const [firstChat, setFirstChat] = useState({});
  const [chatRoomId, setChatRoomId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

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
      const temp = {
        role: "assistant",
        content: chatbot.chatBot?.welcomeMessage,
      };
      setFirstChat(temp);

      setOnChats([temp]);

      setCurrentBot(chatbot);
      setLoading(false);
    }
  };

  const fetchAllMessages = async ({ initial = false } = {}) => {
    if (!chatRoomId || !botOpened) {
      return;
    }

    try {
      const messagesData = await getMessagesForChatRoom({ chatRoomId });

      if (!messagesData) {
        return;
      }

      const { message: allMessages, live = false } = messagesData;

      setOnRealTime((prev) => ({
        ...prev,
        mode: live,
      }));

      if (allMessages) {
        setOnChats(
          allMessages.map((e) => ({ role: e.role, content: e.message }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSendMessage = handleSubmit(async ({ content: message = "" } = {}) => {
    try {
      if (!message) {
        return;
      }

      setSubmitLoading(true);

      const chatRoomExists = await getChatRoom({ customer_id: customerID });

      if (!chatRoomExists) {
        const newCustomer = await createCustomer({
          domain_id: currentBotId,
          customer_id: customerID,
        });

        const newRoomId = newCustomer?.chatRoomId;

        setChatRoomId(newRoomId);

        await onStoreConversations(
          newRoomId,
          firstChat.content,
          firstChat.role
        );
        await onStoreConversations(newRoomId, message, "user");
        await onStoreConversations(
          newRoomId,
          newCustomer.content,
          newCustomer.role
        );
        fetchAllMessages();
        setSubmitLoading(false);
        reset();
      } else {
        await onStoreConversations(chatRoomExists?.id, message, "user");
        fetchAllMessages();
        setSubmitLoading(false);
        reset();

        if (chatRoomExists.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: chatRoomExists,
            mode: chatRoomExists.live,
          }));

          if (!chatRoomExists.mailed) {
            const emailSent = await sendEmail({
              domain_id: currentBotId,
              customer_id: customerID,
            });

            if (emailSent) {
              console.log("Email Sent");
            }
          }

          return;
        }

        setOnAiTyping(true);

        const gptResponse = await getChatGPTMessage(
          currentBotId,
          customerID,
          onChats,
          message
        );

        if (gptResponse) {
          await onStoreConversations(
            chatRoomExists?.id,
            `${gptResponse.content} ${gptResponse.link || ""}`,
            gptResponse.role
          );

          setOnAiTyping(false);

          fetchAllMessages();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOnAiTyping(false);
      setSubmitLoading(false);
    }
  });

  useEffect(() => {
    onScrollToBottom();
  }, [messageWindowRef, onChats]);

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

  useEffect(() => {
    const localId = localStorage.getItem(
      process.env.NEXT_PUBLIC_CHATBOT_CUSTOMER_KEY
    );

    if (localId) {
      setCustomerID(localId);
      return;
    }

    const newID = uuidv4();
    localStorage.setItem(process.env.NEXT_PUBLIC_CHATBOT_CUSTOMER_KEY, newID);
    setCustomerID(newID);
  }, []);

  useEffect(() => {
    if (!customerID) {
      return;
    }

    const fetchChatRoom = async () => {
      const room = await getChatRoom({ customer_id: customerID });

      if (room) {
        setChatRoomId(room?.id);
      }
    };

    fetchChatRoom();
  }, [customerID]);

  useEffect(() => {
    let intervalId;

    fetchAllMessages();

    intervalId = setInterval(() => {
      fetchAllMessages();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [chatRoomId, botOpened]);

  return {
    botOpened,
    onOpenChatBot,
    onStartChatting: onSendMessage,
    onChats,
    register,
    // onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    setOnChats,
    onRealTime,
    errors,
    control,
    values,
    submitLoading,
    onAiTyping,
  };
};

export default useChatBot;
