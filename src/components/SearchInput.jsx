export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Rechercher par nom ou email..."
      value={value}
      onChange={onChange}
      className="border px-2 py-1 w-full md:w-64 rounded"
    />
  );
}
