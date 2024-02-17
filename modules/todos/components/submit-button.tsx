"use client";

import { Button } from "@/modules/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: any }) {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} className="" type="submit" variant="default">
      {children}
    </Button>
  );
}
