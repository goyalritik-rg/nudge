import { getChatRooms, onGetChatMessages } from "@/actions/conversation";
import { useChatContext } from "@/context/user-chat-context";
import { useEffect, useState } from "react";

const useConversation = ({ activeTab = "" }) => {
  const { setChatRoom, chatRoom } = useChatContext();

  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");

  useEffect(() => {
    if (!selectedDomain || !activeTab) return;

    let intervalId;

    const fetchRooms = async () => {
      try {
        setLoading(true);

        const rooms = await getChatRooms({
          domainId: selectedDomain,
          activeTab,
        });

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
  }, [selectedDomain, activeTab]);

  return {
    chatRooms,
    loading,
    setChatRoom,
    chatRoom,
    setSelectedDomain,
    selectedDomain,
  };
};

export default useConversation;
