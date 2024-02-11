import { getTodos } from "@/lib/data";
import TodoList from "@/modules/todos/components/todo-list";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
}
