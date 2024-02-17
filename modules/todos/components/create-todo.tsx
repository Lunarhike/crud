"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "@/modules/ui/input";
import { createTodo } from "@/modules/todos/actions";
import { SubmitButton } from "@/modules/todos/components/submit-button";

const CreateTodo = () => {
  const [successState, setSuccessState] = useState(false);
  const [formState, formAction] = useFormState(createTodo, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  return (
    <>
      <form action={formAction}>
        {/* <div className="flex flex-col gap-y-2">
          <Input
            placeholder="Add new todo"
            name="task"
            id="task"
            required
            autoComplete="task"
          />
        </div>
        {formState.error && (
          <div className="text-rose-500 text-small-regular py-2">
            {formState.error}
          </div>
        )} */}

        <div className="flex gap-3 mt-6">
          <SubmitButton>Add Test Todo</SubmitButton>
        </div>
      </form>
    </>
  );
};

export default CreateTodo;
