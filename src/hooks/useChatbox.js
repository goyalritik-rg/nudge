import { onViewUnReadMessages } from "@/actions/conversation";
import { useChatContext } from "@/context/user-chat-context";
import { getMonthName } from "@/lib/utils";
import { useEffect, useState } from "react";

const useChatbox = (createdAt, roomId) => {
  const { chatRoom } = useChatContext();

  const [messageSentAt, setMessageSentAt] = useState("");
  const [urgent, setUrgent] = useState(false);

  const onSetMessageRecievedDate = () => {
    const dt = new Date(createdAt);
    const current = new Date();
    const currentDate = current.getDate();
    const hr = dt.getHours();
    const min = dt.getMinutes();
    const date = dt.getDate();
    const month = dt.getMonth();
    const difference = currentDate - date;

    if (difference <= 0) {
      setMessageSentAt(`${hr}:${min}${hr > 12 ? "PM" : "AM"}`);

      if (current.getHours() - dt.getHours() < 2) {
        setUrgent(true);
      }
    } else {
      setMessageSentAt(`${date} ${getMonthName(month)}`);
    }
  };

  const onSeenChat = async () => {
    if (chatRoom == roomId && urgent) {
      await onViewUnReadMessages(roomId);
      setUrgent(false);
    }
  };

  useEffect(() => {
    onSeenChat();
  }, [chatRoom]);

  useEffect(() => {
    onSetMessageRecievedDate();
  }, []);

  return { messageSentAt, urgent, onSeenChat };
};

export default useChatbox;
