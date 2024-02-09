"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createTodoAction, type TodoActionData } from "../lib/actions";
import { Loader2 } from "lucide-react";
import { useFormStatus, useFormState } from "react-dom";

export function TodoForm() {
  const [state, formAction] = useFormState(createTodoAction, {});

  return (
    <form action={formAction}>
      <TodoFormFields {...state} />
    </form>
  );
}

function TodoFormFields({ error }: TodoActionData) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name="todoId" />

      <div className="flex flex-col gap-1">
        <Textarea
          name="task"
          className="w-full text-base bg-white"
          placeholder="Add new todo"
          rows={4}
          onKeyDown={(e) => {
            if (
              (e.ctrlKey || e.metaKey) &&
              (e.key === "Enter" || e.key === "NumpadEnter")
            ) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        {!pending &&
        error &&
        "fieldErrors" in error &&
        error.fieldErrors.task != null ? (
          <div className="text-red-500 text-sm">{error.fieldErrors.task}</div>
        ) : null}
      </div>

      <div className="flex gap-2 items-center">
        <Button disabled={pending} className="p-0 h-8 px-4">
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
        {error && "message" in error && (
          <span className="text-red-500 text-sm">{error.message}</span>
        )}
      </div>
    </div>
  );
}
