import { db, todosTable } from "@/server/db";
import { desc, eq } from "drizzle-orm";
import { DeleteTodo } from "./DeleteTodo";
import { revalidatePath } from "next/cache";

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

export async function Todos() {
  const todos = await getTodos();

  const now = Date.now();
  return todos.length ? (
    <div>
      <ul className="space-y-2">
        {todos.map((todo, n) => {
          return (
            <>
              <li key={todo.id} className="flex gap-2">
                <div>{todo.task}</div>
                <DeleteTodo id={todo.id} />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>No todos to show</div>
  );
}
