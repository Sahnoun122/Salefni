export default function Bouton({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
}) {
  const baseClasses = "font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white hover:shadow-orange-600/20",
    secondary: "bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white border border-orange-500/30 hover:border-orange-400/60",
    danger: "bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white hover:shadow-red-600/20",
  };

  const variantClasses = variants[variant] || variants.primary;
  const finalClassName = className || `${baseClasses} ${variantClasses}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
    >
      {label}
    </button>
  );
}
