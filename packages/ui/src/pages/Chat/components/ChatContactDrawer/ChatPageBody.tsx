import { useRef } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import styles from "./ChatPageBody.module.css";

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
    <div className={styles.scrollArea}>
      <div className={styles.messageList}>
        {/* Date separator */}
        <div className={styles.dateSeparator}>
          <div className={styles.dateLine} />
          <span className={styles.dateLabel}>
            Today
          </span>
          <div className={styles.dateLine} />
        </div>

        {messages.map((msg, i) => {
          const isMe = msg.from === "me";
          const prevMsg = messages[i - 1];
          const isGrouped = prevMsg?.from === msg.from;

          return (
            <div
              key={msg.id}
              className={`${isMe ? styles.messageRowReverse : styles.messageRow} ${isGrouped ? styles.messageRowGrouped : styles.messageRowUngrouped}`}
            >
              {/* Sender avatar — only for first in a group */}
              {!isMe && (
                <div className={isGrouped ? styles.senderAvatarHidden : styles.senderAvatar}>
                  <span className={styles.senderInitial}>S</span>
                </div>
              )}

              <div className={isMe ? styles.messageSent : styles.messageReceived}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Read receipt */}
        <div className={styles.readReceipt}>
          <span className={styles.readReceiptText}>
            seen · 7:47 PM
          </span>
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatPageBody;
