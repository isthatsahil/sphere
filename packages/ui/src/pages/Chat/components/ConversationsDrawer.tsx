import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { X, Search } from "lucide-react";
import EmptyConversationsDrawer from "./EmptyConversationsList";
import ConversationsList from "./ConversationsList";
import DialogContainer from "@/components/contacts/DialogContainer";

const conversations = [
  {
    id: "1",
    name: "Sarah Chen",
    lastMsg: "perfect ✨",
    time: "7:47 PM",
    unread: 1,
    online: true,
    initials: "SC",
    color: "bg-[oklch(0.833_0.145_321.434)]",
  },
  {
    id: "2",
    name: "Marcus & Jay",
    lastMsg: "you: lol exactly",
    time: "2:30 PM",
    unread: 0,
    online: false,
    initials: "MJ",
    color: "bg-[oklch(0.667_0.295_322.15)]",
  },
  {
    id: "3",
    name: "Mom",
    lastMsg: "call me when you're free 💕",
    time: "Yesterday",
    unread: 2,
    online: false,
    initials: "M",
    color: "bg-[oklch(0.591_0.293_322.896)]",
  },
  {
    id: "4",
    name: "Dev crew 🔥",
    lastMsg: "Raj: shipping tomorrow!",
    time: "Yesterday",
    unread: 0,
    online: true,
    initials: "DC",
    color: "bg-[oklch(0.518_0.253_323.949)]",
  },
  {
    id: "5",
    name: "Alex",
    lastMsg: "see you at the gym 💪",
    time: "Mon",
    unread: 0,
    online: false,
    initials: "A",
    color: "bg-[oklch(0.452_0.211_324.591)]",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const ConversationsDrawer = ({ open, onClose }: Props) => {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-[min(320px,90vw)] p-0 gap-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0">
          <SheetTitle className="font-display font-black text-base tracking-tight text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)]">
            Messages
          </SheetTitle>
          <div className="flex items-center gap-1">
            <DialogContainer />
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2 shrink-0">
          <div className="flex items-center gap-2 bg-[oklch(0.97_0.012_320)] dark:bg-[oklch(0.19_0.04_320)] rounded-xl px-3 h-9">
            <Search className="size-3.5 text-muted-foreground shrink-0" />
            <input
              placeholder="Search conversations..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* List */}
        <EmptyConversationsDrawer />
        {/* <ConversationsList conversations={conversations} onClose={onClose} /> */}
      </SheetContent>
    </Sheet>
  );
};

export default ConversationsDrawer;
