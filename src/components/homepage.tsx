import { useEffect, useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
// import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { useAuth0 } from "@auth0/auth0-react"
import { Box, InputBase, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import TimeBox from "./time-box";
import Calendar from "./calendar";
import Preferences from "./preferences";
import SearchAttendes from "./search-attendees";
import UpcomingMeetings from "./upcoming-meetings";

const selfUrl = import.meta.env.VITE_SELF_URL;
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;

const Home = () => {

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
          const storedOpenCalendar = localStorage.getItem("openCalendar");
          setOpenCalendar( storedOpenCalendar === "true" || false);
    }, []);

  useEffect(() => {
    const removeCodeParam = () => {
      let params = new URLSearchParams(searchParams);
      params.delete("code");
      setSearchParams(params);
    };

    removeCodeParam();
  }, [searchParams, setSearchParams]);

  return (
    <main className="background">
      <div className="w-[70px] z-[20] absolute top-4 left-8">
        <img src="/images/image9.png" alt="logo" className="max-w-full" />
      </div>
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          position: "fixed",
          right: "22px",
          top: "23px",
          zIndex: "12",
        }}
      >
        <Box
          sx={{
            borderRadius: "8px",
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid rgba(255, 255, 255, 0.24)",
            backgroundColor: "rgba(255, 255, 255, 0.24)",
            color: "rgb(251, 252, 253)",
            backdropFilter: "blur(20px)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.32)",
            },
            width: { xs: "auto", sm: "100%" },
          }}
        >
          <InputBase
            placeholder="Search notes"
            disabled={openSearchBar}
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: "rgb(251, 252, 253)",
              padding: "1px",
              paddingLeft: "4px",
              "& .MuiInputBase-input": {
                paddingLeft: "30px", // Make space for the icon inside the input
              },
              "& .MuiInputBase-disabled": {
                color: "rgb(251, 252, 253)",
              },
            }}
            startAdornment={
              <CiSearch
                style={{
                  position: "absolute",
                  left: "8px",
                  width: 20,
                  height: 20,
                  fontWeight: 600,
                  color: "rgb(251, 252, 253)",
                }}
              />
            }
            onClick={() => {
              setOpenSearchBar(!openSearchBar);
              setOpenCalendar(false);
            }}
          />
        </Box>
        <div
          className="box"
          onClick={() => {
            setOpenCalendar((openCalendar) => !openCalendar);
            setOpenSearchBar(false);
          }}
        >
          <CalendarTodayOutlinedIcon fontSize="small" />
          <Typography>Calendar</Typography>
        </div>

        {!isAuthenticated && (
          // <Link
          //   className="box"
          //   // to={`${fronteggUrl}/oauth/account/sign-in?redirectUrl${selfUrl}`}
          //   to={`${auth0Domain}/authorize?redirectUrl${selfUrl}`}
          // >
          //   <Typography>Login</Typography>
          // </Link>
          <>
            {console.log("Homepage - Not authenticated. Redirecting to login.")}
            {/* <button onClick={() => loginWithRedirect()}>Login</button> */}
          </>
        )}
        {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Login</button>}
      </Box>

      <div className="h-full flex flex-col z-[10] absolute items-center w-full">
        <div className="fixed z-[12] flex justify-center outline-none top-[15%]"></div>
        <div className="h-[52px] flex flex-col flex-grow justify-center items-center z-[12] outline-none"></div>
        <TimeBox />

        <UpcomingMeetings />
      </div>

      <div
        style={{
          zIndex: "10",
          position: "absolute",
          backgroundColor: "transparent",
          transition: "0.2s ease-in-out",
          right: "0px",
          overflow: "visible",
          width: "5rem",
          height: "5rem",
        }}
        onMouseEnter={() => setOpenCalendar(true)}
      >
        <Box
          sx={{
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(20px)",
            zIndex: "8",
            position: "absolute",
            right: "0px",
            visibility:
              !openCalendar && !openSearchBar ? "visible" : "invisible",
            height: !openCalendar && !openSearchBar ? "60px" : "0px",
            opacity: !openCalendar && !openSearchBar ? "1" : "0",
            width: !openCalendar && !openSearchBar ? "8px" : "0px",
            top: "calc(50% - 30px)",
            transform: "translateX(-16px) translateZ(0px)",
            transition: "transform 0.2s ease-in-out",
          }}
        ></Box>
      </div>

      <Calendar
        // events={events}
        openCalendar={openCalendar}
        setOpenCalendar={setOpenCalendar}
      />
      {openSearchBar ? (
        <SearchAttendes
          openSearchBar={openSearchBar}
          setOpenSearchBar={setOpenSearchBar}
        />
      ) : null}
      <Preferences />
    </main>
  );
};

export default Home;
