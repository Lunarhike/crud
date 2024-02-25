import TodoList from "@/modules/todos/components/todo-list";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback="loading....">
      <TodoList />
    </Suspense>
  );
}
