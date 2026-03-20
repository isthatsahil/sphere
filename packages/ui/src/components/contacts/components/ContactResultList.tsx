import EmptyContactsDialog from "./EmptyContacts";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import type { IContact } from "@/types/types";
import { getInitials } from "@/utils/utils";
import { Check, UserPlus } from "lucide-react";

type ContactResultListPropTypes = {
  filteredList: IContact[];
  added: Set<string>;
  handleAdd: (id: string) => void;
};
const ContactResultList = ({
  filteredList,
  added,
  handleAdd,
}: ContactResultListPropTypes) => {
  if (filteredList.length === 0) return <EmptyContactsDialog />;
  return (
    <div className="px-2 py-2.5">
      {filteredList.map((contact, i) => {
        const isAdded = added.has(contact.id);
        return (
          <div
            key={contact.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors duration-150"
          >
            {/* Avatar */}
            <div
              className={cn(
                `contact-avatar-${i % 4}`,
                "size-9 rounded-full shrink-0 flex items-center justify-center",
              )}
            >
              <span className="text-[11px] font-bold leading-none tracking-wide text-white/90">
                {getInitials(contact.name)}
              </span>
            </div>

            {/* Name & username */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight truncate text-foreground">
                {contact.name}
              </p>
              <p className="text-[12px] leading-snug truncate text-muted-foreground">
                {contact.username}
              </p>
            </div>

            {/* Add button */}
            <Button
              variant="ghost"
              onClick={() => !isAdded && handleAdd(contact.id)}
              disabled={isAdded}
              className={cn(
                "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                "text-[12px] font-semibold transition-all duration-200",
                isAdded
                  ? "bg-primary/10 text-primary cursor-default"
                  : "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.96]",
              )}
            >
              {isAdded ? (
                <>
                  <Check className="size-3" />
                  Added
                </>
              ) : (
                <>
                  <UserPlus className="size-3" />
                  Add
                </>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ContactResultList;
