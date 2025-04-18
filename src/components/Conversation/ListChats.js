import Loader from "@/common/components/Loader";
import { CardDescription } from "../ui/card";
import ChatCard from "./ChatCard";

const ListChats = ({
  loading,
  chatRooms,
  activeTab,
  setChatRoom,
  activeRoom,
}) => {
  if (loading) {
    return (
      <div className="mt-10 flex justify-center items-center w-full">
        <Loader className="size-8" />
      </div>
    );
  }

  if (!chatRooms.length) {
    return (
      <div className="mt-10 flex justify-center items-center w-full">
        <CardDescription>No {activeTab} chats for this domain</CardDescription>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3 overflow-y-auto max-h-[calc(100dvh-250px)] -mr-5 pr-5 chat-window">
      {chatRooms.map((room, index) => {
        const roomData = room.chatRoom?.[0];

        if (!roomData) {
          return null;
        }

        return (
          <ChatCard
            key={`${roomData.id}_${index}`}
            roomData={roomData}
            email={room?.email}
            onClick={() => setChatRoom(roomData.id)}
            activeRoom={activeRoom}
          />
        );
      })}
    </div>
  );
};

export default ListChats;
