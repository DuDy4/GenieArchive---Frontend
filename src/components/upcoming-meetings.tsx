import { Box } from "@mui/material";
import useMeetings from "../hooks/useMeetings";
import moment from "moment";
import { Link } from "react-router-dom";
import { Meeting } from "../types";
// import { useAuth } from "@frontegg/react";
import { useAuth0 } from "@auth0/auth0-react"

const UpcomingMeetings = () => {
  const { user } = useAuth0();
  const { meetings } = useMeetings(user?.tenantId!);

  const upcomingMeeting = meetings?.find((meeting: Meeting) =>

    moment(meeting.start_time).isAfter(moment()) &&
        meeting.classification === 'external'
  );

  return (
    <div className="flex flex-row flex-grow justify-center items-center">
      <div className="flex flex-col justify-center gap-4  z-[10] items-center">
        <div className="space-y-2 flex flex-col justify-center items-center">
          <div
            style={{
              borderRadius: "32px",
              border: "1px solid rgba(0, 0, 0, 0.12)",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
            }}
            className="!rounded-[8px]  border z-[10] backdrop-blur-[20px] leading-[20px] text-[12px] font-medium text-[rgb(251, 252, 253)] px-2 py- flex items-center justify-center w-max">
            <p
              className={`opacity-80 ${
                upcomingMeeting
                  ? "uppercase"
                  : "capitalize text-[14px] font-normal"
              }`}>
              {upcomingMeeting
                ? `Upcoming - ${moment(upcomingMeeting?.start_time).fromNow()}`
                : null}
            </p>
          </div>

          {upcomingMeeting ? (
            <Link
              to={`/meeting/${upcomingMeeting.uuid}?name=${upcomingMeeting?.subject}`}>
              <div className="flex gap-4 z-[12]">
                <p className="text-white text-[24px] font-medium text-center">
                  {upcomingMeeting?.subject}{" "}
                </p>
                {/* {upcomingMeeting?.link ? ( */}
                <Box
                  sx={{
                    margin: "0px",
                    color: "rgb(17, 24, 28)",
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    justifyContent: "center",
                    paddingTop: "2px",
                    alignItems: "center",
                    borderRadius: "4px",
                    backgroundColor: "rgb(248, 249, 250)",
                    fontSize: "12px",
                    fontWeight: "700",
                    lineHeight: "13px",
                  }}>
                  ↩
                </Box>
                {/* ) : null} */}
              </div>
            </Link>
          ) : null}
        </div>

        {upcomingMeeting?.start_time ? (
          <div className="space-y-2">
            <p
              style={{
                color: "rgb(251, 252, 253)",
              }}
              className="opacity-70 text-[14px] font-normal leading-[20px]">
              {moment(upcomingMeeting?.start_time).format("h:mm a")} -{" "}
              {moment(upcomingMeeting?.end_time).format("h:mm a")} (
              {moment(upcomingMeeting?.start_time).fromNow()})
            </p>

            {/* <button className="bg-white flex gap-2 items-center justify-center capitalize py-2 px-2 text-black rounded-[8px]">
            <img src="/images/google-meet-icon.svg" alt="google meet icon" />
            Join & summarize
          </button> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UpcomingMeetings;
