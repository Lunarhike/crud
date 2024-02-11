"use client";

import { Button } from "@/modules/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit" variant="outline">
      Add Todo
    </Button>
  );
}
