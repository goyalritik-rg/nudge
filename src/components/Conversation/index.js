"use client";

import LeftMenu from "./LeftMenu";
import Messenger from "./Messenger";
import Header from "../Header";
import { useState } from "react";

const Conversation = () => {
  const [chatRoom, setChatRoom] = useState("");

  return (
    <div className="p-x-4 py-6 mb-10 flex justify-between w-full">
      <LeftMenu chatRoom={chatRoom} setChatRoom={setChatRoom} />

      <div className="flex flex-col w-[53%] border-l-muted border-l ml-[2%]">
        <div className="px-5">
          <Header />
        </div>

        <Messenger chatRoom={chatRoom} />
      </div>
    </div>
  );
};

export default Conversation;
