"use server";

import z from "zod";
import { db, todosTable } from "@/server/db";
import { revalidatePath } from "next/cache";

const TodoActionSchema = z.object({
  task: z.string().min(1),
});

export type TodoActionData = {
  todoId?: string;
  error?:
    | {
        code: "INTERNAL_ERROR";
        message: string;
      }
    | {
        code: "VALIDATION_ERROR";
        fieldErrors: {
          [field: string]: string[];
        };
      }
    | {
        code: "RATE_LIMIT_ERROR";
        message: string;
      };
};

export async function createTodoAction(
  _prevState: any,
  formData: FormData
): Promise<TodoActionData | void> {
  const data = TodoActionSchema.safeParse({
    task: formData.get("task"),
  });

  if (!data.success) {
    return {
      error: {
        code: "VALIDATION_ERROR",
        fieldErrors: data.error.flatten().fieldErrors,
      },
    };
  }

  const tx = db;
  try {
    await db.insert(todosTable).values({
      task: data.data.task,
    });

    revalidatePath(`/`);

    return {
      todoId: "1",
    };
  } catch (err) {
    console.error(err);
    return {
      error: {
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
      },
    };
  }
}
