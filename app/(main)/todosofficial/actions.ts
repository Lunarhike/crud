"use server";

import { db, todosTable } from "@/server/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    task: z.string().min(1),
  });
  const parse = schema.safeParse({
    task: formData.get("task"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    await sql`
      INSERT INTO todos (task)
      VALUES (${data.task as any})
    `;

    revalidatePath("/todosofficial");
    return { message: `Added todo ${data.task}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    id: z.string().min(1),
    task: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    task: formData.get("task"),
  });

  try {
    await db.delete(todosTable).where(eq(todosTable.id, data.id as any));

    revalidatePath("/todosofficial");
    return { message: `Deleted todo ${data.task}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
