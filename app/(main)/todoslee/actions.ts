"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const todo = formData.get("todo");

  try {
    await sql`
      INSERT INTO todos (task)
      VALUES (${todo as any})
    `;

    revalidatePath("/");
    return { message: `Added todo ${todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}
