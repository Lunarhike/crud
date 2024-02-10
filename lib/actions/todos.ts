"use server";

import z from "zod";
import { db, todosTable } from "@/server/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const TodoFormSchema = z.object({
  task: z.string().min(1, { message: "Task is required" }),
});

export type State = {
  errors?: {
    task?: string[];
  };
  message?: string | null;
};
export async function createTodo(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = TodoFormSchema.safeParse({
    task: formData.get("task"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Todo.",
    };
  }

  const { task } = validatedFields.data;

  try {
    await db.insert(todosTable).values({
      task: task,
    });
    revalidatePath(`/`);
    return {
      message: "Todo created successfully.",
    };
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Todo.",
    };
  }
}

export async function deleteTodo(id: string): Promise<State> {
  try {
    await db.delete(todosTable).where(eq(todosTable.id, id as any));
    revalidatePath(`/`);
    return { message: "Deleted Todo" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Todo." };
  }
}
