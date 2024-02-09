import { Todos } from "@/components/todos";
import { TodoForm } from "@/components/add-todo";
export default async function TodosPage() {
  return (
    <>
      <TodoForm />
      <Todos />
    </>
  );
}
