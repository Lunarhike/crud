"use server";

import { db, todosTable } from "@/server/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createTodo(
  _currentState: Record<string, unknown>,
  formData: FormData
) {
  try {
    await db.insert(todosTable).values({
      task: "test" as string,
    });
    revalidatePath(`/`);
    return {};
  } catch (error: any) {
    return {};
  }
}

export async function deleteTodo(id: any) {
  try {
    await db.delete(todosTable).where(eq(todosTable.id, id));
    revalidatePath(`/`);
    return {};
  } catch (error: any) {
    return {};
  }
}

export async function updateTodo(currentState: any, formData: FormData) {
  const todoId = currentState.todoId as string;

  const task = formData.get("task" as string);

  try {
    await db
      .update(todosTable)
      .set({ task: task as string })
      .where(eq(todosTable.id, todoId as any));
    revalidatePath(`/`);
    return { success: true, error: null, todoId };
  } catch (error: any) {
    return { success: false, error: error.toString(), todoId };
  }
}

// import z from "zod";
// import { db, todosTable } from "@/server/db";
// import { revalidatePath } from "next/cache";

// const TodoFormSchema = z.object({
//   task: z.string().min(1, { message: "Task is required" }),
// });

// export type State = {
//   errors?: {
//     task?: string[];
//   };
//   message?: string | null;
// };
// export async function createTodo(
//   _prevState: State,
//   formData: FormData
// ): Promise<State> {
//   const validatedFields = TodoFormSchema.safeParse({
//     task: formData.get("task"),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Todo.",
//     };
//   }

//   const { task } = validatedFields.data;

//   try {
//     await db.insert(todosTable).values({
//       task: task,
//     });
//     revalidatePath(`/`);
//     return {
//       message: "Todo created successfully.",
//     };
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to Create Todo.",
//     };
//   }
// }
