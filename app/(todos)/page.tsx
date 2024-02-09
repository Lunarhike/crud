import { Todos } from "@/components/todos";
import { TodoForm } from "@/components/add-todo";
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
