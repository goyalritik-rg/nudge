import Separator from "@/common/components/Separator";
import Bubble from "./Bubble";
import { InputController } from "@/common/form/Controllers";
import { SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import Responding from "./Responding";
import { cn } from "@/lib/utils";

const ChatBox = ({
  chats = [],
  containerRef,
  theme,
  textColor,
  onResponding = false,
  onChat = () => {},
  values = {},
  control = () => {},
  realtimeMode = {},
}) => {
  const lastChat = chats?.[chats?.length - 1];

  function RenderLoading() {
    if (realtimeMode?.mode && lastChat?.role === "user") {
      return (
        <div>
          <Responding />
          <p className="text-muted-foreground text-xs mt-0.5 ml-8">
            Waiting for reply from an agent
          </p>
        </div>
      );
    }

    if (onResponding) {
      return <Responding />;
    }

    return null;
  }

  return (
    <div className="flex flex-col">
      <Separator orientation="horizontal" />

      <div className="h-full relative">
        <div
          style={{
            background: theme || "",
            color: textColor || "",
          }}
          className="flex h-[450px] flex-col py-5 gap-3 chat-window overflow-y-auto pb-[85px]"
          ref={containerRef}
        >
          {chats?.map((chat, key) => (
            <Bubble
              key={key}
              message={chat}
              createdAt={chat?.createdAt}
              size="sm"
            />
          ))}

          <RenderLoading />
        </div>

        <div className="flex items-center justify-between backdrop-blur-sm bg-muted absolute left-0 right-0 bottom-1 pr-4 -mx-4">
          <InputController
            control={control}
            name="content"
            placeholder="Type your message..."
            className="focus-visible:ring-0 py-4 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none h-18 w-[95%] pl-4 text-sm"
          />

          <SendHorizonal
            onClick={() => {
              if (!values?.content) {
                toast.error("Message cannot be empty");
                return;
              }
              onChat();
            }}
            className={cn("cursor-pointer text-accent-foreground")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
