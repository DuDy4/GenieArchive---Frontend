import { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  TextField,
  Chip,
  Paper,
} from "@mui/material";
import { useApiClient } from "../utils/AxiosMiddleware";

interface FakeMeetingProps {
  onClose: () => void;
}

const FakeMeeting = ({ onClose }: FakeMeetingProps) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { makeRequest } = useApiClient();

  const handleAddEmail = () => {
    if (
      emailInput &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput) &&
      !emails.includes(emailInput)
    ) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await makeRequest("POST", "/fake-meeting", {
        emails,
      });
      console.log("Fake meeting created successfully:", response);
      onClose(); // Close the popup upon successful API response
    } catch (error) {
      console.error("Error creating fake meeting:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <Box
        sx={{
          padding: "32px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "500px",
          maxWidth: "90%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Create a Fake Meeting
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "16px", textAlign: "center", color: "gray" }}
        >
          Enter a list of participant emails to create a fake meeting.
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", gap: "8px", marginBottom: "16px" }}
          onSubmit={(e) => {
            e.preventDefault();
            handleAddEmail();
          }}
        >
          <TextField
            fullWidth
            label="Enter email"
            variant="outlined"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddEmail()}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEmail}
            disabled={!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)}
          >
            Add
          </Button>
        </Box>
        <Paper
          elevation={0}
          sx={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            minHeight: "100px",
          }}
        >
          {emails.length > 0 ? (
            emails.map((email) => (
              <Chip
                key={email}
                label={email}
                onDelete={() => handleRemoveEmail(email)}
                sx={{ margin: "4px" }}
              />
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "gray", textAlign: "center" }}
            >
              No emails added yet.
            </Typography>
          )}
        </Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "24px",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose} // Close on Cancel button click
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={emails.length === 0 || loading}
          >
            {loading ? "Creating..." : "Create Meeting"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FakeMeeting;
