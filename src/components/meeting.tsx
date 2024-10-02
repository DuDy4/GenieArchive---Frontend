import { Box, Tabs, Tab, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the trash can icon
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProfileDetails from "./profile-details";
import MeetingOverview from "./meeting-overview";
import { useEffect, useState } from "react";
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
  const { user } = useAuth0();
  const tenantId = user?.tenantId;
  const { deleteMeeting } = useMeetingsContext();
  const { allProfiles, isLoading } = useAllProfiles(tenantId!, id!);
  const name = searchParams.get("name");

  console.log("All profiles: ", allProfiles);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDeleteMeeting = () => {
    console.log("Delete Meeting Clicked!");
    deleteMeeting(id!); // Delete the meeting
    setIsDialogOpen(false); // Close the dialog
    console.log("Meeting deleted!");
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

   return (
      <main className="background">
        <div
          style={{
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          <Box
            className="meeting-container"
            sx={{
              color: "rgb(17, 24, 28)",
              backgroundColor: "#F8F9FA",
              width: "calc(95%)",
              left: "2.5%",
              zIndex: "2",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              bottom: "0px",
              height: "90%",
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
                                          border: "0px",
                                          verticalAlign: "top",
                                          flex: "1 1 0%",
                                          fontWeight: 600,
                                          fontSize: "28px",
                                          marginBottom: "8px",
                                        }}
                                      >
                                        {name}
                                      </Box>{/* The updated Box with the Delete Meeting button */}
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />} // Trash can icon
                      onClick={handleOpenDialog} // Open dialog on click
                      sx={{
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      Delete Meeting
                    </Button>
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
                    borderBottom: "1px solid rgb(236, 238, 240)",
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
                        variant={allProfiles?.length > 5 ? "scrollable" : "standard"} // Enable scrolling when there are more than 5 profiles
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
                        }}
                      >
                        {/* The 'Meeting Overview' tab at index 0 */}
                        <Tab key="overview" onClick={() => setValue(0)} label="Meeting Overview" value={0} />

                        {/* Profile tabs starting from index 1 */}
                        {allProfiles && Array.isArray(allProfiles) && allProfiles?.map(
                          ({ name, uuid }: Profile, index: number) => (
                            <Tab
                              key={uuid}
                              onClick={() => setValue(index + 1)}
                              label={name}
                              value={index + 1}
                            />
                          )
                        )}
                      </Tabs>
                    </>
                  ) : (
                    <div className="text-center">Fetching data...</div>
                  )}
                </Box>
              </Box>

              {/* Render content based on the selected tab */}
              {value === 0 ? (
                <MeetingOverview tenantId={tenantId} />
              ) : (
                allProfiles && Array.isArray(allProfiles) && allProfiles?.map(({ name, uuid }: Profile, index: number) => (
                  value === index + 1 && (
                    <ProfileDetails key={uuid} name={name} uuid={uuid} />
                  )
                ))
              )}
            </Box>
          </Box>

          {/* Warning dialog */}
          <Dialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
              style: { backdropFilter: "blur(4px)" }, // Add background blur effect
            }}
          >
            <DialogTitle id="alert-dialog-title">{"Is this meeting not relevant anymore?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleted meetings cannot be undeleted. Are you sure you want to delete this meeting?
              </DialogContentText>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-around", // Spacing around the buttons
              }}
            >
              <Button onClick={handleCloseDialog} color="primary">
                Go Back
              </Button>
              <Button onClick={handleDeleteMeeting} color="error" variant="contained" autoFocus>
                I'm Sure - Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    );
  };

  export default Meeting;