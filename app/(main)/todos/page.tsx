"use client";

import { Button } from "@/modules/ui/button";
import { Input } from "@/modules/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

export default function TodosPage() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newTodo: { task: string }) => {
      return fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedTodo: {
      id: string;
      task: string;
      completed: boolean;
    }) => {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const TodoItem = ({ todo }: { todo: any }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [newTask, setNewTask] = useState(todo.task);
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const deleteMutation = useMutation({
      mutationFn: (id: any) => {
        setIsDeleting(id);
        return fetch("/api/todos", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });

    const handleUpdate = () => {
      updateMutation.mutate({
        id: todo.id,
        task: newTask,
        completed: isCompleted,
      });
      setIsEditing(false);
    };

    const handleDelete = ({ id }: any) => {
      setIsDeleting(true); // Show spinner when delete starts
      deleteMutation.mutate(todo.id, {
        onSettled: () => {
          setIsDeleting(false); // Hide spinner after completion
          queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
      });
    };

    return (
      <div className="flex flex-col items-center space-y-2">
        {/* {isEditing ? (
          <>
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            <Button onClick={handleUpdate}>Save</Button>
          </>
        ) : (
          <div className="mt-4">
            <div>{todo.task}</div>
            <div className="flex space-x-2 py-1"> */}
        {/* <Button onClick={() => setIsEditing(true)}>Edit</Button> */}

        {/* <Button onClick={() => deleteMutation.mutate(todo.id)}>Delete</Button> */}
        <div className="flex items-center gap-x-4">
          <div>{todo.task}</div>
          <Button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={() => {
              setIsDeleting(true),
                deleteMutation.mutate(todo.id),
                setIsDeleting(false);
            }}
            variant="outline"
          >
            {isDeleting === todo.id ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash />
            )}
          </Button>
        </div>
        {/* </div>
          </div>
        )} */}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-2 py-6">
      <>
        {createMutation.isError ? (
          <div>An error occurred: {createMutation.error.message}</div>
        ) : null}

        <Button
          onClick={() => {
            createMutation.mutate({ task: "test" });
          }}
        >
          Add Test Todo
        </Button>
      </>

      {data?.map((todo: any) => (
        <div key={todo.id}>
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
}
