import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import DeleteModal from "../components/ui/DeleteModal";
import { PlusIcon } from "../components/ui/Icons";
import { memberService } from "../services/memberService";
import { useState, useEffect } from "react";
import FormModal from "../components/ui/FormModal";
import EditMemberModal from "../components/ui/EditMemberModal";
import ViewDetailsMemberModal from "../components/ui/ViewDetailsMemberModal";
import { Trash2Icon, EyeIcon, EmptyIcon, PenLineIcon } from "../components/ui/Icons";

// Icon with hover color toggle
function ActionIcon({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 text-gray-400 hover:text-[#00BFFF] transition-colors duration-150 cursor-pointer bg-transparent border-none inline-flex items-center justify-center focus:outline-none"
    >
      {children}
    </button>
  );
}

export default function Members() {
  const [members, setMembers] = useState([]);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [memberToView, setMemberToView] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadMembers() {
      const data = await memberService.getAll();
      setMembers(data);
    }
    loadMembers();
  }, []);

  const handleAddMember = async (formData) => {
    const newMember = await memberService.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dni: formData.dni,
      phone: formData.phone,
      subscription: formData.plan,
      plan: formData.plan,
      status: "Active",
    });
    setMembers((prev) => [newMember, ...prev]);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async (id) => {
    await memberService.remove(memberToDelete.id);
    setMembers((prev) =>
      prev.filter((member) => member.id !== memberToDelete.id),
    );
    setMemberToDelete(null);
  };

  const handleConfirmEdit = async (formData) => {
    const updatedMember = await memberService.edit({
      ...memberToEdit,
      ...formData,
    });
    setMembers((prev) =>
      prev.map((m) => (m.id === memberToEdit.id ? updatedMember : m)),
    );
    setMemberToEdit(null);
  };

  const filteredMembers = members.filter((member) => {
    const fullName = `${member.firstName ?? ""} ${member.lastName ?? ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(member.id).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddMember}
        title={"Registrar Miembro"}
      />

      <ViewDetailsMemberModal
        isOpen={Boolean(memberToView)}
        onClose={() => setMemberToView(null)}
        member={memberToView}
      />

      <EditMemberModal
        key={memberToEdit?.id}
        isOpen={Boolean(memberToEdit)}
        onClose={() => setMemberToEdit(null)}
        onConfirm={handleConfirmEdit}
        member={memberToEdit}
      />

      <DeleteModal
        isOpen={Boolean(memberToDelete)}
        memberName={memberToDelete ? `${memberToDelete.firstName ?? ""} ${memberToDelete.lastName ?? ""}`.trim() : ""}
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
                          {`${member.firstName ?? ""} ${member.lastName ?? ""}`.trim()}
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
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isExpired
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
                          <ActionIcon onClick={() => setMemberToView(member)}>
                            <EyeIcon />
                          </ActionIcon>
                          <ActionIcon onClick={() => setMemberToEdit(member)}>
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
