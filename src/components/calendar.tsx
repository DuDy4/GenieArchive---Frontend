import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Calendar, Event, momentLocalizer } from "react-big-calendar";

import { AiOutlineSync, AiOutlineCloudDownload } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import { CgArrowsExpandRight } from "react-icons/cg";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import { Alert, Box, Button, Snackbar, Tooltip, Typography } from "@mui/material";
import { FiLogOut, FiUser } from "react-icons/fi";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { Meeting } from "../types";
import CustomDrawer from "./ui/drawer";
import useMeetings from "../hooks/useMeetings";

import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useAuth } from "@frontegg/react";
import { useAuth0 } from "@auth0/auth0-react"

interface MeetingsCalendarProps {
  setOpenCalendar: Dispatch<SetStateAction<boolean>>;
  openCalendar: boolean;
}
// Function to handle dynamic event styles
const eventPropGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
  let style: CSSProperties = {};

  if (event.classification === "internal") {
    style = {
//       backgroundColor: "darkgrey",
//       color: "white",
      border: "none",
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

const localizer = momentLocalizer(moment);

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({
  openCalendar,
  setOpenCalendar,
}) => {
  const [expandCalendar, setExpandCalendar] = useState(() => {
    // Check localStorage for expandCalendar state
    const storedExpand = localStorage.getItem("expandCalendar");
    return storedExpand === "true" || false;
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    // Check localStorage for selectedDate state
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? new Date(storedDate) : new Date();
  });
  const [toastShow, setToast] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importErrorToast, setImportErrorToast] = useState(false);
  const { user } = useAuth0();
  const { meetings, refetch, isRefetching, reImport, isImportingMeetings } = useMeetings(user?.tenantId!, user?.email!);
  const navigate = useNavigate();

//   // Refetching events data
//   const handleRefreshEvents = () => {
//     refetch()
//       .then((res) => {
//         console.log(isRefetching);
//         setToast(true);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

    const handleImportEvents = () => {
      reImport(undefined, {
        onSuccess: (data) => {
          console.log(isImportingMeetings); // Logs the state at the time of the callback
          setToast(true);
        },
        onError: (err) => {
          console.error(err);
          setImportErrorToast(true);
          setError("An error occurred during the import. Please try again.");
          refetch()
            .then(() => {
              console.log(isRefetching);
              setToast(true);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      });
    };

    useEffect(() => {
      localStorage.setItem("selectedDate", selectedDate.toISOString());
    }, [selectedDate]);

    useEffect(() => {
      localStorage.setItem("expandCalendar", expandCalendar.toString());
    }, [expandCalendar]);


  const handleClose = () => {
    setToast(false);
    setImportErrorToast(false); // Close error toast
  };

    const logout = () => {
      const baseUrl = ContextHolder.getContext().baseUrl;
      window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
    };

  const events = meetings?.map((meeting: Meeting) => ({
    id: meeting.uuid,
    title: meeting.subject,
    start: new Date(meeting.start_time),
    end: new Date(meeting.end_time),
    classification: meeting.classification || "external",
  }));

  const handleSelectEvent = useCallback((event: Event) => {
    navigate(`/meeting/${event!.id}?name=${event.title}`);
  }, []);

  const handleViewChange = useCallback((view: string) => {
    setExpandCalendar(view === "week");
  }, []);

  const handleNavigate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  return (
    <>
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={toastShow}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="standard"
            sx={{ width: "100%" }}
          >
            Completed events sync
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Adjust position to under the button
          open={importErrorToast}
          onClose={handleClose}
          autoHideDuration={10000}
          action={
            <Button color="inherit" size="small" onClick={logout}>
              Re-login
            </Button>
          }
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="standard"
            sx={{ width: "100%" }}
          >
            {error || "An error occurred"}
            <br/>
            <br/>
            <div className="flex flex-row justify-center items-center">
              <Tooltip arrow placement="top" title="Log Out">
                <div onClick={logout} className="flex flex-row items-center cursor-pointer">
                  <span className="mr-1">Re-Login</span>
                  <FiLogOut className="logout-icon" />
                </div>
              </Tooltip>
            </div>
          </Alert>
        </Snackbar>
        <CustomDrawer open={openCalendar} expand={expandCalendar}>
        <Box
          sx={{
            display: "flex",
            paddingTop: "0px",
            paddingBottom: "0px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "stretch",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* toolbar */}
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
              {/* calendar toolbar */}

              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
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
                        color: "rgb(17, 24, 28)",
                        fontWeight: 500,
                        fontSize: "14px",
                        cursor: "pointer",
                        padding: "2px 2px",
                        borderRadius: "4px",
                        ":hover": {
                          backgroundColor: "rgb(236, 238, 240)",
                        },
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



                {isRefetching ? (
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
                height: "100%",
                marginTop: "0",
                overflow: "auto",
                overflowX: "hidden",
                scrollbarWidth: "none",
              }}
            >
              <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                view={expandCalendar ? "week" : "day"}
                onView={handleViewChange}
                defaultView="week"
                events={events}
                toolbar={false}
                timeslots={4}
                selectable={true}
                date={selectedDate}
                onNavigate={handleNavigate}
                formats={{
                  timeGutterFormat: "h A",
                }}
                onSelectEvent={handleSelectEvent}
                className="hide-scrollbar"
                eventPropGetter={eventPropGetter}
              />
            </Box>
          </Box>
        </Box>
      </CustomDrawer>
    </>
  );
};
export default MeetingsCalendar;
