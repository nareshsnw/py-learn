"use server"
import Link from "next/link";

import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { getExpenses, getSummary } from "@/lib/api";
import { formatDate, formatMoney, toISODate } from "@/lib/format";

// export const dynamic = "force-dynamic";

export default async function HomePage() {
  const today = new Date();
  const from = new Date();
  from.setDate(today.getDate() - 30);

  const [summary, expenses] = await Promise.all([
    getSummary({ from: toISODate(from), to: toISODate(today) }),
    getExpenses(),
  ]);

  const recentExpenses = expenses.slice(0, 5);

  return (
    <>
      <section className="hero">
        <div>
          <span className="pill">30-day snapshot</span>
          <h1>Track spend, ship changes, stay ahead.</h1>
          <p>
            The RestApi suite keeps product, expenses, and operations aligned.
            Review totals, scan recent spend, and jump into details.
          </p>
        </div>
        <div className="grid cols-2">
          <StatCard label="Total spend" value={formatMoney(summary.total)} />
          <StatCard label="Active categories" value={`${summary.by_category.length}`} />
          <StatCard label="Recent expenses" value={`${recentExpenses.length}`} />
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Top categories"
          subtitle="Last 30 days"
          action={<Link className="button secondary" href="/expenses">View expenses</Link>}
        />
        <div className="grid cols-3">
          {summary.by_category.length === 0 ? (
            <div className="card">No spend yet. Add your first expense.</div>
          ) : (
            summary.by_category.slice(0, 6).map((row) => (
              <div className="card stat" key={row.category_id}>
                <h3>{row.category}</h3>
                <strong>{formatMoney(row.total)}</strong>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Latest expenses"
          subtitle="Most recent activity"
          action={<Link className="button secondary" href="/categories">Manage categories</Link>}
        />
        <div className="card">
          {recentExpenses.length === 0 ? (
            <p className="form-message">No expenses yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((expense) => (
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
