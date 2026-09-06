import { useState, useEffect } from "react";
import Button from "./Button";
import { initialPlans } from "../../data/plansData";

export default function EditMemberModal({
  isOpen,
  onClose,
  onConfirm,
  member,
}) {
  const [formData, setFormData] = useState({ name: member?.name || "", email: member?.email || "", plan: member?.plan || "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop / Fondo oscuro con blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />


      {/* Contenedor del Modal */}
      <div onClick={onClose}
        className="relative bg-[#040a17] border border-[rgba(0,191,255,0.2)] rounded-2xl shadow-xl p-6 max-w-md w-full z-10 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5 border-b border-[rgba(0,191,255,0.1)]">
          <h3 className="text-base font-semibold text-gray-100">
            Editar miembro
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer text-xl font-bold p-1 leading-none"
            aria-label="Cerrar Modal"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
            <div>
              <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Jennifer Lopez"
                className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue"
                placeholder="gymbro@mail.com"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
                Plan
              </label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-brand-blue"
              >
                {initialPlans.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} (${p.price}/mes)
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4 border-t border-[rgba(0,191,255,0.1)]">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="brand">
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
