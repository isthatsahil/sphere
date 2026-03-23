import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ContactDialog from "./components/ContactDialog";

type DialogContainerProps = {
  trigger?: (open: () => void) => React.ReactNode;
};

const DialogContainer = ({ trigger }: DialogContainerProps) => {
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
          className="size-8 rounded-full text-primary"
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
        />
      )}
    </>
  );
};

export default DialogContainer;
