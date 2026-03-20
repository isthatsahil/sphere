import { useRef, useState } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import { Button } from "@/components/ui/button";
import { Paperclip, SmilePlus, Send, Mic } from "lucide-react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useThemeStore } from "@/stores/themeStore";

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
    <footer className="shrink-0 flex items-end gap-2 px-3 py-3 border-t border-border bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="size-9 rounded-full text-muted-foreground hover:text-foreground shrink-0 mb-0.5"
        aria-label="Attach file"
      >
        <Paperclip className="size-4.5" />
      </Button>

      <div className="flex-1 flex items-end bg-[oklch(0.97_0.012_320)] dark:bg-[oklch(0.19_0.04_320)] rounded-2xl px-4 py-2.5 gap-2 min-h-10.5">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          rows={1}
          className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground max-h-32 leading-relaxed"
        />
        <Button
          variant="ghost"
          size="icon"
          className="size-7 shrink-0 text-muted-foreground hover:text-foreground -mr-1 mb-0.5"
          aria-label="Emoji"
          onClick={() => setEmojiPickerOpen((prev) => !prev)}
        >
          <SmilePlus className="size-4.25" />
        </Button>
        <div className="absolute bottom-20 right-2" ref={emojiRef}>
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
        className={`size-9 rounded-full shrink-0 mb-0.5 transition-all duration-200 ${
          hasText
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-muted text-muted-foreground scale-95"
        }`}
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
