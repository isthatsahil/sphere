const ConversationsList = ({ conversations, onClose }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={onClose}
          className={`w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[oklch(0.975_0.015_320)] dark:hover:bg-[oklch(0.18_0.04_320)] ${
            conv.id === "1"
              ? "bg-[oklch(0.97_0.012_320)] dark:bg-[oklch(0.19_0.04_320)]"
              : ""
          }`}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center ${conv.color}`}
            >
              <span className="text-xs font-bold text-white">
                {conv.initials}
              </span>
            </div>
            {conv.online && (
              <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
            )}
          </div>

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
                  conv.unread > 0 ? "text-foreground" : "text-muted-foreground"
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
        </button>
      ))}
    </div>
  );
};

export default ConversationsList;
