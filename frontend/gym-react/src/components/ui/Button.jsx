export default function Button({
  onClick,
  children,
  variant = "brand", // 'brand' | 'secondary' | 'danger'
  type = "button",
  className = "",
  disabled = false,
}) {
  let baseClass =
    "px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer text-sm ";

  if (variant === "brand") {
    baseClass = "btn-brand ";
  } else if (variant === "secondary") {
    baseClass +=
      "bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 hover:border-slate-600 ";
  } else if (variant === "danger") {
    baseClass +=
      "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 ";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
