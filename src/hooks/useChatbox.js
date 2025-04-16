import { useEffect, useState } from "react";
import { onViewUnReadMessages } from "@/actions/conversation";
import { useChatContext } from "@/context/user-chat-context";
import { getMonthName } from "@/lib/utils";

const useChatbox = (createdAt, roomId) => {
  const { chatRoom } = useChatContext();

  const [messageSentAt, setMessageSentAt] = useState("");
  const [urgent, setUrgent] = useState(false);

  useEffect(() => {
    if (!createdAt) return;

    const messageDate = new Date(createdAt);

    const now = new Date();

    const isToday =
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear();

    if (isToday) {
      // Format time to hh:mm AM/PM
      const timeString = messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessageSentAt(timeString);

      const hoursAgo = (now - messageDate) / (1000 * 60 * 60); // hours
      if (hoursAgo < 2) {
        setUrgent(true);
      }
    } else {
      setMessageSentAt(
        `${messageDate.getDate()} ${
          getMonthName(messageDate.getMonth())?.short_label
        } ${messageDate.getFullYear()}`
      );
    }
  }, [createdAt]);

  useEffect(() => {
    const markSeen = async () => {
      if (chatRoom === roomId && urgent && roomId) {
        try {
          await onViewUnReadMessages(roomId);
          setUrgent(false);
        } catch (err) {
          console.error("Failed to mark as seen:", err);
        }
      }
    };

    markSeen();
  }, [chatRoom, urgent, roomId]);

  return { messageSentAt, urgent };
};

export default useChatbox;
