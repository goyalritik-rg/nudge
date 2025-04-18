import Separator from "@/common/components/Separator";
import Bubble from "./Bubble";
import { InputController } from "@/common/form/Controllers";
import { SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import Responding from "./Responding";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Loader from "@/common/components/Loader";

const ChatBox = (
  {
    chats = [],
    theme,
    textColor,
    onResponding = false,
    onChat = () => {},
    values = {},
    control = () => {},
    submitLoading = false,
    realtimeMode = {},
    dimensions = {},
  },
  ref
) => {
  const { height } = dimensions || {};

  const lastChat = chats?.[chats?.length - 1];

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onChat();
    }
  };

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

    if (onResponding || submitLoading) {
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
            height: height - 327,
          }}
          className="flex flex-col py-5 gap-3 chat-window overflow-y-auto pb-[85px]"
          ref={ref}
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
            onKeyDown={handleKeyPress}
            control={control}
            name="content"
            disabled={submitLoading}
            placeholder="Type your message..."
            className="focus-visible:ring-0 py-4 focus-visible:ring-offset-0 bg-muted rounded-none outline-none border-none h-16 w-[95%] pl-4 text-sm"
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

export default forwardRef(ChatBox);
