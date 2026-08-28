import { useState } from "react";
import { memberService } from "../../services/memberService";
import { initialPlans } from "../../data/plansData";

export default function AddMemberModal({ isOpen, onClose, title, children }) {
  const [members, setMembers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState(initialPlans[0].name);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "",
  });

  const handleChange = (event) => {
    const { name, email, plan, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [email]: value,
      [plan]: value,
    }));
  };

  const handleAddMember = async (event) => {
    event.preventDefault();
    const newMember = await memberService.create({
      name: newName,
      email: newEmail,
      plan: newPlan,
      status: "Active",
    });
    setMembers([newMember, ...members]);
    setIsModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop / Fondo oscuro con blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />
      {/* Contenedor del Modal */}
      <div className="relative bg-[#040a17] border border-[rgba(0,191,255,0.2)] rounded-2xl shadow-xl p-6 max-w-md w-full z-10 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
          <h3 className="text-lg font-medium text-heading">{title}</h3>
          <button
            type="button"
            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            data-modal-hide="crud-modal"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form onSubmit={handleAddMember}>
          <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
            <div className="col-span-2">
              <label
                for="name"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="Type product name"
                required=""
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                for="price"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Email
              </label>
              <input
                type="number"
                name="price"
                value={formData.email}
                onChange={handleChange}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="$2999"
                required=""
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                for="category"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Plan
              </label>
              <select
                value={formData.newPlan}
                className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
              >
                {initialPlans.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} (${p.price}/mes)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
