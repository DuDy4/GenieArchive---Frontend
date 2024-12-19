import { useState, useEffect } from "react";
import { Typography, Box, Button, Dialog, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useToken } from "../providers/TokenProvider";
import { useApiClient } from "../utils/AxiosMiddleware";
import { useMeetingsContext } from "../providers/MeetingsProvider";

interface TicketFormProps {
  onClose: () => void;
}

const AdminMode = ({ onClose }: TicketFormProps) => {
  const { user } = useAuth0();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL; // Get the admin email from the environment variables
  const [tenants, setTenants] = useState<string[]>([]);
  const { token, isAdmin, updateFakeTenantId, editMode, handleEditMode } = useToken();
  const { makeRequest } = useApiClient();
  const { getMeetings } = useMeetingsContext();


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
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            You are not authorized to access this feature
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              marginBottom: "24px",
            }}
          >
            Please contact your administrator for more information.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {/* Add your login function here */}}
          >
            Log in
          </Button>
        </Box>
      </Dialog>
    );
  }

  const fetchTenants = async () => {
    try {
      const response = await makeRequest('GET', `/admin/tenants`);
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
    updateFakeTenantId(tenant.tenant_id);
    localStorage.setItem('fakeTenantId', tenant.tenant_id);
    getMeetings();
    onClose();
  };

  const handleRemoveTenantClick = () => {
    updateFakeTenantId(null);
    localStorage.removeItem('fakeTenantId');
    getMeetings();
    onClose();
  };

  const handleRefetchMeetings = () => {
    refetchMeetings(); // This triggers the refetch of meetings from the backend
  };

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        minWidth: "400px",
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
      {tenants.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TenantID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow
                  key={tenant.uuid}
                  hover
                  onClick={() => handleTenantClick(tenant)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{tenant.tenant_id}</TableCell>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="body1"
          sx={{ padding: "16px", textAlign: "center", color: "gray" }}
        >
          No tenants available
        </Typography>
      )}

      {/* Remove Tenant Button */}
      <Box sx={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRemoveTenantClick}
        >
          Finish Impersonation
        </Button>
      </Box>
    <Box sx={{ display: "flex", alignItems: "center"}}>
        <input
              type="checkbox"
              id="editModeCheckbox"
              checked={editMode}
              onChange={(e) => handleEditMode(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
        <label htmlFor="editModeCheckbox">Edit mode</label>
      </Box>
    </Box>
  );
};

export default AdminMode;
