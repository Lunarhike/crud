import { getTodos } from "@/lib/data";
import TodoList from "@/modules/todos/components/todo-list";

export default async function Home() {
  const todos = await getTodos();

  return <TodoList todos={todos} />;
}
