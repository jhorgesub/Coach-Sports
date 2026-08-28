import { initialPlans } from '../data/plansData';

let dbPlans = [...initialPlans];

export const planService = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [...dbPlans];
  },
  
  updateCount: async (id, count) => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    dbPlans = dbPlans.map(p => p.id === id ? { ...p, membersCount: count } : p);
    return { success: true };
  }
};
