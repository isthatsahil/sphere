import EmptyContactsDialog from "./EmptyContacts";
import type { IContact } from "@/types/types";
import { getInitials } from "@/utils/utils";
import ListSkeleton from "@/components/ListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ContactResultListPropTypes = {
  filteredList: IContact[];
  isLoading: boolean;
  addNewContacts: (contact: IContact) => void;
};
const ContactResultList = ({
  filteredList,
  isLoading,
  addNewContacts,
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
        return (
          <div
            key={contact.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 transition-colors duration-150 cursor-default"
            onClick={() => addNewContacts(contact)}
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
          </div>
        );
      })}
    </div>
  );
};

export default ContactResultList;
