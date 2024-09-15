import { SettingsOutlined } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Dialog,
  Menu,
  MenuItem,
  MenuList,
  MenuProps,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth0 } from "@auth0/auth0-react";
import { createZendeskTicket } from './zendesk/zendeskService'; // Assuming you have this service to create tickets

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
  const open = Boolean(anchorEl);
  const { user, logout } = useAuth0();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openContactModal, setOpenContactModal] = useState(false);
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
      setOpenContactModal(false);
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
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableTouchRipple>
        <Tooltip arrow title="Preferences" placement="top">
          <SettingsOutlined />
        </Tooltip>
      </ButtonBase>

      <StyledMenu
        id="preference-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          zIndex: 1300,
          position: "fixed",
          inset: "0px",
        }}>
        <MenuList
          sx={{
            listStyle: "none",
            margin: "0px",
            padding: "8px 0px",
            paddingRight: "0px",
            position: "relative",
            outline: "0px",
            width: "calc(100% + 1px)",
            overflow: "hidden",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "16px",
            }}>
            <Box
              sx={{
                display: "flex",
                width: "50%",
                alignItems: "center",
              }}>
              <Typography
                sx={{
                  margin: "0px",
                  lineHeight: "28px",
                  fontSize: "20px",
                  fontWeight: "500",
                }}>
                Preferences
              </Typography>
            </Box>
          </Box>

          <hr className="separator" />

          {/* Contact Us MenuItem */}
          <MenuItem
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              cursor: "pointer",
              padding: "1.25rem 0.5rem",
              borderRadius: "4px",
              alignItems: "center",
              height: "2px",
            }}
            disableRipple
            disableTouchRipple
            onClick={() => setOpenContactModal(true)}>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 24,
                  margin: 0,
                }}>
                Contact Us
              </Typography>
            </Box>

            <FaChevronRight
              style={{
                userSelect: "none",
                display: "inline-block",
                flexShrink: "0",
                transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "1.5rem",
                width: "16px",
                height: "16px",
                stroke: "rgb(17, 24, 28)",
              }}
              size={25}
            />
          </MenuItem>

          {/* Contact Us Modal */}
          <Dialog
            open={openContactModal}
            onClose={() => setOpenContactModal(false)}
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            disableEnforceFocus>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "23rem",
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
                onClick={() => setOpenContactModal(false)}
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

              {/* Contact Form */}
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
          </Dialog>

          <hr className="separator" />

          <MenuItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              lineHeight: "16px",
              letterSpacing: "0.48px",
              width: "100%",
              padding: 0,
              ":hover": {
                backgroundColor: "transparent",
                cursor: "text",
              },
            }}
            disableRipple
            disableTouchRipple>
            <Box
              onClick={handleClose}
              sx={{
                margin: "0px",
                color: "rgb(126, 134, 140)",
                fontWeight: "500",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
              <FiUser /> Account
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
              <p
                style={{
                  margin: "0px",
                  fontWeight: "400",
                }}>
                {user?.email}
              </p>
              <Tooltip arrow placement="top" title="Log Out">
                <div onClick={logout}>
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
