import React from "react";
import CreateTodo from "@/modules/todos/components/create-todo";
import UpdateTodo from "@/modules/todos/components/update-todo";

const TodoList: React.FC<any> = ({ todos }) => {
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
