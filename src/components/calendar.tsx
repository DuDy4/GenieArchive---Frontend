import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { momentLocalizer, Calendar, Event } from "react-big-calendar";
import moment from "moment";
import { CgArrowsExpandRight } from "react-icons/cg";
import { RiCollapseDiagonalLine } from "react-icons/ri";
import { AiOutlineSync } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomDrawer from "./ui/drawer";
import useMeetings from "../hooks/useMeetings";
import { Meeting } from "../types";

interface MeetingsCalendarProps {
  // events: Event[];
  setOpenCalendar: Dispatch<SetStateAction<boolean>>;
  openCalendar: boolean;
}

const localizer = momentLocalizer(moment);

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({
  // events,
  openCalendar,
  setOpenCalendar,
}) => {
  const [expandCalendar, setExpandCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { meetings } = useMeetings("TestOwner");
  const navigate = useNavigate();

  const events = meetings?.map((meeting: Meeting) => ({
    id: meeting.uuid,
    title: meeting.subject,
    start: new Date(meeting.start_time),
    end: new Date(meeting.end_time),
  }));

  const handleSelectEvent = useCallback((event: Event) => {
    // const eventSlug = slugify(event.title as string);
    navigate(`/meeting/${event!.id}?name=${event.title}`);
  }, []);

  return (
    <CustomDrawer open={openCalendar} expand={expandCalendar}>
      <Box
        sx={{
          display: "flex",
          paddingTop: "0px",
          paddingBottom: "0px",
          height: "100%",
        }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            alignItems: "stretch",
            display: "flex",
            flexDirection: "column",
          }}>
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
            }}>
            {/* calendar toolbar */}

            <Box
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
              }}>
              <Box marginLeft="4px">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    stroke: "rgb(17, 24, 28)",
                    alignItems: "center",
                  }}>
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
                    onClick={() => setSelectedDate(new Date())}>
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
                      currentDate.setDate(currentDate.getDate() - 7);
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
                      currentDate.setDate(currentDate.getDate() + 7);
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
                }}>
                {moment(selectedDate).format("MMMM")}
              </Typography>
              <Typography
                sx={{
                  color: "rgb(104, 112, 118)",
                  fontWeight: 300,
                  fontSize: "14px",
                  margin: "0px 0px 0px 4px",
                }}>
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
              }}>
              <Tooltip arrow title="Sync calendar">
                <div>
                  <AiOutlineSync
                    style={{
                      cursor: "pointer",
                      width: "17px",
                      height: "17px",
                    }}
                  />
                </div>
              </Tooltip>

              {expandCalendar ? (
                <Tooltip arrow title="Day view">
                  <div>
                    <RiCollapseDiagonalLine
                      style={{
                        cursor: "pointer",
                        width: "17px",
                        height: "17px",
                      }}
                      onClick={() => setExpandCalendar(false)}
                      className="icon"
                    />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip arrow title="Week view">
                  <div>
                    <CgArrowsExpandRight
                      style={{
                        cursor: "pointer",
                        width: "17px",
                        height: "17px",
                      }}
                      onClick={() => setExpandCalendar(true)}
                      className="icon"
                    />
                  </div>
                </Tooltip>
              )}

              <CloseIcon
                onClick={() => setOpenCalendar(false)}
                sx={{
                  cursor: "pointer",
                  width: "17px",
                  height: "17px",
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
            }}>
            <Calendar
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              view={expandCalendar ? "week" : "day"}
              defaultView="week"
              events={events}
              toolbar={false}
              timeslots={4}
              selectable={true}
              date={selectedDate}
              formats={{
                timeGutterFormat: "h A",
              }}
              onSelectEvent={handleSelectEvent}
            />
          </Box>
        </Box>
      </Box>
    </CustomDrawer>
  );
};
export default MeetingsCalendar;
