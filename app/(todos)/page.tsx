import { Todos } from "@/components/todos/TodoList";
import { TodoForm } from "@/components/todos/CreateTodo";
import { Suspense } from "react";
export default async function TodosPage() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <TodoForm />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </>
  );
}
