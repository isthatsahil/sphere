import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  passwordHash: text("password_hash").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const refreshTokens = pgTable("refresh_tokens", {
  id: serial("id").primaryKey(),
  // Foreign key → users.id. onDelete: "cascade" means all refresh tokens
  // for a user are automatically deleted when the user is deleted.
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type UserType = typeof users.$inferSelect;
export type RefreshTokenType = typeof refreshTokens.$inferSelect;
