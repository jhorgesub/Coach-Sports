import { initialCheckins } from '../data/checkinData';
import { initialMembers } from '../data/membersData';

let dbCheckins = [...initialCheckins];

export const checkinService = {
  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return [...dbCheckins];
  },
  
  validate: async (query, membersList = initialMembers) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    
    const foundMember = membersList.find(
      m => m.name.toLowerCase().includes(query.toLowerCase()) || m.id.toLowerCase() === query.toLowerCase()
    );
    
    if (!foundMember) {
      throw new Error(`Access Denied: No member found matching "${query}"`);
    }
    
    let checkinStatus = 'Success';
    let message = `Access Granted! Welcome back, ${foundMember.name}.`;
    
    if (foundMember.status === 'Expired') {
      checkinStatus = 'Expired';
      message = `Access Denied: ${foundMember.name}'s plan has expired.`;
    } else if (foundMember.status === 'Inactive') {
      checkinStatus = 'Expired';
      message = `Access Denied: ${foundMember.name}'s membership is inactive.`;
    }
    
    const newCheckin = {
      id: `C${Date.now()}`,
      memberId: foundMember.id,
      name: foundMember.name,
      plan: foundMember.plan,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: checkinStatus
    };
    
    dbCheckins = [newCheckin, ...dbCheckins];
    
    return {
      checkin: newCheckin,
      message,
      type: checkinStatus === 'Success' ? 'success' : 'warning'
    };
  }
};
