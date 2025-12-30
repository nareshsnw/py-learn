import SectionHeader from "@/components/SectionHeader";
import { getCategories } from "@/lib/api";

import CategoryForm from "./CategoryForm";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <SectionHeader title="Categories" subtitle="Expense grouping" />
      <div className="grid cols-2">
        <CategoryForm />
        <div className="card">
          <h3>Current categories</h3>
          {categories.length === 0 ? (
            <p className="form-message">No categories yet.</p>
          ) : (
            <div className="grid cols-3">
              {categories.map((category) => (
                <div className="card stat" key={category.id}>
                  <strong>{category.name}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
