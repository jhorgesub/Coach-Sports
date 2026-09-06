// Base client instance configuration
const BASE_URL = "/api";

export async function request(endpoint, options = {}) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const url = `${BASE_URL}${endpoint}`;
  
  // Under normal environment, this would perform a real fetch:
  // const response = await fetch(url, options);
  // return response.json();
  
  return { success: true };
}
