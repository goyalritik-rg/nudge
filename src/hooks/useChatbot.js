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
import { v4 as uuidv4 } from "uuid";

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

  const limitRequest = useRef(0);
  const messageWindowRef = useRef(null);

  const [dimensions, setDimensions] = useState({});
  const [currentBot, setCurrentBot] = useState();
  const [botOpened, setBotOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onChats, setOnChats] = useState([]);
  const [onAiTyping, setOnAiTyping] = useState(false);
  const [initializingChat, setInitializingChat] = useState(false);
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

  const fetchAllMessages = async () => {
    if (!chatRoomId || !botOpened) return;

    try {
      const messagesData = await getMessagesForChatRoom({ chatRoomId });

      if (!messagesData) return;

      const { message: allMessages, live = false } = messagesData;

      setOnRealTime((prev) => ({
        ...prev,
        mode: live,
      }));

      if (allMessages) {
        setOnChats(
          allMessages.map((e) => ({
            role: e.role,
            content: e.message,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSendMessage = handleSubmit(async ({ content: message = "" } = {}) => {
    if (!message) return;

    setSubmitLoading(true);
    setOnChats((prev) => [...prev, { role: "user", content: message }]);
    reset();

    try {
      const chatRoomExists = await getChatRoom({ customer_id: customerID });

      if (!chatRoomExists) {
        setInitializingChat(true);

        const newCustomer = await createCustomer({
          domain_id: currentBotId,
          customer_id: customerID,
        });

        const newRoomId = newCustomer?.chatRoomId;
        setChatRoomId(newRoomId);

        await Promise.all([
          onStoreConversations(newRoomId, firstChat.content, firstChat.role),
          onStoreConversations(newRoomId, message, "user"),
          onStoreConversations(
            newRoomId,
            newCustomer.content,
            newCustomer.role
          ),
        ]);

        reset();
        setInitializingChat(false);
        fetchAllMessages();
        return;
      }

      await onStoreConversations(chatRoomExists.id, message, "user");
      fetchAllMessages();
      reset();

      if (chatRoomExists.live) {
        setOnRealTime({
          chatroom: chatRoomExists,
          mode: chatRoomExists.live,
        });

        if (!chatRoomExists.mailed) {
          const emailSent = await sendEmail({
            domain_id: currentBotId,
            customer_id: customerID,
          });

          if (emailSent) {
            console.log("Email Sent");
          }
        }

        fetchAllMessages();
        reset();
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
        const cleanContent = gptResponse.link
          ? `${gptResponse.content} ${gptResponse.link}`
          : gptResponse.content;

        await onStoreConversations(
          chatRoomExists?.id,
          cleanContent,
          gptResponse.role
        );
      }

      fetchAllMessages();
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
    const { height, width } = dimensions;

    postToParent(
      JSON.stringify({
        width: botOpened ? (width > 440 ? 440 : "90%") : 80,
        height: botOpened ? 0.95 * height : 80,
      })
    );
  }, [botOpened, dimensions]);

  useEffect(() => {
    const handleRawMessage = (e) => {
      const botid = e.data;

      // Handle non-JSON UUID string
      if (limitRequest.current < 1 && typeof botid === "string") {
        // Only proceed if it's not JSON (i.e., not starting with { or [)
        const isProbablyJSON =
          botid.trim().startsWith("{") || botid.trim().startsWith("[");
        if (!isProbablyJSON) {
          onGetDomainChatBot(botid);
          limitRequest.current++;
        }
      }
    };

    const handleJSONMessage = (e) => {
      try {
        if (typeof e.data !== "string") return;

        const trimmed = e.data.trim();
        if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return;

        const data = JSON.parse(trimmed);
        const { type, ...rest } = data || {};

        if (type === "DEVICE_INFO") {
          setDimensions(rest);
        }
      } catch (err) {
        console.log("Error parsing message", err, "Message received:", e.data);
      }
    };

    window.addEventListener("message", handleRawMessage);
    window.addEventListener("message", handleJSONMessage);

    return () => {
      window.removeEventListener("message", handleRawMessage);
      window.removeEventListener("message", handleJSONMessage);
    };
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
    if (!customerID) return;

    const fetchChatRoom = async () => {
      const room = await getChatRoom({ customer_id: customerID });
      if (room) {
        setChatRoomId(room.id);
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
    dimensions,
    initializingChat, // <-- Use this in UI
  };
};

export default useChatBot;
