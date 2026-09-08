import Button from "./Button";
import { useState } from "react";
import { initialPlans } from "../../data/plansData";
import AddMemberModal from "./AddMemberModal";

export default function FormModal({
  isOpen,
  onClose,
  onConfirm,
  title = "",
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    phone: "",
    plan: initialPlans[0]?.name || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onConfirm) {
      onConfirm(formData);
    }
    // Reiniciar formulario
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dni: "",
      phone: "",
      plan: initialPlans[0]?.name || "",
    });
    onClose();
  };

  return (
    <div>
    <AddMemberModal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
          <div>
            <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Ej. Jennifer"
              className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Ej. Lopez"
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
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              placeholder="12345678"
              className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
              Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+54 9 11 ..."
              className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
              Suscripción / Plan
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
    </AddMemberModal>
  </div>
  );
}
