export default function ChampSaisie({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) {


    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>;
}