import SectionHeader from "@/components/SectionHeader";
import { getItems } from "@/lib/api";
import { formatDate } from "@/lib/format";

import NewItemForm from "./NewItemForm";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <>
      <SectionHeader
        title="Items"
        subtitle="Simple REST sample inventory"
      />
      <div className="grid cols-2">
        <NewItemForm />
        <div className="card">
          <h3>Latest items</h3>
          {items.length === 0 ? (
            <p className="form-message">No items yet. Add the first one.</p>
          ) : (
            <div className="grid">
              {items.map((item) => (
                <div className="card" key={item.id}>
                  <strong>{item.name}</strong>
                  <p className="form-message">
                    {item.description || "No description provided."}
                  </p>
                  <span className="pill">{formatDate(item.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
