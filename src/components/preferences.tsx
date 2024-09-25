import { SettingsOutlined } from "@mui/icons-material";
import { Box, ButtonBase, Button, Dialog, Menu, MenuItem, MenuList, MenuProps, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import { useAuth0 } from "@auth0/auth0-react";
import { useToken } from "../providers/TokenProvider";
import TicketForm from './TicketForm'; // Import the new TicketForm component
import AdminMode from './AdminMode'; // Import AdminMode
import FileUpload from './file-upload'; // Import the FileUpload component

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(() => ({
  "& .MuiPaper-root": {
    padding: "8px 16px",
    width: "26rem",
    border: "1px solid rgb(230, 232, 235)",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 32px -5px",
    borderRadius: "8px",
    backgroundColor: "rgb(251, 252, 253)",
    marginTop: "-8px",
  },
}));

const Preferences = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openAdminMode, setOpenAdminMode] = useState(false);
  const [openFileUpload, setOpenFileUpload] = useState(false); // State for file upload dialog
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
      <ButtonBase
        sx={{
          position: "absolute",
          left: "18px",
          bottom: "18px",
          zIndex: "14",
          cursor: "pointer",
          ":hover": {
            color: "white",
          },
        }}
        aria-controls={Boolean(anchorEl) ? "preference-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
        onClick={handleClick}
        disableTouchRipple>
        <Tooltip arrow title="Preferences" placement="top">
          <SettingsOutlined />
        </Tooltip>
      </ButtonBase>

      <StyledMenu
        id="preference-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "preference-button",
        }}
        sx={{
          zIndex: 1300,
        }}>
        <MenuList>
          {/* Preferences Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "16px",
            }}>
            <Typography
              sx={{
                lineHeight: "28px",
                fontSize: "20px",
                fontWeight: "500",
              }}>
              Preferences
            </Typography>
          </Box>

          <hr className="separator" />

          {/* Contact Us MenuItem */}
          <div className="flex flex-row cursor-pointer" onClick={() => setOpenContactModal(true)}>
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px",
                alignItems: "center",
                minHeight: "48px",
                maxHeight: "48px",
                borderRadius: "4px",
                cursor: "pointer",
                width: "-webkit-fill-available"
              }}
              disableRipple
              disableTouchRipple
              onClick={() => setOpenContactModal(true)}>
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16, lineHeight: 24, margin: 0 }}>
                  Contact Us
                </Typography>
              </Box>
              <FaChevronRight />
            </MenuItem>
          </div>

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

          {/* Admin Mode */}
          {isAdmin && (
            <MenuItem
              sx={{ display: "flex", justifyContent: "space-between" }}
              disableRipple
              disableTouchRipple
              onClick={() => setOpenAdminMode(true)} // Open AdminMode dialog
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                  Admin Mode
                </Typography>
              </Box>
              <FaChevronRight />
            </MenuItem>
          )}

          {isAdmin && (
            <Dialog open={openAdminMode} onClose={() => setOpenAdminMode(false)}>
              <AdminMode onClose={() => {
                  setOpenAdminMode(false)
                  handleClose()
                  }} />
            </Dialog>
          )}

          <hr className="separator" />

          {/* Account MenuItem */}
          <MenuItem sx={{ display: "flex", justifyContent: "end" }} disableRipple disableTouchRipple>
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <p style={{ margin: "0px", fontWeight: "400", color: "grey" }}>{user?.email}</p>
              <Tooltip arrow placement="top" title="Log Out">
                <div onClick={() => logout()}>
                  <FiLogOut className="logout-icon" />
                </div>
              </Tooltip>
            </Box>
          </MenuItem>
        </MenuList>
      </StyledMenu>
    </>
  );
};

export default Preferences;
