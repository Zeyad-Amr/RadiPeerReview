import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AdminNavbar from "./AdminNavbar";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import AccessibleRoundedIcon from "@mui/icons-material/AccessibleRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import EventIcon from "@mui/icons-material/Event";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/navigation";

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

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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
        open={open}
      >
        <List>
          {[
            "Dashboard",
            "Add Radiologist",
            "Add Patient",
            "Reminders",
            "Settings",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Box
                style={{
                  textDecoration: "none",
                  color: '#333',
                  width: "100%",
                }}
                onClick={() => router.push(`/${text.toLowerCase().replace(/\s/g, "")}`)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <DashboardRoundedIcon sx={{
                        color: '#666',
                      }} />
                    ) : index === 1 ? (
                      <PersonAddAlt1RoundedIcon sx={{
                        color: '#666',
                      }} />
                    ) : index === 2 ? (
                      <AccessibleRoundedIcon sx={{
                        color: '#666',
                      }} />
                    ) : index === 3 ? (
                      <EventIcon sx={{
                        color: '#666',
                      }} />
                    ) : (
                      <TuneRoundedIcon sx={{
                        color: '#666',
                      }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Box>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Terms & Conditions", "Help", "Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Box
                onClick={() => router.push(`/${text.toLowerCase().replace(/\s/g, "")}`)}
                style={{
                  textDecoration: "none",
                  color: '#333',
                  width: "100%",
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? (
                      <GavelRoundedIcon sx={{
                        color: '#666',
                      }} />
                    ) : index === 1 ? (
                      <HelpOutlineRoundedIcon sx={{
                        color: '#666',
                      }} />
                    ) : (
                      <LogoutRoundedIcon sx={{
                        color: '#666',
                      }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main
        open={open}
        sx={{
          padding: "0",
          minHeight: "100vh ",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AdminNavbar open={open} setOpen={setOpen} />
        <Box
          sx={{ padding: "2rem", backgroundColor: "#41bbcb15", height: "100%" }}
        >
          {children}
        </Box>
      </Main>
    </Box >
  );
};
export default Layout;
