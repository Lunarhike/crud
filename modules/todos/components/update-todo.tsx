"use client";

import React, { useEffect, useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { Button } from "@/modules/ui/button";
import { Input } from "@/modules/ui/input";
import { deleteTodo } from "@/modules/todos/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/modules/todos/components/submit-button";
import { cn } from "@/lib/utils";

type UpdateTodoProps = {
  todo: any;
};

const UpdateTodo: React.FC<UpdateTodoProps> = ({ todo }) => {
  const [removing, setRemoving] = useState(false);
  const [successState, setSuccessState] = useState(false);

  //   const [formState, formAction] = useFormState(updateTodo, {
  //     success: false,
  //     error: null,
  //     todoId: todo.id,
  //   });

  const close = () => {
    setSuccessState(false);
  };

  //   useEffect(() => {
  //     if (formState.success) {
  //       setSuccessState(true);
  //     }
  //   }, [formState]);

  const removeTodo = async () => {
    setRemoving(true);
    await deleteTodo(todo.id);
    setRemoving(false);
  };

  return (
    <>
      <div>
        {/* <div className="flex flex-col">
          <Heading className="text-left text-base-semi">
            {address.first_name} {address.last_name}
          </Heading>
          {address.company && (
            <Text className="txt-compact-small text-ui-fg-base">
              {address.company}
            </Text>
          )}
          <Text className="flex flex-col text-left text-base-regular mt-2">
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span>
              {address.postal_code}, {address.city}
            </span>
            <span>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
        </div> */}
        <div className="flex items-center gap-x-4">
          {/* <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={open}
          >
            <Edit />
            Edit
          </button> */}
          <div>{todo.task}</div>
          <button
            className="text-small-regular text-ui-fg-base flex items-center gap-x-2"
            onClick={removeTodo}
          >
            {removing ? <Loader2 /> : <Trash />}
          </button>
        </div>
      </div>

      {/* <Modal isOpen={state} close={close}>
        <Modal.Title>
          <Heading className="mb-2">Edit address</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                />
              </div>
              <Input
                label="Company"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
              />
              <Input
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
              />
              <Input
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                />
                <Input
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                />
              </div>
              <Input
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
              />
              <Input
                label="Phone"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
              />
            </div>
            {formState.error && (
              <div className="text-rose-500 text-small-regular py-2">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10"
              >
                Cancel
              </Button>
              <SubmitButton>Save</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal> */}
    </>
  );
};

export default UpdateTodo;
