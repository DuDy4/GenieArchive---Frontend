import { Box, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { getGreeting } from "../utils/helpers";
import { useAuth0 } from "@auth0/auth0-react";

const TimeBox = () => {
  const [time, setTime] = useState(new Date());
  const { user, loginWithRedirect } = useAuth0();
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, []);

  const handleConsentPopup = useCallback(() => {
    if (window.Storylane) {
      window.Storylane.Play({
        type: "popup",
        demo_type: "image",
        width: 1905,
        height: 828,
        scale: "1.25",
        demo_url: "https://app.storylane.io/share/yhbxs8qom95s?embed=popup",
        padding_bottom: "calc(43.46% + 25px)",
      });

      // Set state and save in localStorage
      setIsLaunched(true);
      localStorage.setItem(`GoogleCalendarConsent`, "true");
    } else {
      setIsLaunched(true);
      localStorage.setItem(`GoogleCalendarConsent`, "true");
      console.log("Timebox - Storylane is not available on window.");
      handleLogin();
    }
  }, []);

  const handleLogin = () => {
    const gaveConsent = localStorage.getItem("GoogleCalendarConsent");

    if (!gaveConsent) {
      handleConsentPopup();
    } else {
      loginWithRedirect();
    }
  };

  // Detect when the user exits the Storylane popup
  useEffect(() => {
    const handleWindowFocus = () => {
      const gaveConsent = localStorage.getItem("GoogleCalendarConsent");
      if (isLaunched && gaveConsent) {
        loginWithRedirect(); // Trigger login on focus after popup exit
      }
    };

    window.addEventListener("focus", handleWindowFocus);
    return () => {
      window.removeEventListener("focus", handleWindowFocus); // Cleanup
    };
  }, [isLaunched, loginWithRedirect]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
      }}
    >
      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          zIndex: "10", // Ensure it stays above the circle
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <Typography
            sx={{
              fontSize: "116px",
              lineHeight: "116px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              color: "rgb(251, 252, 253)",
            }}
          >
            {moment(time).format("h:mm")}
          </Typography>
          <Typography
            sx={{
              fontSize: "50px",
              lineHeight: "48px",
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
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
          }}
        >
          {user ? (
            <>
              {getGreeting()}
              {user?.name ? user.name.split(" ")[0] : ""}!
            </>
          ) : (
            <div>
              <button
                onClick={handleLogin}
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 shadow-md text-gray-500
                 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                <img
                  src="/images/google-icon.png"
                  alt="Google-login"
                  className="w-5 h-5 inline-block"
                />
                <span className="text-black">Sign in with Google</span>
              </button>
            </div>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeBox;
