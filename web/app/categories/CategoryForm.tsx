"use client";

import { useFormState } from "react-dom";

import SubmitButton from "@/components/SubmitButton";
import { initialActionState } from "../actionState";
import { createCategoryAction } from "../actions";

export default function CategoryForm() {
  const [state, formAction] = useFormState(
    createCategoryAction,
    initialActionState,
  );

  return (
    <form className="card form" action={formAction}>
      <div className="form-row">
        <label htmlFor="category-name">Category name</label>
        <input id="category-name" className="input" name="name" required />
      </div>
      <SubmitButton label="Add category" />
      {state.message ? (
        <p className={`form-message ${state.ok ? "ok" : "error"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
