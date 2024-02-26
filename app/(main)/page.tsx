import TodoList from "@/modules/todos/components/todo-list";
import { Suspense } from "react";
import Clientloader from "./clientloader";

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<Clientloader />}>
        <TodoList />
      </Suspense>
    </div>
  );
}
