"use client";

import { useFormState } from "react-dom";

import SubmitButton from "@/components/SubmitButton";
import { initialActionState } from "../actionState";
import { createItemAction } from "../actions";

export default function NewItemForm() {
  const [state, formAction] = useFormState(
    createItemAction,
    initialActionState,
  );

  return (
    <form className="card form" action={formAction}>
      <div className="form-row">
        <label htmlFor="item-name">Item name</label>
        <input id="item-name" className="input" name="name" required />
      </div>
      <div className="form-row">
        <label htmlFor="item-description">Description</label>
        <textarea id="item-description" name="description" />
      </div>
      <SubmitButton label="Add item" />
      {state.message ? (
        <p className={`form-message ${state.ok ? "ok" : "error"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
