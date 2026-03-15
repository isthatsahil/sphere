import { eq, or } from "drizzle-orm";
import { db } from "src/config/db.js";
import { users, type UserType } from "src/db/schema.js";

export const loginRepository = {
  findByIdentifier: async (
    identifier: string,
  ): Promise<UserType | undefined> => {
    return db
      .select()
      .from(users)
      .where(or(eq(users.email, identifier), eq(users.username, identifier)))
      .limit(1)
      .then((result) => result[0]);
  },
};
