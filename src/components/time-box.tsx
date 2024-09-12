import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { getGreeting } from "../utils/helpers";
import { useAuth0 } from "@auth0/auth0-react";

const TimeBox = () => {
  const [time, setTime] = useState(new Date());
  const { user, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Ensure it takes the full viewport height
      }}>

      {/* Background Circle */}
      <Box
        sx={{
          position: "absolute",
          width: "600px", // Adjust the size to your preference
          height: "600px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.1)", // A subtle white-transparent background
          filter: "blur(10px)", // To give it a soft, glowing look
          zIndex: "1", // Behind the content
        }}
      />

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          zIndex: "10", // Ensure it stays above the circle
        }}>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
          }}>
          <Typography
            sx={{
              fontSize: "116px",
              lineHeight: "116px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              color: "rgb(251, 252, 253)",
            }}>
            {moment(time).format("h:mm")}
          </Typography>
          <Typography
            sx={{
              fontSize: "50px",
              lineHeight: "48px",
              fontWeight: 400,
              textTransform: "uppercase",
            }}>
            {moment(time).format("a")}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 500,
            lineHeight: "24px",
            textAlign: "center",
            textTransform: "capitalize",
          }}>
          {user ? (
            <>
              {getGreeting()}
              {user?.name ? user.name.split(' ')[0] : ''}!
            </>
          ) : (
            <div>
              <button
                onClick={() => loginWithRedirect()}
                className="text-white bg-[#2ca1f9] rounded-lg font-bold py-1 px-2 shadow transition-all duration-300 ease-in-out hover:scale-105"
              >
                <div className="flex items-center justify-center gap-1">
                  <img src="/images/google-icon.png" alt="Google-login" className="w-6 h-6 inline-block" />
                  Login to continue
                </div>
              </button>
            </div>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeBox;
