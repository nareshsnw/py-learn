"use server";

import { revalidatePath } from "next/cache";

import { createCategory, createExpense, createItem } from "@/lib/api";
import type { ActionState } from "./actionState";

const errorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong. Try again.";
};

export const createItemAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!name) {
    return { ok: false, message: "Item name is required." };
  }

  try {
    await createItem({ name, description });
    revalidatePath("/items");
    revalidatePath("/");
    return { ok: true, message: "Item created." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
};

export const createCategoryAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const name = String(formData.get("name") || "").trim();

  if (!name) {
    return { ok: false, message: "Category name is required." };
  }

  try {
    await createCategory({ name });
    revalidatePath("/categories");
    revalidatePath("/expenses");
    return { ok: true, message: "Category created." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
};

export const createExpenseAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const title = String(formData.get("title") || "").trim();
  const amount = String(formData.get("amount") || "").trim();
  const spentAt = String(formData.get("spent_at") || "").trim();
  const category = Number(formData.get("category") || 0);
  const notes = String(formData.get("notes") || "").trim();

  if (!title) {
    return { ok: false, message: "Expense title is required." };
  }
  if (!amount) {
    return { ok: false, message: "Amount is required." };
  }
  if (!spentAt) {
    return { ok: false, message: "Spent date is required." };
  }
  if (!category) {
    return { ok: false, message: "Pick a category." };
  }

  try {
    await createExpense({
      title,
      amount,
      spent_at: spentAt,
      notes,
      category,
    });
    revalidatePath("/expenses");
    revalidatePath("/");
    return { ok: true, message: "Expense created." };
  } catch (error) {
    return { ok: false, message: errorMessage(error) };
  }
};
