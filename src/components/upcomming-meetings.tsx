import { Box } from "@mui/material";

const UpcomingMeetings = () => {
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
            <p className="opacity-80 uppercase">Upcoming - in 4 hours</p>
          </div>

          <div className="flex gap-4 z-[12]">
            <p className="text-white text-[24px] font-medium text-center">
              Taking Shahar & Roi{" "}
            </p>
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
          </div>
        </div>

        <div className="space-y-2">
          <p
            style={{
              color: "rgb(251, 252, 253)",
            }}
            className="opacity-70 text-[14px] font-normal leading-[20px]">
            3:30 pm - 7:30 (4 hours)
          </p>

          {/* <button className="bg-white flex gap-2 items-center justify-center capitalize py-2 px-2 text-black rounded-[8px]">
            <img src="/images/google-meet-icon.svg" alt="google meet icon" />
            Join & summarize
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeetings;
