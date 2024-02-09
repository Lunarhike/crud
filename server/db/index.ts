import { pgTable, text, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const db = drizzle(postgres(process.env.POSTGRES_URL as string));

export const todosTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: text("task").notNull(),
  completed: boolean("completed").notNull().default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});
