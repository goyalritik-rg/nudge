import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  cn,
  extractURLfromString,
  extractUUIDFromString,
  getMonthName,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Bubble = ({ message, createdAt, size = "md", reverseView = false }) => {
  let d = new Date();

  const image = extractUUIDFromString(message.content);

  const generatedLink = extractURLfromString(message.content);

  const link = generatedLink?.[0];

  let content = message?.content || "";

  if (link) {
    content = content.replace(link, "");
  }

  let key = "assistant";

  if (reverseView) {
    key = "user";
  }

  return (
    <div
      className={cn(
        "flex gap-2 items-end",
        message.role == key ? "self-start" : "self-end flex-row-reverse"
      )}
    >
      {message.role == "assistant" ? (
        <Avatar className="w-5 h-5">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-5 h-5">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex flex-col gap-3 min-w-[200px] max-w-[300px] p-4 rounded-t-md",
          message.role == key
            ? "bg-muted rounded-r-md"
            : "bg-orange-50 rounded-l-md dark:bg-orange-500"
        )}
      >
        {createdAt ? (
          <div
            className={cn(
              "flex gap-2 text-xs text-muted-foreground",
              size === "sm" && "text-[10px]"
            )}
          >
            <p>
              {createdAt.getDate()}{" "}
              {getMonthName(createdAt.getMonth())?.short_label}
            </p>

            <p>
              {createdAt.getHours()}:
              {createdAt.getMinutes() > 9
                ? createdAt.getMinutes()
                : `0${createdAt.getMinutes()}`}{" "}
              {createdAt.getHours() > 12 ? "PM" : "AM"}
            </p>
          </div>
        ) : (
          <p
            className={cn(
              "text-xs text-muted-foreground",
              size === "sm" && "text-[10px]"
            )}
          >
            {`${d.getHours()}:${d.getMinutes()} ${
              d.getHours() > 12 ? "pm" : "am"
            }`}
          </p>
        )}

        {image ? (
          <div className="relative aspect-square">
            <Image src={`https://ucarecdn.com/${image[0]}/`} fill alt="image" />
          </div>
        ) : (
          <p className={cn("text-sm", size === "sm" && "text-[12px]")}>
            {content?.replace("(complete)", " ")}

            {link && (
              <Link
                className="underline font-bold pl-2"
                href={link}
                target="_blank"
              >
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Bubble;
