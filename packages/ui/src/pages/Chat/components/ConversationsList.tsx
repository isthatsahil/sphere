import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Conversation {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
  initials: string;
  color: string;
}

interface Props {
  conversations: Conversation[];
  onClose: () => void;
}

const ConversationsList = ({ conversations, onClose }: Props) => {
  return (
    <ScrollArea className="flex-1 overflow-y-auto">
      <div className="py-1">
        {conversations.map((conv, index) => (
          <div key={conv.id}>
            <Button
              variant="ghost"
              onClick={onClose}
              className={`w-full h-auto flex items-center gap-3 px-4 py-3 rounded-none justify-start transition-colors hover:bg-[oklch(0.975_0.015_320)] dark:hover:bg-[oklch(0.18_0.04_320)] ${
                conv.id === "1"
                  ? "bg-[oklch(0.97_0.012_320)] dark:bg-[oklch(0.19_0.04_320)]"
                  : ""
              }`}
            >
              <Avatar size="default" className={`w-11 h-11 rounded-full`}>
                <AvatarImage src={conv.initials} />
                <AvatarFallback className={`text-xs font-bold `}>
                  {conv.initials}
                </AvatarFallback>
                <AvatarBadge
                  className={
                    conv.online
                      ? "bg-green-600 dark:bg-green-800"
                      : "bg-gray-400 dark:bg-gray-600"
                  }
                />
              </Avatar>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-sm font-display font-black tracking-tight truncate ${
                      conv.unread > 0 ? "text-foreground" : "text-foreground/75"
                    }`}
                  >
                    {conv.name}
                  </span>
                  <span
                    className={`text-[0.65rem] shrink-0 ${
                      conv.unread > 0
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {conv.time}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <span
                    className={`text-xs truncate ${
                      conv.unread > 0
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {conv.lastMsg}
                  </span>
                  {conv.unread > 0 && (
                    <span className="shrink-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[0.6rem] text-primary-foreground font-bold">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </Button>
            {index < conversations.length - 1 && (
              <Separator className="mx-4 w-auto opacity-50" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConversationsList;
