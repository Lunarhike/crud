"use client";

import React, { useEffect, useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { Button } from "@/modules/ui/button";
import { Input } from "@/modules/ui/input";
import { deleteTodo, updateTodo } from "@/modules/todos/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/modules/todos/components/submit-button";
import { cn } from "@/lib/utils";

type UpdateTodoProps = {
  todo: any;
};

const UpdateTodo: React.FC<UpdateTodoProps> = ({ todo }) => {
  const [removing, setRemoving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [successState, setSuccessState] = useState(false);

  const [formState, formAction] = useFormState(updateTodo, {
    success: false,
    error: null,
    todoId: todo.id,
  });

  useEffect(() => {
    if (successState) {
      setIsEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  const removeTodo = async () => {
    setRemoving(true);
    await deleteTodo(todo.id);
    setRemoving(false);
  };

  // t
  return (
    <div>
      <div className="flex items-center gap-x-4">
        {isEditing ? (
          <form action={formAction}>
            <Input
              name="task"
              id="task"
              required
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <SubmitButton>Update</SubmitButton>
          </form>
        ) : (
          <>
            <div>{todo.task}</div>
            <button
              className="text-small-regular text-blue-500"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </>
        )}
        <button
          className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
          onClick={removeTodo}
        >
          {removing ? <Loader2 /> : <Trash />}
        </button>
      </div>
    </div>
  );
};

export default UpdateTodo;
