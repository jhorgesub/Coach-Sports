import { initialMembers } from '../data/membersData';

// Maintain state locally to simulate DB
let dbMembers = [...initialMembers];

export const memberService = {

  getAll: async () => {
    return [...dbMembers];
  },

  create: async (memberData) => {
    const nextIdMember = dbMembers.reduce((max, m) => {
      const num = parseInt(m.id);
      return num > max ? num : max
    }, 0) + 1;

    const newMember = {
      id: num,
    }
  

    dbMembers = [newMember, ...dbMembers];
    return newMember;
  }


  /* getAll: async () => {
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 150));
    return [...dbMembers];
  },
  
  create: async (memberData) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const nextIdNumber = dbMembers.reduce((max, m) => {
      const num = parseInt(m.id.substring(1));
      return num > max ? num : max;
    }, 0) + 1;
    
    const newMember = {
      id: `M${String(nextIdNumber).padStart(3, '0')}`,
      ...memberData,
      joinDate: new Date().toISOString().split('T')[0],
      initials: memberData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || "XX"
    };
    
    dbMembers = [newMember, ...dbMembers];
    return newMember;
  },
  
  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    dbMembers = dbMembers.filter(m => m.id !== id);
    return { success: true };
  } */
};
