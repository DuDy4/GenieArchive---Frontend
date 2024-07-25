import { Box, InputBase, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { CiSearch } from "react-icons/ci";
import Calendar from "./calendar";
import Preferences from "./preferences";
import SearchAttendes from "./search-attendees";
import TimeBox from "./time-box";
import { useState } from "react";
import UpcomingMeetings from "./upcomming-meetings";
import { Link } from "react-router-dom";

const events = [
  {
    id: "65b5afe8",
    title: "Project Meeting",
    start: new Date("2024-07-27T17:00:00+03:00"),
    end: new Date("2024-07-27T17:30:00+03:00"),
  },
  {
    id: "65b5afe9",
    title: "Meetup",
    start: new Date("2024-07-24T16:00:00+03:00"),
    end: new Date("2024-07-24T17:30:00+03:00"),
  },
  {
    id: "65b5afd0",
    title: "Hackathon",
    start: new Date("2024-07-23T16:00:00+03:00"),
    end: new Date("2024-07-23T17:30:00+03:00"),
  },
];

const Home = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <main className="background">
      <Link to="/" className="w-[70px] z-[20] absolute top-4 left-8">
        <img src="/images/logo.png" alt="logo" className="max-w-full" />
      </Link>
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          position: "fixed",
          right: "22px",
          top: "23px",
          zIndex: "12",
        }}>
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
          }}>
          <InputBase
            placeholder="Search notes"
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              color: "rgb(251, 252, 253)",
              padding: "1px",
              paddingLeft: "4px",
              "& .MuiInputBase-input": {
                paddingLeft: "30px", // Make space for the icon inside the input
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
        <div className="box">
          <CalendarTodayOutlinedIcon fontSize="small" />
          <Typography
            onClick={() => {
              setOpenCalendar((openCalendar) => !openCalendar);
              setOpenSearchBar(false);
            }}>
            Calendar
          </Typography>
        </div>
      </Box>

      <div className="h-full flex flex-col z-[10] absolute items-center w-full">
        <div className="fixed z-[12] flex justify-center outline-none top-[15%]"></div>
        <div className="h-[52px] flex flex-col flex-grow justify-center items-center z-[12] outline-none"></div>
        {/* <div></div> */}
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
        onMouseEnter={() => setOpenCalendar(true)}>
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
          }}></Box>
      </div>

      <Calendar
        events={events}
        openCalendar={openCalendar}
        setOpenCalendar={setOpenCalendar}
      />

      <SearchAttendes
        openSearchBar={openSearchBar}
        setOpenSearchBar={setOpenSearchBar}
      />
      <Preferences />
    </main>
  );
};

export default Home;
