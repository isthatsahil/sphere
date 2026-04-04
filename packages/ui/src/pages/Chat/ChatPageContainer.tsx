import { useState } from "react";
import ChatPageHeader from "./components/ChatContactDrawer/ChatPageHeader";
import ChatPageBody from "./components/ChatContactDrawer/ChatPageBody";
import ChatPageFooter from "./components/ChatContactDrawer/ChatPageFooter";
import ConversationsDrawer from "./components/ConversationsDrawer";
import EmptyChatPageBody from "./components/EmptyContactDrawer/EmptyChatPageBody";
import EmptyChatPageHeader from "./components/EmptyContactDrawer/EmptyChatPageHeader";
import { useChatStore } from "@/stores/chatStore";
import styles from "./ChatPageContainer.module.css";

const ChatPageContainer = () => {
  const [showConversations, setShowConversations] = useState(false);
  const { selectedChatType } = useChatStore();

  const openDrawer = () => setShowConversations(true);
  const isEmpty = selectedChatType === null;

  return (
    <div className={styles.root}>
      <ConversationsDrawer
        open={showConversations}
        onClose={() => setShowConversations(false)}
      />
      {isEmpty ? (
        <EmptyChatPageHeader onMenuClick={openDrawer} />
      ) : (
        <ChatPageHeader onMenuClick={openDrawer} />
      )}
      <main className={styles.main}>
        {isEmpty ? (
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
