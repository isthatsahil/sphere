import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

const ChatPage = () => {
  const { mutate: logout } = useLogout();
  return (
    <>
      ChatPage
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default ChatPage;
