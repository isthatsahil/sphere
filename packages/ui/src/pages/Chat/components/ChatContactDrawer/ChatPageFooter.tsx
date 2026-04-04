import { useRef, useState } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import { Button } from "@/components/ui/button";
import { Paperclip, SmilePlus, Send, Mic } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./ChatPageFooter.module.css";

const ChatPageFooter = () => {
  const [message, setMessage] = useState("");
  const hasText = message.trim().length > 0;
  const { theme } = useThemeStore();
  const emojiRef = useRef<HTMLDivElement>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (hasText) setMessage("");
    }
  };

  const handleEmoji = (emoji: { emoji: string }) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  useMountEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <footer className={styles.footer}>
      <Button
        variant="ghost"
        size="icon"
        className={styles.attachBtn}
        aria-label="Attach file"
      >
        <Paperclip className="size-4.5" />
      </Button>

      <div className={styles.inputWrapper}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          rows={1}
          className={styles.textarea}
        />
        <Button
          variant="ghost"
          size="icon"
          className={styles.emojiBtn}
          aria-label="Emoji"
          onClick={() => setEmojiPickerOpen((prev) => !prev)}
        >
          <SmilePlus className="size-4.25" />
        </Button>
        <div className={styles.emojiPicker} ref={emojiRef}>
          <EmojiPicker
            open={emojiPickerOpen}
            onEmojiClick={handleEmoji}
            autoFocusSearch={false}
            theme={theme === Theme.LIGHT ? Theme.LIGHT : Theme.DARK}
          />
        </div>
      </div>

      <Button
        size="icon"
        className={`${styles.sendBtn} ${hasText ? styles.sendBtnActive : styles.sendBtnInactive}`}
        aria-label={hasText ? "Send message" : "Voice message"}
        onClick={() => hasText && setMessage("")}
      >
        {hasText ? (
          <Send className="size-4.25" />
        ) : (
          <Mic className="size-4.25" />
        )}
      </Button>
    </footer>
  );
};

export default ChatPageFooter;
