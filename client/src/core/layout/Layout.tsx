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
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Typography } from "@mui/material";
import { useAppDispatch } from "../state/store";
import { logout } from "@/modules/auth/controllers/thunks/auth-thunk";

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
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleListItemClick = (route: string, action?: () => void) => {
    if (action) action();
    router.push(route);
  };

  const menuItems = [
    {
      label: "Dashboard",
      route: "/admin/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      label: "Radiologists",
      route: "/admin/dashboard/radiologists",
      icon: <LocalHospitalRoundedIcon />,
    },
    {
      label: "Requests",
      route: "/admin/dashboard/requests",
      icon: <AssignmentRoundedIcon />,
    },
    {
      label: "Settings",
      route: "/admin/dashboard/settings",
      icon: <SettingsRoundedIcon />,
    },
  ];

  const actionItems = [
    {
      label: "Logout",
      route: "/login",
      icon: <LogoutRoundedIcon />,
      action: () => dispatch(logout()),
    },
  ];

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
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <Box
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
                onClick={() => handleListItemClick(item.route)}
              >
                <ListItemButton
                  sx={{
                    color:
                      pathname === item.route
                        ? "secondary.main"
                        : "primary.light",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <Typography
                      sx={{
                        color: "inherit",
                        fontSize: "0.8rem",
                        fontWeight: "400",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </ListItemButton>
              </Box>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {actionItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <Box
                onClick={() => handleListItemClick(item.route, item.action)}
                style={{
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemButton
                  sx={{
                    color:
                      pathname === item.route
                        ? "secondary.main"
                        : "primary.light",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <Typography
                      sx={{
                        color: "inherit",
                        fontSize: "0.8rem",
                        fontWeight: "400",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
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
          sx={{
            padding: "0.5rem 2rem",
            backgroundColor: "primary.lighter",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {children}
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
