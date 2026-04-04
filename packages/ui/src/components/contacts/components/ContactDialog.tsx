import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import ContactResultList from "./ContactResultList";
import { type IContact } from "@/types/types";
import { useSearchContacts } from "@/hooks/useSearchContacts";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useChatStore } from "@/stores/chatStore";
import styles from "./ContactDialog.module.css";

type ContactDialogPropTypes = {
  openNewContactDialog: boolean;
  setOpenNewContactDialog: (openNewContactDialog: boolean) => void;
  onClose: () => void;
};

const ContactDialog = ({
  openNewContactDialog,
  setOpenNewContactDialog,
  onClose,
}: ContactDialogPropTypes) => {
  const { setSelectedChatType, setSelectedChatData } = useChatStore();
  const [inputValue, setInputValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { data, isFetching } = useSearchContacts(query);

  const debouncedSetQuery = useDebouncedCallback(setQuery);

  const searchResults: IContact[] = (data?.contact ?? []).map((u) => ({
    id: String(u.id),
    name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username,
    username: u.username,
    email: u.email,
    avatar: u.avatar || undefined,
  }));

  const isDebouncing = inputValue.trim() !== query.trim();
  const isLoading =
    inputValue.trim().length > 0 && (isDebouncing || isFetching);
  const filtered: IContact[] = isLoading ? [] : searchResults;

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValue(event.target.value);
    debouncedSetQuery(event.target.value);
  };

  const addNewContacts = (contact: IContact) => {
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setOpenNewContactDialog(false);
    onClose();
  };
  return (
    <Dialog open={openNewContactDialog} onOpenChange={setOpenNewContactDialog}>
      <DialogContent
        showCloseButton={false}
        className={styles.dialogContent}
      >
        {/* ── Header ── */}
        <div className={styles.headerSection}>
          <div className="contact-dialog-glow pointer-events-none absolute inset-0" />
          <DialogHeader className="relative">
            <div className={styles.headerRow}>
              <div>
                <DialogTitle className={styles.dialogTitle}>
                  New conversation
                </DialogTitle>
                <DialogDescription className={styles.dialogDescription}>
                  Find someone to start chatting
                </DialogDescription>
              </div>

              <Button
                variant="ghost"
                onClick={() => setOpenNewContactDialog(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </Button>
            </div>
          </DialogHeader>

          {/* Search input */}
          <InputGroup className="relative mt-4">
            <InputGroupInput
              placeholder="Search..."
              value={inputValue}
              onChange={handleSearchInputChange}
              autoFocus
              type="text"
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* ── Results ── */}
        <ScrollArea className="h-70">
          <ContactResultList
            filteredList={filtered}
            isLoading={isLoading}
            addNewContacts={addNewContacts}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
