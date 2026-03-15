import { eq } from "drizzle-orm";
import { db } from "src/config/db.js";
import { refreshTokens, type RefreshTokenType } from "src/db/schema.js";

export const tokenRepository = {
  saveRefreshToken: async (
    userId: number,
    token: string,
    expiresAt: Date,
  ): Promise<void> => {
    await db.insert(refreshTokens).values({ userId, token, expiresAt });
  },

  deleteRefreshToken: async (token: string): Promise<void> => {
    await db.delete(refreshTokens).where(eq(refreshTokens.token, token));
  },

  deleteAllRefreshTokens: async (userId: number): Promise<void> => {
    await db.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
  },

  findRefreshToken: async (
    token: string,
  ): Promise<RefreshTokenType | undefined> => {
    return db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, token))
      .limit(1)
      .then((result) => result[0]);
  },
};
