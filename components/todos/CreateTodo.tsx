"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { State, createTodo } from "@/lib/actions/todos";
import { Loader2 } from "lucide-react";
import { useFormStatus, useFormState } from "react-dom";

export function TodoForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTodo, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <ReplyFormFields {...state} />
    </form>
  );
}

function ReplyFormFields({ errors, message }: State) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
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
        {errors?.task &&
          errors.task.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div className="flex gap-2 items-center">
        <Button type="submit" disabled={pending} className="p-0 h-8 px-4">
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Submit
        </Button>
      </div>
    </div>
  );
}
