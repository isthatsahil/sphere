import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import ContactResultList from "./ContactResultList";
import { type IContact } from "@/types/types";

// Mock data — replace with real API results
const SUGGESTED_CONTACTS: IContact[] = [
  { id: "1", name: "Aria Chen", username: "@aria.chen" },
  { id: "2", name: "Marco Rossi", username: "@m.rossi" },
  { id: "3", name: "Priya Sharma", username: "@priya_s" },
  { id: "4", name: "Leon Dubois", username: "@leondubois" },
  { id: "5", name: "Sakura Yamamoto", username: "@sakuray" },
  { id: "6", name: "Eli Johansson", username: "@eli.j" },
  { id: "7", name: "Nadia Malik", username: "@nadiamalik" },
];

type ContactDialogPropTypes = {
  openNewContactDialog: boolean;
  setOpenNewContactDialog: (openNewContactDialog: boolean) => void;
};

const ContactDialog = ({
  openNewContactDialog,
  setOpenNewContactDialog,
}: ContactDialogPropTypes) => {
  const [query, setQuery] = useState("");
  const [added, setAdded] = useState<Set<string>>(new Set());

  const filtered: IContact[] = SUGGESTED_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.username.toLowerCase().includes(query.toLowerCase()),
  );

  const handleAdd = (id: string) => {
    setAdded((prev) => new Set([...prev, id]));
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) setQuery("");
    setOpenNewContactDialog(open);
  };

  return (
    <Dialog open={openNewContactDialog} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="p-0 gap-0 max-w-sm overflow-hidden rounded-2xl border-0 ring-1 ring-foreground/8 shadow-2xl"
      >
        {/* ── Header ── */}
        <div className="relative px-5 pt-5 pb-4 border-b border-border">
          <div className="contact-dialog-glow pointer-events-none absolute inset-0" />
          <DialogHeader className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DialogTitle className="font-display text-[1.15rem] font-bold tracking-tight leading-tight">
                  New conversation
                </DialogTitle>
                <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">
                  Find someone to start chatting
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                className="shrink-0 mt-0.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors duration-150"
              >
                Cancel
              </Button>
            </div>
          </DialogHeader>

          {/* Search input */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Name or username…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className={cn(
                "w-full pl-9 pr-4 py-2.5 text-sm rounded-xl",
                "bg-muted/70 border border-transparent",
                "placeholder:text-muted-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/30 focus:bg-background",
                "transition-all duration-200",
              )}
            />
          </div>
        </div>

        {/* ── Results ── */}
        <ScrollArea className="h-70">
          <ContactResultList
            filteredList={filtered}
            added={added}
            handleAdd={handleAdd}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
