"use client";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import { useChatContext } from "@/context/user-chat-context";
import {
  onGetConversationMode,
  onToggleRealtime,
} from "@/actions/conversation";

const useSidebar = () => {
  const pathname = usePathname();

  const [expand, setExpand] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { chatRoom, realtime, setRealtime } = useChatContext();

  const getRealtime = async () => {
    try {
      setLoading(true);

      const mode = await onGetConversationMode(chatRoom);

      if (mode) {
        setRealtime(mode?.live);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRealtime = async (newValue) => {
    try {
      setLoading(true);

      await onToggleRealtime(chatRoom, newValue);
      toast.success(
        newValue ? "RealTime mode enabled" : "RealTime mode disabled"
      );
      await getRealtime();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      getRealtime();
    }
  }, [chatRoom]);

  const page = pathname.split("/").pop();

  const { signOut } = useClerk();

  const onSignOut = async () => {
    await signOut();
    redirect("/");
  };

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActivateRealtime: updateRealtime,
    chatRoom,
    loading,
  };
};

export default useSidebar;
