import { Box } from "@mui/material";

interface CustomDrawerProps {
  children: React.ReactNode;
  open: boolean;
  expand: boolean;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ children, open, expand }) => {
  return (
    <Box
      sx={{
        maxWidth: "80%",
        borderRadius: "14px",
        backgroundColor: "rgb(248, 249, 250)",
        inset: "0px 2rem 0px 0px",
        height: "90%",
        zIndex: "10",
        position: "fixed",
        pointerEvents: "all",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 12px 5px",
        marginTop: "4rem",
        marginBottom: "auto",
        marginLeft: "auto",
        color: "black",
        transform: open
          ? "translateX(0px) translateZ(0px)"
          : "translateX(1500px) translateZ(0px)",
        transition: "transform 0.3s ease-in-out, width 0.3s ease-in-out",
        width: expand ? "1000px" : open ? "400px" : "0px",
      }}>
      <Box
        sx={{
          height: "calc(100% - 40px)",
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default CustomDrawer;
