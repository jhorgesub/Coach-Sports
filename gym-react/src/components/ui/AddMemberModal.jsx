export default function AddMemberModal({
  isOpen,
  onClose,
  title = "Registrar nuevo miembro",
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop / Fondo oscuro con blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />
      {/* Contenedor del Modal */}
      <div className="relative bg-[#040a17] border border-[rgba(0,191,255,0.2)] rounded-2xl shadow-xl p-6 max-w-md w-full z-10 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5 border-b border-[rgba(0,191,255,0.1)]">
          <h3 className="text-base font-semibold text-gray-100">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xl font-bold p-1 leading-none"
            aria-label="Cerrar Modal"
          >
            &times;
          </button>
        </div>
        <div> {children} </div>
      </div>
    </div>
  );
}
