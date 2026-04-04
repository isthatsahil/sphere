import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { X, Search } from "lucide-react";
import EmptyConversationsDrawer from "./EmptyConversationsList";
import ConversationsList from "./ConversationsList";
import DialogContainer from "@/components/contacts/DialogContainer";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ProfileDialog from "@/components/profile/ProfileDialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
import { cloudinaryUrl, getFullName, getInitials } from "@/utils/utils";

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
  const { user } = useAuthStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const fullName = getFullName(user?.firstName, user?.lastName, user?.username);
  const initials = getInitials(fullName || (user?.username ?? ""));
  return (
    <>
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
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
            <SheetDescription className="sr-only">
              Your conversations
            </SheetDescription>
            <div className="flex items-center gap-1">
              <DialogContainer onClose={onClose} />
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
              <Input
                placeholder="Search conversations..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* List */}
          <EmptyConversationsDrawer onClose={onClose} />
          {/* <ConversationsList conversations={conversations} onClose={onClose} /> */}
          <div className="flex justify-center px-4">
            <Separator className="w-1/2" />
          </div>
          <div className="py-4">
            <Button
              variant={"ghost"}
              onClick={(e) => {
                e.currentTarget.blur();
                setProfileOpen(true);
              }}
              className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-accent/50 transition-colors duration-150 group shrink-0"
              aria-label="Edit your profile"
            >
              <Avatar className="size-9 shrink-0">
                <AvatarImage src={cloudinaryUrl(user?.avatar)} alt={fullName} />
                <AvatarFallback className="text-[0.65rem] font-bold text-white bg-[oklch(0.833_0.145_321.434)]">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm tracking-tight truncate text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)] leading-tight">
                  {fullName}
                </p>
                <p className="text-[0.65rem] text-muted-foreground truncate leading-tight">
                  @{user?.username}
                </p>
              </div>
              <span className="text-[0.65rem] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
                Edit
              </span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ConversationsDrawer;
