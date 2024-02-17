import { db, todos2Table, todosTable } from "@/server/db"; // Import your database setup
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const todos = await db
    .select({
      id: todos2Table.id,
      task: todos2Table.task,
      completed: todos2Table.completed,
    })
    .from(todos2Table)
    .orderBy(desc(todos2Table.created_at));

  return Response.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { task } = body;

  if (!task) {
    return new Response("Missing todo task", { status: 400 });
  }

  const newTodo = await db
    .insert(todos2Table)
    .values({ task, completed: false })
    .returning({
      id: todos2Table.id,
      task: todos2Table.task,
      completed: todos2Table.completed,
    });

  return Response.json(newTodo[0]);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new Response("Missing todo task", { status: 400 });
  }

  const newTodo = await db.delete(todos2Table).where(eq(todos2Table.id, id));

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
