// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", Arial, sans-serif', // Specify Poppins first
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: {
          color: "black",
        },
        tooltip: {
          backgroundColor: "black",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000",
    },
  },
});

export default theme;
