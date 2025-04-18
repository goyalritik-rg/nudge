"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const ChatInitialValues = {
  chatRoom: undefined,
  setChatRoom: () => undefined,
  loading: false,
  setLoading: () => undefined,
  realtime: false,
  setRealtime: () => undefined,
};

const chatContext = createContext(ChatInitialValues);

const { Provider } = chatContext;

export const ChatProvider = ({ children }) => {
  const [loading, setLoading] = useState(ChatInitialValues.loading);
  const [chatRoom, setChatRoom] = useState(ChatInitialValues.chatRoom);
  const [realtime, setRealtime] = useState(ChatInitialValues.realtime);

  const pathname = usePathname();

  const page = pathname?.split("/")?.pop();

  useEffect(() => {
    setChatRoom("");
  }, [page]);

  const values = {
    loading,
    setLoading,
    chatRoom,
    setChatRoom,
    realtime,
    setRealtime,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useChatContext = () => {
  const state = useContext(chatContext);

  return state;
};
