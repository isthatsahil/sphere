import { useRef } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";

const messages = [
  {
    id: "1",
    text: "hey! are you coming tonight? 🎉",
    from: "them",
    time: "7:42 PM",
  },
  {
    id: "2",
    text: "yes!! wouldn't miss it. what time?",
    from: "me",
    time: "7:44 PM",
  },
  {
    id: "3",
    text: "around 8 works! should I bring anything?",
    from: "them",
    time: "7:45 PM",
  },
  {
    id: "4",
    text: "just yourself 😊 maybe some wine if you want",
    from: "them",
    time: "7:45 PM",
  },
  { id: "5", text: "I'll grab a nice rosé 🍷", from: "me", time: "7:46 PM" },
  { id: "6", text: "perfect ✨", from: "them", time: "7:46 PM" },
  { id: "7", text: "can't wait, see you soon!", from: "them", time: "7:47 PM" },
];

const ChatPageBody = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-1 px-4 py-6">
        {/* Date separator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[0.65rem] text-muted-foreground font-medium uppercase tracking-wider">
            Today
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {messages.map((msg, i) => {
          const isMe = msg.from === "me";
          const prevMsg = messages[i - 1];
          const isGrouped = prevMsg?.from === msg.from;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""} ${isGrouped ? "mt-0.5" : "mt-3"}`}
            >
              {/* Sender avatar — only for first in a group */}
              {!isMe && (
                <div
                  className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center bg-[oklch(0.833_0.145_321.434)] ${isGrouped ? "invisible" : ""}`}
                >
                  <span className="text-[0.6rem] font-bold text-white">S</span>
                </div>
              )}

              <div
                className={`px-4 py-2.5 text-sm leading-relaxed max-w-[72%] wrap-break-word ${
                  isMe
                    ? "bg-primary text-primary-foreground rounded-2xl rounded-br-lg"
                    : "bg-[oklch(0.955_0.018_320)] dark:bg-[oklch(0.21_0.04_320)] text-foreground rounded-2xl rounded-bl-lg"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Read receipt */}
        <div className="flex justify-end mt-1">
          <span className="text-[0.65rem] text-muted-foreground">
            seen · 7:47 PM
          </span>
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatPageBody;
