type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export default function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="card stat">
      <h3>{label}</h3>
      <strong>{value}</strong>
      {hint ? <span className="pill">{hint}</span> : null}
    </div>
  );
}
