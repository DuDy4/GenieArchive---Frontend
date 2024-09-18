import axios from 'axios';

// Function to post a new ticket through FastAPI backend
export const createZendeskTicket = async (ticketData: any) => {
  try {
    // Post request to FastAPI backend, which will handle the Zendesk API call
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-ticket`, {
      subject: ticketData.subject,
      description: ticketData.description,
      name: ticketData.name,
      email: ticketData.email,
      priority: ticketData.priority,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating ticket through backend:', error);
    throw error;
  }
};
