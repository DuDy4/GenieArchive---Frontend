import { Box, ButtonBase, Dialog, Menu, MenuItem, MenuList, MenuProps, Tooltip, Typography } from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import AdminMode from './AdminMode';
import { useToken } from "../providers/TokenProvider";
import FileUpload from './file-upload'; // Import the FileUpload component

// const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
//   "& .MuiPaper-root": {
//     padding: "8px 16px",
//     width: "26rem",
//     border: "1px solid rgb(230, 232, 235)",
//     boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 32px -5px",
//     borderRadius: "8px",
//     backgroundColor: "rgb(251, 252, 253)",
//     marginTop: "-8px",
//   },
// }));

const Preferences = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAdminMode, setOpenAdminMode] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false); 
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

          <hr className="separator" />
          

          {/* Admin Mode */}
          {isAdmin && (
            <MenuItem
              onClick={() => setOpenAdminMode(true)}
              sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
            >
              <Typography sx={{ fontWeight: 500 }}>Admin Mode</Typography>
              <FaChevronRight />
            </MenuItem>
          )}

          {/* File Upload MenuItem */}
          <MenuItem
            sx={{ display: "flex", justifyContent: "space-between" }}
            disableRipple
            disableTouchRipple
            onClick={() => setOpenFileUpload(true)} // Open the file upload dialog
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                Upload Files
              </Typography>
            </Box>
            <FaChevronRight />
          </MenuItem>

          {/* File Upload Dialog */}
          <Dialog open={openFileUpload} onClose={() => setOpenFileUpload(false)}>
            <FileUpload />
          </Dialog>

          <MenuItem sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
