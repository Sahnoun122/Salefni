export default function StatusBadge({ status }) {
  const colors = {
    "en cours": "bg-yellow-300",
    acceptée: "bg-green-300",
    refusée: "bg-red-300",
  };
  return (
    <span className={`px-2 py-1 rounded ${colors[status]}`}>{status}</span>
  );
}
