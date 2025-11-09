export default function ChampSaisie({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  step,
}) {
  return (
    <div className="space-y-3">
      <label className="block text-orange-200 font-semibold text-lg">
        {label}
        {required && <span className="text-orange-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        className="w-full px-4 py-4 bg-black/50 border border-orange-500/30 rounded-xl text-white text-lg placeholder-orange-300/50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 hover:border-orange-400/60"
      />
    </div>
  );
}