import { Box, Tabs, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProfileDetails from "./profile-details";
import MeetingOverview from "./meeting-overview";
import { useEffect, useState } from "react";
import useAllProfiles from "../hooks/useAllProfiles";
import { Profile } from "../types";
// import { useAuth } from "@frontegg/react";
import { useAuth0 } from "@auth0/auth0-react"

const Meeting = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth0();
  const tenantId = user?.tenantId;
  const { allProfiles, isLoading } = useAllProfiles(tenantId!, id!);
  const name = searchParams.get("name");

  console.log("All profiles: ", allProfiles);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <Box className="meeting-container"
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
                  </Box>
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
                      sx={{
                        "& .Mui-selected": {
                          borderBottom: "1px solid #000",
                        },
                        "& .Mui-focusVisible": {
                          borderBottom: "1px solid #000",
                        },
                      }}
                    >
                      {/* The 'Meeting Overview' tab at index 0 */}
                      <Tab key="overview" onClick={() => setValue(0)} label="Meeting Overview" value={0} />

                      {/* Profile tabs starting from index 1 */}
                      {allProfiles && Array.isArray(allProfiles) &&  allProfiles?.map(
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
      </div>
    </main>
  );
};

export default Meeting;
