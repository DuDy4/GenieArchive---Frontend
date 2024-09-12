import axios from 'axios';

const zendeskInstance = axios.create({
  baseURL: `${import.meta.env.VITE_ZENDESK_URL}/api/v2`,
  auth: {
    username: `${import.meta.env.VITE_ZENDESK_USERNAME}/token`,
    password: import.meta.env.VITE_ZENDESK_API_TOKEN,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to post a new ticket
export const createZendeskTicket = async (ticketData: any) => {
  try {
    const response = await zendeskInstance.post('/tickets', {
      ticket: {
        subject: ticketData.subject,
        comment: {
          body: ticketData.description,
        },
        requester: {
          name: ticketData.name,
          email: ticketData.email,
        },
        priority: ticketData.priority,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Zendesk ticket:', error);
    throw error;
  }
};
