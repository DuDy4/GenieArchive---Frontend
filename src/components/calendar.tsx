import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";
import { AiOutlineSync } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import { CgArrowsExpandRight } from "react-icons/cg";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import { Alert, Box, Button, Snackbar, Tooltip, Typography } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { Meeting } from "../types";
import CustomDrawer from "./ui/drawer";
import { useMeetingsContext } from "../providers/MeetingsProvider";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAuth0 } from "@auth0/auth0-react";

const localizer = momentLocalizer(moment);

interface MeetingsCalendarProps {
  setOpenCalendar: Dispatch<SetStateAction<boolean>>;
  openCalendar: boolean;
}

// Function to handle dynamic event styles
const eventPropGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
  let style: CSSProperties = {};

  if (event.classification === "internal") {
    style = {
      color: "rgb(12, 119, 146)",
      backgroundColor: "rgb(231, 249, 251)",
      border: "1px solid rgb(196, 234, 239)",
      opacity: 1,
    };
  } else if (event.classification === "private") {
    style = {
      backgroundColor: "orange",
      color: "black",
      border: "none",
      opacity: 0.5,
    };
  } else {
    style = {
      backgroundColor: "#90EE90",
      color: "black",
      border: "none",
    };
  }

  return { style };
};

// Custom component to render events without the time
const EventComponent = ({ event }) => {
  const eventTitle = event.title || "No Subject"; // Default if no title is provided
  return (
    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {eventTitle}
    </div>
  );
};

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({
  openCalendar,
  setOpenCalendar,
}) => {
  const [is24HourView, setIs24HourView] = useState(false);
  const [expandCalendar, setExpandCalendar] = useState(() => {
    const storedExpand = localStorage.getItem("expandCalendar");
    return storedExpand === "true" || false;
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });
  const [toastShow, setToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importErrorToast, setImportErrorToast] = useState(false);
  const { user } = useAuth0();
  const { meetings, getMeetings, isGettingMeetings, reImportMeetings, isImportingMeetings } = useMeetingsContext();
  const navigate = useNavigate();

  const handleImportEvents = () => {
    reImportMeetings(undefined, {
      onSuccess: (data) => {
        setToast(true);
      },
      onError: (err) => {
        setImportErrorToast(true);
        setError("An error occurred during the import. Please try again.");
        getMeetings()
          .then(() => {
            setToast(true);
          })
          .catch((err) => {
            console.error(err);
          });
      },
    });
  };

  const calendarRef = useRef<Calendar | null>(null);

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate.toISOString());
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("expandCalendar", expandCalendar.toString());
  }, [expandCalendar]);

  const handleToggleView = () => {
    setIs24HourView((prevView) => !prevView);
  };

  const handleClose = () => {
    setToast(false);
    setImportErrorToast(false);
  };

  useEffect(() => {
      getMeetings()
        .then(() => {
          setToast(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [selectedDate]);

  useEffect(() => {
    if (calendarRef.current) {
      const now = new Date();
      calendarRef.current.scrollToTime(now);
    }
  }, []);

  // // Define the list of events to be displayed
//   const events = meetings?.map((meeting: Meeting) => ({
//     id: meeting.uuid,
//     title: meeting.subject,
//     start: new Date(meeting.start_time),
//     end: new Date(meeting.end_time),
//     classification: meeting.classification || "external",
//   }));


  // Define the list of events to be displayed
const events = meetings?.flatMap((meeting: Meeting) => {
  const startTime = new Date(meeting.start_time);
  const endTime = new Date(meeting.end_time);

//   Check if the meeting crosses midnight
  if (startTime.getDate() !== endTime.getDate() && meeting.classification === "external") {
    // Split the meeting into two events
    const firstPart = {
      id: `${meeting.uuid}`,
      title: meeting.subject,
      start: startTime,
      end: new Date(
        startTime.getFullYear(),
        startTime.getMonth(),
        startTime.getDate(),
        23,
        59,
        59
      ),
      classification: meeting.classification || "external",
    };

    const secondPart = {
      id: `${meeting.uuid}`,
      title: meeting.subject,
      start: new Date(
        endTime.getFullYear(),
        endTime.getMonth(),
        endTime.getDate(),
        0,
        0,
        0
      ),
      end: endTime,
      classification: meeting.classification || "external",
    };

    return [firstPart, secondPart];
  }

  // If the meeting doesn't cross midnight, return it as is
  return {
    id: meeting.uuid,
    title: meeting.subject,
    start: startTime,
    end: endTime,
    classification: meeting.classification || "external",
  };
});




  const handleSelectEvent = useCallback((event: Event) => {
    navigate(`/meeting/${event!.id}`);
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setExpandCalendar(view === "week");
  }, []);

  const handleNavigate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const TimeComponent = () => {
    return null; // Return null to hide the time completely
  };

  return (
    <>

      <CustomDrawer open={openCalendar} expand={expandCalendar}>
        <Box className="custom-calendar" sx={{ display: "flex", paddingTop: "0px", paddingBottom: "0px", height: "100%" }}>
          <Box sx={{ width: "100%", height: "100%", alignItems: "stretch", display: "flex", flexDirection: "column" }}>
            {/* Toolbar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                backgroundColor: "white",
                color: "rgb(104, 112, 118)",
                height: "56px",
                borderRadius: "8px 8px 0px 0px",
                padding: "0.5rem 0",
              }}
            >
              {/* Toolbar for the calendar */}
              <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
                <Box marginLeft="4px">
                    <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          stroke: "rgb(17, 24, 28)",
                          alignItems: "center",
                        }}
                      >
                  <Typography
                    sx={{
                      color: moment(selectedDate).isSame(moment(), "day") ? "red" : "rgb(17, 24, 28)",
                      fontWeight: 500,
                      fontSize: "14px",
                      cursor: "pointer",
                      padding: "2px 2px",
                      borderRadius: "4px",
                      ":hover": { backgroundColor: "rgb(236, 238, 240)" },
                      transition: "0.2s ease",
                      margin: "0 0 0 4px",
                    }}
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Typography>
                  <ChevronLeftOutlined
                        sx={{
                          color: "rgb(17, 24, 28)",
                          fontWeight: 400,
                          fontSize: "20px",
                          cursor: "pointer",
                          padding: "2px 2px",
                          borderRadius: "4px",
                          ":hover": {
                            backgroundColor: "rgb(236, 238, 240)",
                          },
                          transition: "0.2s ease",
                          margin: "0 0 0 4px",
                        }}
                        onClick={() => {
                          const currentDate = new Date(selectedDate);
                          currentDate.setDate(
                            currentDate.getDate() -
                              (expandCalendar === true ? 7 : 1)
                          );
                          setSelectedDate(currentDate);
                        }}
                      />
                      <ChevronRightOutlined
                        sx={{
                          color: "rgb(17, 24, 28)",
                          fontWeight: 400,
                          fontSize: "20px",
                          cursor: "pointer",
                          padding: "2px 2px",
                          borderRadius: "4px",
                          ":hover": {
                            backgroundColor: "rgb(236, 238, 240)",
                          },
                          transition: "0.2s ease",
                          margin: "0 0 0 4px",
                        }}
                        onClick={() => {
                          const currentDate = new Date(selectedDate);
                          currentDate.setDate(
                            currentDate.getDate() +
                              (expandCalendar === true ? 7 : 1)
                          );
                          setSelectedDate(currentDate);
                        }}
                      />
                </Box>
                </Box>
                <Typography
                  sx={{
                    color: "rgb(17, 24, 28)",
                    fontWeight: 500,
                    fontSize: "14px",
                    margin: "0px 0px 0px 4px",
                    lineHeight: "20px",
                  }}
                >
                  {moment(selectedDate).format("MMMM")}
                </Typography>
                <Typography
                  sx={{
                    color: "rgb(104, 112, 118)",
                    fontWeight: 300,
                    fontSize: "14px",
                    margin: "0px 0px 0px 4px",
                  }}
                >
                  {moment(selectedDate).format("YYYY")}
                </Typography>
              </Box>

              {/* calendar  */}
              <Box
                sx={{
                  display: "flex",
                  width: "50%",
                  gap: "12px",
                  padding: "12px",
                  alignItems: "center",
                  justifyContent: "end",
                  color: "black",
                }}
              >
                {isGettingMeetings ? (
                  <div>
                    <CircularProgress size={20} color="inherit" />
                  </div>
                ) : (
                  <Tooltip arrow title="Sync calendar">
                    <button
                      className="border-none outline-none"
                      onClick={handleImportEvents}
                    >
                      <AiOutlineSync size={20} className="icon" />
                    </button>
                  </Tooltip>
                )}
                {expandCalendar ? (
                  <Tooltip arrow title="Day view">
                    <div>
                      <RiCollapseDiagonalLine
                        size={20}
                        onClick={() => setExpandCalendar(false)}
                        className="icon"
                      />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip arrow title="Week view">
                    <div>
                      <CgArrowsExpandRight
                        size={20}
                        onClick={() => setExpandCalendar(true)}
                        className="icon"
                      />
                    </div>
                  </Tooltip>
                )}

                <CloseIcon
                  onClick={() => setOpenCalendar(false)}
                  sx={{
                    width: "22px",
                    height: "22px",
                    color: "rgb(17, 24, 28)",
                    fontWeight: 400,
                    cursor: "pointer",
                    padding: "2px 2px",
                    borderRadius: "4px",
                    ":hover": {
                      backgroundColor: "rgb(236, 238, 240)",
                    },
                    transition: "0.2s ease",
                  }}
                  className="icon"
                />
              </Box>
            </Box>

            {/* meeting calendar */}
            <Box
              sx={{
                border: "none",
                minHeight: "calc(100% - 56px)",
                maxHeight: "calc(100% - 56px)",
                width: "100%",
                marginTop: "0",
                overflowX: "hidden",
                scrollbarWidth: "none",
              }}
            >
                <Calendar
                  localizer={localizer}
                  className="custom-calendar hide-scrollbar"
                  startAccessor="start"
                  endAccessor="end"
                  view={expandCalendar ? "week" : "day"}
                  onView={handleViewChange}
                  defaultView="week"
                  events={events}
                  toolbar={false}
                  min={new Date(0, 0, 0, 0, 0, 0)}
                  max={new Date(0, 0, 0, 23, 59, 0)}
                  timeslots={1}
                  step={60}
                  scrollToTime={new Date()}
                  defaultDate={new Date()}
                  date={selectedDate}
                  onNavigate={handleNavigate}
                  formats={{
                    timeGutterFormat: "h A",
                  }}
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={eventPropGetter}
                  components={{
                    event: EventComponent, // Custom event rendering
                  }}
                />

            </Box>
          </Box>
        </Box>
      </CustomDrawer>
    </>
  );
};

export default MeetingsCalendar;
