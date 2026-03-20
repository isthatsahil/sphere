import DialogContainer from "@/components/contacts/DialogContainer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EmptyConversationsDrawer = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
      {/* Abstract chat-bubble illustration */}
      <div className="relative w-16 h-14 mb-6" aria-hidden="true">
        {/* Back bubble */}
        <div className="absolute bottom-0 right-0 w-10 h-8 rounded-2xl rounded-br-[3px] bg-[oklch(0.667_0.295_322.15/0.35)]" />
        {/* Mid bubble */}
        <div className="absolute top-2 left-2 w-10 h-8 rounded-2xl rounded-bl-[3px] bg-[oklch(0.591_0.293_322.896/0.5)]" />
        {/* Front bubble */}
        <div className="absolute top-0 left-0 w-9 h-7 rounded-2xl rounded-tl-[3px] bg-primary/70" />
      </div>
      <h3 className="font-display font-black text-base tracking-tight leading-tight text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)] mb-2">
        No conversations yet
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed max-w-50 mb-6">
        Start one and it'll live here. Your people are waiting.
      </p>
      <DialogContainer
        trigger={(open) => (
          <Button
            size="sm"
            onClick={open}
            className="rounded-full gap-1.5 px-4 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="size-3.5" />
            New conversation
          </Button>
        )}
      />
    </div>
  );
};

export default EmptyConversationsDrawer;
