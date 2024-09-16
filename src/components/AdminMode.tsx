import { useState, useEffect } from "react";
import { Typography, Box, Button, Dialog, List, ListItem, ListItemText } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useToken } from "../providers/TokenProvider";
import { useApiClient } from "../utils/AxiosMiddleware";

interface TicketFormProps {
  onClose: () => void;
}

const AdminMode = ({ onClose }: TicketFormProps) => {
  const { user } = useAuth0();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL; // Get the admin email from the environment variables
  const [tenants, setTenants] = useState<string[]>([]);
  const { token, isAdmin, updateFakeTenantId } = useToken();
  const { makeRequest } = useApiClient();

  if (!isAdmin || user?.email !== adminEmail) {
    return (
      <Dialog open={true} onClose={onClose}>
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
          }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              marginBottom: "16px",
            }}>
            You are not authorized to access this feature
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              marginBottom: "24px",
            }}>
            Please contact your administrator for more information.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {/* Add your login function here */}}>
            Log in
          </Button>
        </Box>
      </Dialog>
    );
  }

  const fetchTenants = async () => {
    try {
      const response = await makeRequest('GET', `/verify-admin/${user?.user_email}`);
//       fetch(`${import.meta.env.VITE_API_URL}/verify-admin/${user.user_email}`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
        console.log('response:', response);
      const data = response;
      const admin = data.admin;
      const tenants = data.tenants;
      if (admin) {
        setTenants(tenants);
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleTenantClick = (tenant: any) => {
    updateFakeTenantId(tenant);
    onClose();
  };

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Select a Tenant
      </Typography>
      <List
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {tenants.length > 0 ? (
          tenants.map((tenant) => (
            <ListItem
              key={tenant}
              button
              onClick={() => handleTenantClick(tenant)}
              sx={{
                padding: "12px",
                borderBottom: "1px solid #ddd",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                },
              }}
            >
              <ListItemText primary={tenant} />
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ padding: "16px", textAlign: "center", color: "gray" }}
          >
            No tenants available
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default AdminMode;
