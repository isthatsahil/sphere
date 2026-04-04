import EmptyContactsDialog from "./EmptyContacts";
import type { IContact } from "@/types/types";
import { getInitials } from "@/utils/utils";
import ListSkeleton from "@/components/ListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "./ContactResultList.module.css";

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
      <div className={styles.loadingWrapper}>
        <ListSkeleton arrayLength={3} />
      </div>
    );

  if (filteredList.length === 0) return <EmptyContactsDialog />;
  return (
    <div className={styles.list}>
      {filteredList.map((contact) => {
        return (
          <div
            key={contact.id}
            className={styles.item}
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
            <div className={styles.info}>
              <p className={styles.username}>
                {contact.username}
              </p>
              <p className={styles.email}>
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
