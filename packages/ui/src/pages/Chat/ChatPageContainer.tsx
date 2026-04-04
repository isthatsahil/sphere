import { useState } from "react";
import ChatPageHeader from "./components/ChatPageHeader";
import ChatPageBody from "./components/ChatPageBody";
import ChatPageFooter from "./components/ChatPageFooter";
import ConversationsDrawer from "./components/ConversationsDrawer";
import EmptyChatPageBody from "./components/EmptyChatPageBody";
import EmptyChatPageHeader from "./components/EmptyChatPageHeader";
import { useChatStore } from "@/stores/chatStore";

const ChatPageContainer = () => {
  const [showConversations, setShowConversations] = useState(false);
  const { selectedChatType } = useChatStore();

  return (
    <div className="flex flex-col h-dvh bg-background overflow-hidden">
      <ConversationsDrawer
        open={showConversations}
        onClose={() => setShowConversations(false)}
      />
      {selectedChatType === null ? (
        <EmptyChatPageHeader onMenuClick={() => setShowConversations(true)} />
      ) : (
        <ChatPageHeader onMenuClick={() => setShowConversations(true)} />
      )}
      <main className="flex-1 flex flex-col min-h-0">
        {selectedChatType === null ? (
          <EmptyChatPageBody />
        ) : (
          <>
            <ChatPageBody />
            <ChatPageFooter />
          </>
        )}
      </main>
    </div>
  );
};

export default ChatPageContainer;
