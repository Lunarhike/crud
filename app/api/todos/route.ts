import { db, todosTable } from "@/server/db"; // Import your database setup
import { desc, eq } from "drizzle-orm";

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

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response("Missing todo task", { status: 400 });
  }

  const newTodo = await db.delete(todosTable).where(eq(todosTable.id, id));

  return Response.json(newTodo);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, task, completed } = body;

  if (!id || !task) {
    return new Response("Missing todo id or task", { status: 400 });
  }

  const updatedTodo = await db
    .update(todosTable)
    .set({ task, completed })
    .where(eq(todosTable.id, id))
    .returning({
      id: todosTable.id,
      task: todosTable.task,
      completed: todosTable.completed,
    });

  return Response.json(updatedTodo[0]);
}
