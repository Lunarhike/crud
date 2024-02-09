"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function TodosPage() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: { task: string }) => {
      return fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
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
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          <button
            onClick={() => {
              mutation.mutate({ task: "Test" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
      {data.map((todo: any) => (
        <div key={todo.id}>{todo.task}</div>
      ))}
    </>
  );
}
