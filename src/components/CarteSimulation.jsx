export default function ChampSaisie({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
