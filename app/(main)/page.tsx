export const dynamic = "force-dynamic";

import TodoList from "@/modules/todos/components/todo-list";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <div>Suspense Test</div>
      <Suspense fallback="loading....">
        <TodoList />
      </Suspense>
    </div>
  );
}
