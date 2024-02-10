"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  const deleteMutation = useMutation({
    mutationFn: (id: any) => {
      return fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {createMutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {createMutation.isError ? (
            <div>An error occurred: {createMutation.error.message}</div>
          ) : null}

          <button
            onClick={() => {
              createMutation.mutate({ task: "Test" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
      {data.map((todo: any) => (
        <div key={todo.id}>
          <div>{todo.task}</div>
          <button onClick={() => deleteMutation.mutate(todo.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
