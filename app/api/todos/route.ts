import { db, todosTable } from "@/server/db"; // Import your database setup
import { desc } from "drizzle-orm";

export async function GET() {
  const todos = await db
    .select({
      id: todosTable.id,
      task: todosTable.task,
      completed: todosTable.completed,
    })
    .from(todosTable)
    .orderBy(desc(todosTable.created_at));

  return Response.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { task } = body;
  console.log(task);

  if (!task) {
    return new Response("Missing todo task", { status: 400 });
  }

  const newTodo = await db
    .insert(todosTable)
    .values({ task, completed: false })
    .returning({
      id: todosTable.id,
      task: todosTable.task,
      completed: todosTable.completed,
    });

  return Response.json(newTodo[0]);
}
