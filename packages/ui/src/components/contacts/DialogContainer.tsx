import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ContactDialog from "./components/ContactDialog";
import styles from "./DialogContainer.module.css";

type DialogContainerProps = {
  trigger?: (open: () => void) => React.ReactNode;
  onClose: () => void;
};

const DialogContainer = ({ trigger, onClose }: DialogContainerProps) => {
  const [openNewContactDialog, setOpenNewContactDialog] =
    useState<boolean>(false);
  const openDialog = () => setOpenNewContactDialog(true);
  return (
    <>
      {trigger ? (
        trigger(openDialog)
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={styles.triggerBtn}
          aria-label="New conversation"
          onClick={openDialog}
        >
          <Plus className="size-4" />
        </Button>
      )}
      {openNewContactDialog && (
        <ContactDialog
          openNewContactDialog={openNewContactDialog}
          setOpenNewContactDialog={setOpenNewContactDialog}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default DialogContainer;
