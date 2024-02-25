export const dynamic = "force-dynamic";

import TodoList from "@/modules/todos/components/todo-list";
import { Suspense } from "react";
import Clientloader from "./clientloader";

export default async function Home() {
  return (
    <div>
      <div>Suspense Test</div>
      <Suspense fallback={<Clientloader />}>
        <TodoList />
      </Suspense>
    </div>
  );
}
