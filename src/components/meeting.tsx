import { Box, Tabs, Tab, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the trash can icon
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import MeetingOverview from "./meeting-overview";
import { SalesCriteriaProvider } from "../providers/SalesCriteriaProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAllProfiles from "../hooks/useAllProfiles";
import { useMeetingsContext } from "../providers/MeetingsProvider";
import { Profile } from "../types";
import { useAuth0 } from "@auth0/auth0-react"

const Meeting = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const tenantId = user?.tenantId;
  const userId = user?.sub
  const { meetings = [] } = useMeetingsContext();
  const currentMeeting = meetings?.find(({ uuid }) => uuid === id) || {};
  const { allProfiles, allPersons, isLoading } = useAllProfiles(userId!, id!);
  const sortedProfiles = allProfiles?.sort((a, b) => a.name.localeCompare(b.name));
  const navigate = useNavigate();
  const randomUrlEnding = Math.floor(Math.random() * 10000);


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const handleOpenDialog = () => {
    setIsDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog without deleting
  };

  useEffect(() => {
    setIsMounted(true);

    return () => {
        setIsMounted(false)
        localStorage.setItem("openCalendar", JSON.stringify(true)); // or false
        };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({
            appState: { returnTo: `${window.location.pathname}${window.location.search}` },
        });
    }
    }, [isAuthenticated]);

   return (
      <main className="background">
        <div
          style={{
            width: "100%",
            height: "100%",
            zIndex: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            className="meeting-container"
            sx={{
              color: "rgb(17, 24, 28)",
              backgroundColor: "#c8d9e5",
              width: "calc(90%)",
              zIndex: 40,
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              position: "fixed",
              bottom: "0px",
              height: "97%",
              transition: "transform 0.3s ease",
              transform: isMounted
                ? "translateY(0%) translateZ(0px)"
                : "translateY(100%) translateZ(0px)",

            }}
          >
            <Link to="/" style={{ position: "absolute", left: "1rem", top: "1rem" }}>
              <CloseIcon
                sx={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                className="icon"
              />
            </Link>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "sticky",
                  padding: "24px 3rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    minHeight: "56px",
                    width: "1050px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexFlow: "wrap",
                      justifyContent: "space-between",
                      textOverflow: "ellipsis",
                      gap: "16px",
                    }}
                  >
                    <Box
                        sx={{
                          display: "inline-flex",
                          flexDirection: "column",
                          position: "relative",
                          minWidth: "0px",
                          padding: "0px",
                          margin: "0px",
                          lineHeight: "30px",
                          border: "0px",
                          verticalAlign: "top",
                          flex: "1 1 0%",
                          fontWeight: 600,
                          fontSize: "28px",
                          marginBottom: "8px",
                        }}
                      >
                        {currentMeeting?.subject}
                      </Box>{/* The updated Box with the Delete Meeting button */}

                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "flex-start",
                    }}
                  ></Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                    width: "1050px",
                    minHeight: "unset",
                  }}
                >
                  {!isLoading ? (
                    <>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant={allProfiles?.length > 4 ? "scrollable" : "standard"} // Enable scrolling when there are more than 5 profiles
          scrollButtons="auto"
          sx={{
            "& .Mui-selected": {
              borderBottom: "1px solid #000",
            },
            "& .Mui-focusVisible": {
              borderBottom: "1px solid #000",
            },
            maxWidth: "1050px", // Set a max width for scroll
            overflow: "hidden", // Ensure tabs overflow
            borderRadius: "6px", // Ensure the tabs container has rounded corners
            padding: 0, // Remove default padding to allow for gaps between tabs
          }}
        >
          {/* The 'Meeting Overview' tab at index 0 */}
          <Tab
            key="overview"
            onClick={() => setValue(0)}
            label="Meeting Overview"
            value={0}
            sx={{
              marginRight: "8px", // Add margin for gap between tabs
              backgroundColor: "transperent",
              borderRadius: "6px", // Apply rounded corners to the individual tab as well
            }}
          />

          {/* Profile tabs starting from index 1 */}
          {sortedProfiles && Array.isArray(sortedProfiles) && sortedProfiles.map(({ name, uuid, profile_picture }: Profile, index: number) => (
            <Tab
              key={uuid}
              onClick={() => setValue(index + 1)}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src={(profile_picture && profile_picture.includes('genieapp')) ? profile_picture + `?random=${randomUrlEnding}` : profile_picture}
                    alt={name}
                    className="h-8 w-8 rounded-full" // Adjust size to fit inside the tab
                  />
                  {name}
                </Box>
              }
              value={index + 1}
              sx={{
                marginRight: "8px", // Add margin for gap between tabs
                backgroundColor: "transperent",
                borderRadius: "6px", // Apply rounded corners to the individual tab as well
              }}
            />
          ))}
      {allPersons?.length > 0 && (
          <Box
            sx={{
              marginLeft: "8px", // Space between the last tab and the bubble
              padding: "4px 8px",
              backgroundColor: "#f0f0f0", // Light background for the bubble
              borderRadius: "12px",
              minWidth: "40px", // Set a minimum width to prevent the bubble from shrinking
              position: "relative", // For positioning the tooltip
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={"People we are still working on: \n" + allPersons.map(({email }) => `${email}`).join(", ")} // Tooltip with all person details
          >
            +{allPersons.length}
          </Box>
        )}
        </Tabs>
                    </>
                  ) : (
                    null
                  )}
                </Box>
              </Box>

              {/* Render content based on the selected tab */}
              {value === 0 ? (
                <MeetingOverview userId={userId} />
              ) : (
                allProfiles && Array.isArray(allProfiles) && allProfiles?.map(({ name, uuid }: Profile, index: number) => (
                  value === index + 1 && (
                    <ProfilePage key={uuid} name={name} uuid={uuid} />
                  )
                ))
              )}
            </Box>
          </Box>
        </div>
      </main>
    );
  };

  export default Meeting;