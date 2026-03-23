import { and, ilike, ne, or } from "drizzle-orm";
import { db } from "src/config/db.js";
import { users, type UserType } from "src/db/schema.js";

export const contactsRepository = {
  searchContacts: async (
    sanitisedTerm: string,
    userId: number,
  ): Promise<UserType[]> => {
    return db
      .select()
      .from(users)
      .where(
        and(
          ne(users.id, userId),
          or(
            ilike(users.firstName, `%${sanitisedTerm}%`),
            ilike(users.lastName, `%${sanitisedTerm}%`),
            ilike(users.email, `%${sanitisedTerm}%`),
            ilike(users.username, `%${sanitisedTerm}%`),
          ),
        ),
      );
  },
};
