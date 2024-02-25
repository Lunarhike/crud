import { getTodos } from "@/lib/data";

export default async function Todos() {
  const todos = await getTodos();

  return todos;
}
