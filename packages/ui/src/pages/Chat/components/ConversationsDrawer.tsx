import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { X, Search } from "lucide-react";
import EmptyConversationsDrawer from "./EmptyContactDrawer/EmptyConversationsList";
import ConversationsList from "./ChatContactDrawer/ConversationsList";
import DialogContainer from "@/components/contacts/DialogContainer";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ProfileDialog from "@/components/profile/ProfileDialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/authStore";
import { cloudinaryUrl, getFullName, getInitials } from "@/utils/utils";
import styles from "./ConversationsDrawer.module.css";

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
          <div className={styles.header}>
            <SheetTitle className={styles.title}>Messages</SheetTitle>
            <SheetDescription className="sr-only">
              Your conversations
            </SheetDescription>
            <div className={styles.headerActions}>
              <DialogContainer onClose={onClose} />
              <Button
                variant="ghost"
                size="icon"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className={styles.searchWrapper}>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <Input
                placeholder="Search conversations..."
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* List */}
          <EmptyConversationsDrawer onClose={onClose} />
          {/* <ConversationsList conversations={conversations} onClose={onClose} /> */}
          <div className={styles.separatorWrapper}>
            <Separator className="w-1/2" />
          </div>
          <div className={styles.profileSection}>
            <Button
              variant={"ghost"}
              onClick={(e) => {
                e.currentTarget.blur();
                setProfileOpen(true);
              }}
              className={styles.profileBtn}
              aria-label="Edit your profile"
            >
              <Avatar className={styles.profileAvatar}>
                <AvatarImage src={cloudinaryUrl(user?.avatar)} alt={fullName} />
                <AvatarFallback className={styles.profileAvatarFallback}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className={styles.profileInfo}>
                <p className={styles.profileName}>{fullName}</p>
                <p className={styles.profileUsername}>@{user?.username}</p>
              </div>
              <span className={styles.profileEditLabel}>Edit</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ConversationsDrawer;
