import { Box, Tabs, Tab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProfileDetails from "./profile-details";
import { useEffect, useState } from "react";
import useAllProfiles from "../hooks/useAllProfiles";
import { Profile } from "../types";
import { useAuth } from "@frontegg/react";

const Meeting = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useAuth();
  const { allProfiles, isLoading } = useAllProfiles(user?.tenantId!, id!);
  const name = searchParams.get("name");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
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
          sx={{
            color: "rgb(17, 24, 28)",
            backgroundColor: "rgb(251, 252, 253)",
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
                  allProfiles?.length > 0 ? (
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
                      {allProfiles?.map(
                        ({ name, uuid }: Profile, index: number) => (
                          <Tab
                            key={index}
                            onClick={() => {
                              setValue(index);
                            }}
                            label={name}
                            value={index}
                          />
                        )
                      )}
                    </Tabs>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-lg">
                        This meeting does not yet include any
                        available profiles!
                      </p>
                    </div>
                  )
                ) : (
                  <div className="text-center">loading...</div>
                )}
              </Box>
            </Box>
            {allProfiles?.length > 0
              ? allProfiles?.map(({ name, uuid }: Profile, index: number) => {
                  return (
                    value === index && (
                      <ProfileDetails key={uuid} name={name} uuid={uuid} />
                    )
                  );
                })
              : null}
          </Box>
        </Box>
      </div>
    </main>
  );
};

export default Meeting;
