import { getChatRooms, onGetChatMessages } from "@/actions/conversation";
import { useChatContext } from "@/context/user-chat-context";
import { ConversationSearchSchema } from "@/schemas/conversation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useConversation = ({ activeTab = "" }) => {
  const { control, watch, register } = useForm({
    resolver: zodResolver(ConversationSearchSchema),
    mode: "onChange",
  });

  const { setChatRoom } = useChatContext();

  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const { domain: domainId } = watch();

  useEffect(() => {
    if (!domainId || !activeTab) return;

    let intervalId;

    const fetchRooms = async () => {
      try {
        setLoading(true);

        const rooms = await getChatRooms({ domainId, activeTab });

        if (rooms) {
          setChatRooms(rooms.customer);
        }
      } catch (error) {
        console.log("Error fetching chat rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();

    intervalId = setInterval(() => {
      fetchRooms();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [domainId, activeTab]);

  return {
    control,
    chatRooms,
    loading,
    setChatRoom,
    register,
  };
};

export default useConversation;
