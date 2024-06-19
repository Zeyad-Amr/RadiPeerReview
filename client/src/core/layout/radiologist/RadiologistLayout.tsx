import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import RadiologistNavbar from "./RadiologistNavbar";



const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const RadiologistLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
      >

      </Drawer>
      <Main
        sx={{
          padding: "0",
          minHeight: "100vh ",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RadiologistNavbar />
        <Box
          sx={{ padding: "0.5rem 2rem", backgroundColor: "primary.lighter", height: "100%", boxSizing:'border-box'}}
        >
          {children}
        </Box>
      </Main>
    </Box >
  );
};
export default RadiologistLayout;
