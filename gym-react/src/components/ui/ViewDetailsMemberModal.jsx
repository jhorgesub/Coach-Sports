export default function ViewDetailsMemberModal({ isOpen, onClose, member }) {
  if (!isOpen || !member) return null;

  const isActive = member.status === "Active";

  const fields = [
    { label: "ID", value: `#${member.id}` },
    { label: "Email", value: member.email },
    { label: "Plan", value: member.plan },
    { label: "Fecha de Ingreso", value: member.joinDate },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-[#040a17] border border-[rgba(0,191,255,0.2)] rounded-2xl shadow-xl p-6 max-w-md w-full z-10 animate-fadeIn">

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer text-xl font-bold leading-none"
        >
          &times;
        </button>

        {/* Avatar + Nombre + Status */}
        <div className="flex flex-col items-center gap-2 pb-5 border-b border-[rgba(0,191,255,0.1)]">
          <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-2xl font-bold text-sky-400">
            {member.name.charAt(0)}
          </div>
          <h3 className="text-lg font-semibold text-gray-100">{member.name}</h3>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isActive
                ? "bg-sky-500/10 border border-sky-500/20 text-sky-400"
                : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
            }`}
          >
            <svg className="h-1.5 w-1.5 fill-current" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
            {isActive ? "Activo" : "Inactivo"}
          </span>
        </div>

        {/* Campos */}
        <div className="mt-5 flex flex-col gap-3">
          {fields.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center py-2 border-b border-neutral-800/60"
            >
              <span className="text-[11px] uppercase font-bold text-neutral-500 tracking-wider">
                {label}
              </span>
              <span className="text-sm text-gray-200 font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Botón cerrar */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-sm font-semibold text-gray-400 border border-neutral-700 hover:border-sky-500 hover:text-sky-400 transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
