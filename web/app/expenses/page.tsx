import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { getCategories, getExpenses, getSummary } from "@/lib/api";
import { formatDate, formatMoney, toISODate } from "@/lib/format";

import ExpenseForm from "./ExpenseForm";

export const dynamic = "force-dynamic";

export default async function ExpensesPage() {
  const today = new Date();
  const from = new Date();
  from.setDate(today.getDate() - 30);

  const [categories, expenses, summary] = await Promise.all([
    getCategories(),
    getExpenses(),
    getSummary({ from: toISODate(from), to: toISODate(today) }),
  ]);

  return (
    <>
      <SectionHeader title="Expenses" subtitle="Track spend by category" />
      <div className="grid cols-2">
        <ExpenseForm categories={categories} />
        <div className="grid cols-2">
          <StatCard label="30-day total" value={formatMoney(summary.total)} />
          <StatCard label="Categories" value={`${summary.by_category.length}`} />
          <StatCard label="Entries" value={`${expenses.length}`} />
          <StatCard label="Latest spend" value={formatMoney(expenses[0]?.amount || 0)} />
        </div>
      </div>

      <section className="section">
        <SectionHeader title="All expenses" subtitle="Most recent first" />
        <div className="card">
          {expenses.length === 0 ? (
            <p className="form-message">No expenses yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Spent at</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.title}</td>
                    <td>
                      <span className="chip">{expense.category_name}</span>
                    </td>
                    <td>{formatMoney(expense.amount)}</td>
                    <td>{formatDate(expense.spent_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
}
