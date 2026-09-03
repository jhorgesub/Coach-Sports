import Button from "./Button";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  memberName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro con blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />
      {/* Caja del Modal */}
      <div className="relative bg-[#040a17] border border-red-500/20 rounded-2xl shadow-xl p-6 max-w-md w-full z-10 text-center animate-fadeIn">
        {/* Botón cerrar X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-lg font-bold"
        >
          &times;
        </button>
        {/* Icono de Alerta */}
        <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Mensaje */}
        <h3 className="mb-2 text-base font-semibold text-gray-100">
          ¿Eliminar miembro?
        </h3>
        <h3 className="mb-6 text-xs text-gray-400">
          ¿Estas seguro que desea eliminar a{" "}
          <span className="text-white font-medium">{memberName}</span>?
        </h3>

        {/* Botones de Acción */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
