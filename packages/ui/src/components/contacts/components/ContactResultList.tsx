import EmptyContactsDialog from "./EmptyContacts";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import type { IContact } from "@/types/types";
import { getInitials } from "@/utils/utils";
import { Check, UserPlus } from "lucide-react";
import ListSkeleton from "@/components/ListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ContactResultListPropTypes = {
  filteredList: IContact[];
  isLoading: boolean;
  added: Set<string>;
  handleAdd: (id: string) => void;
};
const ContactResultList = ({
  filteredList,
  isLoading,
  added,
  handleAdd,
}: ContactResultListPropTypes) => {
  if (isLoading && filteredList.length === 0)
    return (
      <div className="px-5 py-4 space-y-3">
        <ListSkeleton arrayLength={3} />
      </div>
    );

  if (filteredList.length === 0) return <EmptyContactsDialog />;
  return (
    <div className="px-2 py-2.5">
      {filteredList.map((contact) => {
        const isAdded = added.has(contact.id);
        return (
          <div
            key={contact.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors duration-150"
          >
            {/* Avatar */}
            <Avatar>
              <AvatarImage
                src={contact.avatar}
                alt="user avatar"
                className="grayscale"
              />
              <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
            </Avatar>

            {/* Name & username */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-tight truncate text-foreground">
                {contact.username}
              </p>
              <p className="text-[12px] leading-snug truncate text-muted-foreground">
                {contact.email}
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
