import { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { createZendeskTicket } from './zendesk/zendeskService'; // Assuming you have this service to create tickets

interface TicketFormProps {
  onClose: () => void;
}

const TicketForm = ({ onClose }: TicketFormProps) => {
  const { user } = useAuth0();
  const [ticketData, setTicketData] = useState({
    subject: '',
    description: '',
    name: user?.name || '',
    email: user?.user_email || '',
    priority: 'normal',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTicketData((prevData) => ({
      ...prevData,
      name: user?.name || '',
      email: user?.user_email || '',
    }));
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages
    try {
      const result = await createZendeskTicket(ticketData);
      setMessage('Ticket created successfully!');
      console.log('Created Ticket:', result);

      // Reset form on success
      setTicketData({
        subject: '',
        description: '',
        name: user?.name || '',
        email: user?.user_email || '',
        priority: 'normal',
      });
      onClose();
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Error creating ticket: ${error.response.data.error}`);
      } else {
        setMessage('Error creating ticket. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "24px",
        width: "26rem",
        maxHeight: "60%",
        padding: "20px",
        position: "relative",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
      }}>
      <CloseIcon
        sx={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
          width: "20px",
          height: "20px",
          cursor: "pointer",
          transition: "0.1s ease-in-out",
          ":hover": {
            backgroundColor: "rgb(236, 238, 240)",
          },
          borderRadius: "5px",
        }}
        onClick={onClose}
      />

      <Typography
        sx={{
          margin: "0px",
          lineHeight: "28px",
          fontSize: "20px",
          fontWeight: "500",
          marginBottom: "10px",
        }}>
        Contact Us
      </Typography>

      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          value={ticketData.name}
          onChange={handleInputChange}
          variant="outlined"
          required
          onKeyDown={(e) => e.stopPropagation()}
          disabled={!!user?.name} // Disable if name exists from Auth0
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          value={ticketData.email}
          onChange={handleInputChange}
          variant="outlined"
          required
          type="email"
          onKeyDown={(e) => e.stopPropagation()}
          disabled={!!user?.user_email} // Disable if email exists from Auth0
        />
        <TextField
          fullWidth
          label="Subject"
          margin="normal"
          name="subject"
          value={ticketData.subject}
          onChange={handleInputChange}
          variant="outlined"
          onKeyDown={(e) => e.stopPropagation()}
          required
        />
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          name="description"
          value={ticketData.description}
          onChange={handleInputChange}
          variant="outlined"
          multiline
          rows={4}
          onKeyDown={(e) => e.stopPropagation()}
          required
        />
        <TextField
          fullWidth
          label="Priority"
          select
          name="priority"
          value={ticketData.priority}
          onChange={handleInputChange}
          margin="normal"
          onKeyDown={(e) => e.stopPropagation()}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          required>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </TextField>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </form>
      {message && (
        <Typography sx={{ color: message.includes('Error') ? 'red' : 'green', mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default TicketForm;
