"use server";

import { db, todosTable } from "@/server/db";
import { desc } from "drizzle-orm";

export async function getTodos() {
  return await db
    .select({
      id: todosTable.id,
      task: todosTable.task,
      completed: todosTable.completed,
    })
    .from(todosTable)
    .orderBy(desc(todosTable.created_at));
}
