import { eq } from "drizzle-orm";
import { db } from "src/config/db.js";
import { users } from "src/db/schema.js";
import type { IUpdateUserPayload } from "src/types/profile.js";

export const profileRepository = {
  updateProfile: async (userId: number, payload: IUpdateUserPayload) => {
    const [updated] = await db
      .update(users)
      .set(payload)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        avatar: users.avatar,
        bio: users.bio,
        createdAt: users.createdAt,
      });
    return updated;
  },
};
