import { Box, MenuItem, Tooltip, Typography } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { user, logout } = useAuth0();

  return (
    <MenuItem sx={{ display: "flex", justifyContent: "end" }} disableRipple disableTouchRipple>
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Typography sx={{ fontWeight: 400, color: "grey" }}>{user?.user_email}</Typography>
        <Tooltip arrow placement="top" title="Log Out">
          <div onClick={() => logout()}>
            <FiLogOut className="logout-icon" />
          </div>
        </Tooltip>
      </Box>
    </MenuItem>
  );
};

export default Logout;
