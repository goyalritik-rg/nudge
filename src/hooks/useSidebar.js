"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { useChatContext } from "@/context/user-chat-context";
import {
  onGetConversationMode,
  onToggleRealtime,
} from "@/actions/conversation";

const useSidebar = () => {
  const router = useRouter();

  const pathname = usePathname();

  const [expand, setExpand] = useState(undefined);
  const [realtime, setRealtime] = useState(false);
  const [loading, setLoading] = useState(false);

  const { chatRoom } = useChatContext();

  const onActivateRealtime = async (e) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom,
        e.target.ariaChecked == "true" ? false : true
      );

      if (realtime) {
        setRealtime(realtime.chatRoom.live);

        toast.success(realtime.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);

    const mode = await onGetConversationMode(chatRoom);

    if (mode) {
      setRealtime(mode.live);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode();
    }
  }, [chatRoom]);

  const page = pathname.split("/").pop();

  const { signOut } = useClerk();

  const onSignOut = () => signOut(() => router.push("/"));

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActivateRealtime,
    chatRoom,
    loading,
  };
};

export default useSidebar;
