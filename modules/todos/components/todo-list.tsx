import React from "react";
import CreateTodo from "@/modules/todos/components/create-todo";
import UpdateTodo from "@/modules/todos/components/update-todo";
import { getTodos } from "@/lib/data";

const TodoList: React.FC<any> = async () => {
  const todos = await getTodos();

  return (
    <div className="flex flex-col items-center space-y-2">
      <CreateTodo />
      {todos.map((todo: any) => {
        return <UpdateTodo todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

export default TodoList;
