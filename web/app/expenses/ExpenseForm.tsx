"use client";

import { useFormState } from "react-dom";

import SubmitButton from "@/components/SubmitButton";
import { initialActionState } from "../actionState";
import { createExpenseAction } from "../actions";
import type { Category } from "@/lib/types";

type ExpenseFormProps = {
  categories: Category[];
};

export default function ExpenseForm({ categories }: ExpenseFormProps) {
  const [state, formAction] = useFormState(
    createExpenseAction,
    initialActionState,
  );

  return (
    <form className="card form" action={formAction}>
      <div className="form-row">
        <label htmlFor="expense-title">Title</label>
        <input id="expense-title" className="input" name="title" required />
      </div>
      <div className="form-row">
        <label htmlFor="expense-amount">Amount</label>
        <input
          id="expense-amount"
          className="input"
          name="amount"
          type="number"
          step="0.01"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="expense-date">Spent at</label>
        <input
          id="expense-date"
          className="input"
          name="spent_at"
          type="date"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="expense-category">Category</label>
        <select id="expense-category" name="category" required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="expense-notes">Notes</label>
        <textarea id="expense-notes" name="notes" />
      </div>
      <SubmitButton label="Add expense" />
      {state.message ? (
        <p className={`form-message ${state.ok ? "ok" : "error"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
