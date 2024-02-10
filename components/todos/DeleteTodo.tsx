"use client";

import { deleteTodo } from "@/lib/actions/todos";

export function DeleteTodo({ id }: { id: string }) {
  return <button onClick={() => deleteTodo(id)}>Delete Todo</button>;
}
