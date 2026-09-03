import { initialMembers } from "../data/membersData";

// Maintain state locally to simulate DB
let dbMembers = [...initialMembers];

export const memberService = {
  getAll: async () => {
    return [...dbMembers];
  },

  create: async (memberData) => {
    const nextIdMember =
      dbMembers.reduce((max, m) => {
        const num = parseInt(m.id);
        return num > max ? num : max;
      }, 0) + 1;

    const newMember = {
      id: String(nextIdMember),
      ...memberData,
      joinDate: new Date().toISOString().split("T")[0],
    };

    dbMembers = [newMember, ...dbMembers];
    return newMember;
  },

  edit: async (member) => {
    dbMembers = dbMembers.map((m) =>
      m.id === member.id ? { ...m, ...member } : m,
    );
    return member;
  },

  remove: async (id) => {
    //await new Promise((resolve) => setTimeout(resolve, 150));
    dbMembers = dbMembers.filter((member) => member.id !== id);
    return;
  },
};
