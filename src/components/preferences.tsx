import { Box, ButtonBase, Dialog, Menu, MenuItem, MenuList, Tooltip, Typography } from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import AdminMode from './AdminMode';
import { useToken } from "../providers/TokenProvider";

const Preferences = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAdminMode, setOpenAdminMode] = useState(false);
  const { user, logout } = useAuth0();
  const { isAdmin } = useToken();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase onClick={handleClick}>
        <Tooltip arrow title="Preferences" placement="top">
          <SettingsOutlined />
        </Tooltip>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        MenuListProps={{
          "aria-labelledby": "preference-button",
        }}
      >
        <MenuList>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <Typography sx={{ fontWeight: "500" }}>Preferences</Typography>
          </Box>

          {isAdmin && (
            <MenuItem onClick={() => setOpenAdminMode(true)}>
              <Typography sx={{ fontWeight: 500 }}>Admin Mode</Typography>
              <FaChevronRight />
            </MenuItem>
          )}

          <MenuItem sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{user?.email}</Typography>
            <FiLogOut onClick={() => logout()} />
          </MenuItem>
        </MenuList>
      </Menu>

      {isAdmin && (
        <Dialog open={openAdminMode} onClose={() => setOpenAdminMode(false)}>
          <AdminMode onClose={() => setOpenAdminMode(false)} />
        </Dialog>
      )}
    </>
  );
};

export default Preferences;
