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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import CloseIcon from "@mui/icons-material/Close";
import CalendarSwitch from "./calendar-switch";
// import { ContextHolder, useAuth } from "@frontegg/react";
import { useAuth0 } from "@auth0/auth0-react"

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

  const [openCalendarModal, setOpenCalendarModal] = useState(false);

//   const logout = () => {
//     // const baseUrl = ContextHolder.getContext().baseUrl;
//     const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
//     // const baseUrl = "https://dev-456789.oktapreview.com";
//     window.location.href = `${auth0Domain}/v2/logout?returnTo=${window.location.origin}`;
//   };

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
            // width: "26rem !important",
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
            onClick={() => setOpenCalendarModal(true)}>
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
                Calendar
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
                // fill: "none",
                stroke: "rgb(17, 24, 28)",
              }}
              size={25}
            />
          </MenuItem>

          <Dialog
            open={openCalendarModal}
            onClose={() => setOpenCalendarModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                width: "23rem",
                maxHeight: "40%",
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
                onClick={() => setOpenCalendarModal(false)}
              />
              <Typography
                sx={{
                  margin: "0px",
                  lineHeight: "28px",
                  fontSize: "20px",
                  fontWeight: "500",
                  marginBottom: "10px",
                }}>
                Calendar
              </Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center">
                <p
                  style={{
                    margin: "0px",
                    fontWeight: "400",
                  }}>
                  {user ? user?.email : ""}
                </p>

                <div className="flex gap-1 items-center">
                  <Box
                    sx={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      marginRight: "8px",
                      border: "2px solid white",
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px",
                      backgroundColor: "rgb(132, 205, 218)",
                    }}></Box>

                  <CalendarSwitch />
                </div>
              </Box>
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
              //   marginX: 0,
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
