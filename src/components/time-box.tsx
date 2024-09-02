import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { getGreeting } from "../utils/helpers";
import { useAuth0 } from "@auth0/auth0-react";

const TimeBox = () => {
  const [time, setTime] = useState(new Date());
  const { user } = useAuth0();

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          zIndex: "10",
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
              fontFamily: "Poppins !important",
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
            textTransform: "capitalize"
          }}>
          {getGreeting()}, {user?.name? user?.name.split(' ')[0] : ''}!
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeBox;
