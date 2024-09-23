import { Dialog, Typography, Button, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import TicketForm from './TicketForm';

const ContactUs = ({ open, onClose }) => {  // Add `onClose` prop
  const { user } = useAuth0();

  return (
    <Dialog open={open} onClose={onClose}>
      {user ? (
        <TicketForm onClose={onClose} />
      ) : (
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: "16px" }}>
            Please log in to contact us
          </Typography>
          <Typography variant="body1" sx={{ color: "gray", marginBottom: "24px" }}>
            You need to be logged in to submit a support ticket. Please log in and try again.
          </Typography>
          <Button variant="contained" color="primary" onClick={onClose}> {/* Use onClose */}
            Log in
          </Button>
        </Box>
      )}
    </Dialog>
  );
};

export default ContactUs;
