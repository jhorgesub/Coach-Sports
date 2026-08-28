import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/AddMemberModal";
import DeleteModal from "../components/ui/DeleteModal";
import { SearchIcon, PlusIcon } from "../components/ui/Icons";
import { memberService } from "../services/memberService";
import { initialPlans } from "../data/plansData";
import { useState, useEffect } from "react";
import AddMemberModal from "../components/ui/AddMemberModal";

// Eye icon
function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Edit / Pen-Line icon
function PenLineIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 21h8" />
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    </svg>
  );
}

// Trash icon
function Trash2Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

// Icon with hover color toggle
function ActionIcon({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? "#00BFFF" : "#9ca3af" }}
      className="cursor-pointer transition-colors duration-150"
    >
      {children}
    </span>
  );
}

// Empty state SVG
function EmptyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-600 mb-1"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPlan, setNewPlan] = useState(initialPlans[0].name);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "",
  });

  useEffect(() => {
    async function loadMembers() {
      const data = await memberService.getAll();
      setMembers(data);
    }
    loadMembers();
  }, []);

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

  const handleConfirmDelete = async (id) => {
    await memberService.delete(memberToDelete.id);
    setMembers((prev) =>
      prev.filter((member) => member.id !== memberToDelete.id),
    );
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(member.id).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  /* const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    const newMember = await memberService.create({ name: newName, email: newEmail, plan: newPlan, status: 'Active' });
    setMembers([newMember, ...members]);
    setNewName('');
    setNewEmail('');
    setIsModalOpen(false);
  }; */

  return (
    <div className="font-inter">
      <PageHeader
        title="Miembros"
        subtitle="Administración de atletas, perfiles activos y membresías."
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="brand"
          className="flex items-center gap-2 text-xs font-semibold"
        >
          <PlusIcon className="w-4 h-4" />
          Registrar Miembro
        </Button>
      </PageHeader>

      {/* Modal */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nuevo Miembro"
      >
        <form onSubmit={handleAddMember} className="space-y-4">
          <div>
            <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.newName}
              onChange={handleChange}
              /* onChange={e => setNewName(e.target.value)} */ required
              placeholder="Ej. Jennifer Lopez"
              className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={formData.newEmail}
              onChange={handleChange}
              /* onChange={e => setNewEmail(e.target.value)} */ required
              placeholder="Ej. jennifer@gym.com"
              className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 uppercase font-bold mb-1.5">
              Plan de Membresía
            </label>
            <select
              value={formData.newPlan}
              onChange={
                handleChange
              } /* onChange={e => setNewPlan(e.target.value)} */
              className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-brand-blue"
            >
              {initialPlans.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} (${p.price}/mes)
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-[rgba(0,191,255,0.1)]">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="brand">
              Registrar
            </Button>
          </div>
        </form>
      </AddMemberModal>

      <DeleteModal
        isOpen={Boolean(memberToDelete)}
        memberName={memberToDelete?.name}
        onClose={() => setMemberToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Toolbar */}
      {/* <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 bg-neutral-900/45 border border-neutral-800/50 backdrop-blur-sm p-4 rounded-2xl">
        <div className="relative w-full sm:max-w-xs">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, email o ID..."
            className="w-full bg-[#040a17] border border-[rgba(0,191,255,0.15)] rounded-lg pl-10 pr-4 py-2 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue" />
          <div className="absolute left-3.5 top-2.5 text-gray-500">
            <SearchIcon className="w-4 h-4" />
          </div>
        </div> */}

      {/* <div className="flex bg-[#040a17] p-1 border border-[rgba(0,191,255,0.15)] rounded-lg">
          {[{ id: 'All', label: 'Todos' }, { id: 'Active', label: 'Activos' }, { id: 'Inactive', label: 'Inactivos' }].map(filter => (
            <button key={filter.id} onClick={() => setStatusFilter(filter.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                statusFilter === filter.id
                  ? 'bg-brand-blue text-slate-950 shadow-[0_0_12px_rgba(0,191,255,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}>
              {filter.label}
            </button>
          ))}
        </div> 
      </div> */}

      {/* Table Container */}
      <div className="overflow-hidden bg-neutral-900/45 border border-neutral-800/50 rounded-2xl backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800/80 bg-neutral-900/80 text-[11px] font-bold tracking-wider text-neutral-400">
                <th scope="col" className="px-6 py-4 text-center">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  MIEMBRO
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  PLAN
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Fecha Ingreso
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  DIAS RESTANTES
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  ESTADO
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  DETALLES
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-800/50">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, i) => {
                  const isExpired =
                    member.status === "Inactive" || member.status === "Expired";
                  return (
                    <tr
                      key={member.id}
                      className="hover:bg-neutral-800/20 transition-colors duration-150"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 text-center font-mono text-xs text-neutral-500">
                        {i + 1}
                      </td>

                      {/* Miembro */}
                      <td className="px-6 py-4">
                        <div className="text-center text-gray-200">
                          {member.name}
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="px-6 py-4 text-neutral-300">
                        <div className="text-center">{member.plan}</div>
                      </td>

                      {/* Fecha Ingreso */}
                      <td className="px-6 py-4 text-neutral-300 font-medium">
                        <div className="text-center">{member.joinDate}</div>
                      </td>

                      {/* Días Restantes */}
                      <td className="px-6 py-4 text-center">
                        {isExpired ? (
                          <span className="font-bold text-rose-400">
                            Expirado
                          </span>
                        ) : (
                          <span className="font-medium text-emerald-400">
                            30 días
                          </span>
                        )}
                      </td>

                      {/* Estado */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            isExpired
                              ? "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                              : "bg-sky-500/10 border border-sky-500/20 text-sky-400"
                          }`}
                        >
                          <svg
                            className="h-1.5 w-1.5 fill-current"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          {isExpired ? "Expirado" : "Activo"}
                        </span>
                      </td>

                      {/* Detalles: Ver / Editar / Eliminar */}
                      <td className="px-6 py-4 text-neutral-300">
                        <div className="flex items-center justify-center space-x-4">
                          <ActionIcon onClick={() => {}}>
                            <EyeIcon />
                          </ActionIcon>
                          <ActionIcon onClick={() => {}}>
                            <PenLineIcon />
                          </ActionIcon>
                          <ActionIcon onClick={() => setMemberToDelete(member)}>
                            <Trash2Icon />
                          </ActionIcon>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-neutral-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <EmptyIcon />
                      <p className="font-semibold text-neutral-300">
                        No hay miembros registrados
                      </p>
                      <p className="text-xs text-neutral-500">
                        Hacé click en "REGISTRAR MIEMBRO" para crear el primero.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
