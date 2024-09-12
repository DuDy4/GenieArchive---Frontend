import React, { useState } from 'react';
import { createZendeskTicket } from './zendeskService'; // Import the service

const NewTicketForm: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    subject: '',
    description: '',
    name: '',
    email: '',
    priority: 'normal',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createZendeskTicket(ticketData);
      setMessage('Ticket created successfully!');
      console.log('Created Ticket:', result);
    } catch (error) {
      setMessage('Error creating ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Zendesk Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={ticketData.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={ticketData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={ticketData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={ticketData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
            name="priority"
            value={ticketData.priority}
            onChange={handleInputChange}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewTicketForm;
